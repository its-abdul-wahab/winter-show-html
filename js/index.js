// Higher number = more zoom
let scaleAmount = 0.5;

function scrollZoom() {
  const images = document.querySelectorAll("[data-scroll-zoom]");
  let scrollPosY = 0;
  scaleAmount = scaleAmount / 100;

  const observerConfig = {
    rootMargin: "0% 0% 0% 0%",
    threshold: 0
  };

  // Create separate IntersectionObservers and scroll event listeners for each image so that we can individually apply the scale only if the image is visible
  images.forEach(image => {
    let isVisible = false;
    const observer = new IntersectionObserver((elements, self) => {
      elements.forEach(element => {
        isVisible = element.isIntersecting;
      });
    }, observerConfig);

    observer.observe(image);

    // Set initial image scale on page load
    // console.log('test  scle ', scaleAmount, percentageSeen(image), 1+scaleAmount * percentageSeen(image))
    image.style.transform = `scale(${1 + scaleAmount * percentageSeen(image)})`;

    // Only fires if IntersectionObserver is intersecting
    window.addEventListener("scroll", () => {
      if (isVisible) {
        // console.log('isVisisble , ', scaleAmount, percentageSeen(image), 1+scaleAmount * percentageSeen(image))
        scrollPosY = window.pageYOffset;
        image.style.transform = `scale(${1 +
          scaleAmount * percentageSeen(image)})`;
      }
    });
  });

  // Calculates the "percentage seen" based on when the image first enters the screen until the moment it leaves
  // Here, we get the parent node position/height instead of the image since it's in a container that has a border, but
  // if your container has no extra height, you can simply get the image position/height
  function percentageSeen(element) {
    const parent = element.parentNode;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const elPosY = parent.getBoundingClientRect().top + scrollY;
    const borderHeight = parseFloat(getComputedStyle(parent).getPropertyValue('border-bottom-width')) + parseFloat(getComputedStyle(element).getPropertyValue('border-top-width'));
    const elHeight = parent.offsetHeight + borderHeight;

    if (elPosY > scrollY + viewportHeight) {
      // If we haven't reached the image yet
      return 0;
    } else if (elPosY + elHeight < scrollY) {
      // If we've completely scrolled past the image
      return 100;
    } else {
      // When the image is in the viewport
      const distance = scrollY + viewportHeight - elPosY;
      let percentage = distance / ((viewportHeight + elHeight) / 100);
      percentage = Math.round(percentage);

      return percentage;
    }
  }
}

scrollZoom();

let currentSectionIndex = 1;

const indicators = document.querySelectorAll('.indicator');
const sections = document.querySelectorAll('.site-section');


const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, // Adjust this threshold as needed
  };
  
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const sectionID = entry.target.id.split('-')[1]
            // console.log('In Observer ', index + 1, entry.target.id, Number(sectionID))
            currentSectionIndex = Number(sectionID)
            updateActiveIndicator(Number(sectionID));
        }
    });
}, observerOptions);

sections.forEach((section) => {
    observer.observe(section);
});


function scrollToSection(index) {
    const section = document.getElementById(`section-${index}`)
    // console.log('CURRENT_SECTION_INDEX = ', currentSectionIndex)
    // console.log('INDEX = ', index)

    if (section) {
        // console.log('innerHeight ', window.innerHeight, window.innerHeight * (index - currentSectionIndex))
        if (currentSectionIndex < index) {
            window.scrollBy(0, window.innerHeight * (index - currentSectionIndex));
            currentSectionIndex = index;
        }
        else if (currentSectionIndex > index) {
            window.scrollBy(0, -window.innerHeight * (currentSectionIndex - index));
            currentSectionIndex = index;
        }
        else console.log('nothing match ', index, currentSectionIndex);
      }
      
    //   console.log('updated currentSectionIndex = ', currentSectionIndex)
}


window.addEventListener('scroll', () => {
    const windowTop = window.scrollY;
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.clientHeight;
      
      if (windowTop >= sectionTop && windowTop < sectionBottom) {
        updateActiveIndicator(index + 1);
      }
    });
  });


function updateActiveIndicator(activeIndex) {
    // console.log('activeIndex ', activeIndex)
    indicators.forEach((indicator, i) => {
        if (i === activeIndex) indicator.classList.add('active');
        else indicator.classList.remove('active');
      });
    //   console.log('UPDATING...', activeIndex)
      
    for (let i = 0; i < indicators.length; i++) {
    const indicator = indicators[i];

    // Determine whether to show or hide the indicator based on activeIndicator
        if (i === activeIndex - 1) {
            // console.log('first conxxx ', i, activeIndex - 1);
            indicator.classList.add('active');
            indicator.style.display = 'block';
        } else if (i === activeIndex - 2 || i === activeIndex || (activeIndex === 1 && i === activeIndex+1) || (activeIndex == 11 && i === activeIndex-3)) {
            // console.log('second conxxx ', i, activeIndex - 2);
            indicator.classList.remove('active');
            indicator.style.display = 'block';
        } else {
            // console.log('elsexxx ', i);
            indicator.style.display = 'none';
        }
    }
}

// updateIndicatorsVisibility(1);

// function updateIndicatorsVisibility(activeIndex) {
//     const indicators = document.querySelectorAll('.indicator');

//     console.log('updating indexjs ', activeIndex)
//     for (let i = 0; i < indicators.length; i++) {
//         const indicator = indicators[i];
    
//         // Determine whether to show or hide the indicator based on activeIndicator
//         if (i === activeIndex - 1) {
//             // console.log('first con ', i, activeIndex - 1);
//             indicator.classList.add('active');
//             indicator.style.display = 'block';
//           } else if (i === activeIndex - 2 || i === activeIndex || (activeIndex === 1 && i === activeIndex+1) ||  (activeIndex === 11 && i === activeIndex-3)) {
//             // console.log('second con i === activeIndex - 2', i, activeIndex - 2);
//             // console.log('second con index === activeIndex', i, activeIndex);
//             // console.log('second con activeIndex === 1 and i === activeIndex + 1', i, activeIndex, activeIndex+1);
//             // console.log('second con activeIndex === 12 and activeIndex - 3', i, activeIndex - 3);
//             indicator.classList.remove('active');
//             indicator.style.display = 'block';
//           } else {
//             // console.log('else ', i);
//             indicator.style.display = 'none';
//           }
//       }
//   }
