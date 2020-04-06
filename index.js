var _slider = document.getElementById('sliderContainer'),
    _sliderList = document.getElementById('sliderList'),
    _prevSlide = document.getElementById('prevSlide'),
    _nextSlide = document.getElementById('nextSlide'),
    _slideLength = document.querySelectorAll('.quote-container').length;
    _slides = document.querySelectorAll('.quote-container'),
    _currentSlide = 0
    slideListItems = [];

  if (_slides.length) {
    // set list dots
    for (var i = 0; i < _slideLength; i++) {
      var listItem = document.createElement('li');
      listItem.setAttribute('idx', i)

      // add click listener
      listItem.addEventListener('click', function(e) {
        changeSlide(e.target.getAttribute('idx'));
      })
      if (i == 0) listItem.classList += 'current';
      _sliderList.appendChild(listItem)
      slideListItems.push(listItem)
    }

    //init slides
    _slides[0].classList.add('current-slide');
    _slides.forEach((node, i) => {
      node.setAttribute('data-index', i)
    })

    // handle arrows on click
    _nextSlide.addEventListener('click', function() {
      nextSlide()
    })

    _prevSlide.addEventListener('click', function() {
      prevSlide()
    })

    function nextSlide() {
      _currentSlide >= (_slideLength - 1) ? _currentSlide = 0 : _currentSlide++;
      changeSlide()
    }

    function prevSlide() {
      _currentSlide <= 0 ? _currentSlide = (_slideLength - 1) : _currentSlide--;
      changeSlide()
    }

    function changeSlide(idx = _currentSlide) {
      // remove selected class from slider dots
      slideListItems.forEach(node => {
        node.classList.remove(...node.classList);
      })

      // add new class to selected dot
      slideListItems[idx].classList += 'current';

      // hide prev slide
      _slides.forEach(node => {
        node.classList.remove('current-slide');
        if (node.getAttribute('data-index') < idx) node.classList.add('hide-left');
        if (node.getAttribute('data-index') > idx) node.classList.remove('hide-left');
        if (node.getAttribute('data-index') == idx) {
          node.classList.remove('hide-left');
          node.classList.add('current-slide');
        }
      })

    }
  }

// swipe

function swipedetect(el, callback){
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}

    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0];
        swipedir = 'none';
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    }, false)

    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault();
    }, false)

    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX;
        distY = touchobj.pageY - startY;
        elapsedTime = new Date().getTime() - startTime ;
        if (elapsedTime <= allowedTime){
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
                swipedir = (distX < 0) ? nextSlide() : prevSlide()
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}

swipedetect(_slider, function(swipedir){
    console.log(swipedir)
});
