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
      _currentSlide >= (_slideLength - 1) ? _currentSlide = 0 : _currentSlide++;
      changeSlide()
    })

    prevSlide.addEventListener('click', function() {
      _currentSlide <= 0 ? _currentSlide = (_slideLength - 1) : _currentSlide--;
      changeSlide()
    })

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
