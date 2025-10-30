// nav bar manager
const menuIcon = document.getElementById('menu-icon');
const mobileNavbar = document.querySelector('.mobile-navbar');
const mNavLinks = document.querySelectorAll('.mobile-navbar a');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-xmark');
    menuIcon.classList.toggle('open');
    mobileNavbar.classList.toggle('active');

    document.documentElement.classList.toggle('no-scroll');
    document.body.classList.toggle('no-scroll');
});

// close mobile menu when a nav link is clicked
mNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNavbar.classList.remove('active');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('open');

        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('no-scroll');
    });
});


// global scroll handler
let lastScrollY = window.scrollY;
let ticking = false;

function onScroll() {
  lastScrollY = window.scrollY;

  // parallax effect -> always trigger
  updateParallax(lastScrollY);

  if (!ticking) {
    window.requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
}

function updateOnScroll() {
  // active section highlight
  updateSectionHighlight();

  // timeline progress animation
  smoothScrollingTimeline(lastScrollY);
  fnOnScroll();

  // image animation
  scrollImage();

  ticking = false; // allow next scroll update
}

window.addEventListener('scroll', onScroll);
window.addEventListener('resize', fnOnResize);


// highlight current section
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

function updateSectionHighlight() {
  let currentSectionId = '';

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const offset = window.innerHeight / 2;  // middle of screen

    if (rect.top <= offset && rect.bottom >= offset) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${currentSectionId}`
    );
  });
}


// invisible header for home section
const header = document.querySelector('header');
const home = document.querySelector('.home');

const observerHeader = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      header.classList.remove('visible');
    } else {
      header.classList.add('visible');
    }
  },
  { threshold: 0.1 }
);

observerHeader.observe(home);


// move home section images
let mountain_back = document.getElementById('mountain_back');
let mountain_moon = document.getElementById('mountain_moon');
let mountain_middle = document.getElementById('mountain_middle');
let mountain_front = document.getElementById('mountain_front');
let greeting = document.getElementById('greeting');

function updateParallax(value) {
  if (!mountain_back) return;
  mountain_back.style.top = -value * 0.5 + 'px';
  mountain_moon.style.left = -value * 0.9 + 'px';
  mountain_moon.style.top = -value * 0.3 + 'px';
  mountain_middle.style.top = -value * 0.15 + 'px';
  mountain_front.style.top = value * 0.15 + 'px';
  greeting.style.top = value * 1 + 'px';
}


// typewriter effect
const words = ['Game Developer', 'Software Engineer', 'Graphic Designer', 'Storyteller'];
const typeSpeed = 100;   // ms per character typing
const deleteSpeed = 50;  // ms per character deleting
const delayBetweenWords = 1500; // pause after full word typed

const element = document.getElementById('typewriter-text');

let wordIndex = 0;
let charIndex = 0;
let typing = true;

function type() {
  const currentWord = words[wordIndex];
  
  if (typing) {
    // type character
    element.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;
    
    if (charIndex === currentWord.length) {
      // word fully typed, wait and then start deleting
      typing = false;
      setTimeout(type, delayBetweenWords);
    } else {
      setTimeout(type, typeSpeed);
    }
  } else {
    // delete character
    element.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;
    
    if (charIndex === 0) {
      // word fully deleted, move to next word
      typing = true;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, typeSpeed);
    } else {
      setTimeout(type, deleteSpeed);
    }
  }
}

type();


// timeline animation
var agTimeline = $('.js-timeline'),
    agTimelineLine = $('.js-timeline_line'),
    agTimelineLineProgress = $('.js-timeline_line-progress'),
    agTimelinePoint = $('.js-timeline-card_point-box'),
    agTimelineItem = $('.js-timeline_item'),
    
    agOuterHeight = $(window).outerHeight(),
    agHeight = $(window).height(),
    f = -1,
    agFlag = false;

function fnOnScroll() {
  agPosY = $(window).scrollTop();

  fnUpdateFrame();
}

function fnOnResize() {
  agPosY = $(window).scrollTop();
  agHeight = $(window).height();

  fnUpdateFrame();
}

function fnUpdateWindow() {
  agFlag = false;
  agTimelineLine.css({
    top: agTimelineItem.first().find(agTimelinePoint).offset().top - agTimelineItem.first().offset().top,
    bottom: agTimeline.offset().top + agTimeline.outerHeight() - agTimelineItem.last().find(agTimelinePoint).offset().top
  });

  f !== agPosY && (f = agPosY, agHeight, fnUpdateProgress());
}

function fnUpdateProgress() {
  var agTop = agTimelineItem.last().find(agTimelinePoint).offset().top;
      i = agTop + agPosY - $(window).scrollTop();
      a = agTimelineLineProgress.offset().top + agPosY - $(window).scrollTop();
      n = agPosY - a + agOuterHeight / 2;
      i <= agPosY + agOuterHeight / 2 && (n = i - a);

  agTimelineLineProgress.css({height: n + 'px'});

  agTimelineItem.each(function () {
  var agTop = $(this).find(agTimelinePoint).offset().top;
  
  (agTop + agPosY - $(window).scrollTop()) < agPosY + .5 * agOuterHeight ? $(this).addClass('js-ag-active') : $(this).removeClass('js-ag-active');
  })
}

function fnUpdateFrame() {
  agFlag || requestAnimationFrame(fnUpdateWindow);
  agFlag = true;
}

function smoothScrollingTimeline(lastScrollY) {
  const scrollingDown = window.scrollY > lastScrollY;
  lastScrollY = window.scrollY;
   document.documentElement.dataset.scrollDirection = scrollingDown ? 'down' : 'up';
}

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.js-timeline_item');

  const observerOptions = {
    threshold: 0,
    rootMargin: '-50% 0px -50% 0px'
  };

  const observerScrolling = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const scrollingDown = document.documentElement.dataset.scrollDirection === 'down';
      if (entry.isIntersecting && scrollingDown) {
        entry.target.classList.add('js-ag-active');
      } else if (!entry.isIntersecting && !scrollingDown) {
        entry.target.classList.remove('js-ag-active');
      }
    });
  }, observerOptions);

  items.forEach(item => observerScrolling.observe(item));
});

// cube slide show
document.querySelectorAll('.cubeSwiper').forEach((el, i) => {
  // random delay offset (between 0 and 1000ms)
  const randomOffset = Math.random() * 1000 + i * 400;

  new Swiper(el, {
    effect: 'cube',
    grabCursor: true,
    speed: 1500,
    loop: true,
    autoplay: {
      delay: 3000 + randomOffset, // each one starts a bit off-beat
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  });
});


// skill bar animation
const containers = document.querySelectorAll('.skill-container');

  function restartBar(container) {
    // prevent re-trigger while animating
    if (container.dataset.animating === '1') return;
    container.dataset.animating = '1';

    const span = container.querySelector('.bar span');
    const percentage = container.querySelector('.percentage');

    // remove & force reflow to restart
    span.classList.remove('animate');
    percentage.classList.remove('animate');
    void span.offsetWidth;      // reflow
    void percentage.offsetWidth;

    // add back to start animation
    span.classList.add('animate');
    percentage.classList.add('animate');

    // wait for BOTH to finish before allowing another restart
    let ended = 0;
    const onEnd = () => {
      ended += 1;
      if (ended >= 2) {
        container.dataset.animating = '0';
        span.removeEventListener('animationend', onEnd);
        percentage.removeEventListener('animationend', onEnd);
      }
    };
    span.addEventListener('animationend', onEnd);
    percentage.addEventListener('animationend', onEnd);

    // safety unlock in case animationend doesn't fire
    setTimeout(() => {
      if (container.dataset.animating === '1') {
        container.dataset.animating = '0';
        span.removeEventListener('animationend', onEnd);
        percentage.removeEventListener('animationend', onEnd);
      }
    }, 4000); // animation duration
  }

  // re-animate when it comes into view (but only after previous finished)
  const observerSkills = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        restartBar(entry.target);
      } else {
        // optional: reset so it starts from zero next time
        const span = entry.target.querySelector('.bar span');
        const percentage = entry.target.querySelector('.percentage');
        span.classList.remove('animate');
        percentage.classList.remove('animate');
      }
    });
  }, { threshold: 0.5 });

  containers.forEach(container => {
    observerSkills.observe(container);

    // re-animate on hover, but only if not already running
    container.addEventListener('mouseenter', () => restartBar(container));
  });


// handling circle skills
const dots = 20;  // fixed dots count for all circles
const circles = document.querySelectorAll('.circular-skill');

circles.forEach(elem => {
  const marked = elem.getAttribute('data-percent') || 0;
  const percent = Math.floor(dots * marked / 100);
  const rotate = 360 / dots;
  let points = '';

  for (let i = 0; i < dots; i++) {
    points += `<div class='points' style='--i:${i}; --rot:${rotate}deg'></div>`;
  }

  elem.innerHTML = points;

  // apply permanent marked state
  const pointsMarked = elem.querySelectorAll('.points');
  for (let i = 0; i < percent; i++) {
    pointsMarked[i].classList.add('marked');
  }
});

document.querySelectorAll('.circular-skill').forEach(elem => {
  let animating = false;
  const animationDuration = 0.04 * 20 + 0.1; // match delay * dots + extra

  function animateDots() {
    if (animating) return;
    animating = true;

    const pointsMarked = elem.querySelectorAll('.points.marked');

    pointsMarked.forEach((point, idx) => {
      point.classList.remove('animate');
      void point.offsetWidth; // force reflow
      point.style.setProperty('--delay', `${idx * 0.04}s`); // per-dot delay
      point.classList.add('animate');
    });

    setTimeout(() => { animating = false; }, animationDuration * 1000);
  }

  // intersection observer
  const observerDots = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateDots();
    });
  }, { threshold: 0.5 });

  observerDots.observe(elem);

  // hover
  elem.addEventListener('mouseenter', animateDots);
});


// scroll effect for skills image
function scrollImage() {
  var scrollTop = $(window).scrollTop();

  $('.skills-img').each(function() {
    let $container = $(this);
    let containerTop = $container.offset().top;
    let windowHeight = $(window).height();
    let progress = (scrollTop + windowHeight/2 - containerTop) / windowHeight;

    // clamp between 0 and 1
    progress = Math.max(0, Math.min(1, progress));

    // zoom (applied to all images equally)
    let scale = 1 + 0.9 * progress;
    $container.find('.zoom-image').css('transform', 'scale(' + scale + ')');

    // image switching with custom thresholds
    let $images = $container.find('.zoom-image');
    $images.removeClass('active');

    if (progress < 0.05) {
      $images.eq(0).addClass('active');  // top image
    } else if (progress < 0.3) {
      $images.eq(1).addClass('active');  // middle image
    } else {
      $images.eq(2).addClass('active');  // bottom image
    }
  });
}


// avatar following cusor
// https://github.com/adryd325/oneko.js
(function oneko() {
  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  const isMobile = window.innerWidth <= 768;

  // deactivate for tablet/smartphones
  if (isReducedMotion || isMobile) return;

  const avatar = document.createElement('div');

  let avatarPosX = 180;
  let avatarPosY = 180;
  let avatarWidth = 64;
  let avatarHeight = 64;

  let mousePosX = 0;
  let mousePosY = 0;

  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;
  let lastFrameTimestamp = 0;

  const avatarSpeed = 10;
  const spriteSets = {
    idle: [[0, -2]],
    alert: [[0, -2]],
    N: [
      [0, -2],
      [-1, -2],
      [-2, -2],
      [-3, -2],
    ],
    E: [
      [0, 0],
      [-1, 0],
      [-2, 0],
      [-3, 0],
    ],
    S: [
      [0, -2],
      [-1, -2],
      [-2, -2],
      [-3, -2],
    ],
    W: [
      [0, -1],
      [-1, -1],
      [-2, -1],
      [-3, -1],
    ]
  };

  const home = document.querySelector('.home');
  const mobileNavbar = document.querySelector('.mobile-navbar');
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 80;

  function init() {
    avatar.id = 'avatar';
    avatar.ariaHidden = true;
    avatar.style.width = `${avatarWidth}px`;
    avatar.style.height = `${avatarHeight}px`;
    avatar.style.position = 'fixed';
    avatar.style.pointerEvents = 'none';
    avatar.style.imageRendering = 'pixelated';
    avatar.style.left = `${avatarPosX - avatarWidth/2}px`;
    avatar.style.top = `${avatarPosY - avatarHeight/2}px`;
    avatar.style.zIndex = 2147483647;

    let avatarFile = './assets/img/avatar_sp_s.gif'
   
    avatar.style.backgroundImage = `url(${avatarFile})`;

    document.body.appendChild(avatar);

    document.addEventListener('mousemove', function (event) {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    });

    window.requestAnimationFrame(onAnimationFrame);
  }

  function onAnimationFrame(timestamp) {
    // stops execution if the neko element is removed from DOM
    if (!avatar.isConnected) {
      return;
    }
    if (!lastFrameTimestamp) {
      lastFrameTimestamp = timestamp;
    }
    if (timestamp - lastFrameTimestamp > 100) {
      lastFrameTimestamp = timestamp
      frame()
    }
    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    avatar.style.backgroundPosition = `${sprite[0] * avatarWidth}px ${sprite[1] * avatarHeight}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;
    setSprite('idle', 0);
    idleAnimationFrame += 1;

    applyForce();
  }

  function frame() {
    frameCount += 1;
    const diffX = avatarPosX - mousePosX;
    const diffY = avatarPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < avatarSpeed || distance < 48 || 
      // no walking over header
      (avatarPosY == headerHeight + avatarHeight/2 && mousePosY < headerHeight)) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite('alert', 0);
      // count down after being alerted before moving
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    let direction;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      direction = diffX > 0 ? 'W' : 'E'; // left or right
    } else {
      direction = diffY > 0 ? 'N' : 'S'; // up or down
    }

    setSprite(direction, frameCount);


    avatarPosX -= (diffX / distance) * avatarSpeed;
    avatarPosY -= (diffY / distance) * avatarSpeed;

    applyForce();
  }

  // apply scroll influence
  function applyForce() {
    avatarPosY -= scrollVelocity * 0.02;  // tune multiplier for sensitivity
    scrollVelocity *= 0.9; // decay towards 0 smoothly

    avatarPosX = Math.min(Math.max(avatarWidth/2, avatarPosX), window.innerWidth - avatarWidth/2);

      if (isScrolling) {
        // scrolling -> no header wall
        const top = avatarPosY - avatarHeight / 2;
        const bottom = avatarPosY + avatarHeight / 2;

        if (bottom < 0 || top > window.innerHeight || top < headerHeight) {
          avatar.style.display = 'none';
        } else {
          if (!hideAvatar) {
            avatar.style.display = 'block';
          }
        }
      } else {
        // not scrolling -> header acts as wall
        avatarPosY = Math.min(Math.max(headerHeight + avatarHeight/2, avatarPosY), window.innerHeight - avatarHeight/2);
        if (!hideAvatar) {
          avatar.style.display = 'block';
        }
      }

    avatar.style.left = `${avatarPosX - avatarWidth/2}px`;
    avatar.style.top = `${avatarPosY - avatarHeight/2}px`;
  }

  // detect scrolling
  let lastScrollYNeko = window.scrollY;
  let lastTimestamp = performance.now();

  let scrollVelocity = 0;

  window.addEventListener('scroll', () => {
    const now = performance.now();
    const deltaT = (now - lastTimestamp) / 1000; // seconds
    const deltaY = window.scrollY - lastScrollYNeko;

    scrollVelocity = deltaY / deltaT; // pixels per second

    lastScrollYNeko = window.scrollY;
    lastTimestamp = now;
  });

  let isScrolling = false;
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    isScrolling = true;

    // reset timer every time the user scrolls
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 150); // 150ms after last scroll event -> no longer scrolling
  });

  let hideAvatar = false;
  const hiddenSections = new Set();

  const observerAvatar = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        hiddenSections.add(entry.target);
      } else {
        hiddenSections.delete(entry.target);
      }
    });

    // hide if any section is in the set
    hideAvatar = hiddenSections.size > 0;
    avatar.style.display = hideAvatar ? 'none' : 'block';
  }, { threshold: 0.1 });

  // no avatar on home section
  if (home) observerAvatar.observe(home);

  // no avatar on mobile header
  if (mobileNavbar) observerAvatar.observe(mobileNavbar);


  init();
})();
