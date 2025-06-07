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

// Section visibility handler
function updateSectionVisibility() {
  debug.log('Updating section visibility');
  const sections = document.querySelectorAll('.wedding-venues, .wedding-timeline, .faqs');
  
  sections.forEach(section => {
    const isVisible = isInViewport(section);
    const className = section.className.split(' ')[0];
    
    if (isVisible) {
      if (!section.classList.contains('active')) {
        section.classList.add('active');
        debug.log(`${className} is now active`);
      }
    } else {
      if (section.classList.contains('active')) {
        section.classList.remove('active');
        debug.log(`${className} is now inactive`);
      }
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