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

        this.init();
    }

    init() {
        this.setupThemeToggle();
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

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any modals or overlays if needed
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
    new ShoesApp();
});

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any animations or reduce activity
    } else {
        // Resume normal activity
    }
});