
const indicators = document.querySelectorAll('.indicator');
const sections = document.querySelectorAll('.site-section');

let currentIndex = 0;

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5, // Adjust this threshold as needed
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
        console.log('inters ', index+1)
      updateActiveIndicator(index+1);
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

function updateActiveIndicator(activeIndex) {
    console.log('inside ', activeIndex)
    indicators.forEach((indicator, i) => {
        if (i === activeIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
      console.log('UPDATING...', activeIndex)
      
      for (let i = 0; i < indicators.length; i++) {
        const indicator = indicators[i];
    
        // Determine whether to show or hide the indicator based on activeIndicator
        if (i === activeIndex - 1) {
            console.log('first conxxx ', i, activeIndex - 1);
            indicator.classList.add('active');
            indicator.style.display = 'block';
          } else if (i === activeIndex - 2 || i === activeIndex || (activeIndex === 1 && i === activeIndex+1) ||  (activeIndex === 11 && i === activeIndex-3)) {
            console.log('second conxxx ', i, activeIndex - 2);
            indicator.classList.remove('active');
            indicator.style.display = 'block';
          } else {
            console.log('elsexxx ', i);
            indicator.style.display = 'none';
          }
      }

  
}

window.addEventListener('scroll', () => {
  const windowTop = window.scrollY;
  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.clientHeight;
    
    if (windowTop >= sectionTop && windowTop < sectionBottom) {
        console.log('scroll ', index+1)
      updateActiveIndicator(index+1);
    }
  });
});
