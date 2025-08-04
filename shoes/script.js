class ShoesApp {
    constructor() {
        this.products = [
            {
                id: 1,
                name: "5PS Sapphire Blue",
                url: "https://www.aliveshoes.com/5ps-sapphire-blue",
                image: "sapphire-blue.png",
                tag: "Bestseller"
            },
            {
                id: 2,
                name: "5PS Black and Yellow",
                url: "https://www.aliveshoes.com/5ps-black-and-yellow-1",
                image: "black-yellow.png",
                tag: "New"
            },
            {
                id: 3,
                name: "5PS Classic",
                url: "https://www.aliveshoes.com/5ps",
                image: "classic.png",
                tag: "Popular"
            },
            {
                id: 4,
                name: "5PS CasualFly",
                url: "https://www.aliveshoes.com/5ps---casualfly",
                image: "casualfly.png",
                tag: "Comfort"
            },
            {
                id: 5,
                name: "5PS Slide Bag",
                url: "https://www.aliveshoes.com/5ps-slide-bag",
                image: "slide-bag.png",
                tag: "Slide Bag"
            },
            {
                id: 6,
                name: "5PS Pumpkin Spice",
                url: "https://www.aliveshoes.com/5ps-pumpkin-spice",
                image: "pumpkin-spice.png",
                tag: "Seasonal"
            }
        ];

        this.heroImages = [
            'sapphire-blue.png',
            'black-yellow.png', 
            'classic.png'
        ];
        this.currentSlide = 0;
        this.slideInterval = null;

        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupHeroSlider();
        this.loadProducts();
        this.setupKeyboardNavigation();
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('.theme-icon');
        
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        this.setTheme(theme, themeIcon);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme, themeIcon);
            localStorage.setItem('theme', newTheme);
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light', themeIcon);
            }
        });
    }

    setTheme(theme, themeIcon) {
        document.documentElement.setAttribute('data-theme', theme);
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    setupHeroSlider() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        
        // Set initial active states
        if (slides.length > 0) {
            slides[0].classList.add('active');
            dots[0].classList.add('active');
        }

        // Add click listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.setSlide(index);
            });
        });

        // Start automatic slideshow
        this.startSlideshow();

        // Pause slideshow on hover
        const heroSection = document.getElementById('heroSection');
        heroSection.addEventListener('mouseenter', () => {
            this.stopSlideshow();
        });

        heroSection.addEventListener('mouseleave', () => {
            this.startSlideshow();
        });
    }

    setSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (slides[index] && dots[index]) {
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }
        
        this.currentSlide = index;
    }

    nextSlide() {
        const slides = document.querySelectorAll('.slide');
        this.currentSlide = (this.currentSlide + 1) % slides.length;
        this.setSlide(this.currentSlide);
    }

    startSlideshow() {
        this.stopSlideshow(); // Clear any existing interval
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopSlideshow() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any modals or overlays if needed
            }
            // Add arrow key navigation for slides
            if (e.key === 'ArrowLeft') {
                const slides = document.querySelectorAll('.slide');
                this.currentSlide = (this.currentSlide - 1 + slides.length) % slides.length;
                this.setSlide(this.currentSlide);
                this.stopSlideshow();
                setTimeout(() => this.startSlideshow(), 3000); // Restart after 3 seconds
            }
            if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.stopSlideshow();
                setTimeout(() => this.startSlideshow(), 3000); // Restart after 3 seconds
            }
        });
    }

    async loadProducts() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        const productsGrid = document.getElementById('productsGrid');

        try {
            // Simulate loading delay for better UX
            await this.delay(1000);

            // Create product cards
            const productCards = this.products.map(product => this.createProductCard(product));
            
            // Add cards to grid
            productsGrid.innerHTML = productCards.join('');
            
            // Hide loading overlay
            loadingOverlay.classList.add('hidden');
            
            // Show products with animation
            setTimeout(() => {
                productsGrid.classList.add('loaded');
            }, 100);

            // Setup product card interactions
            this.setupProductInteractions();

        } catch (error) {
            console.error('Error loading products:', error);
            this.showError();
        }
    }

    createProductCard(product) {
        return `
            <article class="product-card" data-product-id="${product.id}">
                <div class="product-image-container">
                    <img 
                        src="${product.image}" 
                        alt="${product.name}"
                        class="product-image"
                        loading="lazy"
                        onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iI2Y4ZmFmYyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iSW50ZXIsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NDc0OGIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TaG9lIEltYWdlPC90ZXh0Pjwvc3ZnPg=='"
                    >
                    <span class="product-tag">${product.tag}</span>
                </div>
                <div class="product-info">
                    <h2 class="product-name">${product.name}</h2>
                    <a 
                        href="${product.url}" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="product-button"
                        aria-label="View ${product.name} product page"
                    >
                        View Product
                    </a>
                </div>
            </article>
        `;
    }

    setupProductInteractions() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const button = card.querySelector('.product-button');
            const image = card.querySelector('.product-image');

            // Track clicks for analytics (if needed)
            button.addEventListener('click', (e) => {
                const productId = card.getAttribute('data-product-id');
                this.trackProductClick(productId);
            });

            // Preload image on hover for better UX
            card.addEventListener('mouseenter', () => {
                if (image.src.includes('data:image/svg+xml')) {
                    // Try to load actual image if placeholder is shown
                    const product = this.products.find(p => p.id == card.getAttribute('data-product-id'));
                    if (product) {
                        image.src = product.image;
                    }
                }
            });
        });

        // Setup search functionality
        this.setupSearch();
    }

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        
        if (!searchInput || !searchButton) return;

        const performSearch = () => {
            const query = searchInput.value.trim().toLowerCase();
            
            if (!query) {
                this.showAllProducts();
                return;
            }

            const filteredProducts = this.products.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.tag.toLowerCase().includes(query)
            );

            this.displayFilteredProducts(filteredProducts, query);
        };

        // Search on button click
        searchButton.addEventListener('click', performSearch);

        // Search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Real-time search (optional - debounced)
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (searchInput.value.trim().length >= 2) {
                    performSearch();
                } else if (searchInput.value.trim().length === 0) {
                    this.showAllProducts();
                }
            }, 300);
        });
    }

    displayFilteredProducts(filteredProducts, query) {
        const productsGrid = document.getElementById('productsGrid');
        
        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <h3 style="color: var(--text-secondary); margin-bottom: 1rem;">No products found</h3>
                    <p style="color: var(--text-secondary);">No products match your search for "${query}"</p>
                    <button onclick="window.shoesApp.showAllProducts()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: var(--border-radius-sm); cursor: pointer;">Show All Products</button>
                </div>
            `;
        } else {
            const productCards = filteredProducts.map(product => this.createProductCard(product));
            productsGrid.innerHTML = productCards.join('');
            this.setupProductInteractions();
        }
    }

    showAllProducts() {
        const productsGrid = document.getElementById('productsGrid');
        const searchInput = document.getElementById('searchInput');
        
        if (searchInput) {
            searchInput.value = '';
        }
        
        const productCards = this.products.map(product => this.createProductCard(product));
        productsGrid.innerHTML = productCards.join('');
        this.setupProductInteractions();
    }

    trackProductClick(productId) {
        // Analytics tracking can be implemented here
        console.log(`Product ${productId} clicked`);
        
        // Example: Send to analytics service
        // gtag('event', 'product_click', { product_id: productId });
    }

    showError() {
        const productsGrid = document.getElementById('productsGrid');
        const loadingOverlay = document.getElementById('loadingOverlay');
        
        loadingOverlay.classList.add('hidden');
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <h3 style="color: var(--text-secondary); margin-bottom: 1rem;">Unable to load products</h3>
                <p style="color: var(--text-secondary);">Please try refreshing the page.</p>
            </div>
        `;
        productsGrid.classList.add('loaded');
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.shoesApp = new ShoesApp();
});

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause slideshow when page is hidden
        const app = window.shoesApp;
        if (app && app.stopSlideshow) {
            app.stopSlideshow();
        }
    } else {
        // Resume slideshow when page becomes visible
        const app = window.shoesApp;
        if (app && app.startSlideshow) {
            app.startSlideshow();
        }
    }
});