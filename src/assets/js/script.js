
$(function(){

//SMOOTH SCROLLING
		$(document).on('click', 'a[href^="#"]', function (event) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top
			}, 500);
		});
// Hide Header on on scroll down
		var didScroll;
		var lastScrollTop = 0;
		var delta = 5;
		var navbarHeight = $('.navlink').outerHeight();

		$(window).scroll(function(event){
			didScroll = true;
		});

		setInterval(function() {
			if (didScroll) {
				hasScrolled();
				didScroll = false;
			}
		}, 250);

		function hasScrolled() {
			var st = $(this).scrollTop();
			
			// Make sure they scroll more than delta
			if(Math.abs(lastScrollTop - st) <= delta)
				return;
			
			// If they scrolled down and are past the navbar, add class .nav-up.
			// This is necessary so you never see what is "behind" the navbar.
			if (st > lastScrollTop && st > navbarHeight){
				// Scroll Down
				$('.navlink').removeClass('nav-down').addClass('nav-up');
			} else {
				// Scroll Up
				if(st + $(window).height() < $(document).height()) {
					$('.navlink').removeClass('nav-up').addClass('nav-down');
				}
			}
			
			lastScrollTop = st;
		}
// FOOTNOTE POPUPS
		const popup = $('#footnote-popup');

		$('.reference').on('click', function(e){
			
		 		let id = $(this).attr('id').replace('fnref', '');
				// let id_x = this.getBoundingClientRect().top;
				// let id_y = this.getBoundingClientRect().left;
				var offset = $(this).offset();
				var id_x = offset.top;
				var id_y = offset.left;
			
		 		let copy = $('#fn'+id);
		 		$('.footnote-backref', copy).remove();

		 		let popup_text = copy.html();
		 		popup.html(popup_text);

		 		// console.log('#fnitem'+id);
		 		if (popup.hasClass('visible')){
		 			popup.removeClass('visible');
		 		} else{
		 			// $('.visible').removeClass('visible');
		 			popup.addClass('visible');
					popup.css({
						'top': id_x + 'px',
						'left': id_y + 20 + 'px'
					});
		 		}
		});
		
		$('*').click(function(e) {
			if ($(e.target).hasClass('footnote-ref')) {
		
			} else {
				popup.removeClass('visible');
			}
		});
		

// IMAGE TREATMENT
	// let img = $('.periphery');
	// $( img ).each(function() {
	//   let width = Math.random() * window.innerWidth / 2.0;
	//   let height = Math.random() * window.innerHeight / 2.0;
	//   let x = Math.random() * (window.innerWidth - width);
	//   let y = Math.random() * (window.innerHeight - height);
	//   console.log(x);

	//   $(this).css({
	//     left: x + 'px',
	//     top: y  + 'px',
	//     width: width  + 'px'
	//   });
	// });

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

// GLOBAL: navigation toggle
		if( $('body#home'.length > 0)) { 
			$('.current-page').click(function() {
				$('html, body').animate({
					scrollTop: $('#toc').offset().top
				}, 500);
			});
		} 
			$('.current-page').click(function() {
				
				if ($('ul.toc').hasClass('display')) {
					$('.navlink').addClass('no-border');
					$('ul.toc').removeClass('display');
				} else {
					$('ul.toc').addClass('display');
					$('.navlink').removeClass('no-border');
				}

			});
			 
		
// HOME: info page 
		if( $('body#home'.length > 0)) { 
			
			$('div.info').click(function() {
				if ($('div.summery').hasClass('visible')){
					$('div.summery').removeClass('visible');
				} else {
					$('div.summery').addClass('visible');
				}
				
			});
			$('div.summery-bg').click(function() {
				$('div.summery').removeClass('visible');
			});
		};

// HOME: image treatment

	//   let img = $('.bg img');
	//   $( img ).each(function() {
	// 	let width = Math.random() * window.innerWidth / 2.0;
	// 	let height = Math.random() * window.innerHeight / 2.0;
	// 	let x = Math.random() * (window.innerWidth - width);
	// 	let y = Math.random() * (window.innerHeight - height);
	// 	console.log(x);
  
	// 	$(this).css({
	// 	  left: x + 'px',
	// 	  top: y  + 'px',
	// 	  width: width  + 'px'
	// 	});
	//   });

    /*------------------------------------------------
     Scroll-based elements
     ------------------------------------------------*/

		// //------------responsive column with a plot
		// const card = document.querySelectorAll('.col');
		// const observer = new IntersectionObserver(
		// 	entries =>{
		// 		entries.forEach(entry => {
		// 		// entry.target.classList.toggle('is-active', entry.isIntersecting);

		// 		entry.target.classList.toggle('on', entry.isIntersecting);
		// 		// entry.target.previousElementSibling.classList.toggle('on-prev', entry.isIntersecting);
		// 		// entry.target.nextElementSibling.classList.toggle('on-next', entry.isIntersecting);

		// 		});
		// 		console.log(entries);
		// 	}, {
		// 		threshold: 0.2, //percentage of the element exposure in the viewport
		// 		// root: '.col-r', //root container
		// 		rootMargin: "100px"
		// 	}

		// );


		// card.forEach(card => {
		// observer.observe(card);
		// })

		// //------------toggle secondary images
		// const col = document.querySelectorAll('.cols');
		// const observer2 = new IntersectionObserver(
		// entries =>{
		// 	entries.forEach(entry => {
		// 	entry.target.classList.toggle('on-img', entry.isIntersecting);
		// 	if(entry.isIntersecting) {
		// 		//position seconrdary images
		// 		// let img = $('.on-img .peripheral');
		// 		// $( img ).each(function() {
		// 		//   let width = Math.random() * window.innerWidth / 2.0;
		// 		//   let height = Math.random() * window.innerHeight / 2.0;
		// 		//   let x = Math.random() * (window.innerWidth - width);
		// 		//   let y = Math.random() * (window.innerHeight - height);
		// 		//   console.log(x);
			
		// 		//   $(this).css({
		// 		//     left: x + 'px',
		// 		//     top: y  + 'px'
		// 		//     // width: width  + 'px'
		// 		//   });
		// 		// });
		// 	}
			
		// 	});
		// 	console.log(entries);
		// }, {
		// 	threshold: 0.1 
		// }

		// );

		// col.forEach(col => {
		// observer2.observe(col);
		// })

		// //------------interlude
		// const cover = document.querySelectorAll('.interlude');
		// const observer3 = new IntersectionObserver(
		// entries =>{
		// 	entries.forEach(entry => {
		// 	entry.target.parentElement.classList.toggle('black', entry.isIntersecting);
			
		// 	});
		// 	console.log(entries);
		// }, {
		// 	threshold: 0.5, 
		// 	rootMargin: "20px"
		// }

		// );

		// cover.forEach(cover => {
		// observer3.observe(cover);
		// })


});



// /*------------------------------------------------
//   split each line of the text and wrap it in span https://stackoverflow.com/questions/60963965/how-to-split-and-wrap-lines-in-a-span-in-each-section
//   ------------------------------------------------*/
//  function wrapNewLines(targetSelector, wrapEl = 'span', wrapClass = 'line') {
//   const content = document.querySelectorAll(targetSelector)
//   content.forEach(section => {
//     let sectionWidth = section.getBoundingClientRect().width
//     // let sectionWidth =  window.innerWidth/2;
//     // console.log('column:' + sectionWidth);
//     let words = section.innerText.split(/( )/g);
//     section.innerHTML = words.map(word =>`<span>${word}</span>`).join('')
//     let lines = []
//     let line = []
//     let lineWidth = 0
//     let spans = section.querySelectorAll('span')
//     spans.forEach((span, i) => {
//       let spanWidth = span.getBoundingClientRect().width;
//       // console.log('span:'+ spanWidth);
//       // if (lineWidth + spanWidth <= sectionWidth - 4) {
//         if (lineWidth + spanWidth <= sectionWidth - (sectionWidth/1.8)) {

//         line.push(span)
//         lineWidth += spanWidth
//       } else {
//         lines.push(line)
//         line = []
//         lineWidth = 0
//         line.push(span)
//         lineWidth += spanWidth
//       }
     
//     })
//     if (line.length) lines.push(line)
//     let newLines = lines
//       .map(
//         line =>
//           `<${wrapEl} class=${wrapClass}>${line
//             .map(span => span.innerText)
//             .join('')}</${wrapEl}>`
//       )
//       .join('')
//     section.innerHTML = newLines
//   })
// }

//  $(window).on('resize', function(){
//   wrapNewLines ('.col p');
// });
// $(document).ready(function(){
// 	wrapNewLines ('.col p');
// });
