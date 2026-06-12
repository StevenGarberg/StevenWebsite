(function() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const focusCards = document.querySelectorAll('.focus-card');
    const subsidiaryCards = document.querySelectorAll('.subsidiary-card');

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // Mobile nav toggle
    const navSocial = document.querySelector('.nav-social');
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('open');
        if (window.innerWidth <= 640) {
            if (navLinks.classList.contains('open')) {
                navSocial.style.display = 'flex';
            } else {
                navSocial.style.display = '';
            }
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 640) {
            navSocial.style.display = '';
        }
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Intersection Observer for timeline items and focus cards
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
                    setTimeout(function() {
                        entry.target.classList.add('visible');
                    }, delay * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        timelineItems.forEach(function(item) {
            observer.observe(item);
        });

        focusCards.forEach(function(card) {
            observer.observe(card);
        });

        subsidiaryCards.forEach(function(card) {
            observer.observe(card);
        });
    } else {
        timelineItems.forEach(function(item) {
            item.classList.add('visible');
        });
        focusCards.forEach(function(card) {
            card.classList.add('visible');
        });
        subsidiaryCards.forEach(function(card) {
            card.classList.add('visible');
        });
    }

    // Show More / Show Less toggle for timeline highlights
    document.querySelectorAll('.show-more-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var highlights = this.previousElementSibling;
            if (highlights && highlights.classList.contains('timeline-highlights')) {
                var isCollapsed = highlights.classList.contains('collapsed');
                if (isCollapsed) {
                    highlights.classList.remove('collapsed');
                    this.textContent = 'Show Less';
                    this.setAttribute('aria-expanded', 'true');
                } else {
                    highlights.classList.add('collapsed');
                    this.textContent = 'Show More';
                    this.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Smooth scroll for anchor links (fallback for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var navHeight = navbar.offsetHeight;
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link highlighting
    var sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        var scrollPos = window.pageYOffset + 100;
        sections.forEach(function(section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = document.querySelector('.nav-links a[href="#' + id + '"]');
            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.style.color = '';
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            }
        });
    });
})();
