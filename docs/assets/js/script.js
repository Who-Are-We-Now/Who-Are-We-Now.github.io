$(function(){


// FOOTNOTE POPUPS
		$('.reference').on('click', function(){
		 		let id = $(this).attr('id').replace('fnref', '');

		 		let popup = $('#fnitem'+id);

		 		// console.log('#fnitem'+id);
		 		if (popup.hasClass('visible')){
		 			popup.removeClass('visible');
		 		} else{
		 			$('.visible').removeClass('visible');
		 			popup.addClass('visible');
		 		}
		});

// IMAGE TREATMENT
	let img = $('.periphery');
	$( img ).each(function() {
	  let width = Math.random() * window.innerWidth / 2.0;
	  let height = Math.random() * window.innerHeight / 2.0;
	  let x = Math.random() * (window.innerWidth - width);
	  let y = Math.random() * (window.innerHeight - height);
	  console.log(x);

	  $(this).css({
	    left: x + 'px',
	    top: y  + 'px',
	    width: width  + 'px'
	  });
	});

	// const scroller = scrollama();

	// // setup the instance, pass callback functions
	// scroller
	//   .setup({
	//     step: ".periphery",
	//   })
	//   .onStepEnter((response) => {
	//     // { element, index, direction }
	//     response.element.classList.add('img-on');
	//     console.log('intersecting');
	//   })
	//   .onStepExit((response) => {
	//   	response.element.classList.remove('img-on');
	//     // { element, index, direction }
	//   });

	  //navigation toggle
	  $('.current-page').click(function() {
		$('ul.toc').toggleClass('display');
	  });



    /*------------------------------------------------
     Scroll-based elements
     ------------------------------------------------*/

		//------------responsive column with a plot
		const card = document.querySelectorAll('.col');
		const observer = new IntersectionObserver(
			entries =>{
				entries.forEach(entry => {
				// entry.target.classList.toggle('is-active', entry.isIntersecting);

				entry.target.classList.toggle('on', entry.isIntersecting);
				// entry.target.previousElementSibling.classList.toggle('on-prev', entry.isIntersecting);
				// entry.target.nextElementSibling.classList.toggle('on-next', entry.isIntersecting);

				});
				console.log(entries);
			}, {
				threshold: 0.2, //percentage of the element exposure in the viewport
				// root: '.col-r', //root container
				rootMargin: "100px"
			}

		);


		card.forEach(card => {
		observer.observe(card);
		})

		//------------toggle secondary images
		const col = document.querySelectorAll('.cols');
		const observer2 = new IntersectionObserver(
		entries =>{
			entries.forEach(entry => {
			entry.target.classList.toggle('on-img', entry.isIntersecting);
			if(entry.isIntersecting) {
				//position seconrdary images
				// let img = $('.on-img .peripheral');
				// $( img ).each(function() {
				//   let width = Math.random() * window.innerWidth / 2.0;
				//   let height = Math.random() * window.innerHeight / 2.0;
				//   let x = Math.random() * (window.innerWidth - width);
				//   let y = Math.random() * (window.innerHeight - height);
				//   console.log(x);
			
				//   $(this).css({
				//     left: x + 'px',
				//     top: y  + 'px'
				//     // width: width  + 'px'
				//   });
				// });
			}
			
			});
			console.log(entries);
		}, {
			threshold: 0.1 
		}

		);

		col.forEach(col => {
		observer2.observe(col);
		})

		//------------interlude
		const cover = document.querySelectorAll('.interlude');
		const observer3 = new IntersectionObserver(
		entries =>{
			entries.forEach(entry => {
			entry.target.parentElement.classList.toggle('black', entry.isIntersecting);
			
			});
			console.log(entries);
		}, {
			threshold: 0.5, 
			rootMargin: "20px"
		}

		);

		cover.forEach(cover => {
		observer3.observe(cover);
		})


});



/*------------------------------------------------
  split each line of the text and wrap it in span https://stackoverflow.com/questions/60963965/how-to-split-and-wrap-lines-in-a-span-in-each-section
  ------------------------------------------------*/
 function wrapNewLines(targetSelector, wrapEl = 'span', wrapClass = 'line') {
  const content = document.querySelectorAll(targetSelector)
  content.forEach(section => {
    let sectionWidth = section.getBoundingClientRect().width
    // let sectionWidth =  window.innerWidth/2;
    // console.log('column:' + sectionWidth);
    let words = section.innerText.split(/( )/g);
    section.innerHTML = words.map(word =>`<span>${word}</span>`).join('')
    let lines = []
    let line = []
    let lineWidth = 0
    let spans = section.querySelectorAll('span')
    spans.forEach((span, i) => {
      let spanWidth = span.getBoundingClientRect().width;
      // console.log('span:'+ spanWidth);
      // if (lineWidth + spanWidth <= sectionWidth - 4) {
        if (lineWidth + spanWidth <= sectionWidth - (sectionWidth/1.8)) {

        line.push(span)
        lineWidth += spanWidth
      } else {
        lines.push(line)
        line = []
        lineWidth = 0
        line.push(span)
        lineWidth += spanWidth
      }
     
    })
    if (line.length) lines.push(line)
    let newLines = lines
      .map(
        line =>
          `<${wrapEl} class=${wrapClass}>${line
            .map(span => span.innerText)
            .join('')}</${wrapEl}>`
      )
      .join('')
    section.innerHTML = newLines
  })
}

 $(window).on('resize', function(){
  wrapNewLines ('.col p');
});
$(document).ready(function(){
	wrapNewLines ('.col p');
});
