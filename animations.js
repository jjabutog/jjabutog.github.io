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
    const sections = document.querySelectorAll('.wedding-venues, .wedding-timeline, .invitation, .story, .faqs, .guest-attire, .entourage, .principal-sponsors');
    

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