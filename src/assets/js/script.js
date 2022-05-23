$(function(){

// FOOTNOTE POPUPS
	$('.reference').each(function() {          
	 	$(this).on('click', function(){
	 		let $note = $('.ref-text', this);
	 		if ($note.hasClass('visible')){
	 			$note.removeClass('visible');
	 		}else{
	 			$('.visible').removeClass('visible');
	 			$note.addClass('visible');
	 		}
	 	});
	});


// IMAGE TREATMENT
	let img = $('.periphery');
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

	const scroller = scrollama();

	// setup the instance, pass callback functions
	scroller
	  .setup({
	    step: ".periphery",
	  })
	  .onStepEnter((response) => {
	    // { element, index, direction }
	    response.element.classList.add('img-on');
	    console.log('intersecting');
	  })
	  .onStepExit((response) => {
	  	response.element.classList.remove('img-on');
	    // { element, index, direction }
	  });

});
