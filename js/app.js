/* ==========================================================================
   App Controller — Clean MyResume Academic Style (Bilingual zh / en)
   ========================================================================== */

(function () {
  'use strict';

  const D = window.SITE_DATA;
  if (!D) return;

  const ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    news: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    scholar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
    university: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-4a3 3 0 0 1 6 0v4"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    pulse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  };

  const UI = {
    zh: {
      aboutHeading: '关于我',
      aboutSubname: '黄鹂 · 西南财经大学副教授',
      metaPosition: '职务',
      metaPositionVal: '人工智能系主任 · 计算能力培养中心主任',
      metaEmail: '邮箱',
      metaCity: '城市',
      metaScholar: 'Google Scholar',
      metaGitHub: 'GitHub',
      metaOfficial: '西财主页',
      metaOfficialLink: '计算机与人工智能学院',
      metaPlatform: '维护项目',
      metaOpenSource: '开源工具',
      switchLangBtn: 'English',
      newsHeading: '近期动态',
      showMore: '展开全部动态',
      showLess: '收起',
      pubHeading: '学术论文',
      pubSubtitle: '围绕生成过程中的上下文效应，聚焦 NLP / RAG / ICL、AI for Business 与时空数据挖掘',
      pubSearchPlaceholder: '搜索标题、期刊/会议、年份或合作者…',
      pubLegend: '* 表示通讯作者；加粗标出本人姓名',
      pubEmpty: '未找到匹配的论文，请清空筛选或更换关键词。',
      projHeading: '维护项目与开源工具',
      projSubtitle: '聚焦持续维护的应用项目与开源科研工具；多篇论文开源代码亦陆续汇入 GitHub 仓库',
      projGroupMaintained: '维护项目',
      projGroupTools: '开源工具',
      projMoreTitle: '更多论文开源代码',
      projMoreDesc: '已发表论文的实验与复现代码正按时间顺序陆续迁入 GitHub，单篇入口亦见<a href="#publications">学术论文</a>栏的 <code>[Code]</code> 链接。',
      projMoreBtn: 'Learn more →',
      resumeHeading: '学术履历、教学与荣誉',
      resumePositions: '工作与教育经历',
      resumeTeaching: '教学与课程建设',
      resumeHonors: '荣誉与获奖',
      resumeService: '学术服务',
      serviceHeading: '招生与科研合作',
      contactHeading: '联系方式',
      contactLocation: '办公地点',
      contactEmail: '电子邮箱',
      contactLinks: '学术与开源主页',
      emailCopied: '邮箱已复制：lihuang@swufe.edu.cn',
      bibCopied: 'BibTeX 已复制到剪贴板',
      close: '关闭',
      copyBib: '复制 BibTeX',
      footerUpdate: '最后更新',
      filters: [
        { key: 'selected', label: '代表作' },
        { key: 'all', label: '全部' },
        { key: 'lead', label: '一作 / 通讯' },
        { key: 'nlp', label: 'NLP & RAG' },
        { key: 'finance', label: 'AI for Business' },
        { key: 'spatiotemporal', label: '时空数据' },
        { key: 'preprint', label: '预印本' },
      ],
      countFmt: (shown, total) => `显示 ${shown} / ${total} 篇已核验成果`,
      facts: [
        { icon: 'book', value: '35+', label: '高水平学术论文' },
        { icon: 'scholar', value: '414+', label: 'Google Scholar 引用 (h=10)' },
        { icon: 'award', value: '10+', label: '授权发明专利' },
        { icon: 'sparkles', value: '835', label: '省级一流 AI 智慧课程知识点' },
      ],
    },
    en: {
      aboutHeading: 'About',
      aboutSubname: 'Li Huang · Associate Professor, SWUFE',
      metaPosition: 'Role',
      metaPositionVal: 'Chair, Dept. of AI · Director, Comp. Competency Center',
      metaEmail: 'Email',
      metaCity: 'City',
      metaScholar: 'Google Scholar',
      metaGitHub: 'GitHub',
      metaOfficial: 'SWUFE',
      metaOfficialLink: 'Official Faculty Page',
      metaPlatform: 'Projects',
      metaOpenSource: 'Open-Source Tool',
      switchLangBtn: '中文',
      newsHeading: 'News',
      showMore: 'Show More',
      showLess: 'Show Less',
      pubHeading: 'Publications',
      pubSubtitle: 'Investigating Contextual Effects in Generation across NLP/RAG/ICL, AI for Business, and Spatiotemporal Data Mining',
      pubSearchPlaceholder: 'Search title, venue, year, or co-author…',
      pubLegend: '* Corresponding Author; my name is highlighted in bold',
      pubEmpty: 'No matching publications found.',
      projHeading: 'Projects & Open-Source Tools',
      projSubtitle: 'Actively maintained applications and open-source research tools; paper implementations are consolidated on GitHub',
      projGroupMaintained: 'Maintained Projects',
      projGroupTools: 'Open-Source Tools',
      projMoreTitle: 'Paper Code Repositories',
      projMoreDesc: 'Official implementations for published papers are being consolidated on GitHub in chronological order, and linked via <code>[Code]</code> under <a href="#publications">Publications</a>.',
      projMoreBtn: 'Learn more →',
      resumeHeading: 'Resume',
      resumePositions: 'Positions & Education',
      resumeTeaching: 'Teaching & Curriculum',
      resumeHonors: 'Honors & Awards',
      resumeService: 'Academic Service',
      serviceHeading: 'Prospective Students',
      contactHeading: 'Contact',
      contactLocation: 'Location',
      contactEmail: 'Email',
      contactLinks: 'Profiles',
      emailCopied: 'Email copied: lihuang@swufe.edu.cn',
      bibCopied: 'BibTeX copied to clipboard',
      close: 'Close',
      copyBib: 'Copy BibTeX',
      footerUpdate: 'Last updated',
      filters: [
        { key: 'selected', label: 'Selected' },
        { key: 'all', label: 'All' },
        { key: 'lead', label: 'First & Corr.' },
        { key: 'nlp', label: 'NLP & RAG' },
        { key: 'finance', label: 'AI for Business' },
        { key: 'spatiotemporal', label: 'Spatiotemporal' },
        { key: 'preprint', label: 'Preprints' },
      ],
      countFmt: (shown, total) => `Showing ${shown} of ${total} verified publications`,
      facts: [
        { icon: 'book', value: '35+', label: 'Peer-Reviewed Papers' },
        { icon: 'scholar', value: '414+', label: 'Scholar Citations (h=10)' },
        { icon: 'award', value: '10+', label: 'Invention Patents' },
        { icon: 'sparkles', value: '835', label: 'Smart AI Course Nodes' },
      ],
    },
  };

  // State
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  let lang = urlLang === 'en' || urlLang === 'zh' ? urlLang : (safeGet('lh_lang') || 'zh');
  let pubFilter = 'selected';
  let pubQuery = '';
  let newsExpanded = false;
  let activeBibtex = '';
  let toastTimer = null;

  function safeGet(k) { try { return localStorage.getItem(k); } catch (_) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (_) {} }
  function t(obj) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.zh || obj.en || '';
  }
  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function showToast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }
  async function copyText(text, msg) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      showToast(msg);
    } catch (_) {
      showToast(text);
    }
  }

  // 1. Left Floating Sidebar Nav
  function renderNav() {
    const ul = document.getElementById('nav-links');
    ul.innerHTML = D.nav
      .map((item, i) => `
        <li>
          <a href="#${item.id}" data-nav="${item.id}" class="${i === 0 ? 'active' : ''}">
            ${ICONS[item.icon] || ICONS.home}
            <span>${esc(t(item))}</span>
          </a>
        </li>
      `)
      .join('');

    ul.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        document.getElementById('header').classList.remove('header-show');
        const toggle = document.getElementById('header-toggle');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  // 2. Hero (#home)
  function renderHome() {
    const P = D.profile;
    const U = UI[lang];
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = t(D.meta.title);

    document.getElementById('home-name').innerHTML = lang === 'zh'
      ? `${esc(P.nameZh)}<span class="home-name-sub">${esc(P.nameEn)}</span>`
      : `${esc(P.nameEn)}<span class="home-name-sub">${esc(P.nameZh)}</span>`;

    document.getElementById('home-socials').innerHTML = `
      <button type="button" class="social-icon-btn" id="hero-copy-email" title="${esc(P.email)}" aria-label="Copy Email">
        <span style="width:22px;height:22px;display:inline-flex">${ICONS.mail}</span>
      </button>
      <a href="${esc(P.scholarUrl)}" target="_blank" rel="noopener noreferrer" title="Google Scholar" aria-label="Google Scholar">
        <span style="width:22px;height:22px;display:inline-flex">${ICONS.scholar}</span>
      </a>
      <a href="${esc(P.githubUrl)}" target="_blank" rel="noopener noreferrer" title="GitHub @minorfox" aria-label="GitHub">
        <span style="width:22px;height:22px;display:inline-flex">${ICONS.github}</span>
      </a>
      <a href="${esc(P.echorialUrl)}" target="_blank" rel="noopener noreferrer" title="Echorial · 艾可瑞亚 (echorial.com)" aria-label="Echorial">
        <span style="width:22px;height:22px;display:inline-flex">${ICONS.pulse}</span>
      </a>
      <a href="${esc(P.swufeUrl)}" target="_blank" rel="noopener noreferrer" title="${esc(U.metaOfficialLink)}" aria-label="SWUFE Official Page">
        <span style="width:22px;height:22px;display:inline-flex">${ICONS.university}</span>
      </a>
      <span class="social-divider" aria-hidden="true"></span>
      <button type="button" class="hero-lang-switch" id="hero-lang-toggle" aria-label="Switch language">
        <span style="width:14px;height:14px;display:inline-flex">${ICONS.globe}</span>
        <span>${esc(U.switchLangBtn)}</span>
      </button>
    `;

    document.getElementById('hero-copy-email').addEventListener('click', () => {
      copyText(P.email, U.emailCopied);
    });
    document.getElementById('hero-lang-toggle').addEventListener('click', () => {
      switchLanguage(lang === 'zh' ? 'en' : 'zh');
    });

    document.getElementById('typed-text').textContent = t(P.heroSubtitle);
  }

  // 3. Profile & Facts (#about)
  function renderAbout() {
    const P = D.profile;
    const U = UI[lang];

    document.getElementById('about-name').textContent = U.aboutSubname;

    document.getElementById('about-meta').innerHTML = `
      <div class="meta-item"><span class="meta-chevron">›</span><span class="meta-label">${esc(U.metaPosition)}:</span><span class="meta-val">${esc(U.metaPositionVal)}</span></div>
      <div class="meta-item"><span class="meta-chevron">›</span><span class="meta-label">${esc(U.metaScholar)}:</span><span class="meta-val"><a href="${esc(P.scholarUrl)}" target="_blank" rel="noopener noreferrer">Li Huang (h-index 10)</a></span></div>
      <div class="meta-item"><span class="meta-chevron">›</span><span class="meta-label">${esc(U.metaEmail)}:</span><span class="meta-val"><button type="button" class="inline-copy" id="about-copy-email">${esc(P.email)}</button></span></div>
      <div class="meta-item"><span class="meta-chevron">›</span><span class="meta-label">${esc(U.metaGitHub)}:</span><span class="meta-val"><a href="${esc(P.githubUrl)}" target="_blank" rel="noopener noreferrer">@minorfox</a></span></div>
      <div class="meta-item"><span class="meta-chevron">›</span><span class="meta-label">${esc(U.metaCity)}:</span><span class="meta-val">${esc(t(P.city))}</span></div>
      <div class="meta-item"><span class="meta-chevron">›</span><span class="meta-label">${esc(U.metaOfficial)}:</span><span class="meta-val"><a href="${esc(P.swufeUrl)}" target="_blank" rel="noopener noreferrer">${esc(U.metaOfficialLink)}</a></span></div>
      <div class="meta-item"><span class="meta-chevron">›</span><span class="meta-label">${esc(U.metaPlatform)}:</span><span class="meta-val"><a href="${esc(P.echorialUrl)}" target="_blank" rel="noopener noreferrer">${lang === 'zh' ? '艾可瑞亚 Echorial' : 'Echorial'}</a> · <a href="https://github.com/minorfox/yujian-sign-translation" target="_blank" rel="noopener noreferrer">${lang === 'zh' ? '语见' : 'Yujian'}</a></span></div>
      <div class="meta-item"><span class="meta-chevron">›</span><span class="meta-label">${esc(U.metaOpenSource)}:</span><span class="meta-val"><a href="https://github.com/minorfox/FoxReader" target="_blank" rel="noopener noreferrer">FoxReader</a></span></div>
    `;

    document.getElementById('about-copy-email').addEventListener('click', () => {
      copyText(P.email, U.emailCopied);
    });

    document.getElementById('about-bio').innerHTML = t(P.bio)
      .map(p => `<p>${p}</p>`)
      .join('');

    document.getElementById('facts-row').innerHTML = U.facts
      .map(f => `
        <div class="fact-item">
          <div class="fact-icon" aria-hidden="true">
            <span style="width:22px;height:22px;display:inline-flex">${ICONS[f.icon]}</span>
          </div>
          <div class="fact-value">${esc(f.value)}</div>
          <div class="fact-label">${esc(f.label)}</div>
        </div>
      `)
      .join('');
  }

  // 4. News (#news)
  function renderNews() {
    const U = UI[lang];
    document.getElementById('news-heading').textContent = U.newsHeading;

    const visibleCount = newsExpanded ? D.news.length : Math.min(5, D.news.length);
    const items = D.news.slice(0, visibleCount);

    document.getElementById('news-list').innerHTML = items
      .map(n => `
        <div class="news-item">
          <span class="news-date">${esc(n.date)}</span>
          <span class="news-icon" aria-hidden="true"><span style="width:15px;height:15px;display:inline-flex">${ICONS.file}</span></span>
          <div class="news-text">${t(n)}</div>
        </div>
      `)
      .join('');

    const moreWrap = document.getElementById('news-more-wrap');
    if (D.news.length > 5) {
      moreWrap.innerHTML = `<button type="button" class="btn-outline" id="news-toggle-btn">${esc(newsExpanded ? U.showLess : U.showMore)}</button>`;
      document.getElementById('news-toggle-btn').addEventListener('click', () => {
        newsExpanded = !newsExpanded;
        renderNews();
      });
    } else {
      moreWrap.innerHTML = '';
    }
  }

  // 5. Publications (#publications)
  function filterPubs(key, query) {
    const q = (query || '').trim().toLowerCase();
    return D.publications.filter(p => {
      let ok = true;
      if (key === 'selected') ok = Boolean(p.selected);
      else if (key === 'lead') ok = p.role === 'first' || p.role === 'corresponding';
      else if (key !== 'all') ok = Array.isArray(p.topics) && p.topics.includes(key);
      if (!ok) return false;
      if (!q) return true;
      return [p.title, p.venue, p.venueShort, p.tier, String(p.year), p.authors.join(' ')].join(' ').toLowerCase().includes(q);
    });
  }

  function formatAuthor(a) {
    return /^Li Huang\*?$|^黄鹂\*?$/.test(a.trim()) ? `<strong>${esc(a)}</strong>` : esc(a);
  }

  function renderPubControls() {
    const U = UI[lang];
    document.getElementById('pub-heading').textContent = U.pubHeading;
    document.getElementById('pub-subtitle').textContent = U.pubSubtitle;
    document.getElementById('pub-legend').textContent = U.pubLegend;
    document.getElementById('pub-search-input').placeholder = U.pubSearchPlaceholder;

    const box = document.getElementById('pub-filters');
    box.innerHTML = U.filters
      .map(f => {
        const cnt = filterPubs(f.key, '').length;
        return `<button type="button" class="filter-btn ${pubFilter === f.key ? 'active' : ''}" data-filter="${f.key}" role="tab" aria-selected="${pubFilter === f.key}">${esc(f.label)} (${cnt})</button>`;
      })
      .join('');

    box.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        pubFilter = btn.dataset.filter;
        renderPubControls();
        renderPubList();
      });
    });
  }

  function renderPubList() {
    const U = UI[lang];
    const items = filterPubs(pubFilter, pubQuery);
    document.getElementById('pub-count').textContent = U.countFmt(items.length, D.publications.length);

    const list = document.getElementById('pub-list');
    if (!items.length) {
      list.innerHTML = `<div class="pub-empty">${esc(U.pubEmpty)}</div>`;
      return;
    }

    list.innerHTML = items
      .map(p => {
        const awardHtml = p.award ? `<span class="pub-award">★ ${esc(t(p.award))}</span>` : '';
        const codeHtml = p.codeUrl ? `<a href="${esc(p.codeUrl)}" target="_blank" rel="noopener noreferrer">[Code]</a>` : '';
        const noteHtml = p.note ? `<span class="pub-note">(${esc(t(p.note))})</span>` : '';

        return `
          <article class="pub-item">
            <h4 class="pub-title">
              <a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${esc(p.title)}</a>${awardHtml}
            </h4>
            <p class="pub-authors">${p.authors.map(formatAuthor).join(', ')}</p>
            <p class="pub-venue-row">
              <em>${esc(p.venue)}</em>
              ${noteHtml}
              <span class="pub-inline-links">
                <a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">[Paper]</a>
                ${codeHtml}
                <button type="button" class="pub-inline-btn" data-bib="${esc(p.id)}">[BibTeX]</button>
              </span>
            </p>
          </article>
        `;
      })
      .join('');

    list.querySelectorAll('[data-bib]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pub = D.publications.find(x => x.id === btn.dataset.bib);
        if (pub) openBibModal(pub);
      });
    });
  }

  // 6. Projects & Open-Source Tools (#projects)
  function renderProjectCard(p, wide) {
    const highlights = t(p.highlights) || [];
    const headerHtml = `
      <div class="project-head">
        ${p.icon ? `<img class="project-icon-sm" src="${esc(p.icon)}" alt="" />` : ''}
        <h4 class="project-name">${esc(p.name)}</h4>
      </div>
      <span class="project-meta">${esc(t(p.badge))}</span>
    `;
    const linksHtml = `
      <div class="project-links">
        ${p.links.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">[${esc(t(l.label))}]</a>`).join('')}
      </div>
    `;

    if (wide) {
      return `
        <article class="project-item project-item-wide">
          <div class="project-wide-main">
            ${headerHtml}
            <p class="project-desc">${esc(t(p.description))}</p>
            <p class="project-stack">${esc(p.stack.join(' · '))}</p>
            ${linksHtml}
          </div>
          ${highlights.length ? `
            <ul class="project-wide-highlights">
              ${highlights.map(h => `<li><span class="meta-chevron" aria-hidden="true">›</span><span>${esc(h)}</span></li>`).join('')}
            </ul>
          ` : ''}
        </article>
      `;
    }

    return `
      <article class="project-item">
        ${headerHtml}
        <p class="project-desc">${esc(t(p.description))}</p>
        <p class="project-stack">${esc(p.stack.join(' · '))}</p>
        ${linksHtml}
      </article>
    `;
  }

  function renderProjects() {
    const U = UI[lang];
    document.getElementById('proj-heading').textContent = U.projHeading;
    document.getElementById('proj-subtitle').textContent = U.projSubtitle;

    const maintained = D.projects.filter(p => p.category !== 'tool');
    const tools = D.projects.filter(p => p.category === 'tool');

    const renderGroup = (title, items) => {
      if (!items.length) return '';
      const isSingle = items.length === 1;
      return `
        <div class="project-group">
          <h3 class="project-group-title">${esc(title)}</h3>
          <div class="${isSingle ? 'projects-grid projects-grid-single' : 'projects-grid'}">
            ${items.map(p => renderProjectCard(p, isSingle)).join('')}
          </div>
        </div>
      `;
    };

    const moreBar = `
      <div class="projects-more-bar">
        <div class="projects-more-info">
          <span class="projects-more-title">${esc(U.projMoreTitle)}</span>
          <span class="projects-more-desc">${U.projMoreDesc}</span>
        </div>
        <a class="btn-outline btn-sm projects-more-btn" href="${esc(D.profile.githubUrl)}?tab=repositories" target="_blank" rel="noopener noreferrer">
          <span style="width:15px;height:15px;display:inline-flex" aria-hidden="true">${ICONS.github}</span>
          <span>${esc(U.projMoreBtn)}</span>
        </a>
      </div>
    `;

    document.getElementById('projects-grid').innerHTML =
      renderGroup(U.projGroupMaintained, maintained) +
      renderGroup(U.projGroupTools, tools) +
      moreBar;
  }

  // 7. Resume 2-Column Timeline (#resume)
  function renderResume() {
    const U = UI[lang];
    document.getElementById('resume-heading').textContent = U.resumeHeading;

    const leftHtml = `
      <h3 class="resume-title">${esc(U.resumePositions)}</h3>
      ${D.timeline.map(item => `
        <div class="resume-item">
          <h4>${esc(t(item.title))}</h4>
          <h5>${esc(item.period)}</h5>
          <p><em>${esc(t(item.org))}</em></p>
        </div>
      `).join('')}

      <h3 class="resume-title">${esc(U.resumeTeaching)}</h3>
      <div class="resume-item">
        <h4>${esc(lang === 'zh' ? '四川省人工智能高阶课程 · 省线下一流课程' : 'Provincial Advanced & First-Class AI Course')}</h4>
        <h5>CST122 · 835 / 305 / 121</h5>
        <p>${esc(t(D.teaching.highlight))}</p>
      </div>
      ${D.teaching.courses.map(c => `
        <div class="resume-item">
          <h4>${esc(t(c.title))}</h4>
          <h5>${esc(t(c.level))} · ${esc(t(c.role))}</h5>
        </div>
      `).join('')}
    `;

    const rightHtml = `
      <h3 class="resume-title">${esc(U.resumeHonors)}</h3>
      ${D.honors.map(h => `
        <div class="resume-item">
          <h4>${esc(t(h))}</h4>
          <h5>${esc(h.year)}</h5>
        </div>
      `).join('')}

      <h3 class="resume-title">${esc(U.resumeService)}</h3>
      ${D.services.map(s => `
        <div class="resume-item">
          <h4>${esc(t(s.group))}</h4>
          <p>${esc(t(s.items))}</p>
        </div>
      `).join('')}
    `;

    document.getElementById('resume-col-left').innerHTML = leftHtml;
    document.getElementById('resume-col-right').innerHTML = rightHtml;
  }

  // 8. Prospective Students / Opening (#service)
  function renderService() {
    const U = UI[lang];
    const R = D.recruitment;
    document.getElementById('service-heading').textContent = U.serviceHeading;

    document.getElementById('service-list').innerHTML = `
      <div class="service-item">
        <h4>${esc(t(R.tracks[0].title))}</h4>
        <p>${esc(t(R.tracks[0].body))}</p>
      </div>
      <div class="service-item">
        <h4>${esc(t(R.tracks[1].title))}</h4>
        <p>${esc(t(R.tracks[1].body))}</p>
      </div>
      <div class="service-item">
        <h4>${esc(lang === 'zh' ? '申请与联系说明' : 'How to Reach Out')}</h4>
        <p>${esc(t(R.intro))} ${esc(t(R.ctaNote))}</p>
      </div>
    `;
  }

  // 9. Contact & Footer
  function renderContactAndFooter() {
    const P = D.profile;
    const U = UI[lang];

    document.getElementById('contact-heading').textContent = U.contactHeading;
    document.getElementById('contact-grid').innerHTML = `
      <div class="contact-item">
        <div class="contact-icon" aria-hidden="true"><span style="width:20px;height:20px;display:inline-flex">${ICONS.pin}</span></div>
        <div>
          <h4>${esc(U.contactLocation)}</h4>
          <p>${esc(t(P.office))}</p>
        </div>
      </div>
      <div class="contact-item">
        <div class="contact-icon" aria-hidden="true"><span style="width:20px;height:20px;display:inline-flex">${ICONS.mail}</span></div>
        <div>
          <h4>${esc(U.contactEmail)}</h4>
          <p><a href="mailto:${esc(P.email)}">${esc(P.email)}</a> · <button type="button" class="inline-copy" id="contact-copy-email">[${lang === 'zh' ? '复制' : 'Copy'}]</button></p>
        </div>
      </div>
      <div class="contact-item">
        <div class="contact-icon" aria-hidden="true"><span style="width:20px;height:20px;display:inline-flex">${ICONS.globe}</span></div>
        <div>
          <h4>${esc(U.contactLinks)}</h4>
          <p>
            <a href="${esc(P.scholarUrl)}" target="_blank" rel="noopener noreferrer">Google Scholar</a> ·
            <a href="${esc(P.githubUrl)}" target="_blank" rel="noopener noreferrer">GitHub</a> ·
            <a href="${esc(P.echorialUrl)}" target="_blank" rel="noopener noreferrer">Echorial</a> ·
            <a href="${esc(P.swufeUrl)}" target="_blank" rel="noopener noreferrer">SWUFE</a>
          </p>
        </div>
      </div>
    `;

    document.getElementById('contact-copy-email').addEventListener('click', () => {
      copyText(P.email, U.emailCopied);
    });

    document.getElementById('footer-name').textContent = lang === 'zh' ? `${P.nameZh} (${P.nameEn})` : `${P.nameEn} (${P.nameZh})`;
    document.getElementById('footer-motto').textContent = t(P.motto);
    document.getElementById('footer-socials').innerHTML = `
      <a href="mailto:${esc(P.email)}" title="Email" aria-label="Email"><span style="width:17px;height:17px;display:inline-flex">${ICONS.mail}</span></a>
      <a href="${esc(P.scholarUrl)}" target="_blank" rel="noopener noreferrer" title="Google Scholar" aria-label="Google Scholar"><span style="width:17px;height:17px;display:inline-flex">${ICONS.scholar}</span></a>
      <a href="${esc(P.githubUrl)}" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub"><span style="width:17px;height:17px;display:inline-flex">${ICONS.github}</span></a>
      <a href="${esc(P.echorialUrl)}" target="_blank" rel="noopener noreferrer" title="Echorial (echorial.com)" aria-label="Echorial"><span style="width:17px;height:17px;display:inline-flex">${ICONS.pulse}</span></a>
      <a href="${esc(P.swufeUrl)}" target="_blank" rel="noopener noreferrer" title="SWUFE" aria-label="SWUFE"><span style="width:17px;height:17px;display:inline-flex">${ICONS.university}</span></a>
    `;
    document.getElementById('footer-copy').textContent =
      `© ${new Date().getFullYear()} ${P.nameEn} (${P.nameZh}) · ${U.footerUpdate}: ${t(D.meta.lastUpdated)}`;
  }

  // Modal
  function openBibModal(pub) {
    const U = UI[lang];
    activeBibtex = pub.bibtex;
    const modal = document.getElementById('bib-modal');
    document.getElementById('bib-modal-title').textContent = pub.title;
    document.getElementById('bib-code').textContent = pub.bibtex;
    document.getElementById('bib-close-btn').textContent = U.close;
    document.getElementById('bib-copy-btn').textContent = U.copyBib;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('open'));
  }

  function closeBibModal() {
    const modal = document.getElementById('bib-modal');
    modal.classList.remove('open');
    setTimeout(() => { modal.hidden = true; }, 180);
  }

  function renderAll() {
    renderNav();
    renderHome();
    renderAbout();
    renderNews();
    renderPubControls();
    renderPubList();
    renderProjects();
    renderResume();
    renderService();
    renderContactAndFooter();
  }

  function setupScrollBehaviors() {
    const scrollBtn = document.getElementById('scroll-top');
    const sections = D.nav.map(n => document.getElementById(n.id)).filter(Boolean);

    function onScroll() {
      const y = window.scrollY || window.pageYOffset;
      scrollBtn.classList.toggle('active', y > 260);

      let activeId = sections[0] ? sections[0].id : 'home';
      const offset = y + 200;
      for (const sec of sections) {
        if (sec.offsetTop <= offset) activeId = sec.id;
      }
      document.querySelectorAll('[data-nav]').forEach(a => {
        a.classList.toggle('active', a.dataset.nav === activeId);
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function switchLanguage(next) {
    if (next !== 'zh' && next !== 'en') return;
    if (next === lang) return;
    lang = next;
    safeSet('lh_lang', lang);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.replaceState(null, '', url.toString());
    } catch (_) {}
    renderAll();
  }

  function initEvents() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        switchLanguage(btn.dataset.lang);
      });
    });

    const toggle = document.getElementById('header-toggle');
    const header = document.getElementById('header');
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('header-show');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    document.getElementById('pub-search-input').addEventListener('input', e => {
      pubQuery = e.target.value;
      renderPubList();
    });

    const modal = document.getElementById('bib-modal');
    document.getElementById('bib-close').addEventListener('click', closeBibModal);
    document.getElementById('bib-close-btn').addEventListener('click', closeBibModal);
    document.getElementById('bib-copy-btn').addEventListener('click', () => {
      copyText(activeBibtex, UI[lang].bibCopied);
    });
    modal.addEventListener('click', e => { if (e.target === modal) closeBibModal(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !modal.hidden) closeBibModal();
    });
  }

  renderAll();
  initEvents();
  setupScrollBehaviors();
})();
