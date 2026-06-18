/* ==========================================================================
   LinkedIn Optimized Profile Interactive Logic (Genex Logistics Clone)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- State Variables ---
    let followerCount = 10240;
    let isFollowing = false;
    
    let post1Likes = 142;
    let post1Liked = false;
    
    let post2Likes = 89;
    let post2Liked = false;
    
    let currentSlide = 1;
    const totalSlides = 5;

    // --- DOM Elements ---
    const followerCountEl = document.getElementById('follower-count');
    const followBtn = document.getElementById('btn-follow-toggle');
    const followBtnText = document.getElementById('follow-btn-text');
    
    const post1LikeBtn = document.getElementById('btn-like-post1');
    const post1LikeCountEl = document.getElementById('post1-like-count');
    
    const post2LikeBtn = document.getElementById('btn-like-post2');
    const post2LikeCountEl = document.getElementById('post2-like-count');
    
    const dashFollowersEl = document.getElementById('dash-metric-followers');
    const dashLikesEl = document.getElementById('dash-metric-likes');
    const btnResetProto = document.getElementById('btn-reset-proto');

    // --- Tab Navigation Switcher ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const feedSection = document.querySelector('.feed-section');
    const homePanel = document.getElementById('panel-home');
    const postsPanelContainer = document.getElementById('dedicated-feed-container');

    window.switchTab = function(tabId) {
        // Remove active class from buttons & panels
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Find and activate requested tab
        const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        const activePanel = document.getElementById(`panel-${tabId}`);
        
        if (activeBtn && activePanel) {
            activeBtn.classList.add('active');
            activePanel.classList.add('active');
            
            // Dynamic node insertion: Move feed elements based on active panel
            if (tabId === 'posts') {
                if (postsPanelContainer && feedSection) {
                    postsPanelContainer.appendChild(feedSection);
                }
            } else if (tabId === 'home') {
                if (homePanel && feedSection) {
                    homePanel.appendChild(feedSection);
                }
            }
        }
        // Scroll to tab bar on smaller screens
        const profileCard = document.querySelector('.profile-card');
        if (window.innerWidth < 768 && profileCard) {
            window.scrollTo({
                top: profileCard.offsetTop + 180,
                behavior: 'smooth'
            });
        }
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetTab = e.currentTarget.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    // --- Follow / Unfollow Toggler ---
    function updateFollowersDisplay() {
        followerCountEl.textContent = followerCount.toLocaleString();
        if (dashFollowersEl) {
            dashFollowersEl.textContent = followerCount.toLocaleString();
        }
    }

    if (followBtn) {
        followBtn.addEventListener('click', () => {
            isFollowing = !isFollowing;
            if (isFollowing) {
                followerCount++;
                followBtn.classList.add('active');
                followBtn.style.backgroundColor = 'var(--li-blue-light)';
                followBtnText.innerHTML = '<i class="fa-solid fa-check"></i> Following';
            } else {
                followerCount--;
                followBtn.classList.remove('active');
                followBtn.style.backgroundColor = '#ffffff';
                followBtnText.innerHTML = '<i class="fa-solid fa-plus"></i> Follow';
            }
            updateFollowersDisplay();
        });
    }

    // --- Likes & Social Interactions ---
    function updateDashboardLikes() {
        if (dashLikesEl) {
            dashLikesEl.textContent = (post1Likes + post2Likes).toString();
        }
    }

    if (post1LikeBtn) {
        post1LikeBtn.addEventListener('click', () => {
            post1Liked = !post1Liked;
            if (post1Liked) {
                post1Likes++;
                post1LikeBtn.classList.add('active');
                post1LikeBtn.querySelector('span').textContent = 'Liked';
                post1LikeBtn.querySelector('i').className = 'fa-solid fa-thumbs-up';
            } else {
                post1Likes--;
                post1LikeBtn.classList.remove('active');
                post1LikeBtn.querySelector('span').textContent = 'Like';
                post1LikeBtn.querySelector('i').className = 'fa-regular fa-thumbs-up';
            }
            post1LikeCountEl.textContent = `${post1Likes} likes`;
            updateDashboardLikes();
        });
    }

    if (post2LikeBtn) {
        post2LikeBtn.addEventListener('click', () => {
            post2Liked = !post2Liked;
            if (post2Liked) {
                post2Likes++;
                post2LikeBtn.classList.add('active');
                post2LikeBtn.querySelector('span').textContent = 'Liked';
                post2LikeBtn.querySelector('i').className = 'fa-solid fa-thumbs-up';
            } else {
                post2Likes--;
                post2LikeBtn.classList.remove('active');
                post2LikeBtn.querySelector('span').textContent = 'Like';
                post2LikeBtn.querySelector('i').className = 'fa-regular fa-thumbs-up';
            }
            post2LikeCountEl.textContent = `${post2Likes} likes`;
            updateDashboardLikes();
        });
    }

    // --- Inline Comment Sections ---
    window.toggleComments = function(commentId) {
        const commentSection = document.getElementById(commentId);
        if (commentSection) {
            const isVisible = window.getComputedStyle(commentSection).display !== 'none';
            commentSection.style.display = isVisible ? 'none' : 'block';
        }
    };

    // Handle comment posting
    const commentInputs = document.querySelectorAll('.comment-input-wrapper');
    commentInputs.forEach(wrapper => {
        const input = wrapper.querySelector('.comment-input-field');
        const button = wrapper.querySelector('.btn-submit-comment');
        const list = wrapper.closest('.comments-section').querySelector('.comments-list');

        if (input && button) {
            button.addEventListener('click', () => {
                const text = input.value.trim();
                if (text && list) {
                    const newComment = document.createElement('div');
                    newComment.className = 'comment-item';
                    newComment.innerHTML = `
                        <div class="comment-avatar">ME</div>
                        <div class="comment-box">
                            <div class="comment-box-header">
                                <h5>You</h5>
                                <span class="comment-title">B2B Logistics Evaluator</span>
                            </div>
                            <p class="comment-text">${text}</p>
                        </div>
                    `;
                    list.appendChild(newComment);
                    input.value = '';
                }
            });
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    button.click();
                }
            });
        }
    });

    // --- Interactive Case Study PDF Carousel ---
    const carouselContainer = document.getElementById('case-study-carousel');
    if (carouselContainer) {
        const slides = carouselContainer.querySelectorAll('.carousel-slide');
        const prevBtn = carouselContainer.querySelector('.prev-btn');
        const nextBtn = carouselContainer.querySelector('.next-btn');
        const indicatorDots = carouselContainer.querySelectorAll('.indicator');

        function goToSlide(slideIndex) {
            if (slideIndex < 1 || slideIndex > totalSlides) return;
            currentSlide = slideIndex;

            // Update slide visibility
            slides.forEach(slide => {
                slide.classList.remove('active');
                if (parseInt(slide.getAttribute('data-slide')) === currentSlide) {
                    slide.classList.add('active');
                }
            });

            // Update indicator dots
            indicatorDots.forEach(dot => {
                dot.classList.remove('active');
                if (parseInt(dot.getAttribute('data-go')) === currentSlide) {
                    dot.classList.add('active');
                }
            });

            // Enable/Disable control buttons
            prevBtn.disabled = currentSlide === 1;
            nextBtn.innerHTML = currentSlide === totalSlides ? 
                'Finish <i class="fa-solid fa-check"></i>' : 
                'Next <i class="fa-solid fa-chevron-right"></i>';
        }

        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });

        nextBtn.addEventListener('click', () => {
            if (currentSlide < totalSlides) {
                goToSlide(currentSlide + 1);
            } else {
                // Clicking Next on the final slide opens the quote modal prefilled
                openQuoteModal('3PL Warehousing');
            }
        });

        indicatorDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const targetIndex = parseInt(e.currentTarget.getAttribute('data-go'));
                goToSlide(targetIndex);
            });
        });
    }

    // --- B2B Lead Generation Quote Modal Control ---
    const quoteModal = document.getElementById('quote-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const successCloseBtn = document.getElementById('btn-success-close');
    
    const quoteForm = document.getElementById('quote-lead-form');
    const successPanel = document.getElementById('form-success-panel');
    const prefillSelect = document.getElementById('contact-service');
    const successEmailEl = document.getElementById('success-email-display');

    window.openQuoteModal = function(prefillValue = '') {
        if (quoteModal) {
            quoteModal.classList.add('active');
            
            // Prefill standard form select
            if (prefillValue && prefillSelect) {
                prefillSelect.value = prefillValue;
            }
            
            // Lock body scroll under modal
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeQuoteModal = function() {
        if (quoteModal) {
            quoteModal.classList.remove('active');
            
            // Unlock body scroll
            document.body.style.overflow = '';
            
            // Reset form panel state after animations fade out
            setTimeout(() => {
                if (quoteForm && successPanel) {
                    quoteForm.style.display = 'block';
                    successPanel.style.display = 'none';
                    quoteForm.reset();
                }
            }, 300);
        }
    };

    // Trigger buttons
    const triggerContactUs = document.getElementById('cta-contact-us');
    const triggerFreeAudit = document.getElementById('cta-free-audit');
    const triggerSidebarQuote = document.getElementById('btn-sidebar-quote');

    if (triggerContactUs) triggerContactUs.addEventListener('click', () => openQuoteModal());
    if (triggerFreeAudit) triggerFreeAudit.addEventListener('click', () => openQuoteModal('3PL Warehousing'));
    if (triggerSidebarQuote) triggerSidebarQuote.addEventListener('click', () => openQuoteModal('3PL Warehousing'));

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeQuoteModal);
    if (successCloseBtn) successCloseBtn.addEventListener('click', closeQuoteModal);

    // Close on overlay click
    if (quoteModal) {
        quoteModal.addEventListener('click', (e) => {
            if (e.target === quoteModal) {
                closeQuoteModal();
            }
        });
    }

    // Lead Form Submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = quoteForm.querySelector('.btn-submit-lead-form');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting Request...';
            submitBtn.disabled = true;

            const userEmail = document.getElementById('contact-email').value;

            // Simulate server delivery latency
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Switch panel views
                quoteForm.style.display = 'none';
                if (successEmailEl) successEmailEl.textContent = userEmail;
                if (successPanel) successPanel.style.display = 'flex';
                
                // Track lead capture internally
                console.log(`B2B Lead Captured successfully for: ${userEmail}`);
            }, 1000);
        });
    }

    // --- Prototype State Resetter ---
    if (btnResetProto) {
        btnResetProto.addEventListener('click', () => {
            // Reset Follows
            isFollowing = false;
            followerCount = 10240;
            if (followBtn) {
                followBtn.classList.remove('active');
                followBtn.style.backgroundColor = '#ffffff';
                followBtnText.innerHTML = '<i class="fa-solid fa-plus"></i> Follow';
            }
            updateFollowersDisplay();

            // Reset Likes
            post1Liked = false;
            post1Likes = 142;
            if (post1LikeBtn) {
                post1LikeBtn.classList.remove('active');
                post1LikeBtn.querySelector('span').textContent = 'Like';
                post1LikeBtn.querySelector('i').className = 'fa-regular fa-thumbs-up';
            }
            post1LikeCountEl.textContent = `${post1Likes} likes`;

            post2Liked = false;
            post2Likes = 89;
            if (post2LikeBtn) {
                post2LikeBtn.classList.remove('active');
                post2LikeBtn.querySelector('span').textContent = 'Like';
                post2LikeBtn.querySelector('i').className = 'fa-regular fa-thumbs-up';
            }
            post2LikeCountEl.textContent = `${post2Likes} likes`;
            
            updateDashboardLikes();

            // Reset Slide deck
            if (carouselContainer) {
                goToSlide(1);
            }

            // Close comments
            const commentsList = document.querySelectorAll('.comments-section');
            commentsList.forEach(sec => sec.style.display = 'none');
            
            // Go back to Home tab
            switchTab('home');

            // Feedback button styling
            const origText = btnResetProto.innerHTML;
            btnResetProto.innerHTML = '<i class="fa-solid fa-circle-check"></i> Prototype Reset Done!';
            btnResetProto.style.color = '#047857';
            setTimeout(() => {
                btnResetProto.innerHTML = origText;
                btnResetProto.style.color = '';
            }, 1500);
        });
    }

    // Initialize Dashboard
    updateFollowersDisplay();
    updateDashboardLikes();
});
