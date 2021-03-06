// var _slider = document.getElementById('sliderContainer'),
//     _sliderList = document.getElementById('sliderList'),
//     _prevSlide = document.getElementById('prevSlide'),
//     _nextSlide = document.getElementById('nextSlide'),
//     _slideLength = document.querySelectorAll('.quote-container').length;
//     _slides = document.querySelectorAll('.quote-container'),
//     _currentSlide = 0,
//     slideListItems = [];
//
//   if (_slides.length) {
//     // set list dots
//     for (var i = 0; i < _slideLength; i++) {
//       var listItem = document.createElement('li');
//       listItem.setAttribute('idx', i)
//
//       // add click listener
//       listItem.addEventListener('click', function(e) {
//         changeSlide(e.target.getAttribute('idx'));
//       })
//       if (i == 0) listItem.classList += 'current';
//       _sliderList.appendChild(listItem)
//       slideListItems.push(listItem)
//     }
//
//     //init slides
//
//     let randomQuote = Math.floor(Math.random() * _slides.length)
//     _slides[randomQuote].classList.add('current-slide');
//     _slides.forEach((node, i) => {
//       node.setAttribute('data-index', i)
//     })
//
//     // handle arrows on click
//     _nextSlide.addEventListener('click', function() {
//       nextSlide()
//     })
//
//     _prevSlide.addEventListener('click', function() {
//       prevSlide()
//     })
//
//     function nextSlide() {
//       _currentSlide >= (_slideLength - 1) ? _currentSlide = 0 : _currentSlide++;
//       changeSlide()
//     }
//
//     function prevSlide() {
//       _currentSlide <= 0 ? _currentSlide = (_slideLength - 1) : _currentSlide--;
//       changeSlide()
//     }
//
//     function changeSlide(idx = _currentSlide) {
//       // remove selected class from slider dots
//       slideListItems.forEach(node => {
//         node.classList.remove(...node.classList);
//       })
//
//       // add new class to selected dot
//       slideListItems[idx].classList += 'current';
//
//       // hide prev slide
//       _slides.forEach(node => {
//         node.classList.remove('current-slide');
//         if (node.getAttribute('data-index') < idx) node.classList.add('hide-left');
//         if (node.getAttribute('data-index') > idx) node.classList.remove('hide-left');
//         if (node.getAttribute('data-index') == idx) {
//           node.classList.remove('hide-left');
//           node.classList.add('current-slide');
//         }
//       })
//
//       // cancel slideTimer
//       slideTimer.reset();
//
//     }
//   }
//
//   // slide timer
//   let slideTimer = {
//     count: 0,
//     slideDuration: 5,
//     interval: '',
//     start: function() {
//       this.interval = setInterval(() => {
//         this.count++;
//         if (this.count == this.slideDuration) {
//           nextSlide();
//         }
//       }, 1000)
//     },
//     reset: function() {
//       clearInterval(this.interval)
//       this.count = 0;
//       this.start();
//     },
//     init: function() {
//       slideTimer.start()
//     }
//   }
//
//   slideTimer.init()
//
//
// // swipe
//
// function swipedetect(el){
//     var touchsurface = el,
//     swipedir,
//     startX,
//     startY,
//     distX,
//     distY,
//     threshold = 150, //required min distance traveled to be considered swipe
//     restraint = 100, // maximum distance allowed at the same time in perpendicular direction
//     allowedTime = 300, // maximum time allowed to travel that distance
//     elapsedTime,
//     startTime;
//
//     touchsurface.addEventListener('touchstart', function(e){
//         var touchobj = e.changedTouches[0];
//         swipedir = 'none';
//         dist = 0;
//         startX = touchobj.pageX;
//         startY = touchobj.pageY;
//         startTime = new Date().getTime();
//     }, false)
//
//     touchsurface.addEventListener('touchend', function(e){
//         var touchobj = e.changedTouches[0];
//         distX = touchobj.pageX - startX;
//         distY = touchobj.pageY - startY;
//         elapsedTime = new Date().getTime() - startTime ;
//         if (elapsedTime <= allowedTime){
//             if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
//                 swipedir = (distX < 0) ? nextSlide() : prevSlide()
//             }
//         }
//     }, false)
// }
//
// swipedetect(_slider);





// quote header //



    let header = {
      quoteContent:  document.getElementById('quoteContent'),
      quoteFrom:  document.getElementById('quoteFrom'),
      quoteContainer:  document.getElementById('quoteContainer'),
      currentQuoteIndex: 0,
      interval: '',
      count: 0,
      slideDuration: 4,
      quoteArr: [
        {
          content: 'PJC has stood by our side through thick and thin and has helped us overcome major obstacles. They have received our calls whether it be at 12 noon or 12 midnight. ',
          from: 'Joshua Aviv, Founder of SparkCharge'
        },
        {
          content: 'hi',
          from: 'hoss'
        },
        {
          content: 'yo',
          from: 'person'
        },
      ].sort( () => Math.random() - .5),
      init: function() {
        document.getElementById('headerNext').addEventListener('click', () => { this.nextSlide() })
        document.getElementById('headerPrev').addEventListener('click', () => { this.prevSlide() })

        this.setText();
        this.start();
      },
      setText: function() {
        quoteContent.textContent = this.quoteArr[this.currentQuoteIndex].content
        quoteFrom.textContent = '- ' + this.quoteArr[this.currentQuoteIndex].from
      },
      handleSlideChange: function() {
        // fade out
        setTimeout( () => { quoteContainer.style.opacity = 0; }, 10);

        //change text
        setTimeout( () => { this.setText(); }, 300);

        // fade back in
        setTimeout( () => { quoteContainer.style.opacity = 1; }, 400);
        this.reset();
      },
      start: function() {
         this.interval = setInterval(() => {
           this.count++;
           if (this.count == this.slideDuration) {
             this.nextSlide();
           }
         }, 1000)
      },
      reset: function() {
         clearInterval(this.interval)
         this.count = 0;
         this.start();
      },
      nextSlide: function() {
         this.currentQuoteIndex >= (this.quoteArr.length - 1) ? this.currentQuoteIndex = 0 : this.currentQuoteIndex++;
         this.handleSlideChange()
      },
      prevSlide: function() {
         this.currentQuoteIndex <= 0 ?  this.currentQuoteIndex = (this.quoteArr.length - 1) : this.currentQuoteIndex--;
         this.handleSlideChange()
      },

    }

    header.init();
