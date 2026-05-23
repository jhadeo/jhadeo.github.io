function setTitleYear(){
    document.title = "Jhade | " + new Date().getFullYear();
    document.getElementById("footer_year").innerHTML = new Date().getFullYear();
}

// Tech Stack Data
const techStack = [
  { name: 'PHP', icon: 'fa-brands fa-php' },
  { name: 'Laravel', icon: 'fa-brands fa-laravel' },
  { name: 'JavaScript', icon: 'fa-brands fa-js' },
  { name: 'React', icon: 'fa-brands fa-react' },
  { name: 'Tailwind CSS', icon: 'fa-brands fa-tailwind-css' },
  { name: 'Livewire', icon: 'fa-solid fa-ghost' },
  { name: 'MySQL', icon: 'fa-solid fa-database' },
  { name: 'GitHub', icon: 'fa-brands fa-github' }
];

// Render tech stack
function renderTechStack() {
  const container = document.getElementById('techStackContainer');
  if (!container) return;
  
  container.innerHTML = techStack.map(tech => `
    <div class="bg-accent text-accent-content p-6 rounded-lg flex flex-col items-center justify-center min-h-28 hover:scale-105 hover:shadow-xl transition-all duration-200 cursor-pointer">
      <i class="${tech.icon} text-3xl mb-2"></i>
      <span class="font-semibold text-sm">${tech.name}</span>
    </div>
  `).join('');
}

// Gallery data structure
const galleries = {
  davies: {
    title: 'Davies — Client Support Chatbot',
    images: [
      '/images/projects/ai-chatbot/auth.png',
      '/images/projects/ai-chatbot/chat.png',
      '/images/projects/ai-chatbot/inbox.png'
    ]
  },
  pos: {
    title: 'BJMPRO3POS',
    images: [
      '/images/projects/bjmp-pos/login.png',
      '/images/projects/bjmp-pos/admin-dashboard.png',
      '/images/projects/bjmp-pos/sales.png',
      '/images/projects/bjmp-pos/bjmpro3pos.png'
    ]
  },
  crms: {
    title: 'Parish Reservation System',
    images: [
      '/images/projects/crms/admin-dashboard.png',
      '/images/projects/crms/admin-announcements.png',
      '/images/projects/crms/admin-individual-reservation.png',
      '/images/projects/crms/admin-reports.png',
      '/images/projects/crms/admin-user-profile.png'
    ]
  }
};

// Gallery state
let currentGallery = null;
let currentImageIndex = 0;

// Open gallery with specific project
function openGallery(projectKey) {
  if (!galleries[projectKey]) return;
  
  currentGallery = projectKey;
  currentImageIndex = 0;
  
  updateGalleryDisplay();
  document.getElementById('galleryModal').showModal();
}

// Update gallery display
function updateGalleryDisplay() {
  if (!currentGallery) return;
  
  const gallery = galleries[currentGallery];
  const totalImages = gallery.images.length;
  
  // Update main image
  document.getElementById('galleryImage').src = gallery.images[currentImageIndex];
  document.getElementById('projectTitle').textContent = gallery.title;
  
  // Update counter
  document.getElementById('imageCounter').textContent = `Image ${currentImageIndex + 1} of ${totalImages}`;
  
  // Update button states
  document.getElementById('prevBtn').disabled = currentImageIndex === 0;
  document.getElementById('nextBtn').disabled = currentImageIndex === totalImages - 1;
  
  // Update thumbnails
  const thumbnailContainer = document.getElementById('thumbnailContainer');
  thumbnailContainer.innerHTML = '';
  
  gallery.images.forEach((image, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = image;
    thumbnail.alt = `Thumbnail ${index + 1}`;
    thumbnail.className = `w-20 h-20 object-cover rounded cursor-pointer border-2 transition-all ${
      index === currentImageIndex ? 'border-primary' : 'border-base-300'
    }`;
    thumbnail.onclick = () => {
      currentImageIndex = index;
      updateGalleryDisplay();
    };
    thumbnailContainer.appendChild(thumbnail);
  });
}

// Navigate to next image
function nextImage() {
  if (!currentGallery) return;
  
  const totalImages = galleries[currentGallery].images.length;
  if (currentImageIndex < totalImages - 1) {
    currentImageIndex++;
    updateGalleryDisplay();
  }
}

// Navigate to previous image
function previousImage() {
  if (!currentGallery) return;
  
  if (currentImageIndex > 0) {
    currentImageIndex--;
    updateGalleryDisplay();
  }
}

// Get user's theme preference from localStorage or system preference
function getThemePreference(){
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme){
    return savedTheme;
  }
  
  if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    return 'dark';
  }
  
  return 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update portrait image
  const portrait = document.getElementById("portrait");
  if(portrait) {
    const picture = theme === 'dark' ? "/images/portrait/darkmode.jpg" : "/images/portrait/lightmode.jpg";
    portrait.setAttribute('src', picture);
  }
  
  // Update theme message
  const themeMessage = document.getElementById("themeMessage");
  if(themeMessage) {
    const message = theme === 'dark' ? "It's a bit dark here, mind turning on the light?" : "It's bright and sunny here!";
    themeMessage.textContent = message;
  }
  
  // Update checkbox state
  const themeController = document.getElementById("theme-controller");
  if(themeController) {
    themeController.checked = (theme === 'dark');
  }
}

function themeSetter(){
  const theme = getThemePreference();
  applyTheme(theme);
}

// Handle theme controller toggle
function setupThemeController() {
  const themeController = document.getElementById("theme-controller");
  if(themeController) {
    themeController.addEventListener('change', function() {
      const newTheme = this.checked ? 'dark' : 'light';
      applyTheme(newTheme);
    });
  }
}

// Setup gallery event listeners
function setupGalleryListeners() {
  const daviesGallery = document.getElementById('davies-gallery');
  const posGallery = document.getElementById('pos-gallery');
  const crmsGallery = document.getElementById('crms-gallery');
  
  if (daviesGallery) daviesGallery.addEventListener('click', () => openGallery('davies'));
  if (posGallery) posGallery.addEventListener('click', () => openGallery('pos'));
  if (crmsGallery) crmsGallery.addEventListener('click', () => openGallery('crms'));
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('galleryModal');
    if (modal && modal.open) {
      if (e.key === 'ArrowLeft') previousImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') modal.close();
    }
  });
}

window.onload = function(){
  setTitleYear();
  themeSetter();
  setupThemeController();
  renderTechStack();
  setupGalleryListeners();
};