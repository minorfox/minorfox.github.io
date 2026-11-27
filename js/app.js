/* ==========================================================================
   App Controller — Bilingual rendering, theme switch, pub filters & BibTeX
   ========================================================================== */

(function () {
  'use strict';

  const D = window.SITE_DATA;
  if (!D) return;

  const UI_COPY = {
    zh: {
      copyEmail: '复制邮箱',
      emailCopied: '邮箱已复制：lihuang@swufe.edu.cn',
      bibCopied: 'BibTeX 引用已复制到剪贴板',
      scholar: 'Google Scholar',
      github: 'GitHub @minorfox',
      swufePage: '西财官方主页',
      newsKicker: 'UPDATES',
      newsTitle: '近期动态',
      newsSub: '论文录用、开源发布、教学竞赛与学术荣誉进展',
      researchKicker: 'RESEARCH AGENDA',
      researchTitle: '研究方向',
      researchSub: '以“生成过程中的上下文效应”为主线，贯通语言生成、财经智能决策与时空轨迹理解',
      pubKicker: 'PUBLICATIONS',
      pubTitle: '学术论文',
      pubSub: '可按研究主题、作者角色或关键词筛选，支持一键查看与复制 BibTeX',
      pubSearchPlaceholder: '搜索标题、期刊/会议、年份或合作者…',
      pubLegend: '* 表示通讯作者；下划线标出本人姓名',
      pubEmpty: '未找到匹配的论文，请尝试清空筛选条件或更换关键词。',
      paperLink: '论文 / Scholar',
      codeLink: '代码',
      bibtexBtn: 'BibTeX',
      firstAuthor: '第一作者',
      corrAuthor: '通讯作者',
      projKicker: 'OPEN SOURCE & SYSTEMS',
      projTitle: '开源与工程实践',
      projSub: '源自 GitHub @minorfox 的活跃项目：从离线科研工具到无障碍公益系统',
      teachKicker: 'TEACHING & FUNDING',
      teachTitle: '教学改革与科研项目',
      teachSub: '将技术严谨性与价值判断融入课堂，依托国家与省部级项目推进前沿探索',
      teachingPanelTitle: '课程建设与教学',
      grantsPanelTitle: '主要科研项目',
      bioKicker: 'BIOGRAPHY & SERVICE',
      bioTitle: '学术履历、荣誉与服务',
      bioSub: '工作教育经历、代表性荣誉获奖与国内外学术社区服务',
      timelinePanelTitle: '工作与教育经历',
      honorsPanelTitle: '代表性荣誉获奖',
      sendEmail: '发送邮件联系',
      backTop: '返回顶部',
      close: '关闭',
      copyBib: '复制 BibTeX',
      footerUpdate: '最后更新',
      filters: [
        { key: 'selected', label: '代表作' },
        { key: 'all', label: '全部论文' },
        { key: 'lead', label: '一作 / 通讯' },
        { key: 'nlp', label: 'NLP & RAG' },
        { key: 'finance', label: 'AI for Business' },
        { key: 'spatiotemporal', label: '时空智能' },
        { key: 'preprint', label: '预印本' },
      ],
      countFmt: (shown, total) => `当前显示 ${shown} / ${total} 篇已核验成果`,
    },
    en: {
      copyEmail: 'Copy Email',
      emailCopied: 'Email copied: lihuang@swufe.edu.cn',
      bibCopied: 'BibTeX copied to clipboard',
      scholar: 'Google Scholar',
      github: 'GitHub @minorfox',
      swufePage: 'SWUFE Profile',
      newsKicker: 'UPDATES',
      newsTitle: 'News & Milestones',
      newsSub: 'Recent publications, open-source releases, student mentoring, and honors',
      researchKicker: 'RESEARCH AGENDA',
      researchTitle: 'Research Focus',
      researchSub: 'Anchored in Contextual Effects in Generation across NLP/RAG, AI for Business, and Spatiotemporal Intelligence',
      pubKicker: 'PUBLICATIONS',
      pubTitle: 'Publications',
      pubSub: 'Filter by theme, authorship role, or keyword; inspect and copy BibTeX citations in one click',
      pubSearchPlaceholder: 'Search title, venue, year, or co-author…',
      pubLegend: '* denotes Corresponding Author; my name is underlined',
      pubEmpty: 'No matching publications found. Try clearing your filter or search query.',
      paperLink: 'Paper / Scholar',
      codeLink: 'Code',
      bibtexBtn: 'BibTeX',
      firstAuthor: 'First Author',
      corrAuthor: 'Corresponding',
      projKicker: 'OPEN SOURCE & SYSTEMS',
      projTitle: 'Open-Source & Engineering Systems',
      projSub: 'Active builds from GitHub @minorfox—from local-first research software to accessible Tech-for-Good',
      teachKicker: 'TEACHING & FUNDING',
      teachTitle: 'Teaching & Research Grants',
      teachSub: 'Integrating technical depth with responsible AI education, supported by national and provincial funding',
      teachingPanelTitle: 'Teaching & Curriculum Innovation',
      grantsPanelTitle: 'Funded Research Grants',
      bioKicker: 'BIOGRAPHY & SERVICE',
      bioTitle: 'Experience, Honors & Service',
      bioSub: 'Academic positions, selected awards, and professional community service',
      timelinePanelTitle: 'Positions & Education',
      honorsPanelTitle: 'Selected Honors & Awards',
      sendEmail: 'Email Dr. Huang',
      backTop: 'Back to top',
      close: 'Close',
      copyBib: 'Copy BibTeX',
      footerUpdate: 'Last updated',
      filters: [
        { key: 'selected', label: 'Selected' },
        { key: 'all', label: 'All' },
        { key: 'lead', label: 'First / Corr.' },
        { key: 'nlp', label: 'NLP & RAG' },
        { key: 'finance', label: 'AI for Business' },
        { key: 'spatiotemporal', label: 'Spatiotemporal' },
        { key: 'preprint', label: 'Preprints' },
      ],
      countFmt: (shown, total) => `Showing ${shown} of ${total} verified works`,
    },
  };

  // State
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  let lang = urlLang === 'en' || urlLang === 'zh'
    ? urlLang
    : (safeGet('lh_lang') || 'zh');

  let theme = safeGet('lh_theme') ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  let pubFilter = 'selected';
  let pubQuery = '';
  let activeBibtex = '';
  let toastTimer = null;

  // Helpers
  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }
  function safeSet(key, val) {
    try { localStorage.setItem(key, val); } catch (_) {}
  }
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
    toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
  }
  async function copyText(text, successMsg) {
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
      showToast(successMsg);
    } catch (_) {
      showToast(text);
    }
  }

  // Apply Theme
  function applyTheme(next) {
    theme = next;
    document.documentElement.setAttribute('data-theme', theme);
    safeSet('lh_theme', theme);
  }

  // Render Navigation
  function renderNav() {
    const desktop = document.getElementById('nav-links');
    const mobile = document.getElementById('mobile-nav-links');
    const html = D.nav
      .map(item => `<li><a href="#${item.id}" data-nav="${item.id}">${esc(t(item))}</a></li>`)
      .join('');
    desktop.innerHTML = html;
    mobile.innerHTML = html;

    document.getElementById('brand-name').textContent = lang === 'zh' ? D.profile.nameZh : D.profile.nameEn;

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  // Render Hero
  function renderHero() {
    const P = D.profile;
    const U = UI_COPY[lang];

    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = t(D.meta.title);

    document.getElementById('hero-eyebrow').textContent = t(P.eyebrow);
    document.getElementById('hero-name').innerHTML = lang === 'zh'
      ? `${esc(P.nameZh)} <span class="hero-name-alt">${esc(P.nameEn)}</span>`
      : `${esc(P.nameEn)} <span class="hero-name-alt">${esc(P.nameZh)}</span>`;

    document.getElementById('hero-quote').textContent = t(P.leadQuote);

    document.getElementById('hero-affiliations').innerHTML = t(P.roles)
      .map(line => `<li><span>${esc(line)}</span></li>`)
      .join('');

    document.getElementById('hero-actions').innerHTML = `
      <button type="button" class="btn btn-primary" id="copy-email-btn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        <span>${esc(P.email)}</span>
      </button>
      <a class="btn" href="${esc(P.scholarUrl)}" target="_blank" rel="noopener noreferrer">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        <span>${esc(U.scholar)}</span>
      </a>
      <a class="btn" href="${esc(P.githubUrl)}" target="_blank" rel="noopener noreferrer">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        <span>${esc(U.github)}</span>
      </a>
      <a class="btn" href="${esc(P.swufeUrl)}" target="_blank" rel="noopener noreferrer">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>
        <span>${esc(U.swufePage)}</span>
      </a>
    `;

    document.getElementById('copy-email-btn').addEventListener('click', () => {
      copyText(P.email, U.emailCopied);
    });

    document.getElementById('hero-bio').innerHTML = t(P.bio)
      .map(p => `<p>${p}</p>`)
      .join('');

    document.getElementById('status-badge').textContent = t(P.statusBadge);
    document.getElementById('office-text').textContent = t(P.office);

    document.getElementById('metrics-strip').innerHTML = P.stats
      .map(s => `
        <div class="metric-card">
          <div class="metric-value">${esc(s.value)}</div>
          <div class="metric-label">${esc(t(s))}</div>
        </div>
      `)
      .join('');
  }

  // Render News
  function renderNews() {
    const U = UI_COPY[lang];
    document.getElementById('news-kicker').textContent = U.newsKicker;
    document.getElementById('news-title').textContent = U.newsTitle;
    document.getElementById('news-sub').textContent = U.newsSub;

    document.getElementById('news-list').innerHTML = D.news
      .map(n => `
        <article class="news-item">
          <span class="news-date">${esc(n.date)}</span>
          <span class="news-tag">${esc(t(n.tag))}</span>
          <div class="news-text">${t(n)}</div>
        </article>
      `)
      .join('');
  }

  // Render Research Pillars
  function renderResearch() {
    const U = UI_COPY[lang];
    document.getElementById('research-kicker').textContent = U.researchKicker;
    document.getElementById('research-title').textContent = U.researchTitle;
    document.getElementById('research-sub').textContent = U.researchSub;

    document.getElementById('pillars-grid').innerHTML = D.researchPillars
      .map(p => `
        <article class="pillar-card">
          <div class="pillar-top">
            <span class="pillar-num">${esc(p.index)}</span>
          </div>
          <h3 class="pillar-title">${esc(t(p.title))}</h3>
          <p class="pillar-desc">${esc(t(p.summary))}</p>
          <div class="chip-row">
            ${p.keywords.map(k => `<span class="chip">${esc(k)}</span>`).join('')}
          </div>
          <div class="pillar-venues">${esc(p.venues)}</div>
        </article>
      `)
      .join('');
  }

  // Render Publications Section Chrome & Filtered Rows
  function renderPublicationsChrome() {
    const U = UI_COPY[lang];
    document.getElementById('pub-kicker').textContent = U.pubKicker;
    document.getElementById('pub-title').textContent = U.pubTitle;
    document.getElementById('pub-sub').textContent = U.pubSub;
    document.getElementById('pub-legend').textContent = U.pubLegend;

    const input = document.getElementById('pub-search-input');
    input.placeholder = U.pubSearchPlaceholder;

    const filterBox = document.getElementById('pub-filters');
    filterBox.innerHTML = U.filters
      .map(f => {
        const count = filterPubs(f.key, '').length;
        return `<button type="button" class="pill-btn ${pubFilter === f.key ? 'active' : ''}" data-filter="${f.key}" role="tab" aria-selected="${pubFilter === f.key}">${esc(f.label)} (${count})</button>`;
      })
      .join('');

    filterBox.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        pubFilter = btn.dataset.filter;
        renderPublicationsChrome();
        renderPublicationsList();
      });
    });
  }

  function filterPubs(filterKey, query) {
    const q = (query || '').trim().toLowerCase();
    return D.publications.filter(pub => {
      let matchCat = true;
      if (filterKey === 'selected') matchCat = Boolean(pub.selected);
      else if (filterKey === 'lead') matchCat = pub.role === 'first' || pub.role === 'corresponding';
      else if (filterKey !== 'all') matchCat = Array.isArray(pub.topics) && pub.topics.includes(filterKey);

      if (!matchCat) return false;
      if (!q) return true;

      const haystack = [
        pub.title,
        pub.venue,
        pub.venueShort,
        pub.tier,
        String(pub.year),
        pub.authors.join(' '),
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }

  function formatAuthor(a) {
    const isMe = /^Li Huang\*?$|^黄鹂\*?$/.test(a.trim());
    return isMe ? `<span class="me">${esc(a)}</span>` : esc(a);
  }

  function renderPublicationsList() {
    const U = UI_COPY[lang];
    const items = filterPubs(pubFilter, pubQuery);
    document.getElementById('pub-count').textContent = U.countFmt(items.length, D.publications.length);

    const listEl = document.getElementById('pub-list');
    if (items.length === 0) {
      listEl.innerHTML = `<div class="pub-empty">${esc(U.pubEmpty)}</div>`;
      return;
    }

    // Group by year descending
    const groups = new Map();
    for (const p of items) {
      if (!groups.has(p.year)) groups.set(p.year, []);
      groups.get(p.year).push(p);
    }

    const years = Array.from(groups.keys()).sort((a, b) => b - a);
    listEl.innerHTML = years
      .map(year => {
        const cards = groups.get(year).map(p => {
          const roleBadge = p.role === 'first'
            ? `<span class="badge badge-role">${esc(U.firstAuthor)}</span>`
            : (p.role === 'corresponding' ? `<span class="badge badge-role">${esc(U.corrAuthor)}</span>` : '');
          const awardBadge = p.award
            ? `<span class="badge badge-award">★ ${esc(t(p.award))}</span>`
            : '';
          const noteHtml = p.note ? `<p class="pub-note">${esc(t(p.note))}</p>` : '';
          const codeBtn = p.codeUrl
            ? `<a class="mini-btn" href="${esc(p.codeUrl)}" target="_blank" rel="noopener noreferrer">${esc(U.codeLink)} ↗</a>`
            : '';

          return `
            <article class="pub-card">
              <div>
                <div class="pub-badges">
                  <span class="badge badge-venue">${esc(p.venueShort)}</span>
                  ${p.tier ? `<span class="badge badge-tier">${esc(p.tier)}</span>` : ''}
                  ${roleBadge}
                  ${awardBadge}
                </div>
                <h3 class="pub-title">
                  <a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${esc(p.title)}</a>
                </h3>
                <p class="pub-authors">${p.authors.map(formatAuthor).join(', ')}</p>
                <p class="pub-venue-full">${esc(p.venue)}</p>
                ${noteHtml}
              </div>
              <div class="pub-actions">
                <a class="mini-btn" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${esc(U.paperLink)} ↗</a>
                ${codeBtn}
                <button type="button" class="mini-btn" data-bib="${esc(p.id)}">{ } ${esc(U.bibtexBtn)}</button>
              </div>
            </article>
          `;
        }).join('');

        return `
          <div class="pub-year-group">
            <div class="pub-year-heading">${year}</div>
            ${cards}
          </div>
        `;
      })
      .join('');

    listEl.querySelectorAll('[data-bib]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pub = D.publications.find(x => x.id === btn.dataset.bib);
        if (pub) openBibModal(pub);
      });
    });
  }

  // BibTeX Modal
  function openBibModal(pub) {
    const U = UI_COPY[lang];
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

  // Render Open Source Projects
  function renderProjects() {
    const U = UI_COPY[lang];
    document.getElementById('proj-kicker').textContent = U.projKicker;
    document.getElementById('proj-title').textContent = U.projTitle;
    document.getElementById('proj-sub').textContent = U.projSub;

    document.getElementById('projects-grid').innerHTML = D.projects
      .map(proj => {
        const iconHtml = proj.icon
          ? `<img src="${esc(proj.icon)}" alt="${esc(proj.name)} icon" />`
          : esc(proj.monogram || proj.name[0]);
        return `
          <article class="project-card">
            <div class="project-head">
              <div class="project-icon" aria-hidden="true">${iconHtml}</div>
              <div>
                <span class="project-badge">${esc(t(proj.badge))}</span>
                <h3 class="project-name">${esc(proj.name)}</h3>
              </div>
            </div>
            <p class="project-tagline">${esc(t(proj.tagline))}</p>
            <p class="project-desc">${esc(t(proj.description))}</p>
            <ul class="project-highlights">
              ${t(proj.highlights).map(h => `<li><span>${esc(h)}</span></li>`).join('')}
            </ul>
            <div class="project-footer">
              <div class="chip-row">
                ${proj.stack.map(s => `<span class="chip">${esc(s)}</span>`).join('')}
              </div>
              <div class="project-links">
                ${proj.links.map(lk => `<a class="mini-btn" href="${esc(lk.url)}" target="_blank" rel="noopener noreferrer">${esc(t(lk.label))} ↗</a>`).join('')}
              </div>
            </div>
          </article>
        `;
      })
      .join('');
  }

  // Render Teaching & Grants
  function renderTeachingAndGrants() {
    const U = UI_COPY[lang];
    document.getElementById('teach-kicker').textContent = U.teachKicker;
    document.getElementById('teach-title').textContent = U.teachTitle;
    document.getElementById('teach-sub').textContent = U.teachSub;

    const T = D.teaching;
    document.getElementById('teaching-panel').innerHTML = `
      <h3 class="panel-title">${esc(U.teachingPanelTitle)}</h3>
      <p class="teaching-lead">${esc(t(T.highlight))}</p>
      <div class="mini-stats">
        ${T.metrics.map(m => `
          <div class="mini-stat">
            <div class="mini-stat-val">${esc(m.value)}</div>
            <div class="mini-stat-lbl">${esc(t(m))}</div>
          </div>
        `).join('')}
      </div>
      <div class="course-list">
        ${T.courses.map(c => `
          <div class="course-item">
            <div class="course-top">
              <span class="course-level">${esc(t(c.level))}</span>
              <span class="course-role">${esc(t(c.role))}</span>
            </div>
            <p class="course-name">${esc(t(c.title))}</p>
          </div>
        `).join('')}
      </div>
    `;

    document.getElementById('grants-panel').innerHTML = `
      <h3 class="panel-title">${esc(U.grantsPanelTitle)}</h3>
      <div class="grant-list">
        ${D.grants.map(g => {
          const isPI = t(g.role).includes('PI') || t(g.role).includes('主持');
          return `
            <div class="grant-item">
              <div class="grant-top">
                <span class="grant-period">${esc(g.period)} · ${esc(t(g.status))}</span>
                <span class="grant-role ${isPI ? 'pi' : ''}">${esc(t(g.role))}</span>
              </div>
              <p class="grant-name">${esc(t(g.title))}</p>
              <div class="grant-code">${esc(g.code)}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // Render Biography, Timeline, Honors & Service
  function renderBioAndHonors() {
    const U = UI_COPY[lang];
    document.getElementById('bio-kicker').textContent = U.bioKicker;
    document.getElementById('bio-title').textContent = U.bioTitle;
    document.getElementById('bio-sub').textContent = U.bioSub;

    document.getElementById('timeline-panel').innerHTML = `
      <h3 class="panel-title">${esc(U.timelinePanelTitle)}</h3>
      <div class="timeline">
        ${D.timeline.map(item => `
          <div class="timeline-item">
            <div class="timeline-period">${esc(item.period)}</div>
            <h4 class="timeline-title">${esc(t(item.title))}</h4>
            <p class="timeline-org">${esc(t(item.org))}</p>
          </div>
        `).join('')}
      </div>
      <div class="service-block">
        ${D.services.map(s => `
          <div class="service-item">
            <h4>${esc(t(s.group))}</h4>
            <p>${esc(t(s.items))}</p>
          </div>
        `).join('')}
      </div>
    `;

    document.getElementById('honors-panel').innerHTML = `
      <h3 class="panel-title">${esc(U.honorsPanelTitle)}</h3>
      <ul class="honors-list">
        ${D.honors.map(h => `
          <li class="honor-item">
            <span class="honor-year">${esc(h.year)}</span>
            <span>${esc(t(h))}</span>
          </li>
        `).join('')}
      </ul>
    `;
  }

  // Render Recruitment Banner
  function renderJoin() {
    const R = D.recruitment;
    const U = UI_COPY[lang];
    const subject = encodeURIComponent(lang === 'zh' ? '[招生/科研咨询] 姓名 - 专业/院校' : '[Prospective Student] Name - Background');
    document.getElementById('join-card').innerHTML = `
      <div class="section-kicker">JOIN GEOSOC LAB</div>
      <h2 class="section-title">${esc(t(R.title))}</h2>
      <p class="join-intro">${esc(t(R.intro))}</p>
      <div class="join-tracks">
        ${R.tracks.map(tr => `
          <div class="track-box">
            <h3>${esc(t(tr.title))}</h3>
            <p>${esc(t(tr.body))}</p>
          </div>
        `).join('')}
      </div>
      <div class="join-footer">
        <p class="join-note">${esc(t(R.ctaNote))}</p>
        <a class="btn btn-primary" href="mailto:${esc(D.profile.email)}?subject=${subject}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <span>${esc(U.sendEmail)} · ${esc(D.profile.email)}</span>
        </a>
      </div>
    `;
  }

  // Render Footer
  function renderFooter() {
    const U = UI_COPY[lang];
    const P = D.profile;
    document.getElementById('footer-copy').textContent =
      `© ${new Date().getFullYear()} ${P.nameEn} (${P.nameZh}) · ${U.footerUpdate}: ${t(D.meta.lastUpdated)}`;

    document.getElementById('footer-links').innerHTML = `
      <a href="${esc(P.scholarUrl)}" target="_blank" rel="noopener noreferrer">${esc(U.scholar)}</a>
      <a href="${esc(P.githubUrl)}" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="${esc(P.swufeUrl)}" target="_blank" rel="noopener noreferrer">${esc(U.swufePage)}</a>
      <a href="mailto:${esc(P.email)}">Email</a>
      <a href="#about">${esc(U.backTop)} ↑</a>
    `;
  }

  function renderAll() {
    renderNav();
    renderHero();
    renderNews();
    renderResearch();
    renderPublicationsChrome();
    renderPublicationsList();
    renderProjects();
    renderTeachingAndGrants();
    renderBioAndHonors();
    renderJoin();
    renderFooter();
    bindMobileLinkClose();
  }

  function bindMobileLinkClose() {
    const mobileNav = document.getElementById('mobile-nav');
    const menuBtn = document.getElementById('menu-toggle');
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll spy for active nav link
  function setupScrollSpy() {
    if (!('IntersectionObserver' in window)) return;
    const sections = D.nav.map(n => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            document.querySelectorAll('[data-nav]').forEach(a => {
              a.classList.toggle('active', a.dataset.nav === id);
            });
          }
        }
      },
      { rootMargin: '-22% 0px -68% 0px' }
    );
    sections.forEach(sec => observer.observe(sec));
  }

  // Global Event Bindings
  function initEvents() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const next = btn.dataset.lang;
        if (next === lang) return;
        lang = next;
        safeSet('lh_lang', lang);
        renderAll();
      });
    });

    document.getElementById('theme-toggle').addEventListener('click', () => {
      applyTheme(theme === 'dark' ? 'light' : 'dark');
    });

    const menuBtn = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    menuBtn.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });

    document.getElementById('pub-search-input').addEventListener('input', e => {
      pubQuery = e.target.value;
      renderPublicationsList();
    });

    // Modal controls
    const modal = document.getElementById('bib-modal');
    document.getElementById('bib-close').addEventListener('click', closeBibModal);
    document.getElementById('bib-close-btn').addEventListener('click', closeBibModal);
    document.getElementById('bib-copy-btn').addEventListener('click', () => {
      copyText(activeBibtex, UI_COPY[lang].bibCopied);
    });
    modal.addEventListener('click', e => {
      if (e.target === modal) closeBibModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !modal.hidden) closeBibModal();
    });
  }

  // Boot
  applyTheme(theme);
  renderAll();
  initEvents();
  setupScrollSpy();
})();
