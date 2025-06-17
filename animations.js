console.log('animations.js loaded - START');

try {
  // Basic scroll test
  console.log('Setting up basic scroll test');
  window.addEventListener('scroll', () => {
    console.log('Basic scroll test - event detected');
  });
  console.log('Basic scroll test setup complete');
} catch (error) {
  console.error('Error setting up basic scroll test:', error);
}

// Debug logger
const debug = {
  log: (message, data = null) => {
    if (data) {
      console.log(message, data);
    } else {
      console.log(message);
    }
  }
};

// Viewport detection
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  debug.log('Viewport check:', {
    element: element.className,
    rect: {
      top: rect.top,
      bottom: rect.bottom,
      height: rect.height
    },
    window: {
      height: windowHeight,
      width: windowWidth
    }
  });

  const isVisible = !(rect.bottom < 0 || 
                     rect.top > windowHeight ||
                     rect.right < 0 || 
                     rect.left > windowWidth);

  debug.log(`Checking visibility for ${element.className}:`, isVisible);
  return isVisible;
}

// Function to check if an element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
        rect.bottom >= 0
    );
}

// Function to update section visibility and trigger animations
function updateSectionVisibility() {
    const sections = document.querySelectorAll('.wedding-venues, .wedding-timeline, .invitation, .story, .faqs, .guest-attire, .entourage, .principal-sponsors, .proposal');
    

    sections.forEach(section => {
        if (isElementInViewport(section) && !section.classList.contains('active')) {
            section.classList.add('active');
            debug.log(`${section.className} is now active`);
        } 
        
        if (isElementInViewport(section) && !section.classList.contains('background_active')) {
            section.classList.add('background_active');
            debug.log(`${section.className} is now background active`);
        } else if (!isElementInViewport(section) && section.classList.contains('background_active')) {
            section.classList.remove('background_active');
            debug.log(`${section.className} is now background inactive`);
        }
    });
}

// Event handlers
const eventHandlers = {
  scroll: () => {
    debug.log('Scroll event detected');
    requestAnimationFrame(updateSectionVisibility);
  },

  resize: () => {
    debug.log('Resize event detected');
    requestAnimationFrame(updateSectionVisibility);
  },

  basicScrollTest: () => {
    debug.log('Basic scroll test - event detected');
  }
};

// Event listeners setup
function setupEventListeners() {
  debug.log('Setting up event listeners');
  
  // Basic scroll test
  window.addEventListener('scroll', eventHandlers.basicScrollTest);
  
  // Main scroll handler
  window.addEventListener('scroll', eventHandlers.scroll);
  
  // Resize handler
  window.addEventListener('resize', eventHandlers.resize);
  
  debug.log('All event listeners set up');
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  debug.log('DOM Content Loaded - Initializing');
  
  // Set up all event listeners
  setupEventListeners();
  
  // Do initial visibility check
  debug.log('Performing initial visibility check');
  updateSectionVisibility();
  
  debug.log('Initialization complete');
});

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggle = document.querySelector('.navbar__toggle');
  const navbarMenu = document.querySelector('.navbar__menu');
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  const isMobile = window.innerWidth <= 768;

  // Function to handle navbar visibility based on scroll direction
  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    // For iOS devices, use a more responsive approach
    if (isIOS) {
      // Show navbar when scrolling up or at the top of the page
      if (scrollTop < lastScrollTop || scrollTop === 0) {
        navbar.classList.add('visible');
      } else {
        // Add a small delay before hiding the navbar on iOS
        setTimeout(() => {
          if (scrollTop > lastScrollTop) {
            navbar.classList.remove('visible');
          }
        }, 100);
      }
    } else {
      // Regular scroll behavior for non-iOS devices
      if (scrollTop < lastScrollTop || scrollTop === 0) {
        navbar.classList.add('visible');
      } else {
        navbar.classList.remove('visible');
      }
    }
    
    lastScrollTop = scrollTop;
  }

  // Add scroll event listener with passive option for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Handle mobile menu toggle
  navbarToggle.addEventListener('click', function() {
    navbarMenu.classList.toggle('active');
    this.classList.toggle('active');
    
    // On mobile, toggle navbar visibility with menu
    if (isMobile) {
      if (navbarMenu.classList.contains('active')) {
        navbar.classList.add('visible');
      } else {
        navbar.classList.remove('visible');
      }
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!navbarToggle.contains(event.target) && !navbarMenu.contains(event.target)) {
      navbarMenu.classList.remove('active');
      navbarToggle.classList.remove('active');
      // Hide navbar on mobile when clicking outside
      if (isMobile) {
        navbar.classList.remove('visible');
      }
    }
  });

  // Close menu when clicking a link
  const navbarLinks = document.querySelectorAll('.navbar__link');
  navbarLinks.forEach(link => {
    link.addEventListener('click', function() {
      navbarMenu.classList.remove('active');
      navbarToggle.classList.remove('active');
      // Hide navbar on mobile when clicking a link
      if (isMobile) {
        navbar.classList.remove('visible');
      }
    });
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
      // If switching to mobile, hide navbar
      if (newIsMobile) {
        navbar.classList.remove('visible');
      }
    }
  });

  // Initial state - hide navbar by default
  navbar.classList.remove('visible');
}); 