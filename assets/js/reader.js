/* ============================================================
   PROJECT IGNITION — flipbook engine
   ============================================================ */
(function(){
  "use strict";

  // ---- DOM refs (populated on DOMContentLoaded) ----
  let sceneEl, pageLeftEl, pageRightEl, leafEl, leafFrontEl, leafBackEl,
      chromeEl, progressBarEl, captionEl, pageIndicatorEl,
      arrowPrevEl, arrowNextEl, coverEl, drawerEl, drawerScrimEl, drawerListEl,
      loaderEl, liveEl;

  // ---- state ----
  let pages = [];
  let chapterStartPage = {};
  let mode = 'spread';           // 'spread' | 'single'
  let pos = 0;                   // left index (spread) or page index (single)
  let flipping = false;
  let flipToken = 0;
  let queuedSteps = 0;           // net turns requested while a turn is running
  const MAX_QUEUED_TURNS = 3;
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
      case 'chapter-guide':
        return '<aside class="blk-guide" aria-label="Chapter guide">' +
          '<span class="lbl">Reader&rsquo;s Guide</span>' +
          '<p>' + b.html + '</p>' +
          '<span class="guide-note">Read before the chapter for orientation, or return here when reviewing.</span></aside>';
      case 'guide-intro':
        return '<div class="blk-guide-intro">' +
          '<span class="eyebrow">How to use this edition</span>' +
          '<h2>Read the story.<br><em>Trace the system.</em></h2>' +
          '<p>Each chapter opens with a short orientation from the novel&rsquo;s outline. At the end, Themes and Discussion Questions help connect Ridgeway&rsquo;s choices to your own organization.</p>' +
          '<div class="guide-key"><span>Before</span> Chapter synopsis</div>' +
          '<div class="guide-key"><span>After</span> Themes &amp; questions</div>' +
          '<div class="guide-key"><span>Navigate</span> Expanded contents drawer</div>' +
          '</div>';
      case 'part-page':
        return '<div class="blk-part">' +
          '<span class="part-index">Part ' + romanNumeral(b.id) + '</span>' +
          '<h2>' + b.title + '</h2>' +
          '<span class="part-range">' + b.range + '</span>' +
          '<div class="part-rule"></div>' +
          '<p>' + b.summary + '</p>' +
          '</div>';
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
      case 'toc-part':
        return '<div class="toc-part">Part ' + romanNumeral(b.id) + ' &middot; ' + b.title + '</div>';
      case 'sources-head':
        return '<div class="blk-sources-h">Sources &amp; Grounding<div class="rule" style="width:34px;height:1px;background:var(--brass);margin:.5em 0 1em;"></div></div>';
      case 'source-item':
        return '<div class="blk-source-item"><span class="who">'+b.who+'</span> &mdash; '+b.what+'</div>';
      case 'application-head':
        return '<div class="blk-application-head"><span class="eyebrow">Afterword</span>' +
          '<h2>Apply It at<br><em>Your Level</em></h2>' +
          '<p>The lesson is not “use more AI” or “add more process.” It is to match autonomy, context, and verification to the stakes of the work.</p></div>';
      case 'application-principle':
        return '<div class="application-card"><span class="card-num">'+String(b.index).padStart(2,'0')+'</span>' +
          '<div><h3>'+b.title+'</h3><p>'+b.text+'</p></div></div>';
      case 'application-role':
        return '<div class="role-card"><span class="role-label">'+b.role+'</span><p>'+b.start+'</p></div>';
      case 'application-month':
        return '<div class="first-month"><span class="lbl">A practical first month</span><ol>' +
          b.items.map(function(item){ return '<li>'+item+'</li>'; }).join('') + '</ol></div>';
      default: return '';
    }
  }

  function romanNumeral(num){
    return num === 1 ? 'I' : 'II';
  }

  function partForChapter(num){
    return window.BOOK_PARTS.find(function(part){
      return part.id === (num <= 16 ? 1 : 2);
    });
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

    sections.push({ id:'guide', kind:'front', blocks:[ {type:'guide-intro'} ] });

    const tocBlocks = [ {type:'toc-head'} ];
    window.CHAPTERS.forEach(function(c){
      if(c.num === 1 || c.num === 17){
        const tocPart = partForChapter(c.num);
        tocBlocks.push({ type:'toc-part', id:tocPart.id, title:tocPart.title });
      }
      tocBlocks.push({ type:'toc-row', num:c.num, date:c.date });
    });
    sections.push({ id:'toc', kind:'front', blocks: tocBlocks });

    window.CHAPTERS.forEach(function(c){
      if(c.num === 1 || c.num === 17){
        const part = partForChapter(c.num);
        sections.push({
          id:'part-'+part.id,
          kind:'part',
          blocks:[{
            type:'part-page',
            id:part.id,
            title:part.title,
            range:part.range,
            summary:part.summary
          }]
        });
      }
      const blocks = [
        {type:'chapter-head', num:c.num, date:c.date},
        {type:'chapter-guide', html:window.CHAPTER_GUIDE[c.num]}
      ].concat(c.blocks);
      sections.push({ id:'ch-'+c.num, kind:'chapter', num:c.num, blocks: blocks });
    });

    const applicationBlocks = [ {type:'application-head'} ];
    window.APPLICATION_GUIDE.principles.forEach(function(item, index){
      applicationBlocks.push({
        type:'application-principle',
        index:index+1,
        title:item.title,
        text:item.text
      });
    });
    window.APPLICATION_GUIDE.roles.forEach(function(item){
      applicationBlocks.push({
        type:'application-role',
        role:item.role,
        start:item.start
      });
    });
    applicationBlocks.push({type:'application-month', items:window.APPLICATION_GUIDE.firstMonth});
    sections.push({ id:'application', kind:'back', startOnRight:true, blocks:applicationBlocks });

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
      if(alignChaptersRight && (section.kind === 'chapter' || section.startOnRight) && out.length % 2 === 0){
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

    const focusPage = mode === 'spread' ? pages[pos+1] : pages[pos];
    const focusIsApplication = focusPage && focusPage.sectionId === 'application';
    const chNum = focusIsApplication ? null : (mode === 'spread'
      ? (chapterInfoAt(pos+1) || chapterInfoAt(pos))
      : chapterInfoAt(pos));
    currentChapterNum = chNum;
    captionEl.textContent = focusIsApplication ? 'Apply It' : (chNum ? ('Chapter '+chNum) : frontBackLabel());
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
    announce();
  }

  // Polite, debounced screen-reader announcement of the visible pages, so
  // riffles and queued turns only announce where the reader ends up.
  let announceTimer = null;
  function announce(){
    if(!liveEl) return;
    clearTimeout(announceTimer);
    announceTimer = setTimeout(function(){
      if(!bookOpen) return;
      const total = pages.length;
      const where = mode === 'spread'
        ? 'Pages ' + (pos+1) + ' and ' + Math.min(pos+2, total)
        : 'Page ' + (pos+1);
      const label = captionEl.textContent;
      liveEl.textContent = where + ' of ' + total + (label ? ', ' + label : '');
    }, 350);
  }

  function frontBackLabel(){
    const p = pages[pos] || pages[pos+1];
    if(!p) return '';
    if(p.sectionId === 'title') return 'Title Page';
    if(p.sectionId === 'epigraph') return 'Epigraph';
    if(p.sectionId === 'guide') return 'Reader’s Guide';
    if(p.sectionId === 'toc') return 'Contents';
    if(p.sectionId && p.sectionId.indexOf('part-') === 0) return 'Part '+p.sectionId.slice(5);
    if(p.sectionId === 'application') return 'Apply It';
    if(p.sectionId === 'sources') return 'Sources';
    return '';
  }

  function bindPageClicks(){
    [pageLeftEl, pageRightEl].forEach(function(el){
      el.querySelectorAll('.toc-row').forEach(function(row){
        row.onclick = function(e){
          e.stopPropagation();
          if(performance.now() < suppressClickUntil) return;
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
      if(performance.now() < suppressClickUntil) return; // the end of a drag
      if(mode === 'single'){
        const r = pageRightEl.getBoundingClientRect();
        const frac = (e.clientX - r.left) / r.width;
        frac < 0.38 ? prevPage() : nextPage();
      } else {
        which === 'right' ? nextPage() : prevPage();
      }
    };
  }

  // ================= FLIP ENGINE =================
  // Every turn — click, keyboard, queued, contents riffle or finger drag — is
  // set up once by beginTurn() and then driven by a single progress value
  // p ∈ [0,1] via setProgress(). CSS derives rotation, lift, light and
  // shadows from the custom properties written there, so a drag can be
  // scrubbed, released and eased to either end with the same renderer.
  let activeTurn = null;   // { dir, newPos, fromAngle, toAngle, dest, token, p }
  let rafId = 0;
  let riffling = false;
  let drag = null;
  let suppressClickUntil = 0;

  const RIFFLE_MAX_TURNS = 5;
  const DRAG_THRESHOLD = 8;
  const reducedMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches:false };

  function cubicBezier(x1, y1, x2, y2){
    function at(t, a1, a2){ return ((1 - 3*a2 + 3*a1)*t + (3*a2 - 6*a1))*t*t + 3*a1*t; }
    return function(x){
      if(x <= 0) return 0;
      if(x >= 1) return 1;
      let lo = 0, hi = 1, t = x;
      for(let i = 0; i < 24; i++){
        const v = at(t, x1, x2);
        if(Math.abs(v - x) < 1e-5) break;
        if(v < x) lo = t; else hi = t;
        t = (lo + hi) / 2;
      }
      return at(t, y1, y2);
    };
  }
  const EASE_TURN = cubicBezier(.32,.02,.18,1);
  const EASE_RELEASE = cubicBezier(.2,.7,.3,1);
  const EASE_RIFFLE = cubicBezier(.45,.05,.4,1);

  function stepSize(){ return mode === 'spread' ? 2 : 1; }

  function lastPos(){
    const last = Math.max(pages.length - 1, 0);
    return mode === 'spread' ? last - (last % 2) : last;
  }

  function alignPos(idx){
    return mode === 'spread' && idx % 2 !== 0 ? idx - 1 : idx;
  }

  function canTurn(dir){
    if(dir === 'fwd'){
      return mode === 'spread' ? pos + 2 < pages.length : pos + 1 < pages.length;
    }
    return pos - stepSize() >= 0;
  }

  function setTurnSpeed(fast){
    sceneEl.classList.toggle('turn-fast', fast);
  }

  function turnDurationMs(){
    const raw = getComputedStyle(sceneEl).getPropertyValue('--turn-duration').trim();
    const n = parseFloat(raw);
    if(!isFinite(n)) return 980;
    return /ms$/.test(raw) ? n : n * 1000;
  }

  function setFace(faceEl, idx, side){
    faceEl.innerHTML = pageInnerHTML(pages[idx], idx);
    faceEl.classList.remove('side-left','side-right','side-single','side-verso');
    faceEl.classList.add('side-' + side);
  }

  // Single-page mode shows the reverse of a sheet as plain paper instead of
  // leaking the next page's content onto the swinging leaf.
  function setVerso(faceEl){
    faceEl.innerHTML = '<div class="page-inner"></div>';
    faceEl.classList.remove('side-left','side-right','side-single','side-verso');
    faceEl.classList.add('side-verso');
  }

  function beginTurn(dir, newPos){
    const token = ++flipToken;
    flipping = true;
    let spine = 'left', fromAngle = 0, toAngle = -180, dest = null;

    if(mode === 'spread'){
      if(dir === 'fwd'){
        setFace(leafFrontEl, pos+1, 'right');
        setFace(leafBackEl, newPos, 'left');
        pageRightEl.innerHTML = pageInnerHTML(pages[newPos+1], newPos+1);
        dest = pageRightEl;
      } else {
        spine = 'right'; toAngle = 180;
        setFace(leafFrontEl, pos, 'left');
        setFace(leafBackEl, newPos+1, 'right');
        pageLeftEl.innerHTML = pageInnerHTML(pages[newPos], newPos);
        dest = pageLeftEl;
      }
    } else if(dir === 'fwd'){
      // current page lifts away over the left edge, the next waits beneath
      setFace(leafFrontEl, pos, 'single');
      setVerso(leafBackEl);
      pageRightEl.innerHTML = pageInnerHTML(pages[newPos], newPos);
      dest = pageRightEl;
    } else {
      // previous page swings back in from the left and lands on top
      fromAngle = -180; toAngle = 0;
      setFace(leafFrontEl, newPos, 'single');
      setVerso(leafBackEl);
    }

    leafEl.dataset.spine = spine;
    if(mode === 'spread'){
      leafEl.style.left = spine === 'left' ? 'var(--page-w)' : '0px';
    } else {
      leafEl.style.left = '0px';
    }
    leafEl.style.transformOrigin = spine + ' center';
    if(dest) dest.classList.add('is-destination');

    activeTurn = { dir:dir, newPos:newPos, fromAngle:fromAngle, toAngle:toAngle, dest:dest, token:token, p:0 };
    setProgress(0);
    leafEl.classList.add('active');
    return activeTurn;
  }

  function setProgress(p){
    const t = activeTurn;
    if(!t) return;
    t.p = p;
    const angle = t.fromAngle + (t.toAngle - t.fromAngle) * p;
    const turned = Math.abs(angle) / 180;
    leafEl.style.setProperty('--angle', angle.toFixed(2));
    leafEl.style.setProperty('--p', turned.toFixed(4));
    leafEl.style.setProperty('--hump', Math.sin(turned * Math.PI).toFixed(4));
    if(t.dest) t.dest.style.setProperty('--settle', (1 - p).toFixed(4));
  }

  function animateTo(target, duration, ease, done){
    cancelAnimationFrame(rafId);
    const t = activeTurn;
    const from = t.p;
    if(reducedMotion.matches || duration <= 0 || from === target){
      setProgress(target);
      done();
      return;
    }
    const start = performance.now();
    function frame(now){
      if(activeTurn !== t) return;
      const k = Math.min(1, (now - start) / duration);
      setProgress(from + (target - from) * ease(k));
      if(k < 1){ rafId = requestAnimationFrame(frame); }
      else { rafId = 0; done(); }
    }
    rafId = requestAnimationFrame(frame);
  }

  function clearDestination(t){
    if(t && t.dest){
      t.dest.classList.remove('is-destination');
      t.dest.style.removeProperty('--settle');
    }
  }

  function endTurn(commit){
    const t = activeTurn;
    activeTurn = null;
    flipping = false;
    leafEl.classList.remove('active');
    clearDestination(t);
    if(commit) pos = t.newPos;
    render();
  }

  // Clicks/keys that arrive mid-turn are queued (net direction, capped) and
  // played back at a faster tempo, so rapid input never feels dropped.
  function requestTurn(dir){
    if(!bookOpen || riffling) return;
    if(flipping){
      const next = queuedSteps + (dir === 'fwd' ? 1 : -1);
      if(Math.abs(next) <= MAX_QUEUED_TURNS) queuedSteps = next;
      return;
    }
    turn(dir);
  }

  function nextPage(){ requestTurn('fwd'); }
  function prevPage(){ requestTurn('back'); }

  function drainQueue(){
    if(queuedSteps === 0){ setTurnSpeed(false); return; }
    const dir = queuedSteps > 0 ? 'fwd' : 'back';
    queuedSteps += queuedSteps > 0 ? -1 : 1;
    setTurnSpeed(true);
    turn(dir);
  }

  function turn(dir){
    if(!canTurn(dir)){
      queuedSteps = 0;
      setTurnSpeed(false);
      return;
    }
    const t = beginTurn(dir, dir === 'fwd' ? pos + stepSize() : pos - stepSize());
    animateTo(1, turnDurationMs(), EASE_TURN, function(){
      if(activeTurn !== t) return;
      endTurn(true);
      drainQueue();
    });
  }

  function cancelAnyFlip(){
    flipToken++;
    cancelAnimationFrame(rafId);
    rafId = 0;
    riffling = false;
    drag = null;
    sceneEl.classList.remove('dragging');
    queuedSteps = 0;
    setTurnSpeed(false);
    clearDestination(activeTurn);
    activeTurn = null;
    flipping = false;
    leafEl.classList.remove('active');
  }

  // ================= RIFFLE (animated jumps) =================
  // Long jumps flutter through a handful of intermediate spreads, fast in the
  // middle and slower at both ends, so the reader sees direction and distance.
  function jumpTo(target, animate){
    target = Math.max(0, Math.min(alignPos(target), lastPos()));
    cancelAnyFlip();
    if(!animate || !bookOpen || reducedMotion.matches || target === pos){
      pos = target;
      render();
      return;
    }
    const step = stepSize();
    const dir = target > pos ? 'fwd' : 'back';
    const spreads = Math.abs(target - pos) / step;
    const n = Math.min(RIFFLE_MAX_TURNS, spreads);
    const stops = [];
    for(let i = 1; i <= n; i++){
      stops.push(pos + Math.sign(target - pos) * Math.round(spreads * i / n) * step);
    }
    stops[stops.length - 1] = target;

    riffling = true;
    let i = 0;
    function next(){
      if(i >= stops.length){ riffling = false; return; }
      const edge = n === 1 ? 1 : Math.abs((i / (n - 1)) * 2 - 1);
      const duration = n === 1 ? turnDurationMs() * 0.7 : 190 + 150 * edge;
      const t = beginTurn(dir, stops[i++]);
      animateTo(1, duration, EASE_RIFFLE, function(){
        if(activeTurn !== t) return;
        endTurn(true);
        next();
      });
    }
    next();
  }

  // ================= DRAG TO TURN =================
  function dragSpan(dir, x0){
    if(mode === 'single') return pageRightEl.getBoundingClientRect().width * 0.85;
    const r = pageRightEl.getBoundingClientRect();
    const spineX = r.left;
    return dir === 'fwd' ? x0 - (spineX - r.width) : (spineX + r.width) - x0;
  }

  // Map pointer travel onto the leaf angle so the free edge (projected onto
  // the page plane, x = cos θ) stays under the pointer.
  function progressFromDrag(travelled, span){
    const t = Math.max(0, Math.min(1, travelled / Math.max(span, 1)));
    return Math.acos(1 - 2 * t) / Math.PI;
  }

  function onPointerDown(e){
    if(!bookOpen || flipping || riffling || e.button !== 0 || !e.isPrimary) return;
    if(!pageLeftEl.contains(e.target) && !pageRightEl.contains(e.target)) return;
    let dir = null;
    if(mode === 'spread') dir = pageRightEl.contains(e.target) ? 'fwd' : 'back';
    drag = { id:e.pointerId, x0:e.clientX, y0:e.clientY, lastX:e.clientX, lastT:e.timeStamp,
             vx:0, dir:dir, started:false, turn:null, span:0 };
  }

  function onPointerMove(e){
    if(!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x0;
    const dy = e.clientY - drag.y0;
    if(!drag.started){
      if(Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
      const dir = drag.dir || (dx < 0 ? 'fwd' : 'back');
      if(Math.abs(dy) > Math.abs(dx) || (dir === 'fwd') !== (dx < 0) || flipping || !canTurn(dir)){
        drag = null;
        return;
      }
      drag.dir = dir;
      drag.started = true;
      drag.span = dragSpan(dir, drag.x0);
      drag.turn = beginTurn(dir, dir === 'fwd' ? pos + stepSize() : pos - stepSize());
      sceneEl.classList.add('dragging');
      if(window.getSelection) window.getSelection().removeAllRanges();
    }
    const dt = e.timeStamp - drag.lastT;
    if(dt > 0){
      drag.vx = 0.7 * ((e.clientX - drag.lastX) / dt) + 0.3 * drag.vx;
      drag.lastX = e.clientX;
      drag.lastT = e.timeStamp;
    }
    if(activeTurn === drag.turn){
      setProgress(progressFromDrag(drag.dir === 'fwd' ? -dx : dx, drag.span));
    }
  }

  function onPointerUp(e){
    if(!drag || e.pointerId !== drag.id) return;
    const d = drag;
    drag = null;
    if(!d.started) return; // plain click/tap: the click handler turns the page
    suppressClickUntil = performance.now() + 350;
    sceneEl.classList.remove('dragging');
    const t = d.turn;
    if(activeTurn !== t) return;

    // velocity in the turning direction (px/ms), ignored if the pointer rested
    const vx = e.timeStamp - d.lastT > 90 ? 0 : d.vx;
    const towards = d.dir === 'fwd' ? -vx : vx;
    const commit = e.type !== 'pointercancel' &&
      (t.p >= 0.5 ? towards > -0.3 : towards > 0.35);
    const target = commit ? 1 : 0;
    const duration = Math.max(160, turnDurationMs() * Math.abs(target - t.p) * 0.9);
    animateTo(target, duration, EASE_RELEASE, function(){
      if(activeTurn !== t) return;
      endTurn(commit);
      if(commit){ drainQueue(); }
      else { queuedSteps = 0; setTurnSpeed(false); }
    });
  }

  // ================= NAVIGATION HELPERS =================
  function goToChapter(num, animate){
    const target = chapterStartPage[num];
    if(target == null) return;
    closeDrawer();
    jumpTo(target, animate !== false);
  }

  function goHome(){
    cancelAnyFlip();
    pos = 0;
    render();
    closeDrawer();
  }

  function goToSection(sectionId){
    const target = pages.findIndex(function(page){ return page.sectionId === sectionId; });
    if(target < 0) return;
    closeDrawer();
    jumpTo(target, true);
  }

  // ================= TOC DRAWER =================
  function buildDrawer(){
    drawerListEl.innerHTML = '';
    const applicationLink = document.createElement('button');
    applicationLink.type = 'button';
    applicationLink.className = 'drawer-feature';
    applicationLink.innerHTML = '<span class="df-kicker">Practical afterword</span>' +
      '<span class="df-title">Apply It at Your Level</span>' +
      '<span class="df-copy">Starting points for newcomers, practitioners, leaders, and governance teams.</span>';
    applicationLink.onclick = function(){ goToSection('application'); };
    drawerListEl.appendChild(applicationLink);

    window.CHAPTERS.forEach(function(c){
      if(c.num === 1 || c.num === 17){
        const part = partForChapter(c.num);
        const heading = document.createElement('div');
        heading.className = 'drawer-part';
        heading.innerHTML = '<span>Part '+romanNumeral(part.id)+'</span>'+part.title;
        drawerListEl.appendChild(heading);
      }
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'drawer-item';
      item.dataset.num = c.num;
      item.setAttribute('aria-label', 'Go to chapter '+c.num+', '+c.date);
      item.innerHTML = '<span class="di-num">'+String(c.num).padStart(2,'0')+'</span>' +
        '<span class="di-text"><span class="di-title">Chapter '+c.num+'</span>' +
        '<span class="di-date">'+c.date+'</span>' +
        '<span class="di-summary">'+window.CHAPTER_GUIDE[c.num]+'</span></span>';
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
    announce();
  }

  // ================= MODE / RESIZE =================
  function detectMode(){ return window.innerWidth < 760 ? 'single' : 'spread'; }

  function rebuildForMode(newMode){
    cancelAnyFlip();
    mode = newMode;
    sceneEl.classList.toggle('single', mode === 'single');
    const sections = buildSections();
    pages = paginate(sections, mode === 'spread');
    chapterStartPage = computeChapterStarts(pages);
    if(currentChapterNum && chapterStartPage[currentChapterNum] != null){
      goToChapter(currentChapterNum, false);
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
    liveEl = document.getElementById('pageAnnouncer');

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
      if(e.key === 'Escape'){ closeDrawer(); return; }
      if(!bookOpen || drawerEl.classList.contains('show') || e.altKey || e.ctrlKey || e.metaKey) return;
      switch(e.key){
        case 'ArrowRight': case 'PageDown': nextPage(); break;
        case 'ArrowLeft': case 'PageUp': prevPage(); break;
        case 'Home': jumpTo(0, true); break;
        case 'End': jumpTo(lastPos(), true); break;
        default: return;
      }
      e.preventDefault();
    });

    // drag / swipe to turn (mouse, pen and touch via pointer events)
    sceneEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

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
