// InfraHub Pro - Application Logic
// Comprehensive learning platform with quiz, flashcards, progress tracking, and more

(function() {
    'use strict';

    // ==================== State ====================
    let currentSection = 'dashboard';
    let currentSubtopic = null;
    let currentTopicId = null;
    let bookmarks = JSON.parse(localStorage.getItem('infrahub_bookmarks') || '[]');
    let notes = JSON.parse(localStorage.getItem('infrahub_notes') || '[]');
    let learned = JSON.parse(localStorage.getItem('infrahub_learned') || '[]');
    let xp = parseInt(localStorage.getItem('infrahub_xp') || '0');
    let streak = parseInt(localStorage.getItem('infrahub_streak') || '0');
    let lastStudyDate = localStorage.getItem('infrahub_last_study') || null;
    let activities = JSON.parse(localStorage.getItem('infrahub_activities') || '[]');
    let quizState = { current: 0, score: 0, answers: [] };
    let flashcardState = { current: 0, flipped: false };
    let timerState = { time: 25 * 60, running: false, interval: null };
    
    // User profile
    let userProfile = JSON.parse(localStorage.getItem('infrahub_profile') || JSON.stringify({
        name: "Learner",
        title: "Aspiring DevOps Engineer",
        skills: {
            networking: 0,
            cloud: 0,
            linux: 0,
            containers: 0,
            devops: 0,
            security: 0,
            monitoring: 0,
            automation: 0
        }
    }));

    // ==================== DOM Elements ====================
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const navMenu = document.getElementById('nav-menu');
    const searchInput = document.getElementById('search-input');
    const searchModal = document.getElementById('search-modal');
    const searchModalInput = document.getElementById('search-modal-input');
    const searchResults = document.getElementById('search-results');
    const topicModal = document.getElementById('topic-modal');
    const topicModalTitle = document.getElementById('topic-modal-title');
    const topicModalBody = document.getElementById('topic-modal-body');
    const topicCategory = document.getElementById('topic-category');
    const bookmarkBtn = document.getElementById('bookmark-btn');
    const markLearnedBtn = document.getElementById('mark-learned-btn');
    const closeTopicModal = document.getElementById('close-topic-modal');
    const prevTopicBtn = document.getElementById('prev-topic-btn');
    const nextTopicBtn = document.getElementById('next-topic-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const breadcrumbText = document.getElementById('breadcrumb-text');
    const contentArea = document.getElementById('content-area');
    const currentTimeEl = document.getElementById('current-time');
    const cheatsheetGrid = document.getElementById('cheatsheet-grid');
    const welcomeStats = document.getElementById('welcome-stats');
    const activityList = document.getElementById('activity-list');
    const xpBadge = document.getElementById('xp-count');
    const streakCount = document.getElementById('streak-count');
    const bookmarkBadge = document.getElementById('bookmark-badge');
    const lpBadge = document.getElementById('lp-badge');
    const timerModal = document.getElementById('timer-modal');
    const studyTimerBtn = document.getElementById('study-timer-btn');
    const closeTimer = document.getElementById('close-timer');
    const timerText = document.getElementById('timer-text');
    const timerProgress = document.getElementById('timer-progress');
    const timerToggle = document.getElementById('timer-toggle');
    const timerReset = document.getElementById('timer-reset');
    const loadingOverlay = document.getElementById('loading-overlay');

    // ==================== Initialization ====================
    function init() {
        // Simulate loading
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 800);

        updateStreak();
        renderCheatsheets();
        renderQuickStats();
        renderActivities();
        updateXPBadge();
        updateBookmarkBadge();
        updateProgressBars();
        setupNavigation();
        setupSearch();
        setupTheme();
        setupClock();
        setupDashboardCards();
        setupSidebar();
        setupKeyboardShortcuts();
        setupTimer();
        setupTopicModal();
        setupScrollTop();
        updateGreeting();

        // Handle hash navigation
        if (window.location.hash) {
            const section = window.location.hash.slice(1);
            if (document.getElementById('section-' + section)) {
                navigateTo(section);
            }
        }
    }

    // ==================== Navigation ====================
    function setupNavigation() {
        // Handle submenu toggles
        document.querySelectorAll('.nav-item[data-toggle]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const toggleId = item.dataset.toggle;
                const submenu = document.getElementById(`submenu-${toggleId}`);
                if (submenu) {
                    submenu.classList.toggle('active');
                    item.classList.toggle('active');
                }
            });
        });

        // Handle section navigation
        document.querySelectorAll('.nav-item[data-section]').forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                navigateTo(section);
            });
        });
    }

    function navigateTo(section) {
        currentSection = section;
        currentSubtopic = null;

        // Update nav active state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.section === section);
        });

        // Update breadcrumb
        const sectionNames = {
            dashboard: 'Dashboard',
            'learning-path': 'Learning Path',
            networking: 'Networking',
            cloud: 'Cloud Platform',
            linux: 'Linux & OS',
            containers: 'Containers & K8s',
            devops: 'DevOps & CI/CD',
            security: 'Security',
            monitoring: 'Monitoring & SRE',
            automation: 'IaC & Automation',
            quiz: 'Quiz & Tests',
            flashcards: 'Flashcards',
            lab: 'Hands-on Labs',
            profile: 'My Profile',
            bookmarks: 'Bookmarks',
            notes: 'Study Notes',
            interview: 'Interview Prep',
            career: 'Career Track',
            projects: 'Hands-on Labs',
            community: 'Community',
            tools: 'Tools',
            analytics: 'Analytics',
            companies: 'Companies',
            reviews: 'Reviews & Tips',
            resources: 'Resources',
            snippets: 'Code Snippets'
        };
        breadcrumbText.textContent = sectionNames[section] || section;

        // Hide all sections
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

        // Show target section
        const targetSection = document.getElementById('section-' + section);
        if (targetSection) {
            // Render section content
            if (KNOWLEDGE_BASE[section]) {
                renderKnowledgeSection(section, targetSection);
            } else if (section === 'bookmarks') {
                renderBookmarks(targetSection);
            } else if (section === 'notes') {
                renderNotes(targetSection);
            } else if (section === 'quiz') {
                renderQuiz(targetSection);
            } else if (section === 'flashcards') {
                renderFlashcards(targetSection);
            } else if (section === 'profile') {
                renderProfile(targetSection);
            } else if (section === 'learning-path') {
                renderLearningPath(targetSection);
            } else if (section === 'interview') {
                renderInterview(targetSection);
            } else if (section === 'tools') {
                renderTools(targetSection);
            } else if (section === 'career') {
                renderCareer(targetSection);
            } else if (section === 'projects') {
                renderProjects(targetSection);
            } else if (section === 'community') {
                renderCommunity(targetSection);
            } else if (section === 'analytics') {
                renderAnalytics(targetSection);
            } else if (section === 'companies') {
                renderCompanies(targetSection);
            } else if (section === 'reviews') {
                renderReviews(targetSection);
            } else if (section === 'resources') {
                renderResources(targetSection);
            } else if (section === 'snippets') {
                renderSnippets(targetSection);
            } else if (section === 'lab') {
                renderLabs(targetSection);
            }
            targetSection.classList.add('active');
        }

        // Update URL hash
        window.location.hash = section;

        // Close sidebar on mobile
        sidebar.classList.remove('open');
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    // ==================== Dashboard ====================
    function renderCheatsheets() {
        if (!cheatsheetGrid) return;
        cheatsheetGrid.innerHTML = CHEATSHEETS.map(cs => `
            <div class="cheatsheet-card">
                <h4>${cs.title}</h4>
                <code>${escapeHtml(cs.commands)}</code>
            </div>
        `).join('');
    }

    function renderQuickStats() {
        if (!welcomeStats) return;
        
        let totalTopics = 0;
        let totalSections = Object.keys(KNOWLEDGE_BASE).length;
        for (const section of Object.values(KNOWLEDGE_BASE)) {
            for (const topics of Object.values(section.subtopics)) {
                totalTopics += topics.length;
            }
        }

        welcomeStats.innerHTML = `
            <div class="stat-item">
                <div class="stat-icon-sm" style="background: var(--success-bg); color: var(--success);">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <div class="stat-details">
                    <div class="stat-value">${learned.length}</div>
                    <div class="stat-label">Topics Learned</div>
                </div>
            </div>
            <div class="stat-item">
                <div class="stat-icon-sm" style="background: var(--info-bg); color: var(--info);">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div class="stat-details">
                    <div class="stat-value">${totalTopics}</div>
                    <div class="stat-label">Total Topics</div>
                </div>
            </div>
            <div class="stat-item">
                <div class="stat-icon-sm" style="background: var(--warning-bg); color: var(--warning);">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <div class="stat-details">
                    <div class="stat-value">${bookmarks.length}</div>
                    <div class="stat-label">Bookmarks</div>
                </div>
            </div>
            <div class="stat-item">
                <div class="stat-icon-sm" style="background: var(--accent-bg); color: var(--accent);">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                </div>
                <div class="stat-details">
                    <div class="stat-value">${calculateOverallProgress()}%</div>
                    <div class="stat-label">Complete</div>
                </div>
            </div>
        `;
    }

    function renderActivities() {
        if (!activityList) return;
        
        if (activities.length === 0) {
            activityList.innerHTML = '<div class="activity-empty">Start learning to see your activity here!</div>';
            return;
        }

        activityList.innerHTML = activities.slice(0, 5).map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    ${getActivityIcon(activity.type)}
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-time">${formatTimeAgo(activity.date)}</div>
                </div>
            </div>
        `).join('');
    }

    function getActivityIcon(type) {
        const icons = {
            learned: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
            bookmarked: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
            note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
            quiz: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
            flashcard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg>'
        };
        return icons[type] || icons.learned;
    }

    function addActivity(type, title) {
        activities.unshift({
            type,
            title,
            date: new Date().toISOString()
        });
        // Keep only last 50 activities
        activities = activities.slice(0, 50);
        localStorage.setItem('infrahub_activities', JSON.stringify(activities));
        renderActivities();
    }

    function setupDashboardCards() {
        document.querySelectorAll('.stat-card[data-navigate], .btn[data-navigate]').forEach(card => {
            card.addEventListener('click', () => {
                navigateTo(card.dataset.navigate);
            });
        });
    }

    function updateGreeting() {
        const greeting = document.getElementById('welcome-greeting');
        if (!greeting) return;
        
        const hour = new Date().getHours();
        let text = 'Welcome back!';
        if (hour < 12) text = 'Good morning!';
        else if (hour < 18) text = 'Good afternoon!';
        else text = 'Good evening!';
        
        greeting.textContent = text;
    }

    function updateProgressBars() {
        Object.keys(KNOWLEDGE_BASE).forEach(key => {
            const bar = document.getElementById('progress-' + key);
            if (bar) {
                const progress = calculateSectionProgress(key);
                bar.style.width = progress + '%';
            }
        });
        
        const overall = calculateOverallProgress();
        if (lpBadge) {
            lpBadge.textContent = overall + '%';
        }
    }

    function calculateSectionProgress(sectionKey) {
        const section = KNOWLEDGE_BASE[sectionKey];
        if (!section) return 0;
        
        let totalTopics = 0;
        let learnedTopics = 0;
        
        for (const topics of Object.values(section.subtopics)) {
            totalTopics += topics.length;
            topics.forEach(topic => {
                if (learned.includes(topic.id)) learnedTopics++;
            });
        }
        
        return totalTopics > 0 ? Math.round((learnedTopics / totalTopics) * 100) : 0;
    }

    function calculateOverallProgress() {
        let totalTopics = 0;
        let learnedTopics = learned.length;
        
        for (const section of Object.values(KNOWLEDGE_BASE)) {
            for (const topics of Object.values(section.subtopics)) {
                totalTopics += topics.length;
            }
        }
        
        return totalTopics > 0 ? Math.round((learnedTopics / totalTopics) * 100) : 0;
    }

    // ==================== Render Knowledge Section ====================
    function renderKnowledgeSection(sectionKey, container) {
        const data = KNOWLEDGE_BASE[sectionKey];
        if (!data) return;
        
        const subtopicKeys = Object.keys(data.subtopics);
        const activeSubtopic = currentSubtopic || subtopicKeys[0];

        let html = `
            <div class="section-header">
                <h1>${data.title}</h1>
                <p>${data.description}</p>
            </div>
            <div class="topic-tabs">
                ${subtopicKeys.map(key => `
                    <button class="topic-tab ${key === activeSubtopic ? 'active' : ''}" data-subtopic="${key}">${key}</button>
                `).join('')}
            </div>
            <div class="topics-grid" id="topics-grid-${sectionKey}">
        `;

        const topics = data.subtopics[activeSubtopic] || [];
        topics.forEach(topic => {
            const isBookmarked = bookmarks.includes(topic.id);
            const isLearned = learned.includes(topic.id);
            html += `
                <div class="topic-card ${isLearned ? 'learned' : ''}" data-topic-id="${topic.id}" data-section="${sectionKey}" data-subtopic="${activeSubtopic}">
                    ${isBookmarked ? '<span class="bookmark-indicator">&#9733;</span>' : ''}
                    ${isLearned ? '<span class="bookmark-indicator" style="right: 40px; background: var(--success);">&#10003;</span>' : ''}
                    <div class="topic-card-header">
                        <h3>${topic.title}</h3>
                    </div>
                    <p>${topic.summary}</p>
                    <div class="topic-tags">
                        ${topic.tags.map(tag => `<span class="topic-tag ${tag}">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;

        // Setup tab clicks
        container.querySelectorAll('.topic-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                currentSubtopic = tab.dataset.subtopic;
                renderKnowledgeSection(sectionKey, container);
            });
        });

        // Setup topic card clicks
        container.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', () => {
                openTopicModal(card.dataset.topicId, card.dataset.section, card.dataset.subtopic);
            });
        });
    }

    // ==================== Topic Modal ====================
    function setupTopicModal() {
        closeTopicModal.addEventListener('click', closeTopicModalFn);
        topicModal.addEventListener('click', (e) => {
            if (e.target === topicModal) closeTopicModalFn();
        });

        bookmarkBtn.addEventListener('click', toggleBookmark);
        markLearnedBtn.addEventListener('click', toggleLearned);
        
        prevTopicBtn.addEventListener('click', navigateToPrevTopic);
        nextTopicBtn.addEventListener('click', navigateToNextTopic);
    }

    function openTopicModal(topicId, sectionKey, subtopicKey) {
        const data = KNOWLEDGE_BASE[sectionKey];
        if (!data) return;

        let topic = null;
        let foundSubtopic = subtopicKey;
        
        for (const key of Object.keys(data.subtopics)) {
            const found = data.subtopics[key].find(t => t.id === topicId);
            if (found) { 
                topic = found; 
                foundSubtopic = key;
                break; 
            }
        }
        if (!topic) return;

        currentTopicId = topicId;
        topicCategory.textContent = `${data.title} / ${foundSubtopic}`;
        topicModalTitle.textContent = topic.title;
        topicModalBody.innerHTML = topic.content;

        // Update buttons
        updateBookmarkButton();
        updateLearnedButton();

        // Add copy buttons to code blocks
        topicModalBody.querySelectorAll('pre').forEach(pre => {
            const code = pre.querySelector('code');
            if (code) {
                const wrapper = document.createElement('div');
                wrapper.className = 'code-block';
                pre.parentNode.insertBefore(wrapper, pre);
                
                const header = document.createElement('div');
                header.className = 'code-header';
                header.innerHTML = `
                    <span class="code-lang">${code.className || 'code'}</span>
                    <button class="code-copy" onclick="copyCode(this)">Copy</button>
                `;
                
                wrapper.appendChild(header);
                wrapper.appendChild(pre);
            }
        });

        topicModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Award XP for viewing topic
        awardXP(5);
    }

    function closeTopicModalFn() {
        topicModal.classList.remove('active');
        document.body.style.overflow = '';
        currentTopicId = null;
    }

    function toggleBookmark() {
        if (!currentTopicId) return;
        const idx = bookmarks.indexOf(currentTopicId);
        if (idx > -1) {
            bookmarks.splice(idx, 1);
            showToast('Bookmark removed', 'info');
        } else {
            bookmarks.push(currentTopicId);
            showToast('Topic bookmarked!', 'success');
            addActivity('bookmarked', 'Bookmarked a topic');
            awardXP(2);
        }
        localStorage.setItem('infrahub_bookmarks', JSON.stringify(bookmarks));
        updateBookmarkButton();
        updateBookmarkBadge();
    }

    function toggleLearned() {
        if (!currentTopicId) return;
        const idx = learned.indexOf(currentTopicId);
        if (idx > -1) {
            learned.splice(idx, 1);
            showToast('Marked as not learned', 'info');
        } else {
            learned.push(currentTopicId);
            showToast('Great job! Topic marked as learned!', 'success');
            addActivity('learned', 'Completed a topic');
            awardXP(20);
            
            // Update skill progress
            const topic = findTopicById(currentTopicId);
            if (topic) {
                updateSkillProgress(topic.sectionKey);
            }
        }
        localStorage.setItem('infrahub_learned', JSON.stringify(learned));
        updateLearnedButton();
        updateProgressBars();
    }

    function updateBookmarkButton() {
        const isBookmarked = bookmarks.includes(currentTopicId);
        bookmarkBtn.classList.toggle('bookmarked', isBookmarked);
        bookmarkBtn.querySelector('svg').setAttribute('fill', isBookmarked ? 'currentColor' : 'none');
    }

    function updateLearnedButton() {
        const isLearned = learned.includes(currentTopicId);
        markLearnedBtn.classList.toggle('learned', isLearned);
        markLearnedBtn.querySelector('svg').setAttribute('fill', isLearned ? 'currentColor' : 'none');
    }

    function navigateToPrevTopic() {
        const topics = getAllTopicsInOrder();
        const currentIndex = topics.findIndex(t => t.id === currentTopicId);
        if (currentIndex > 0) {
            const prev = topics[currentIndex - 1];
            openTopicModal(prev.id, prev.sectionKey, prev.subtopicKey);
        }
    }

    function navigateToNextTopic() {
        const topics = getAllTopicsInOrder();
        const currentIndex = topics.findIndex(t => t.id === currentTopicId);
        if (currentIndex < topics.length - 1) {
            const next = topics[currentIndex + 1];
            openTopicModal(next.id, next.sectionKey, next.subtopicKey);
        }
    }

    function getAllTopicsInOrder() {
        const topics = [];
        for (const [sectionKey, section] of Object.entries(KNOWLEDGE_BASE)) {
            for (const [subtopicKey, subtopicTopics] of Object.entries(section.subtopics)) {
                for (const topic of subtopicTopics) {
                    topics.push({ ...topic, sectionKey, subtopicKey });
                }
            }
        }
        return topics;
    }

    // ==================== Bookmarks ====================
    function renderBookmarks(container) {
        if (bookmarks.length === 0) {
            container.innerHTML = `
                <div class="section-header">
                    <h1>Bookmarks</h1>
                    <p>Your saved topics for quick access</p>
                </div>
                <div class="bookmarks-empty">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                    <h3>No bookmarks yet</h3>
                    <p>Click the bookmark icon when viewing a topic to save it here.</p>
                </div>
            `;
            return;
        }

        let html = `
            <div class="section-header">
                <h1>Bookmarks</h1>
                <p>${bookmarks.length} saved topics</p>
            </div>
            <div class="topics-grid">
        `;

        bookmarks.forEach(topicId => {
            const result = findTopicById(topicId);
            if (result) {
                html += `
                    <div class="topic-card ${learned.includes(topicId) ? 'learned' : ''}" data-topic-id="${result.topic.id}" data-section="${result.sectionKey}" data-subtopic="${result.subtopicKey}">
                        <span class="bookmark-indicator">&#9733;</span>
                        ${learned.includes(topicId) ? '<span class="bookmark-indicator" style="right: 40px; background: var(--success);">&#10003;</span>' : ''}
                        <div class="topic-card-header">
                            <h3>${result.topic.title}</h3>
                        </div>
                        <p>${result.topic.summary}</p>
                        <div class="topic-tags">
                            <span class="topic-tag">${result.sectionKey}</span>
                            ${result.topic.tags.map(tag => `<span class="topic-tag ${tag}">${tag}</span>`).join('')}
                        </div>
                    </div>
                `;
            }
        });

        html += '</div>';
        container.innerHTML = html;

        container.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', () => {
                openTopicModal(card.dataset.topicId, card.dataset.section, card.dataset.subtopic);
            });
        });
    }

    function updateBookmarkBadge() {
        if (bookmarkBadge) {
            bookmarkBadge.textContent = bookmarks.length;
            bookmarkBadge.style.display = bookmarks.length > 0 ? 'block' : 'none';
        }
    }

    // ==================== Notes ====================
    function renderNotes(container) {
        let html = `
            <div class="section-header">
                <h1>Study Notes</h1>
                <p>Personal notes and quick references</p>
            </div>
            <div class="notes-container">
                <div class="note-editor">
                    <textarea id="note-input" placeholder="Write a note... (tips: use this for quick references, reminders, or study notes)"></textarea>
                    <button class="btn btn-primary" id="save-note-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                        Save Note
                    </button>
                </div>
        `;

        if (notes.length === 0) {
            html += `
                <div class="notes-empty">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <h3>No notes yet</h3>
                    <p>Start writing notes to keep track of your learning!</p>
                </div>
            `;
        } else {
            notes.forEach((note, index) => {
                html += `
                    <div class="note-item">
                        <button class="note-delete" data-index="${index}" title="Delete note">&times;</button>
                        <div class="note-date">${new Date(note.date).toLocaleString()}</div>
                        <div class="note-content">${escapeHtml(note.content)}</div>
                    </div>
                `;
            });
        }

        html += '</div>';
        container.innerHTML = html;

        // Save note handler
        const saveBtn = document.getElementById('save-note-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const input = document.getElementById('note-input');
                const content = input.value.trim();
                if (!content) {
                    showToast('Please write something first', 'warning');
                    return;
                }
                notes.unshift({ content, date: new Date().toISOString() });
                localStorage.setItem('infrahub_notes', JSON.stringify(notes));
                input.value = '';
                addActivity('note', 'Added a study note');
                awardXP(5);
                renderNotes(container);
                showToast('Note saved!', 'success');
            });
        }

        // Delete note handlers
        container.querySelectorAll('.note-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.dataset.index);
                notes.splice(index, 1);
                localStorage.setItem('infrahub_notes', JSON.stringify(notes));
                renderNotes(container);
                showToast('Note deleted', 'info');
            });
        });
    }

    // ==================== Tools ====================
    function renderTools(container) {
        const toolsData = KNOWLEDGE_BASE['tools'];
        if (!toolsData || !toolsData.subtopics) {
            container.innerHTML = '<div class="section-header"><h1>Tools</h1><p>No tools available</p></div>';
            return;
        }
        
        let html = `
            <div class="section-header">
                <h1>🛠️ Interactive Tools</h1>
                <p>Practice and experiment with hands-on tools</p>
            </div>
            <div class="tools-grid">
        `;
        
        for (const [category, tools] of Object.entries(toolsData.subtopics)) {
            html += `<div class="tools-category"><h3>${category}</h3>`;
            
            tools.forEach(tool => {
                html += `
                    <div class="tool-card" data-tool-id="${tool.id}">
                        <div class="tool-header">
                            <h4>${tool.title}</h4>
                            <span class="tool-tag">${tool.tags[0]}</span>
                        </div>
                        <p>${tool.summary}</p>
                        <button class="btn btn-primary launch-tool-btn">Launch Tool</button>
                    </div>
                `;
            });
            
            html += '</div>';
        }
        
        html += '</div>';
        container.innerHTML = html;
        
        // Setup tool launch buttons
        container.querySelectorAll('.launch-tool-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.tool-card');
                const toolId = card.dataset.toolId;
                launchTool(toolId, container);
            });
        });
    }
    
    function launchTool(toolId, container) {
        const toolsData = KNOWLEDGE_BASE['tools'];
        let tool = null;
        
        for (const tools of Object.values(toolsData.subtopics)) {
            tool = tools.find(t => t.id === toolId);
            if (tool) break;
        }
        
        if (!tool) return;
        
        // Render tool in full view
        container.innerHTML = `
            <div class="section-header">
                <button class="btn btn-secondary back-to-tools" style="margin-bottom: 16px;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                    Back to Tools
                </button>
                <h1>${tool.title}</h1>
                <p>${tool.summary}</p>
            </div>
            <div class="tool-full-content">
                ${tool.content}
            </div>
        `;
        
        // Execute any scripts in the tool content
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.textContent) {
                try {
                    eval(script.textContent);
                } catch (e) {
                    if (process.env.NODE_ENV === 'development') {
                        console.error('Tool script error:', e);
                    }
                }
            }
        });
        
        // Setup back button
        container.querySelector('.back-to-tools').addEventListener('click', () => {
            renderTools(container);
        });
        
        // Award XP for using tool
        awardXP(5);
        addActivity('tool', 'Used interactive tool: ' + tool.title);
    }

    // ==================== Career Section ====================
    function renderCareer(container) {
        const careerData = KNOWLEDGE_BASE['career'];
        if (!careerData || !careerData.subtopics) {
            container.innerHTML = '<div class="section-header"><h1>Career Track</h1><p>No career data available</p></div>';
            return;
        }
        
        let html = `
            <div class="section-header">
                <h1>🎯 Career Track</h1>
                <p>Plan and track your professional growth in infrastructure and cloud</p>
            </div>
            <div class="career-nav">
                <button class="career-nav-btn active" data-career-tab="paths">Career Paths</button>
                <button class="career-nav-btn" data-career-tab="certifications">Certifications</button>
                <button class="career-nav-btn" data-career-tab="skills">Skills Matrix</button>
            </div>
            <div class="career-content" id="career-content"></div>
        `;
        
        container.innerHTML = html;
        
        // Initial render
        renderCareerTab('paths', careerData, container.querySelector('#career-content'));
        
        // Tab switching
        container.querySelectorAll('.career-nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.career-nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const tab = btn.dataset.careerTab;
                renderCareerTab(tab, careerData, container.querySelector('#career-content'));
            });
        });
    }
    
    function renderCareerTab(tab, careerData, container) {
        let topics = [];
        if (tab === 'paths') topics = careerData.subtopics['Career Paths'] || [];
        else if (tab === 'certifications') topics = careerData.subtopics['Certifications'] || [];
        else if (tab === 'skills') topics = careerData.subtopics['Skills Matrix'] || [];
        
        let html = '<div class="career-grid">';
        topics.forEach(topic => {
            html += `
                <div class="career-card" data-topic-id="${topic.id}">
                    <div class="career-card-header">
                        <h4>${topic.title}</h4>
                        <span class="career-tag">${topic.tags[0]}</span>
                    </div>
                    <p>${topic.summary}</p>
                    <button class="btn btn-primary explore-career-btn">Explore</button>
                </div>
            `;
        });
        html += '</div>';
        
        container.innerHTML = html;
        
        // Setup explore buttons
        container.querySelectorAll('.explore-career-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.career-card');
                const topicId = card.dataset.topicId;
                launchCareerTopic(topicId, topics, container.parentElement);
            });
        });
    }
    
    function launchCareerTopic(topicId, topics, container) {
        const topic = topics.find(t => t.id === topicId);
        if (!topic) return;
        
        container.innerHTML = `
            <div class="section-header">
                <button class="btn btn-secondary back-to-career" style="margin-bottom: 16px;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                    Back to Career
                </button>
                <h1>${topic.title}</h1>
                <p>${topic.summary}</p>
            </div>
            <div class="career-detail-content">
                ${topic.content}
            </div>
        `;
        
        // Execute any scripts
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.textContent) {
                try {
                    eval(script.textContent);
                } catch (e) {
                    if (process.env.NODE_ENV === 'development') { console.error('Career script error:', e); }
                }
            }
        });
        
        container.querySelector('.back-to-career').addEventListener('click', () => {
            renderCareer(container);
        });
        
        awardXP(10);
        addActivity('career', 'Explored career content: ' + topic.title);
    }

    // ==================== Projects Section ====================
    function renderProjects(container) {
        const projectsData = KNOWLEDGE_BASE['projects'];
        if (!projectsData || !projectsData.subtopics) {
            container.innerHTML = '<div class="section-header"><h1>Hands-on Labs</h1><p>No projects available</p></div>';
            return;
        }
        
        let html = `
            <div class="section-header">
                <h1>🔬 Hands-on Labs</h1>
                <p>Build real-world projects and gain practical experience</p>
            </div>
            <div class="projects-filter">
                <button class="filter-btn active" data-level="all">All Levels</button>
                <button class="filter-btn" data-level="beginner">Beginner</button>
                <button class="filter-btn" data-level="intermediate">Intermediate</button>
                <button class="filter-btn" data-level="advanced">Advanced</button>
            </div>
            <div class="projects-content" id="projects-content"></div>
        `;
        
        container.innerHTML = html;
        
        // Collect all projects
        let allProjects = [];
        Object.values(projectsData.subtopics).forEach(projects => {
            allProjects = allProjects.concat(projects);
        });
        
        // Initial render
        renderProjectsList(allProjects, 'all', container.querySelector('#projects-content'), container);
        
        // Filter buttons
        container.querySelectorAll('.projects-filter .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.projects-filter .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const level = btn.dataset.level;
                renderProjectsList(allProjects, level, container.querySelector('#projects-content'), container);
            });
        });
    }
    
    function renderProjectsList(projects, level, container, parentContainer) {
        let filtered = projects;
        if (level !== 'all') {
            filtered = projects.filter(p => p.tags.includes(level));
        }
        
        let html = '<div class="projects-grid">';
        filtered.forEach(project => {
            const difficulty = project.tags.find(t => ['beginner', 'intermediate', 'advanced'].includes(t)) || 'beginner';
            html += `
                <div class="project-card" data-project-id="${project.id}">
                    <div class="project-card-header">
                        <span class="difficulty-badge ${difficulty}">${difficulty}</span>
                    </div>
                    <h4>${project.title}</h4>
                    <p>${project.summary}</p>
                    <div class="project-tags">
                        ${project.tags.filter(t => !['beginner', 'intermediate', 'advanced', 'project'].includes(t)).map(t => `<span class="project-tag">${t}</span>`).join('')}
                    </div>
                    <button class="btn btn-primary start-project-btn">Start Project</button>
                </div>
            `;
        });
        html += '</div>';
        
        container.innerHTML = html;
        
        container.querySelectorAll('.start-project-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.project-card');
                const projectId = card.dataset.projectId;
                launchProject(projectId, projects, parentContainer);
            });
        });
    }
    
    function launchProject(projectId, projects, container) {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;
        
        container.innerHTML = `
            <div class="section-header">
                <button class="btn btn-secondary back-to-projects" style="margin-bottom: 16px;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                    Back to Projects
                </button>
            </div>
            <div class="project-full-content">
                ${project.content}
            </div>
        `;
        
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.textContent) {
                try {
                    eval(script.textContent);
                } catch (e) {
                    if (process.env.NODE_ENV === 'development') { console.error('Project script error:', e); }
                }
            }
        });
        
        container.querySelector('.back-to-projects').addEventListener('click', () => {
            renderProjects(container);
        });
        
        awardXP(15);
        addActivity('project', 'Started project: ' + project.title);
    }

    // ==================== Community Section ====================
    function renderCommunity(container) {
        const communityData = KNOWLEDGE_BASE['community'];
        if (!communityData || !communityData.subtopics) {
            container.innerHTML = '<div class="section-header"><h1>Community</h1><p>No community data available</p></div>';
            return;
        }
        
        let html = `
            <div class="section-header">
                <h1>🌐 Community</h1>
                <p>Connect with fellow learners, read success stories, and join discussions</p>
            </div>
            <div class="community-nav">
                <button class="community-nav-btn active" data-community-tab="stories">Success Stories</button>
                <button class="community-nav-btn" data-community-tab="reviews">Reviews</button>
                <button class="community-nav-btn" data-community-tab="forum">Forum</button>
                <button class="community-nav-btn" data-community-tab="experts">Experts</button>
            </div>
            <div class="community-content" id="community-content"></div>
        `;
        
        container.innerHTML = html;
        
        // Initial render
        renderCommunityTab('stories', communityData, container.querySelector('#community-content'));
        
        // Tab switching
        container.querySelectorAll('.community-nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.community-nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const tab = btn.dataset.communityTab;
                renderCommunityTab(tab, communityData, container.querySelector('#community-content'));
            });
        });
    }
    
    function renderCommunityTab(tab, communityData, container) {
        let topicKey = '';
        if (tab === 'stories') topicKey = 'Success Stories';
        else if (tab === 'reviews') topicKey = 'Community Reviews & Ratings';
        else if (tab === 'forum') topicKey = 'Trending Discussions';
        else if (tab === 'experts') topicKey = 'Expert Contributors';
        
        const topics = communityData.subtopics[topicKey] || [];
        
        if (topics.length === 0) {
            container.innerHTML = '<p class="no-content">Content coming soon!</p>';
            return;
        }
        
        let html = '<div class="community-topics">';
        topics.forEach(topic => {
            html += `<div class="community-topic-content">${topic.content}</div>`;
        });
        html += '</div>';
        
        container.innerHTML = html;
        
        // Execute scripts
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.textContent) {
                try {
                    eval(script.textContent);
                } catch (e) {
                    if (process.env.NODE_ENV === 'development') { console.error('Community script error:', e); }
                }
            }
        });
    }

    // ==================== Analytics Dashboard ====================
    function renderAnalytics(container) {
        const analyticsData = KNOWLEDGE_BASE['analytics'];
        if (!analyticsData || !analyticsData.subtopics) {
            container.innerHTML = '<div class="section-header"><h1>Analytics</h1><p>No analytics data available</p></div>';
            return;
        }
        
        const topics = analyticsData.subtopics['Learning Analytics'] || [];
        if (topics.length === 0) {
            container.innerHTML = '<div class="section-header"><h1>Analytics</h1><p>No analytics available</p></div>';
            return;
        }
        
        const topic = topics[0];
        container.innerHTML = `
            <div class="analytics-wrapper">
                <div class="section-header">
                    <h1>${topic.title}</h1>
                    <p>${topic.summary}</p>
                </div>
                <div class="analytics-content">
                    ${topic.content}
                </div>
            </div>
        `;
        
        // Execute scripts
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.textContent) {
                try {
                    eval(script.textContent);
                } catch (e) {
                    if (process.env.NODE_ENV === 'development') { console.error('Analytics script error:', e); }
                }
            }
        });
        
        awardXP(5);
        addActivity('analytics', 'Viewed analytics dashboard');
    }

    // ==================== Company Interviews ====================
    function renderCompanies(container) {
        const companiesData = KNOWLEDGE_BASE['companies'];
        if (!companiesData || !companiesData.subtopics) {
            container.innerHTML = '<div class="section-header"><h1>Company Interviews</h1><p>No company data available</p></div>';
            return;
        }
        
        let html = `
            <div class="section-header">
                <h1>🏢 Company Interview Prep</h1>
                <p>Interview questions and preparation guides for specific companies</p>
            </div>
            <div class="companies-filter">
                <button class="filter-btn active" data-category="all">All Companies</button>
                <button class="filter-btn" data-category="faang">FAANG/Big Tech</button>
                <button class="filter-btn" data-category="indonesia">Indonesian Tech</button>
            </div>
            <div class="companies-content" id="companies-content"></div>
        `;
        
        container.innerHTML = html;
        
        // Collect all company guides from both sources
        let allCompanies = [];
        Object.entries(companiesData.subtopics).forEach(([category, companies]) => {
            companies.forEach(company => {
                company.category = category.includes('FAANG') ? 'faang' : 'indonesia';
                allCompanies.push(company);
            });
        });
        
        // Also include more companies data if available
        const moreCompaniesData = KNOWLEDGE_BASE['moreCompanies'];
        if (moreCompaniesData && moreCompaniesData.subtopics) {
            Object.entries(moreCompaniesData.subtopics).forEach(([category, companies]) => {
                companies.forEach(company => {
                    company.category = category.includes('Big Tech') ? 'faang' : 'indonesia';
                    allCompanies.push(company);
                });
            });
        }
        
        // Initial render
        renderCompaniesList(allCompanies, 'all', container.querySelector('#companies-content'), container);
        
        // Filter buttons
        container.querySelectorAll('.companies-filter .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.companies-filter .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const category = btn.dataset.category;
                renderCompaniesList(allCompanies, category, container.querySelector('#companies-content'), container);
            });
        });
    }
    
    function renderCompaniesList(companies, category, container, parentContainer) {
        let filtered = companies;
        if (category !== 'all') {
            filtered = companies.filter(c => c.category === category);
        }
        
        let html = '<div class="companies-grid">';
        filtered.forEach(company => {
            const difficulty = company.tags.includes('faang') ? 'Very Hard' : 'Hard';
            html += `
                <div class="company-card" data-company-id="${company.id}">
                    <div class="company-card-header">
                        <span class="difficulty-badge">${difficulty}</span>
                    </div>
                    <h4>${company.title}</h4>
                    <p>${company.summary}</p>
                    <div class="company-tags">
                        ${company.tags.filter(t => t !== 'interview').map(t => `<span class="company-tag">${t}</span>`).join('')}
                    </div>
                    <button class="btn btn-primary view-company-btn">View Guide</button>
                </div>
            `;
        });
        html += '</div>';
        
        container.innerHTML = html;
        
        container.querySelectorAll('.view-company-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.company-card');
                const companyId = card.dataset.companyId;
                launchCompanyGuide(companyId, companies, parentContainer);
            });
        });
    }
    
    function launchCompanyGuide(companyId, companies, container) {
        const company = companies.find(c => c.id === companyId);
        if (!company) return;
        
        container.innerHTML = `
            <div class="section-header">
                <button class="btn btn-secondary back-to-companies" style="margin-bottom: 16px;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                    Back to Companies
                </button>
            </div>
            <div class="company-guide-content">
                ${company.content}
            </div>
        `;
        
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.textContent) {
                try {
                    eval(script.textContent);
                } catch (e) {
                    if (process.env.NODE_ENV === 'development') { console.error('Company script error:', e); }
                }
            }
        });
        
        container.querySelector('.back-to-companies').addEventListener('click', () => {
            renderCompanies(container);
        });
        
        awardXP(10);
        addActivity('company', 'Viewed company guide: ' + company.title);
    }

    // ==================== Interview Prep ====================
    function renderInterview(container) {
        let html = `
            <div class="section-header">
                <h1>🎯 Interview Preparation</h1>
                <p>Common technical interview questions for DevOps, SRE, and Cloud roles</p>
            </div>
            <div class="interview-categories">
        `;
        
        const interviewData = KNOWLEDGE_BASE['interview'];
        if (interviewData && interviewData.subtopics) {
            for (const [category, questions] of Object.entries(interviewData.subtopics)) {
                html += `
                    <div class="interview-category">
                        <h3>${category}</h3>
                        <div class="interview-questions">
                            ${questions.map((q, idx) => `
                                <div class="interview-card" data-question="${q.id}">
                                    <div class="interview-question-header">
                                        <span class="interview-number">${idx + 1}</span>
                                        <h4>${q.title}</h4>
                                        <span class="interview-tag">${q.tags[0]}</span>
                                    </div>
                                    <p>${q.summary}</p>
                                    <button class="btn btn-secondary view-answer-btn">View Answer</button>
                                    <div class="interview-answer" style="display:none;">
                                        ${q.content}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        }
        
        // Add technical interview database section
        if (typeof TECHNICAL_INTERVIEW_DB !== 'undefined') {
            html += `
                <div class="interview-category">
                    <h3>🎲 Random Practice Questions</h3>
                    <div class="random-question-section">
                        <div class="random-question-display" id="random-question">
                            <p>Click below to get a random interview question</p>
                        </div>
                        <button class="btn btn-primary" id="next-random-question">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                            Next Question
                        </button>
                    </div>
                </div>
            `;
        }
        
        html += '</div>';
        container.innerHTML = html;
        
        // Setup view answer buttons
        container.querySelectorAll('.view-answer-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const answer = btn.nextElementSibling;
                const isHidden = answer.style.display === 'none';
                answer.style.display = isHidden ? 'block' : 'none';
                btn.textContent = isHidden ? 'Hide Answer' : 'View Answer';
                if (isHidden) {
                    awardXP(5);
                    addActivity('interview', 'Studied interview question');
                }
            });
        });
        
        // Setup random question button
        const randomBtn = document.getElementById('next-random-question');
        if (randomBtn && typeof TECHNICAL_INTERVIEW_DB !== 'undefined') {
            randomBtn.addEventListener('click', () => {
                const randomQ = TECHNICAL_INTERVIEW_DB[Math.floor(Math.random() * TECHNICAL_INTERVIEW_DB.length)];
                document.getElementById('random-question').innerHTML = `
                    <div class="random-q-category">${randomQ.category}</div>
                    <h4>${randomQ.question}</h4>
                    <div class="random-q-answer">
                        <strong>Answer:</strong> ${randomQ.answer}
                    </div>
                `;
                awardXP(3);
            });
        }
    }

    // ==================== Quiz ====================
    function renderQuiz(container) {
        // Reset quiz state
        quizState = { current: 0, score: 0, answers: [] };
        
        // Get all questions
        const allQuestions = [];
        for (const [category, questions] of Object.entries(QUIZ_QUESTIONS)) {
            questions.forEach(q => allQuestions.push({ ...q, category }));
        }
        
        // Shuffle and take 10 questions
        const selectedQuestions = shuffleArray(allQuestions).slice(0, 10);
        quizState.questions = selectedQuestions;
        
        renderQuizQuestion(container);
    }

    function renderQuizQuestion(container) {
        const q = quizState.questions[quizState.current];
        const progress = ((quizState.current) / quizState.questions.length) * 100;
        
        let html = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <h2>Knowledge Check</h2>
                    <p>Test your understanding with these questions</p>
                </div>
                <div class="quiz-card">
                    <div class="quiz-progress">
                        <div class="quiz-progress-bar">
                            <div class="quiz-progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <span class="quiz-progress-text">${quizState.current + 1}/${quizState.questions.length}</span>
                    </div>
                    <div class="quiz-question">${q.question}</div>
                    <div class="quiz-options">
                        ${q.options.map((opt, idx) => `
                            <div class="quiz-option" data-index="${idx}">
                                <div class="quiz-option-letter">${String.fromCharCode(65 + idx)}</div>
                                <div class="quiz-option-text">${opt}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        container.querySelectorAll('.quiz-option').forEach(opt => {
            opt.addEventListener('click', () => {
                const selectedIndex = parseInt(opt.dataset.index);
                const isCorrect = selectedIndex === q.correct;
                
                if (isCorrect) quizState.score++;
                
                // Show correct/incorrect
                container.querySelectorAll('.quiz-option').forEach((o, i) => {
                    o.classList.remove('selected');
                    if (i === q.correct) o.classList.add('correct');
                    else if (i === selectedIndex && !isCorrect) o.classList.add('incorrect');
                });
                
                // Show explanation
                setTimeout(() => {
                    showToast(q.explanation, isCorrect ? 'success' : 'warning', 3000);
                }, 200);
                
                // Next question after delay
                setTimeout(() => {
                    quizState.current++;
                    if (quizState.current < quizState.questions.length) {
                        renderQuizQuestion(container);
                    } else {
                        renderQuizResults(container);
                    }
                }, 2500);
            });
        });
    }

    function renderQuizResults(container) {
        const percentage = Math.round((quizState.score / quizState.questions.length) * 100);
        let message = '';
        if (percentage >= 90) message = 'Outstanding! You\'re a master!';
        else if (percentage >= 70) message = 'Great job! Keep learning!';
        else if (percentage >= 50) message = 'Good effort! Room for improvement.';
        else message = 'Keep studying! You\'ll get there!';
        
        const xpEarned = Math.round(quizState.score * 5);
        awardXP(xpEarned);
        addActivity('quiz', `Completed quiz with ${percentage}%`);
        
        let html = `
            <div class="quiz-container">
                <div class="quiz-card">
                    <div class="quiz-result">
                        <div class="quiz-result-score">${percentage}%</div>
                        <div class="quiz-result-message">${message}</div>
                        <div class="quiz-result-details">
                            You got ${quizState.score} out of ${quizState.questions.length} questions correct
                            <br>+${xpEarned} XP earned!
                        </div>
                        <button class="btn btn-primary" onclick="location.reload()">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }

    // ==================== Flashcards ====================
    function renderFlashcards(container) {
        flashcardState = { current: 0, flipped: false };
        
        if (FLASHCARDS.length === 0) {
            container.innerHTML = '<div class="section-header"><h1>Flashcards</h1><p>No flashcards available</p></div>';
            return;
        }
        
        renderCurrentFlashcard(container);
    }

    function renderCurrentFlashcard(container) {
        const card = FLASHCARDS[flashcardState.current];
        
        let html = `
            <div class="section-header">
                <h1>Flashcards</h1>
                <p>Click to flip • ${flashcardState.current + 1} / ${FLASHCARDS.length}</p>
            </div>
            <div class="flashcards-container">
                <div class="flashcard ${flashcardState.flipped ? 'flipped' : ''}" id="flashcard">
                    <div class="flashcard-inner">
                        <div class="flashcard-front">
                            <div class="topic-tag">${card.category}</div>
                            <div class="flashcard-question">${card.question}</div>
                            <div class="flashcard-hint">Click to reveal answer</div>
                        </div>
                        <div class="flashcard-back">
                            <div class="flashcard-answer">${card.answer}</div>
                        </div>
                    </div>
                </div>
                <div class="flashcard-controls">
                    <button class="btn btn-secondary" id="prev-card" ${flashcardState.current === 0 ? 'disabled' : ''}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                        Previous
                    </button>
                    <button class="btn btn-primary" id="next-card">
                        Next
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        document.getElementById('flashcard').addEventListener('click', () => {
            flashcardState.flipped = !flashcardState.flipped;
            renderCurrentFlashcard(container);
            if (flashcardState.flipped) {
                awardXP(2);
                addActivity('flashcard', 'Studied flashcards');
            }
        });
        
        document.getElementById('prev-card').addEventListener('click', () => {
            if (flashcardState.current > 0) {
                flashcardState.current--;
                flashcardState.flipped = false;
                renderCurrentFlashcard(container);
            }
        });
        
        document.getElementById('next-card').addEventListener('click', () => {
            if (flashcardState.current < FLASHCARDS.length - 1) {
                flashcardState.current++;
                flashcardState.flipped = false;
                renderCurrentFlashcard(container);
            } else {
                flashcardState.current = 0;
                flashcardState.flipped = false;
                renderCurrentFlashcard(container);
                showToast('Back to first card!', 'info');
            }
        });
    }

    // ==================== Profile ====================
    function renderProfile(container) {
        container.innerHTML = `
            <div class="section-header">
                <h1>My Profile</h1>
                <p>Track your progress and skills</p>
            </div>
            
            <div class="profile-header">
                <div class="profile-avatar">${userProfile.name.charAt(0).toUpperCase()}</div>
                <div class="profile-info">
                    <h2>${userProfile.name}</h2>
                    <p>${userProfile.title}</p>
                    <div class="profile-stats">
                        <div class="profile-stat">
                            <div class="profile-stat-value">${learned.length}</div>
                            <div class="profile-stat-label">Topics</div>
                        </div>
                        <div class="profile-stat">
                            <div class="profile-stat-value">${xp}</div>
                            <div class="profile-stat-label">XP</div>
                        </div>
                        <div class="profile-stat">
                            <div class="profile-stat-value">${streak}</div>
                            <div class="profile-stat-label">Day Streak</div>
                        </div>
                        <div class="profile-stat">
                            <div class="profile-stat-value">${calculateOverallProgress()}%</div>
                            <div class="profile-stat-label">Progress</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="skills-section">
                <h3>Skills Progress</h3>
                ${Object.entries(userProfile.skills).map(([skill, level]) => `
                    <div class="skill-item">
                        <div class="skill-header">
                            <span class="skill-name">${skill.charAt(0).toUpperCase() + skill.slice(1)}</span>
                            <span class="skill-level">${level}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-fill" style="width: ${level}%; background: var(--${skill === 'networking' ? 'networking' : skill === 'cloud' ? 'cloud' : skill === 'linux' ? 'linux' : skill === 'containers' ? 'containers' : skill === 'devops' ? 'devops' : skill === 'security' ? 'security' : skill === 'monitoring' ? 'monitoring' : 'automation'}-color)"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function updateSkillProgress(sectionKey) {
        if (!userProfile.skills[sectionKey]) return;
        
        const progress = calculateSectionProgress(sectionKey);
        userProfile.skills[sectionKey] = progress;
        localStorage.setItem('infrahub_profile', JSON.stringify(userProfile));
    }

    // ==================== Learning Path ====================
    function renderLearningPath(container) {
        let html = `
            <div class="section-header">
                <h1>Learning Paths</h1>
                <p>Structured paths to master infrastructure and DevOps</p>
            </div>
            <div class="learning-path">
        `;
        
        LEARNING_PATHS.forEach((path, index) => {
            const progress = calculatePathProgress(path);
            html += `
                <div class="path-stage" data-path-index="${index}">
                    <div class="path-stage-header">
                        <div class="path-stage-number ${progress === 100 ? 'completed' : ''}">${progress === 100 ? '✓' : index + 1}</div>
                        <div class="path-stage-info">
                            <div class="path-stage-title">${path.title}</div>
                            <div class="path-stage-desc">${path.description}</div>
                        </div>
                        <div class="path-stage-progress">${progress}%</div>
                    </div>
                    <div class="path-stage-content">
                        <div class="path-topics">
                            ${path.topics.map(topicId => {
                                const topic = findTopicById(topicId);
                                if (!topic) return '';
                                const isCompleted = learned.includes(topicId);
                                return `
                                    <div class="path-topic ${isCompleted ? 'completed' : ''}" data-topic-id="${topicId}" data-section="${topic.sectionKey}" data-subtopic="${topic.subtopicKey}">
                                        <div class="path-topic-check">${isCompleted ? '✓' : ''}</div>
                                        <span class="path-topic-name">${topic.topic.title}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
        
        container.querySelectorAll('.path-stage-header').forEach(header => {
            header.addEventListener('click', () => {
                header.parentElement.classList.toggle('expanded');
            });
        });
        
        container.querySelectorAll('.path-topic').forEach(topic => {
            topic.addEventListener('click', () => {
                openTopicModal(topic.dataset.topicId, topic.dataset.section, topic.dataset.subtopic);
            });
        });
    }

    function calculatePathProgress(path) {
        if (!path.topics || path.topics.length === 0) return 0;
        const completed = path.topics.filter(id => learned.includes(id)).length;
        return Math.round((completed / path.topics.length) * 100);
    }

    // ==================== Reviews ====================
    function renderReviews(container) {
        let html = `
            <div class="section-header">
                <h1>Reviews & Tips</h1>
                <p>What the community says about learning DevOps</p>
            </div>
            <div class="reviews-grid">
        `;
        
        html += REVIEWS.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <div class="review-avatar">${review.avatar}</div>
                    <div class="review-meta">
                        <div class="review-author">${review.author}</div>
                        <div class="review-role">${review.role}</div>
                    </div>
                    <div class="review-rating">${'★'.repeat(review.rating)}</div>
                </div>
                <div class="review-content">${review.content}</div>
                <div class="review-tags">
                    ${review.tags.map(tag => `<span class="review-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
        
        html += '</div>';
        container.innerHTML = html;
    }

    // ==================== Resources ====================
    function renderResources(container) {
        let html = `
            <div class="section-header">
                <h1>Resources Library</h1>
                <p>Curated resources for continued learning</p>
            </div>
            <div class="resources-grid">
        `;
        
        html += RESOURCES.map(resource => `
            <a href="${resource.url}" target="_blank" class="resource-card">
                <div class="resource-icon">${resource.icon}</div>
                <h3>${resource.title}</h3>
                <p>${resource.description}</p>
                <span class="topic-tag">${resource.category}</span>
            </a>
        `).join('');
        
        html += '</div>';
        container.innerHTML = html;
    }

    // ==================== Code Snippets ====================
    function renderSnippets(container) {
        const snippetsData = KNOWLEDGE_BASE['snippets'];
        if (!snippetsData || !snippetsData.subtopics) {
            container.innerHTML = '<div class="section-header"><h1>Code Snippets</h1><p>No snippets available</p></div>';
            return;
        }
        
        let html = `
            <div class="section-header">
                <h1>📋 Code Snippets</h1>
                <p>Production-ready code you can copy and use immediately</p>
            </div>
            <div class="snippets-nav">
                <button class="snippets-nav-btn active" data-snippets-tab="docker">Docker & Compose</button>
                <button class="snippets-nav-btn" data-snippets-tab="kubernetes">Kubernetes</button>
                <button class="snippets-nav-btn" data-snippets-tab="terraform">Terraform</button>
                <button class="snippets-nav-btn" data-snippets-tab="cicd">CI/CD</button>
            </div>
            <div class="snippets-content" id="snippets-content"></div>
        `;
        
        container.innerHTML = html;
        
        // Initial render
        renderSnippetsTab('docker', snippetsData, container.querySelector('#snippets-content'));
        
        // Tab switching
        container.querySelectorAll('.snippets-nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.snippets-nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const tab = btn.dataset.snippetsTab;
                renderSnippetsTab(tab, snippetsData, container.querySelector('#snippets-content'));
            });
        });
    }
    
    function renderSnippetsTab(tab, snippetsData, container) {
        const topicMap = {
            'docker': 'Docker & Compose',
            'kubernetes': 'Kubernetes',
            'terraform': 'Terraform',
            'cicd': 'CI/CD'
        };
        
        const topics = snippetsData.subtopics[topicMap[tab]] || [];
        
        let html = '<div class="snippets-tab-content">';
        topics.forEach(topic => {
            html += `<div class="snippet-topic-content">${topic.content}</div>`;
        });
        html += '</div>';
        
        container.innerHTML = html;
        
        // Execute scripts
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.textContent) {
                try {
                    eval(script.textContent);
                } catch (e) {
                    if (process.env.NODE_ENV === 'development') { console.error('Snippets script error:', e); }
                }
            }
        });
    }

    // ==================== Labs ====================
    function renderLabs(container) {
        container.innerHTML = `
            <div class="section-header">
                <h1>Hands-on Labs</h1>
                <p>Practice in real environments (coming soon)</p>
            </div>
            <div class="bookmarks-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.31"/><path d="M14 2v7.31"/><rect x="2" y="9" width="20" height="12" rx="2"/></svg>
                <h3>Labs Coming Soon</h3>
                <p>We're building interactive hands-on labs for you to practice in real cloud environments. Stay tuned!</p>
            </div>
        `;
    }

    // ==================== Search ====================
    function setupSearch() {
        searchInput.addEventListener('focus', openSearchModal);
        searchInput.addEventListener('click', openSearchModal);

        searchModalInput.addEventListener('input', () => {
            performSearch(searchModalInput.value);
        });

        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) closeSearchModal();
        });
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                performSearch(searchModalInput.value);
            });
        });
    }

    function openSearchModal() {
        searchModal.classList.add('active');
        searchModalInput.value = searchInput.value || '';
        searchModalInput.focus();
        if (searchModalInput.value) performSearch(searchModalInput.value);
    }

    function closeSearchModal() {
        searchModal.classList.remove('active');
        searchInput.value = '';
    }

    function performSearch(query) {
        if (!query || query.length < 2) {
            searchResults.innerHTML = '<div class="search-no-results">Type at least 2 characters to search...</div>';
            return;
        }

        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
        const results = [];
        const q = query.toLowerCase();

        for (const [sectionKey, section] of Object.entries(KNOWLEDGE_BASE)) {
            for (const [subtopicKey, topics] of Object.entries(section.subtopics)) {
                for (const topic of topics) {
                    // Filter by difficulty if selected
                    if (activeFilter !== 'all' && !topic.tags.includes(activeFilter)) continue;
                    
                    const titleMatch = topic.title.toLowerCase().includes(q);
                    const summaryMatch = topic.summary.toLowerCase().includes(q);
                    const tagMatch = topic.tags.some(t => t.toLowerCase().includes(q));
                    const contentMatch = topic.content.toLowerCase().includes(q);

                    if (titleMatch || summaryMatch || tagMatch || contentMatch) {
                        results.push({
                            section: section.title,
                            sectionKey,
                            subtopicKey,
                            topic,
                            score: titleMatch ? 3 : (summaryMatch ? 2 : (tagMatch ? 1 : 0))
                        });
                    }
                }
            }
        }

        results.sort((a, b) => b.score - a.score);

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">No results found for "' + escapeHtml(query) + '"</div>';
            return;
        }

        searchResults.innerHTML = results.map(r => `
            <div class="search-result-item" data-topic-id="${r.topic.id}" data-section="${r.sectionKey}" data-subtopic="${r.subtopicKey}">
                <span class="result-section">${r.section}</span>
                <span class="result-title">${highlightMatch(r.topic.title, query)}</span>
                <span class="result-desc">${r.topic.tags.join(', ')}</span>
            </div>
        `).join('');

        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                closeSearchModal();
                openTopicModal(item.dataset.topicId, item.dataset.section, item.dataset.subtopic);
            });
        });
    }

    function highlightMatch(text, query) {
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<strong style="color:var(--accent)">$1</strong>');
    }

    // ==================== Study Timer ====================
    function setupTimer() {
        studyTimerBtn.addEventListener('click', () => {
            timerModal.classList.add('active');
        });
        
        closeTimer.addEventListener('click', () => {
            timerModal.classList.remove('active');
        });
        
        timerModal.addEventListener('click', (e) => {
            if (e.target === timerModal) timerModal.classList.remove('active');
        });
        
        timerToggle.addEventListener('click', toggleTimer);
        timerReset.addEventListener('click', resetTimer);
        
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const minutes = parseInt(btn.dataset.time);
                timerState.time = minutes * 60;
                updateTimerDisplay();
                resetTimer();
            });
        });
        
        updateTimerDisplay();
    }

    function toggleTimer() {
        if (timerState.running) {
            clearInterval(timerState.interval);
            timerState.running = false;
            timerToggle.textContent = 'Start';
            timerToggle.classList.remove('btn-secondary');
            timerToggle.classList.add('btn-primary');
        } else {
            timerState.running = true;
            timerToggle.textContent = 'Pause';
            timerToggle.classList.remove('btn-primary');
            timerToggle.classList.add('btn-secondary');
            
            timerState.interval = setInterval(() => {
                if (timerState.time > 0) {
                    timerState.time--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerState.interval);
                    timerState.running = false;
                    timerToggle.textContent = 'Start';
                    showToast('Focus session complete! Great work!', 'success');
                    awardXP(10);
                    addActivity('timer', 'Completed focus session');
                }
            }, 1000);
        }
    }

    function resetTimer() {
        clearInterval(timerState.interval);
        timerState.running = false;
        timerToggle.textContent = 'Start';
        timerToggle.classList.remove('btn-secondary');
        timerToggle.classList.add('btn-primary');
        updateTimerDisplay();
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timerState.time / 60);
        const seconds = timerState.time % 60;
        timerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const circumference = 2 * Math.PI * 45;
        const totalTime = 25 * 60; // Default 25 min
        const progress = (totalTime - timerState.time) / totalTime;
        const offset = circumference * progress;
        timerProgress.style.strokeDashoffset = offset;
    }

    // ==================== Gamification ====================
    function awardXP(amount) {
        xp += amount;
        localStorage.setItem('infrahub_xp', xp);
        updateXPBadge();
        
        // Check for level up milestones
        if (xp % 100 === 0) {
            showToast(`🎉 Level milestone! ${xp} XP total!`, 'success');
        }
    }

    function updateXPBadge() {
        if (xpBadge) {
            xpBadge.textContent = xp + ' XP';
        }
    }

    function updateStreak() {
        const today = new Date().toDateString();
        const lastDate = lastStudyDate ? new Date(lastStudyDate).toDateString() : null;
        
        if (lastDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastDate === yesterday.toDateString()) {
                // Continued streak
                streak++;
            } else if (!lastDate || new Date(lastDate) < yesterday) {
                // Streak broken or new
                streak = 1;
            }
            
            lastStudyDate = new Date().toISOString();
            localStorage.setItem('infrahub_streak', streak);
            localStorage.setItem('infrahub_last_study', lastStudyDate);
        }
        
        if (streakCount) {
            streakCount.textContent = streak + (streak === 1 ? ' day' : ' days');
        }
    }

    // ==================== Theme ====================
    function setupTheme() {
        const saved = localStorage.getItem('infrahub_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', saved);

        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('infrahub_theme', next);
        });
    }

    // ==================== Clock ====================
    function setupClock() {
        function updateTime() {
            const now = new Date();
            currentTimeEl.textContent = now.toLocaleString('en-US', {
                weekday: 'short', month: 'short', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
        }
        updateTime();
        setInterval(updateTime, 30000);
    }

    // ==================== Sidebar ====================
    function setupSidebar() {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }

    // ==================== Keyboard Shortcuts ====================
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+K or Cmd+K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                openSearchModal();
            }
            
            // Ctrl+/ for help
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                showToast('Shortcuts: Ctrl+K=Search, Esc=Close, Alt+←/→=Prev/Next Topic', 'info', 5000);
            }
            
            // Arrow key navigation in topic modal
            if (topicModal.classList.contains('active')) {
                if (e.key === 'ArrowLeft' && e.altKey) {
                    e.preventDefault();
                    navigateToPrevTopic();
                }
                if (e.key === 'ArrowRight' && e.altKey) {
                    e.preventDefault();
                    navigateToNextTopic();
                }
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                if (searchModal.classList.contains('active')) {
                    closeSearchModal();
                } else if (topicModal.classList.contains('active')) {
                    closeTopicModalFn();
                } else if (timerModal.classList.contains('active')) {
                    timerModal.classList.remove('active');
                }
            }
        });
    }

    // ==================== Toast Notifications ====================
    function showToast(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        
        const titles = {
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Info'
        };
        
        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-content">
                <div class="toast-title">${titles[type]}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // ==================== Scroll to Top ====================
    function setupScrollTop() {
        const btn = document.createElement('button');
        btn.className = 'scroll-top-btn';
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>';
        btn.title = 'Scroll to top';
        document.body.appendChild(btn);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });
        
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==================== Helpers ====================
    function findTopicById(topicId) {
        for (const [sectionKey, section] of Object.entries(KNOWLEDGE_BASE)) {
            for (const [subtopicKey, topics] of Object.entries(section.subtopics)) {
                const topic = topics.find(t => t.id === topicId);
                if (topic) return { topic, sectionKey, subtopicKey };
            }
        }
        return null;
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    function formatTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return Math.floor(seconds / 60) + ' min ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
        return Math.floor(seconds / 86400) + ' days ago';
    }

    // ==================== Global Functions ====================
    window.copyCode = function(btn) {
        const code = btn.closest('.code-block').querySelector('code');
        if (code) {
            navigator.clipboard.writeText(code.textContent).then(() => {
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copied');
                }, 2000);
            });
        }
    };

    // ==================== Start ====================
    init();
})();
