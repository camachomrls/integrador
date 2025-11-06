// Musicians data
const musicians = [
    {
        name: "Marimba Camacho",
        genre: "Marimba Versatil",
        rating: 4.9,
        reviewCount: 127,
        location: "Ocozocoautla de Espinosa, Chiapas",
        price: "$9,000",
        image: "https://images.unsplash.com/photo-1576109188032-aed32779c007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrJTIwYmFuZCUyMHBlcmZvcm1pbmclMjBzdGFnZXxlbnwxfHx8fDE3NTg3NDEwNTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        isAvailable: true,
        tags: ["Profesional", "Equipo incluido"]
    },
    {
        name: "Carlos Mendoza",
        genre: "Acústico",
        rating: 4.8,
        reviewCount: 89,
        location: "Guadalajara",
        price: "$8,500",
        image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWl0YXJpc3QlMjBhY291c3RpYyUyMHNvbG8lMjBtdXNpY2lhbnxlbnwxfHx8fDE3NTg3NDEwNTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        isAvailable: true,
        tags: ["Experiencia 5+ años", "Repertorio amplio"]
    },
    {
        name: "Mariachi Tradición",
        genre: "Mariachi",
        rating: 5.0,
        reviewCount: 156,
        location: "Jalisco",
        price: "$12,000",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJpYWNoaSUyMHRyYWRpdGlvbmFsJTIwbWV4aWNhbiUyMG11c2ljaWFuc3xlbnwxfHx8fDE3NTg3NDEwNTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        isAvailable: false,
        tags: ["Trajes incluidos", "Música tradicional"]
    },
    {
        name: "Sofia Jazz Ensemble",
        genre: "Jazz",
        rating: 4.7,
        reviewCount: 73,
        location: "Monterrey",
        price: "$18,000",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwc2F4b3Bob25pc3QlMjBwZXJmb3JtZXJ8ZW58MXx8fHwxNzU4NzQxMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        isAvailable: true,
        tags: ["Ensemble completo", "Jazz clásico"]
    },
    {
        name: "Elena Clásica",
        genre: "Clásica",
        rating: 4.9,
        reviewCount: 94,
        location: "Puebla",
        price: "$10,500",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljYWwlMjB2aW9saW4lMjBvcmNoZXN0cmElMjBtdXNpY2lhbnxlbnwxfHx8fDE3NTg3NDEwNTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        isAvailable: true,
        tags: ["Conservatorio", "Solista virtuosa"]
    },
    {
        name: "DJ Nexus",
        genre: "Electrónica",
        rating: 4.6,
        reviewCount: 112,
        location: "Cancún",
        price: "$20,000",
        image: "https://images.unsplash.com/photo-1629124985795-896afbb07d7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwZGolMjB0dXJudGFibGVzfGVufDF8fHx8MTc1ODc0MTA1NXww&ixlib=rb-4.1.0&q=80&w=1080",
        isAvailable: true,
        tags: ["Equipo profesional", "Luces incluidas"]
    }
];

// Function to create a musician card
function createMusicianCard(musician) {
    return `
        <div class="musician-card">
            <div class="card-image-container">
                <img src="${musician.image}" alt="${musician.name} - ${musician.genre} musician" class="card-image">
                ${musician.isAvailable ? '<div class="badge badge-available">Disponible</div>' : ''}
                <div class="badge badge-genre">
                    <i class="fas fa-music"></i>
                    ${musician.genre}
                </div>
                <div class="image-overlay"></div>
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h3 class="musician-name">${musician.name}</h3>
                    <div class="rating">
                        <i class="fas fa-star star"></i>
                        <span class="rating-number">${musician.rating}</span>
                        <span class="rating-count">(${musician.reviewCount})</span>
                    </div>
                </div>
                <div class="location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${musician.location}
                </div>
                <div class="price-container">
                    <span class="price">${musician.price}</span>
                    <span class="price-label">por evento</span>
                </div>
                <div class="tags">
                    ${musician.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

// Function to render musicians
function renderMusicians() {
    const grid = document.getElementById('musicians-grid');
    grid.innerHTML = musicians.map(musician => createMusicianCard(musician)).join('');
}

// Smooth scrolling for CTA button
function initSmoothScroll() {
    const ctaButton = document.querySelector('.btn-cta');
    const searchSection = document.querySelector('.search-section');
    
    ctaButton.addEventListener('click', () => {
        searchSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Add interactivity to musician cards
function initCardInteractions() {
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.musician-card');
        if (card) {
            // Add a subtle animation on click
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
            
            // Here you could add navigation to a detailed view
            console.log('Clicked on musician card');
        }
    });
}

// Search functionality
function initSearch() {
    const searchButton = document.querySelector('.btn-search');
    const genreSelect = document.querySelector('.search-select');
    const locationInput = document.querySelector('input[placeholder="Ciudad o región"]');
    const dateInput = document.querySelector('input[type="date"]');
    
    searchButton.addEventListener('click', () => {
        const genre = genreSelect.value;
        const location = locationInput.value;
        const date = dateInput.value;
        
        console.log('Search params:', { genre, location, date });
        
        // Show a simple search feedback
        searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Buscando...';
        
        setTimeout(() => {
            searchButton.innerHTML = '<i class="fas fa-search"></i> Buscar';
            // Here you would filter the musicians array and re-render
        }, 1500);
    });
}

// Filter tags functionality
function initFilterTags() {
    const filterTags = document.querySelectorAll('.filter-tag');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Toggle active state
            tag.classList.toggle('active');
            
            // Add visual feedback
            if (tag.classList.contains('active')) {
                tag.style.background = 'rgba(59, 130, 246, 0.3)';
                tag.style.color = 'var(--blue-400)';
            } else {
                tag.style.background = '';
                tag.style.color = '';
            }
            
            console.log('Filter applied:', tag.textContent);
        });
    });
}

// Load more functionality
function initLoadMore() {
    const loadMoreButton = document.querySelector('.btn-load-more');
    
    loadMoreButton.addEventListener('click', () => {
        loadMoreButton.innerHTML = 'Cargando...';
        
        // Simulate loading more musicians
        setTimeout(() => {
            loadMoreButton.innerHTML = 'Ver más músicos';
            // Here you would load more data and append to the grid
            console.log('Loading more musicians...');
        }, 1000);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle icon
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
}

// Add scroll effects
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroAccents = document.querySelectorAll('.hero-accent');
        
        // Parallax effect for hero accents
        heroAccents.forEach((accent, index) => {
            const speed = (index + 1) * 0.1;
            accent.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Navigation background opacity
        const nav = document.querySelector('.navigation');
        const opacity = Math.min(scrolled / 100, 1);
        nav.style.backgroundColor = `rgba(10, 10, 10, ${0.8 + opacity * 0.2})`;
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderMusicians();
    initSmoothScroll();
    initCardInteractions();
    initSearch();
    initFilterTags();
    initLoadMore();
    initMobileMenu();
    initScrollEffects();
    
    console.log('MusicMatch app initialized!');
});

// Add some CSS for mobile menu (dynamic styles)
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(12px);
            flex-direction: column;
            padding: 1rem;
            border-top: 1px solid var(--border);
        }
        
        .nav-links.active .nav-link {
            padding: 0.75rem;
            border-bottom: 1px solid rgba(38, 38, 38, 0.5);
        }
        
        .nav-links.active .nav-link:last-child {
            border-bottom: none;
        }
    }
`;
document.head.appendChild(style);