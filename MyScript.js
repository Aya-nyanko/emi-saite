// ========================================
// スクロール時のアニメーション
// ========================================

class RevealAnimation {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // 遅延を計算
                        const delay = entry.target.dataset.delay || 0;
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, delay);
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
    }

    observe() {
        document.querySelectorAll('.anim-item').forEach((el, index) => {
            el.dataset.delay = index * 100;
            this.observer.observe(el);
        });
    }
}

// ========================================
// スキルバーのアニメーション
// ========================================

class SkillBarAnimation {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.animateSkillBars(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );
    }

    observe() {
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            this.observer.observe(skillsSection);
        }
    }

    animateSkillBars(container) {
        const skillFills = container.querySelectorAll('.skill-fill');
        skillFills.forEach((fill) => {
            const level = fill.dataset.level;
            fill.style.width = level + '%';
        });
    }
}

// ========================================
// ナビゲーション
// ========================================

class Navigation {
    constructor() {
        this.setupNavLinks();
        this.setupContactButtons();
        this.setupScrollButtons();
    }

    setupNavLinks() {
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                const element = document.getElementById(section);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    setupContactButtons() {
        document.querySelectorAll('.contact-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    setupScrollButtons() {
        document.querySelectorAll('[data-scroll]').forEach((btn) => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.scroll;
                const element = document.getElementById(section);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

// ========================================
// フィルタリング機能
// ========================================

class WorksFilter {
    constructor() {
        this.setupFilterButtons();
    }

    setupFilterButtons() {
        document.querySelectorAll('.filter-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.filterWorks(filter);
                this.updateActiveButton(btn);
            });
        });
    }

    filterWorks(filter) {
        const workCards = document.querySelectorAll('.work-card');
        workCards.forEach((card) => {
            if (filter === 'all') {
                card.style.display = 'block';
                // アニメーション用に遅延
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 10);
            } else {
                const category = card.dataset.category;
                if (category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    }

    updateActiveButton(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach((btn) => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
}

// ========================================
// お問い合わせフォーム
// ========================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        // フォームデータの取得
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        // バリデーション
        if (!name || !email || !service || !message) {
            this.showNotification('すべてのフィールドを入力してください', 'error');
            return;
        }

        // メール形式のチェック
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showNotification('正しいメールアドレスを入力してください', 'error');
            return;
        }

        // 送信処理（実装例）
        console.log({
            name,
            email,
            service,
            message,
            timestamp: new Date().toISOString()
        });

        this.showNotification('お問い合わせありがとうございます。確認後、ご連絡いたします。', 'success');
        this.form.reset();
    }

    showNotification(message, type) {
        // シンプルなアラート表示（本番環境ではトーストライブラリを使用）
        alert(message);
    }
}

// ========================================
// スムーズスクロール
// ========================================

class SmoothScroll {
    constructor() {
        this.setupScrollLinks();
    }

    setupScrollLinks() {
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const element = document.querySelector(href);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
}

// ========================================
// ナビゲーションバーのスティッキー効果
// ========================================

class StickyNavbar {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.setupScrollListener();
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            } else {
                this.navbar.style.boxShadow = 'none';
            }
        });
    }
}

// ========================================
// ページ読み込み時の初期化
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // アニメーション初期化
    const revealAnimation = new RevealAnimation();
    revealAnimation.observe();

    // スキルバーアニメーション
    const skillBarAnimation = new SkillBarAnimation();
    skillBarAnimation.observe();

    // ナビゲーション
    new Navigation();

    // フィルタリング
    new WorksFilter();

    // フォーム
    new ContactForm();

    // スムーズスクロール
    new SmoothScroll();

    // スティッキーナビバー
    new StickyNavbar();

    console.log('✅ ページ初期化完了');
});

// ========================================
// ウィンドウリサイズ時の処理
// ========================================

window.addEventListener('resize', () => {
    // リサイズ時の処理（必要に応じて追加）
});

// ========================================
// ページ離脱時の警告（オプション）
// ========================================

// window.addEventListener('beforeunload', (e) => {
//     if (formHasChanges) {
//         e.preventDefault();
//         e.returnValue = '';
//     }
// });
