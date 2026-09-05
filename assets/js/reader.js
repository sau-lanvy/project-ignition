/* ============================================================
   PROJECT IGNITION — flipbook engine
   ============================================================ */
(function(){
  "use strict";

  // ---- DOM refs (populated on DOMContentLoaded) ----
  let sceneEl, pageLeftEl, pageRightEl, leafEl, leafFrontEl, leafBackEl,
      chromeEl, progressBarEl, captionEl, pageIndicatorEl,
      arrowPrevEl, arrowNextEl, coverEl, drawerEl, drawerScrimEl, drawerListEl,
      loaderEl;

  // ---- state ----
  let pages = [];
  let chapterStartPage = {};
  let mode = 'spread';           // 'spread' | 'single'
  let pos = 0;                   // left index (spread) or page index (single)
  let flipping = false;
  let flipToken = 0;
  let currentChapterNum = null;
  let bookOpen = false;

  // ================= RENDERING BLOCKS → HTML =================
  function renderBlock(b){
    switch(b.type){
      case 'p': return '<p>' + b.html + '</p>';
      case 'break': return '<div class="blk-break">&middot;&nbsp;&middot;&nbsp;&middot;</div>';
      case 'end': return '<div class="blk-end">' + b.html + '</div>';
      case 'themes': return '<div class="blk-themes"><span class="lbl">Themes</span>' + b.html + '</div>';
      case 'questions':
        return '<div class="blk-questions"><span class="lbl">Discussion Questions</span><ol>' +
          b.items.map(function(i){ return '<li>'+i+'</li>'; }).join('') + '</ol></div>';
      case 'chapter-head':
        return '<div class="blk-head"><span class="k">Project Ignition</span>' +
          '<div class="n">Chapter ' + b.num + '</div>' +
          '<div class="d">' + b.date + '</div><hr></div>';
      case 'title-page':
        return '<div class="blk-title">' +
          '<div class="k1">A Novel</div>' +
          '<div class="t1">PROJECT<br><em>IGNITION</em></div>' +
          '<div class="t2">About Agents, Judgment, and Helping Your Business Win</div>' +
          '<div class="rule"></div>' +
          '<div class="auth">An IT Revolution&ndash;style Business Novel</div></div>';
      case 'epigraph':
        return '<div class="blk-epi">&ldquo;' + b.text + '&rdquo;<span class="src">' + b.src + '</span></div>';
      case 'toc-head':
        return '<div class="blk-toc-h">Contents<div class="rule"></div></div>';
      case 'toc-row':
        return '<div class="toc-row" data-goto="'+b.num+'">' +
          '<span class="toc-num">'+String(b.num).padStart(2,'0')+'</span>' +
          '<span class="toc-title">Chapter '+b.num+'</span>' +
          '<span class="toc-fill"></span>' +
          '<span class="toc-date">'+b.date+'</span></div>';
      case 'sources-head':
        return '<div class="blk-sources-h">Sources &amp; Grounding<div class="rule" style="width:34px;height:1px;background:var(--brass);margin:.5em 0 1em;"></div></div>';
      case 'source-item':
        return '<div class="blk-source-item"><span class="who">'+b.who+'</span> &mdash; '+b.what+'</div>';
      default: return '';
    }
  }

  // ================= SECTION MODEL =================
  function buildSections(){
    const sections = [];

    sections.push({ id:'title', kind:'front', blocks:[ {type:'title-page'} ] });

    sections.push({ id:'epigraph', kind:'front', blocks:[ {
      type:'epigraph',
      text: 'Verification was never optional. It was just invisible &mdash; right up until the thing doing the work stopped getting tired.',
      src: 'Elliot Vance, Chapter Seven'
    } ] });

    const tocBlocks = [ {type:'toc-head'} ];
    window.CHAPTERS.forEach(function(c){ tocBlocks.push({ type:'toc-row', num:c.num, date:c.date }); });
    sections.push({ id:'toc', kind:'front', blocks: tocBlocks });

    window.CHAPTERS.forEach(function(c){
      const blocks = [ {type:'chapter-head', num:c.num, date:c.date} ].concat(c.blocks);
      sections.push({ id:'ch-'+c.num, kind:'chapter', num:c.num, blocks: blocks });
    });

    sections.push({ id:'sources', kind:'back', blocks:[
      {type:'sources-head'},
      {type:'source-item', who:'Anthropic', what:'"The AI-Native SDLC playbook" &mdash; the Six Stages (Plan, Design, Build, Test, Deploy, Maintain) and the artifact-chain model dramatized throughout this novel.'},
      {type:'source-item', who:'Addy Osmani, Shubham Saboo &amp; Sokratis Kartakis', what:'"The New SDLC With Vibe Coding" (Google, 2026) &mdash; the source of Agent = Model + Harness and the vibe-coding-to-agentic-engineering spectrum.'},
      {type:'source-item', who:'&mdash;', what:'Project Ignition is a work of fiction. Ridgeway AutoWorks and all characters are invented to dramatize real, published engineering practices.'}
    ]});

    return sections;
  }

  // ================= PAGINATION =================
  function paginate(sections, alignChaptersRight){
    const measureWrap = document.createElement('div');
    measureWrap.className = 'page right';
    measureWrap.style.cssText = 'position:absolute;left:-99999px;top:0;visibility:hidden;';
    measureWrap.innerHTML = '<div class="page-inner">' +
      '<div class="page-content" id="__measure"></div>' +
      '<div class="page-num" aria-hidden="true">888</div>' +
      '</div>';
    document.body.appendChild(measureWrap);
    const measureEl = measureWrap.querySelector('#__measure');

    const out = [];
    let current = [];

    function fits(list){
      measureEl.innerHTML = list.join('');
      const lastBlock = measureEl.lastElementChild;
      if(!lastBlock) return true;

      const contentBottom = measureEl.getBoundingClientRect().bottom;
      const lastBlockBottom = lastBlock.getBoundingClientRect().bottom;
      return lastBlockBottom <= contentBottom;
    }
    function flush(sectionId, num){
      if(current.length){
        out.push({ html: current.join(''), sectionId: sectionId, num: num });
        current = [];
      }
    }

    sections.forEach(function(section){
      if(alignChaptersRight && section.kind === 'chapter' && out.length % 2 === 0){
        out.push({ html:'', blank:true });
      }
      section.blocks.forEach(function(block){
        const html = renderBlock(block);
        const trial = current.concat([html]);
        if(fits(trial)){
          current = trial;
        } else if(current.length === 0){
          current = [html];               // safety: never leave a block unrendered
          flush(section.id, section.num);
        } else {
          flush(section.id, section.num);
          current = [html];
        }
      });
      flush(section.id, section.num);
    });

    document.body.removeChild(measureWrap);
    return out;
  }

  function computeChapterStarts(pageList){
    const map = {};
    pageList.forEach(function(p, i){
      if(p.num != null && !(p.num in map)) map[p.num] = i;
    });
    return map;
  }

  // ================= SPREAD / PAGE RENDERING =================
  function pageInnerHTML(page, idx){
    if(!page || page.blank) return '<div class="page-inner"></div>';
    return '<div class="page-inner"><div class="page-content">'+page.html+'</div>' +
           '<div class="page-num">'+(idx+1)+'</div></div>';
  }

  function chapterInfoAt(idx){
    const p = pages[idx];
    if(p && p.num != null) return p.num;
    return null;
  }

  function render(){
    if(mode === 'spread'){
      pageLeftEl.innerHTML = pageInnerHTML(pages[pos], pos);
      pageRightEl.innerHTML = pageInnerHTML(pages[pos+1], pos+1);
    } else {
      pageRightEl.innerHTML = pageInnerHTML(pages[pos], pos);
    }
    updateChrome();
    bindPageClicks();
  }

  function updateChrome(){
    const total = pages.length || 1;
    const frac = mode === 'spread' ? (pos)/(Math.max(total-1,1)) : pos/(Math.max(total-1,1));
    progressBarEl.style.width = (Math.min(frac,1)*100).toFixed(1)+'%';

    const chNum = mode === 'spread'
      ? (chapterInfoAt(pos+1) || chapterInfoAt(pos))
      : chapterInfoAt(pos);
    currentChapterNum = chNum;
    captionEl.textContent = chNum ? ('Chapter '+chNum) : frontBackLabel();
    captionEl.classList.add('show');

    const shownPages = mode === 'spread'
      ? (pos+1) + '&ndash;' + (pos+2)
      : (pos+1).toString();
    pageIndicatorEl.innerHTML = shownPages + ' / ' + total;

    const atStart = pos <= 0;
    const atEnd = mode === 'spread' ? (pos+2 >= total) : (pos+1 >= total);
    arrowPrevEl.classList.toggle('disabled', atStart);
    arrowNextEl.classList.toggle('disabled', atEnd);
    arrowPrevEl.disabled = atStart;
    arrowNextEl.disabled = atEnd;
    arrowPrevEl.setAttribute('aria-disabled', String(atStart));
    arrowNextEl.setAttribute('aria-disabled', String(atEnd));

    // sync TOC drawer active state
    if(drawerListEl){
      drawerListEl.querySelectorAll('.drawer-item').forEach(function(el){
        el.classList.toggle('active', Number(el.dataset.num) === chNum);
      });
    }
  }

  function frontBackLabel(){
    const p = pages[pos] || pages[pos+1];
    if(!p) return '';
    if(p.sectionId === 'title') return 'Title Page';
    if(p.sectionId === 'epigraph') return 'Epigraph';
    if(p.sectionId === 'toc') return 'Contents';
    if(p.sectionId === 'sources') return 'Sources';
    return '';
  }

  function bindPageClicks(){
    [pageLeftEl, pageRightEl].forEach(function(el){
      el.querySelectorAll('.toc-row').forEach(function(row){
        row.onclick = function(e){
          e.stopPropagation();
          goToChapter(Number(row.dataset.goto));
        };
      });
    });
  }

  // Clicking a page turns it (turn toward the page you click, like a real
  // book). Interactive children (TOC rows) stop propagation above, so this
  // only fires on empty page area — no invisible overlay needed, which
  // means nothing can silently block a link near the edge of a page.
  function onPageClick(which){
    return function(e){
      if(mode === 'single'){
        const r = pageRightEl.getBoundingClientRect();
        const frac = (e.clientX - r.left) / r.width;
        frac < 0.38 ? prevPage() : nextPage();
      } else {
        which === 'right' ? nextPage() : prevPage();
      }
    };
  }

  // ================= FLIP ANIMATION =================
  function setLeafGeometry(dir){
    if(mode === 'spread'){
      if(dir === 'fwd'){ leafEl.style.left = 'var(--page-w)'; leafEl.style.transformOrigin = 'left center'; }
      else { leafEl.style.left = '0px'; leafEl.style.transformOrigin = 'right center'; }
    } else {
      leafEl.style.left = '0px';
      leafEl.style.transformOrigin = dir === 'fwd' ? 'right center' : 'left center';
    }
  }

  function showLeaf(){
    leafEl.classList.remove('turning-fwd','turning-back');
    leafEl.classList.add('active');
    void leafEl.offsetWidth; // force reflow so the animation class re-triggers cleanly
  }

  function stageDestination(dir, newPos){
    if(mode === 'spread'){
      if(dir === 'fwd'){
        pageRightEl.innerHTML = pageInnerHTML(pages[newPos+1], newPos+1);
      } else {
        pageLeftEl.innerHTML = pageInnerHTML(pages[newPos], newPos);
      }
    } else {
      pageRightEl.innerHTML = pageInnerHTML(pages[newPos], newPos);
    }
    sceneEl.classList.add(dir === 'fwd' ? 'turning-fwd' : 'turning-back');
  }

  function finishTurn(directionClass){
    leafEl.classList.remove('active', directionClass);
    sceneEl.classList.remove('turning-fwd','turning-back');
  }

  function nextPage(){
    if(flipping || !bookOpen) return;
    const step = mode === 'spread' ? 2 : 1;
    const newPos = pos + step;
    if(newPos >= pages.length && mode === 'single') return;
    if(mode === 'spread' && pos+2 > pages.length) return;
    flipping = true;
    const myToken = ++flipToken;

    setLeafGeometry('fwd');
    leafEl.dataset.dir = 'fwd';
    if(mode === 'spread'){
      leafFrontEl.innerHTML = pageInnerHTML(pages[pos+1], pos+1);
      leafBackEl.innerHTML  = pageInnerHTML(pages[pos+2], pos+2);
    } else {
      leafFrontEl.innerHTML = pageInnerHTML(pages[pos], pos);
      leafBackEl.innerHTML  = pageInnerHTML(pages[pos+1], pos+1);
    }
    stageDestination('fwd', newPos);
    showLeaf();
    leafEl.classList.add('turning-fwd');
    afterFlip(function(){
      finishTurn('turning-fwd');
      flipping = false;
      if(myToken !== flipToken) return; // superseded by a jump/other nav mid-flip
      pos = newPos;
      render();
    });
  }

  function prevPage(){
    if(flipping || !bookOpen) return;
    const step = mode === 'spread' ? 2 : 1;
    const newPos = pos - step;
    if(newPos < 0) return;
    flipping = true;
    const myToken = ++flipToken;

    setLeafGeometry('back');
    leafEl.dataset.dir = 'back';
    if(mode === 'spread'){
      leafFrontEl.innerHTML = pageInnerHTML(pages[pos], pos);
      leafBackEl.innerHTML  = pageInnerHTML(pages[pos-1], pos-1);
    } else {
      leafFrontEl.innerHTML = pageInnerHTML(pages[pos], pos);
      leafBackEl.innerHTML  = pageInnerHTML(pages[pos-1], pos-1);
    }
    stageDestination('back', newPos);
    showLeaf();
    leafEl.classList.add('turning-back');
    afterFlip(function(){
      finishTurn('turning-back');
      flipping = false;
      if(myToken !== flipToken) return; // superseded by a jump/other nav mid-flip
      pos = newPos;
      render();
    });
  }

  function afterFlip(cb){
    let done = false;
    function handler(e){
      if(e.target !== leafEl) return;
      if(done) return; done = true;
      leafEl.removeEventListener('animationend', handler);
      cb();
    }
    leafEl.addEventListener('animationend', handler);
    // safety fallback in case animationend doesn't fire (hidden tab etc.)
    setTimeout(function(){ if(!done){ done = true; leafEl.removeEventListener('animationend', handler); cb(); } }, 1550);
  }

  // ================= NAVIGATION HELPERS =================
  function cancelAnyFlip(){
    flipToken++;              // invalidates any pending afterFlip callback
    flipping = false;
    leafEl.classList.remove('active','turning-fwd','turning-back');
    sceneEl.classList.remove('turning-fwd','turning-back');
  }

  function goToChapter(num){
    const target = chapterStartPage[num];
    if(target == null) return;
    cancelAnyFlip();
    if(mode === 'spread'){
      pos = (target % 2 === 0) ? target : target - 1;
    } else {
      pos = target;
    }
    render();
    closeDrawer();
  }

  function goHome(){
    cancelAnyFlip();
    pos = 0;
    render();
    closeDrawer();
  }

  // ================= TOC DRAWER =================
  function buildDrawer(){
    drawerListEl.innerHTML = '';
    window.CHAPTERS.forEach(function(c){
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'drawer-item';
      item.dataset.num = c.num;
      item.setAttribute('aria-label', 'Go to chapter '+c.num+', '+c.date);
      item.innerHTML = '<span class="di-num">'+String(c.num).padStart(2,'0')+'</span>' +
        '<span class="di-text"><span class="di-title">Chapter '+c.num+'</span>' +
        '<span class="di-date">'+c.date+'</span></span>';
      item.onclick = function(){ goToChapter(c.num); };
      drawerListEl.appendChild(item);
    });
  }
  function openDrawer(){
    drawerEl.classList.add('show');
    drawerScrimEl.classList.add('show');
    drawerEl.setAttribute('aria-hidden', 'false');
    document.getElementById('btnToc').setAttribute('aria-expanded', 'true');
    document.getElementById('btnCloseDrawer').focus();
  }
  function closeDrawer(){
    const wasOpen = drawerEl.classList.contains('show');
    drawerEl.classList.remove('show');
    drawerScrimEl.classList.remove('show');
    drawerEl.setAttribute('aria-hidden', 'true');
    document.getElementById('btnToc').setAttribute('aria-expanded', 'false');
    if(wasOpen && bookOpen) document.getElementById('btnToc').focus();
  }

  function openBook(){
    if(bookOpen) return;
    bookOpen = true;
    document.body.classList.add('book-open');
    coverEl.classList.add('opened');
    coverEl.setAttribute('aria-hidden', 'true');
    coverEl.tabIndex = -1;
    setTimeout(function(){ chromeEl.classList.add('show'); }, 500);
  }

  // ================= MODE / RESIZE =================
  function detectMode(){ return window.innerWidth < 760 ? 'single' : 'spread'; }

  function rebuildForMode(newMode){
    mode = newMode;
    sceneEl.classList.toggle('single', mode === 'single');
    const sections = buildSections();
    pages = paginate(sections, mode === 'spread');
    chapterStartPage = computeChapterStarts(pages);
    if(currentChapterNum && chapterStartPage[currentChapterNum] != null){
      goToChapter(currentChapterNum);
    } else {
      pos = 0;
      render();
    }
  }

  let resizeTimer = null;
  function onResize(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
      const m = detectMode();
      if(m !== mode){ rebuildForMode(m); }
    }, 220);
  }

  // ================= INIT =================
  function init(){
    const loadStart = performance.now();

    sceneEl = document.getElementById('scene');
    pageLeftEl = document.getElementById('pageLeft');
    pageRightEl = document.getElementById('pageRight');
    leafEl = document.getElementById('leaf');
    leafFrontEl = document.getElementById('leafFront');
    leafBackEl = document.getElementById('leafBack');
    chromeEl = document.getElementById('chrome');
    progressBarEl = document.getElementById('progressBar');
    captionEl = document.getElementById('caption');
    pageIndicatorEl = document.getElementById('pageIndicator');
    arrowPrevEl = document.getElementById('arrowPrev');
    arrowNextEl = document.getElementById('arrowNext');
    coverEl = document.getElementById('cover');
    drawerEl = document.getElementById('drawer');
    drawerScrimEl = document.getElementById('drawerScrim');
    drawerListEl = document.getElementById('drawerList');
    loaderEl = document.getElementById('loader');

    pageLeftEl.addEventListener('click', onPageClick('left'));
    pageRightEl.addEventListener('click', onPageClick('right'));

    mode = detectMode();
    sceneEl.classList.toggle('single', mode === 'single');

    const sections = buildSections();
    pages = paginate(sections, mode === 'spread');
    chapterStartPage = computeChapterStarts(pages);
    pos = 0;
    render();

    buildDrawer();

    if(document.fonts && document.fonts.status !== 'loaded'){
      document.fonts.ready.then(function(){
        rebuildForMode(detectMode());
      });
    }

    // interactions
    arrowNextEl.addEventListener('click', function(e){ e.stopPropagation(); nextPage(); });
    arrowPrevEl.addEventListener('click', function(e){ e.stopPropagation(); prevPage(); });

    document.getElementById('btnToc').addEventListener('click', openDrawer);
    document.getElementById('btnCloseDrawer').addEventListener('click', closeDrawer);
    drawerScrimEl.addEventListener('click', closeDrawer);
    document.getElementById('btnHome').addEventListener('click', function(){
      bookOpen = false;
      document.body.classList.remove('book-open');
      coverEl.classList.remove('opened');
      coverEl.setAttribute('aria-hidden', 'false');
      coverEl.tabIndex = 0;
      chromeEl.classList.remove('show');
      goHome();
      setTimeout(function(){ coverEl.focus(); }, 50);
    });

    coverEl.addEventListener('click', openBook);
    coverEl.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        openBook();
      }
    });

    window.addEventListener('keydown', function(e){
      if(e.key === 'ArrowRight') nextPage();
      else if(e.key === 'ArrowLeft') prevPage();
      else if(e.key === 'Escape') closeDrawer();
    });

    // basic touch swipe
    let touchX = null;
    sceneEl.addEventListener('touchstart', function(e){ touchX = e.touches[0].clientX; }, {passive:true});
    sceneEl.addEventListener('touchend', function(e){
      if(touchX == null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if(Math.abs(dx) > 50){ dx < 0 ? nextPage() : prevPage(); }
      touchX = null;
    }, {passive:true});

    window.addEventListener('resize', onResize);

    const MIN_LOAD_MS = 2200;
    const elapsed = performance.now() - loadStart;
    setTimeout(function(){ loaderEl.classList.add('hide'); }, Math.max(0, MIN_LOAD_MS - elapsed));
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
