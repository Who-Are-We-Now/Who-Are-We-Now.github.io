let data_index = {};
//get the json index file
fetch('/assets/data/plotIndex.json')
  .then(response => response.json())
  .then(data => {
    data_index = data;
    // console.log(data_index);
    intializePlots();
  });


//loop through figure placeholders
function intializePlots(){
  const plots =  document.querySelectorAll('.plot');

  plots.forEach( el =>{
    let key = el.id;
    
    //setup graphs
    let plot_data = data_index[key];

    let color_settings = '';

    //setup Dynamic CSS Styles
    plot_data.colors.forEach( (color,i) =>{
      color_settings += 
          `--color${i}: var(--${color});`
    });


    //setup DOM elements
    let info = `
      <div class="plot-title">${plot_data.title} <span class="fig-no">${plot_data.plot_key}</span></div>
      <div class="plot-content" style="${color_settings}"></div>
      `
    el.innerHTML = info;

    // plot the data into that figure
    setup(plot_data.file, key);

  });

}

let margin = {top: 10, right: 30, bottom: 30, left: 60};
let width = 700 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

function setup( file, key ){

  // append the svg object to the body of the page
  // this coontains all plot components
  let svg = d3.select('#'+key).select('.plot-content')
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  //get the json file
  fetch('/assets/data/'+file)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      plotData(data, svg);
    });
}



function plotData( data, svg) {
  
  const z = data.z;
  const z2 = Math.pow(data.z, 2); //z-squared

	// const n_bins = bins.length - 1;
	// console.log(bins);

  const min_age = data.x[0];
  const max_age = data.x[1];
  const max_y = data.yt.at(-1);

  // Add X axis
  let x = d3.scaleLinear()
      .domain([ min_age, 65])
      .range([0, width])
      .clamp(true)


  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  let y = d3.scaleLinear()
    .domain([0, max_y])
    .range([ height, 0 ])
  svg.append("g")
    .call(d3.axisLeft(y));

  let area = d3.area()
      .x(d => x(d.x))
      .y1(d => y(d.high))
      .y0(d => y(d.low));

  let line = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.percent));


  function drawError(svg, data, classname){
    svg.append("path")
        .datum(data)
        .attr("class", "area "+ classname)
        .attr("d", area);
  }

  function drawLine(svg, data, classname){
    console.log(data);
    svg.append("path")
        .datum(data)
        .attr("class", "line "+ classname)
        .attr("d", line);
  }


  function drawBins(svg, data){
    
    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bin")
        .attr("x", d => x(d.x) )
        .attr("y", 0)
        .attr("width", d => {
          return (x(d.x + d.width) - x(d.x) )
        })
        .attr("height", height);
  }


  
  const ages = Array
    .from({length: max_age + 1 - min_age}, (v, i) => i)
    .map(i => i + min_age); // array of integers beetween

  const bins = data.bins;
  const series = data.series;

  let dataset = [];
  let errorset = [];
  let rects = [];

  series.forEach( (values, i) =>{
      //for each series
      dataset[i] = []; //data for plotting
      errorset[i] = []; //data for drawing bins
      rects[i] = []; //data for drawing bins

      //calculate error bars for each bin
      for(let j=0; j < bins.length - 1; j++){

        let bin_bounds = [];

        if ( j == bins.length - 1 ){
          bin_bounds = [bins[j], max_age ]; //last bin?
        }else{
          bin_bounds = [bins[j], bins[j+1] ];
        }

       
        let ages_bounds = [ ages.indexOf(bin_bounds[0]), ages.indexOf(bin_bounds[1]) ];
        let ages_mask = ages.slice( ages_bounds[0], ages_bounds[1]);

        let diff = ages_bounds[1] - ages_bounds[0];
        let ages_avg = d3.mean(ages_mask);
        // console.log(ages_avg, diff);
       
        // console.log('\nbounds', bin_bounds, ages_bounds, ages_mask);

        let subset_n = values['n'].slice(ages_bounds[0], ages_bounds[1]);
        let subset_p = values['p'].slice(ages_bounds[0], ages_bounds[1]);
        let subset_N = values['N'].slice(ages_bounds[0], ages_bounds[1]);
        let subset_P = values['P'].slice(ages_bounds[0], ages_bounds[1]);

        let sum_n = d3.sum(subset_n);
        let sum_p = d3.sum(subset_p);
        let sum_N = d3.sum(subset_N);
        let sum_P = d3.sum(subset_P); 

        // console.log(sum_n, sum_p, sum_N, sum_P);

        let n = sum_n + sum_p;
        let nz2 = n + z2;
        let w = z2 / nz2;
        let w1 = 1 - w;

        let p = sum_P / (sum_N + sum_P); // weighted yes fraction
        let p0 = w1*p + w*0.5;
        let pe = z * Math.sqrt(w1 * p * (1 - p)/nz2 + w/(4 * nz2) );

        let percent = 100 * p;

        let error_area = {
          x: ages_avg,
          low: 100 * (p0 - pe),
          high: 100 * (p0 + pe),
        }
        let datapoint = {
          x: ages_avg,
          percent: percent
        }

        let bin = {
          x: bin_bounds[0],
          width: diff
        }

        dataset[i].push(datapoint);
        errorset[i].push(error_area);
        rects[i].push(bin); //todo: this only needs to happen for 1 series

      };


      drawLine(svg, dataset[i], 'plot'+i); //svg container, data, classname for CSS styling
      drawError(svg, errorset[i], 'plot'+i);

  });

  drawBins(svg, rects[0]);
  console.log(rects);
}
