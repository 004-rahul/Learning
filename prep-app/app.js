// NexusPrep — Client Application Logic (Updated with Full Mindmap Integration)
(function () {
  'use strict';

  const STORAGE_KEY = 'NEXUSPREP_STATE_V1';

  let state = {
    currentDay: 1,
    completedDays: {},
    dayNotes: {},
    mistakes: [
      { id: 1, topic: "3Sum (LC 15)", desc: "Must sort first. Don't forget duplicate skipping for both left and right pointers." },
      { id: 2, topic: "Daily Temperatures (LC 739)", desc: "Monotonic stack must store array INDICES, not temperature values." }
    ],
    projectDeliverables: {}
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        state = Object.assign(state, JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load state from localStorage:', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      updateHeaderStats();
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }

  const headerProgressPct = document.getElementById('headerProgressPct');
  const headerMiniBar = document.getElementById('headerMiniBar');
  const headerDaysCount = document.getElementById('headerDaysCount');

  const navTabs = document.querySelectorAll('.nav-tab');
  const tabPanes = document.querySelectorAll('.tab-pane');

  function initNavigation() {
    navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        navTabs.forEach(t => t.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const targetId = tab.getAttribute('data-tab');
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
      });
    });
  }

  function updateHeaderStats() {
    const totalDays = PREP_DATA.days.length || 224;
    const completedCount = Object.values(state.completedDays).filter(Boolean).length;
    const pct = Math.round((completedCount / totalDays) * 100);

    headerProgressPct.textContent = `${pct}%`;
    headerMiniBar.style.width = `${pct}%`;
    headerDaysCount.textContent = `${completedCount} / ${totalDays}`;
  }

  // Today's Mission Tab
  const displayDayNum = document.getElementById('displayDayNum');
  const displayDayMeta = document.getElementById('displayDayMeta');
  const missionPhaseTag = document.getElementById('missionPhaseTag');
  const missionTimeTag = document.getElementById('missionTimeTag');
  const missionTopic = document.getElementById('missionTopic');
  const missionTarget = document.getElementById('missionTarget');
  const chkDayComplete = document.getElementById('chkDayComplete');
  const lblCompleteStatus = document.getElementById('lblCompleteStatus');
  const txtDayNote = document.getElementById('txtDayNote');
  const btnSaveNote = document.getElementById('btnSaveNote');
  const saveStatusIndicator = document.getElementById('saveStatusIndicator');
  const btnPrevDay = document.getElementById('btnPrevDay');
  const btnNextDay = document.getElementById('btnNextDay');
  const btnJumpToToday = document.getElementById('btnJumpToToday');
  const reviewDueList = document.getElementById('reviewDueList');
  const reviewBadgeCount = document.getElementById('reviewBadgeCount');

  function renderDayMission(dayNum) {
    state.currentDay = Math.max(1, Math.min(PREP_DATA.days.length, dayNum));
    const dayData = PREP_DATA.days[state.currentDay - 1];

    if (!dayData) return;

    displayDayNum.textContent = `Day ${dayData.day}`;
    displayDayMeta.textContent = `Week ${dayData.week} • ${dayData.dayOfWeek}`;
    missionPhaseTag.textContent = dayData.phase;
    missionTimeTag.textContent = `⏱️ ${dayData.time} Protocol`;
    missionTopic.textContent = dayData.topic;
    missionTarget.textContent = dayData.target;

    const isDone = !!state.completedDays[state.currentDay];
    chkDayComplete.checked = isDone;
    lblCompleteStatus.textContent = isDone ? 'Completed ✓' : 'Mark Completed';
    lblCompleteStatus.style.color = isDone ? 'var(--accent-emerald)' : 'var(--text-primary)';

    txtDayNote.value = state.dayNotes[state.currentDay] || '';
    saveStatusIndicator.textContent = 'Auto-saved to localStorage';

    renderSpacedReviews(state.currentDay);
    saveState();
  }

  function renderSpacedReviews(currentDay) {
    reviewDueList.innerHTML = '';
    const dueItems = [];
    const intervals = [3, 7, 14, 30];

    intervals.forEach(inv => {
      const targetDay = currentDay - inv;
      if (targetDay >= 1 && PREP_DATA.days[targetDay - 1]) {
        dueItems.push({
          day: targetDay,
          interval: inv,
          data: PREP_DATA.days[targetDay - 1]
        });
      }
    });

    reviewBadgeCount.textContent = `${dueItems.length} topics due`;

    if (dueItems.length === 0) {
      reviewDueList.innerHTML = '<div class="empty-state">No spaced repetition reviews scheduled for today. Keep building!</div>';
      return;
    }

    dueItems.forEach(item => {
      const div = document.createElement('div');
      div.className = 'review-item';
      div.innerHTML = `
        <div>
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); font-weight: 700;">Day ${item.day} (${item.interval}d ago):</span>
          <strong style="margin-left: 8px; color: #fff;">${item.data.topic}</strong>
        </div>
        <button class="btn-secondary" style="font-size: 0.75rem;" onclick="jumpToDay(${item.day})">Review Day</button>
      `;
      reviewDueList.appendChild(div);
    });
  }

  window.jumpToDay = function (day) {
    renderDayMission(day);
    document.getElementById('navTabToday').click();
  };

  chkDayComplete.addEventListener('change', () => {
    state.completedDays[state.currentDay] = chkDayComplete.checked;
    lblCompleteStatus.textContent = chkDayComplete.checked ? 'Completed ✓' : 'Mark Completed';
    lblCompleteStatus.style.color = chkDayComplete.checked ? 'var(--accent-emerald)' : 'var(--text-primary)';
    saveState();
    renderRoadmapGrid();
  });

  btnSaveNote.addEventListener('click', () => {
    state.dayNotes[state.currentDay] = txtDayNote.value;
    saveState();
    saveStatusIndicator.textContent = 'Saved successfully! ✓';
    setTimeout(() => {
      saveStatusIndicator.textContent = 'Auto-saved to localStorage';
    }, 2000);
  });

  txtDayNote.addEventListener('input', () => {
    state.dayNotes[state.currentDay] = txtDayNote.value;
    saveState();
  });

  btnPrevDay.addEventListener('click', () => {
    if (state.currentDay > 1) renderDayMission(state.currentDay - 1);
  });

  btnNextDay.addEventListener('click', () => {
    if (state.currentDay < PREP_DATA.days.length) renderDayMission(state.currentDay + 1);
  });

  btnJumpToToday.addEventListener('click', () => {
    const firstUnfinished = PREP_DATA.days.find(d => !state.completedDays[d.day]);
    const target = firstUnfinished ? firstUnfinished.day : 1;
    renderDayMission(target);
  });

  // Roadmap Tab
  const roadmapGrid = document.getElementById('roadmapGrid');
  const selPhaseFilter = document.getElementById('selPhaseFilter');
  const selFocusFilter = document.getElementById('selFocusFilter');
  const txtSearchRoadmap = document.getElementById('txtSearchRoadmap');

  function renderRoadmapGrid() {
    roadmapGrid.innerHTML = '';
    const phaseVal = selPhaseFilter.value;
    const focusVal = selFocusFilter.value;
    const searchVal = txtSearchRoadmap.value.toLowerCase().trim();

    const filtered = PREP_DATA.days.filter(d => {
      const matchPhase = (phaseVal === 'all') || d.phase.includes(phaseVal);
      const matchFocus = (focusVal === 'all') || d.focusArea.includes(focusVal);
      const matchSearch = (!searchVal) ||
        d.topic.toLowerCase().includes(searchVal) ||
        d.target.toLowerCase().includes(searchVal) ||
        `day ${d.day}`.includes(searchVal);
      return matchPhase && matchFocus && matchSearch;
    });

    filtered.forEach(d => {
      const isDone = !!state.completedDays[d.day];
      const card = document.createElement('div');
      card.className = `roadmap-card ${isDone ? 'completed' : ''}`;
      card.innerHTML = `
        <div>
          <div class="card-top">
            <span class="card-day-badge">DAY ${d.day} • W${d.week}</span>
            <span class="card-focus-tag">${d.focusArea}</span>
          </div>
          <h4 class="card-topic">${d.topic}</h4>
          <p class="card-target">${d.target}</p>
        </div>
        <div class="card-footer">
          <span class="card-time">⏱️ ${d.time}</span>
          <button class="btn-secondary" style="font-size: 0.75rem;" onclick="jumpToDay(${d.day})">Open Day ➔</button>
        </div>
      `;
      roadmapGrid.appendChild(card);
    });
  }

  selPhaseFilter.addEventListener('change', renderRoadmapGrid);
  selFocusFilter.addEventListener('change', renderRoadmapGrid);
  txtSearchRoadmap.addEventListener('input', renderRoadmapGrid);

  // DSA Patterns Tab (Full CodeWithShubham Mindmap)
  const patternsGrid = document.getElementById('patternsGrid');

  function renderDSAPatterns() {
    patternsGrid.innerHTML = '';
    const categories = PREP_DATA.dsaCategories || [];

    categories.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'pattern-card glass-panel';

      const subpatternsHtml = cat.subPatterns.map(sp => `<li>${sp}</li>`).join('');
      const archetypesHtml = (cat.archetypes || []).map(a => `
        <a href="${a.url}" target="_blank" class="archetype-chip" title="Open on LeetCode">
          ${a.name} <span style="color: var(--accent-amber); font-weight: 700;">(${a.diff})</span> ↗
        </a>
      `).join('');

      card.innerHTML = `
        <h3 class="pattern-title">${cat.name}</h3>
        <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; margin-bottom: 8px;">Mindmap Sub-Branches & Methods:</div>
        <ul class="subpatterns-list">${subpatternsHtml}</ul>
        <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; margin: 12px 0 8px;">Key LeetCode Practice Archetypes:</div>
        <div class="archetypes-group">${archetypesHtml}</div>
      `;
      patternsGrid.appendChild(card);
    });
  }

  // System Design Tab (Full CodeLLDWithShubham Mindmap)
  const hldGrid = document.getElementById('hldGrid');
  const lldGrid = document.getElementById('lldGrid');
  const spofContainer = document.getElementById('spofContainer');
  const sdSubtabBtns = document.querySelectorAll('.subtab-btn');
  const sdSubtabContents = document.querySelectorAll('.subtab-content');

  function initSystemDesignSubtabs() {
    sdSubtabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sdSubtabBtns.forEach(b => b.classList.remove('active'));
        sdSubtabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById(btn.getAttribute('data-subtab'));
        if (target) target.classList.add('active');
      });
    });
  }

  function renderSystemDesign() {
    // HLD Anchors
    hldGrid.innerHTML = '';
    PREP_DATA.hldAnchorSystems.forEach(h => {
      const card = document.createElement('div');
      card.className = 'sd-card glass-panel';
      card.innerHTML = `
        <span style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 700;">ANCHOR SYSTEM</span>
        <h3 style="color: #fff; margin-top: 4px;">${h.name}</h3>
        <p style="margin-top: 10px; color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5;">${h.keyConcepts}</p>
      `;
      hldGrid.appendChild(card);
    });

    // LLD Mindmap Complete Structure
    lldGrid.innerHTML = '';
    const lld = PREP_DATA.lldMindmap;

    if (lld) {
      // 1. All 23 Design Patterns
      const dpCard = document.createElement('div');
      dpCard.className = 'sd-card glass-panel';
      dpCard.style.gridColumn = '1 / -1';

      const creational = lld.all23DesignPatterns.creational.map(p => `<li><strong>${p.name}:</strong> ${p.desc}</li>`).join('');
      const behavioral = lld.all23DesignPatterns.behavioral.map(p => `<li><strong>${p.name}:</strong> ${p.desc}</li>`).join('');
      const structural = lld.all23DesignPatterns.structural.map(p => `<li><strong>${p.name}:</strong> ${p.desc}</li>`).join('');

      dpCard.innerHTML = `
        <h3 style="color: var(--accent-rose); font-size: 1.3rem; margin-bottom: 12px;">🎨 All 23 Gang of Four (GoF) Design Patterns</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div>
            <h4 style="color: var(--accent-indigo); margin-bottom: 8px;">Creational (5)</h4>
            <ul class="subpatterns-list" style="font-size: 0.8rem;">${creational}</ul>
          </div>
          <div>
            <h4 style="color: var(--accent-cyan); margin-bottom: 8px;">Behavioral (10)</h4>
            <ul class="subpatterns-list" style="font-size: 0.8rem;">${behavioral}</ul>
          </div>
          <div>
            <h4 style="color: var(--accent-amber); margin-bottom: 8px;">Structural (8)</h4>
            <ul class="subpatterns-list" style="font-size: 0.8rem;">${structural}</ul>
          </div>
        </div>
      `;
      lldGrid.appendChild(dpCard);

      // 2. OOP Fundamentals & Class Relationships
      const oopCard = document.createElement('div');
      oopCard.className = 'sd-card glass-panel';
      const oopItems = lld.oopsFundamentals.map(o => `<li><strong>${o.name}:</strong> ${o.desc}</li>`).join('');
      oopCard.innerHTML = `
        <h3 style="color: var(--accent-cyan);">🧬 OOP Fundamentals (10 Pillars)</h3>
        <ul class="subpatterns-list" style="font-size: 0.82rem; margin-top: 10px;">${oopItems}</ul>
      `;
      lldGrid.appendChild(oopCard);

      // 3. Class Relationships & UML Diagrams
      const relCard = document.createElement('div');
      relCard.className = 'sd-card glass-panel';
      const relItems = lld.classRelationships.map(r => `<li><strong>${r.name}:</strong> ${r.desc}</li>`).join('');
      const umlItems = lld.umlDiagrams.map(u => `<li><strong>${u.name}:</strong> ${u.desc}</li>`).join('');
      relCard.innerHTML = `
        <h3 style="color: var(--accent-purple);">🔗 Class Relationships & UML</h3>
        <h4 style="font-size: 0.85rem; color: var(--text-muted); margin: 8px 0;">Class Relationships (5):</h4>
        <ul class="subpatterns-list" style="font-size: 0.82rem;">${relItems}</ul>
        <h4 style="font-size: 0.85rem; color: var(--text-muted); margin: 8px 0;">UML Diagrams (5):</h4>
        <ul class="subpatterns-list" style="font-size: 0.82rem;">${umlItems}</ul>
      `;
      lldGrid.appendChild(relCard);

      // 4. Design Principles & SOLID
      const solidCard = document.createElement('div');
      solidCard.className = 'sd-card glass-panel';
      const solidItems = lld.solidPrinciples.map(s => `<li><strong>${s.name}:</strong> ${s.desc}</li>`).join('');
      const dpItems = lld.designPrinciples.map(d => `<li><strong>${d.name}:</strong> ${d.desc}</li>`).join('');
      solidCard.innerHTML = `
        <h3 style="color: var(--accent-emerald);">📐 SOLID & Core Design Principles</h3>
        <h4 style="font-size: 0.85rem; color: var(--text-muted); margin: 8px 0;">SOLID Principles:</h4>
        <ul class="subpatterns-list" style="font-size: 0.82rem;">${solidItems}</ul>
        <h4 style="font-size: 0.85rem; color: var(--text-muted); margin: 8px 0;">Design Principles (DRY, KISS, YAGNI, Demeter):</h4>
        <ul class="subpatterns-list" style="font-size: 0.82rem;">${dpItems}</ul>
      `;
      lldGrid.appendChild(solidCard);
    }

    // Anchor Machine Coding Problems
    PREP_DATA.lldAnchorProblems.forEach(l => {
      const card = document.createElement('div');
      card.className = 'sd-card glass-panel';
      card.innerHTML = `
        <span style="font-size: 0.75rem; color: var(--accent-purple); font-weight: 700;">MACHINE CODING ANCHOR</span>
        <h3 style="color: #fff; margin-top: 4px;">${l.name}</h3>
        <div style="font-size: 0.8rem; color: var(--accent-indigo); font-weight: 600; margin: 6px 0;">Design Patterns: ${l.patterns}</div>
        <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5;">${l.keyFeatures}</p>
      `;
      lldGrid.appendChild(card);
    });

    // SPOF Guide
    spofContainer.innerHTML = `
      <h3 style="font-size: 1.3rem; margin-bottom: 12px; color: var(--accent-rose);">🛡️ Single Points of Failure (SPOF) Interview Checklist</h3>
      <p style="color: var(--text-secondary); margin-bottom: 20px;">Review all 8 resilience layers before completing any System Design interview:</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
        <div class="time-block"><strong>1. Compute:</strong> Replicate instances across 2–3 Availability Zones (Multi-AZ) behind an Auto Scaling Group.</div>
        <div class="time-block"><strong>2. Load Balancer:</strong> Use managed ALB/NLB with cross-zone balancing or Keepalived VRRP active-active pair.</div>
        <div class="time-block"><strong>3. Database:</strong> Primary + Synchronous Standby replica (Multi-AZ RDS). PgBouncer for connection pool exhaustion.</div>
        <div class="time-block"><strong>4. Caching:</strong> Redis Sentinel (quorum failover) or Redis Cluster. Prevent stampedes via probabilistic early expiry & mutex locks.</div>
        <div class="time-block"><strong>5. Message Queues:</strong> Cluster brokers across AZs. Implement Dead-Letter Queues (DLQ) for poison pills.</div>
        <div class="time-block"><strong>6. 3rd-Party Calls:</strong> Never make synchronous calls without explicit timeouts and Circuit Breakers (Polly in C#).</div>
        <div class="time-block"><strong>7. Network & DNS:</strong> Multi-DNS provider fallback (Route53 + Cloudflare) with low TTL (60–300s).</div>
        <div class="time-block"><strong>8. Deployment:</strong> Zero big-bang deploys. Always use Blue-Green or Canary deployment with automated error rollback.</div>
      </div>
    `;
  }

  // Project Milestones Tab
  const milestonesContainer = document.getElementById('milestonesContainer');

  function renderProjectMilestones() {
    milestonesContainer.innerHTML = '';
    PREP_DATA.projectMilestones.forEach(m => {
      const card = document.createElement('div');
      card.className = 'milestone-card glass-panel';

      const itemsHtml = m.deliverables.map((item, idx) => {
        const itemKey = `p${m.phase}_d${idx}`;
        const isChecked = !!state.projectDeliverables[itemKey];
        return `
          <li class="deliverable-item">
            <input type="checkbox" id="${itemKey}" ${isChecked ? 'checked' : ''} onchange="toggleProjectDeliverable('${itemKey}', this.checked)">
            <label for="${itemKey}" style="${isChecked ? 'text-decoration: line-through; color: var(--accent-emerald);' : 'color: var(--text-primary);'}">${item}</label>
          </li>
        `;
      }).join('');

      card.innerHTML = `
        <div class="milestone-weeks">${m.weeks}</div>
        <h3>${m.title}</h3>
        <ul class="deliverables-checklist" style="margin-top: 14px;">${itemsHtml}</ul>
      `;
      milestonesContainer.appendChild(card);
    });
  }

  window.toggleProjectDeliverable = function (key, checked) {
    state.projectDeliverables[key] = checked;
    saveState();
    renderProjectMilestones();
  };

  // Behavioral STAR Tab
  const starGrid = document.getElementById('starGrid');

  function renderBehavioralStories() {
    starGrid.innerHTML = '';
    PREP_DATA.behavioralStories.forEach(s => {
      const card = document.createElement('div');
      card.className = 'star-card glass-panel';
      card.innerHTML = `
        <h4 class="star-title">${s.title}</h4>
        <div class="star-row"><span class="star-lbl">Situation:</span> ${s.situation}</div>
        <div class="star-row"><span class="star-lbl">Task:</span> ${s.task}</div>
        <div class="star-row"><span class="star-lbl">Action:</span> ${s.action}</div>
        <div class="star-row"><span class="star-lbl">Result:</span> <strong style="color: var(--accent-emerald);">${s.result}</strong></div>
      `;
      starGrid.appendChild(card);
    });
  }

  // Mistakes Tab
  const txtMistakeTopic = document.getElementById('txtMistakeTopic');
  const txtMistakeDesc = document.getElementById('txtMistakeDesc');
  const btnAddMistake = document.getElementById('btnAddMistake');
  const mistakesList = document.getElementById('mistakesList');

  function renderMistakes() {
    mistakesList.innerHTML = '';
    if (state.mistakes.length === 0) {
      mistakesList.innerHTML = '<div class="empty-state">No mistakes recorded yet. Record friction points as you practice!</div>';
      return;
    }

    state.mistakes.forEach(m => {
      const entry = document.createElement('div');
      entry.className = 'mistake-entry';
      entry.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div class="mistake-entry-title">${m.topic}</div>
          <button class="btn-secondary" style="font-size: 0.7rem; color: var(--accent-rose);" onclick="deleteMistake(${m.id})">Remove</button>
        </div>
        <div class="mistake-entry-desc">${m.desc}</div>
      `;
      mistakesList.appendChild(entry);
    });
  }

  btnAddMistake.addEventListener('click', () => {
    const topic = txtMistakeTopic.value.trim();
    const desc = txtMistakeDesc.value.trim();
    if (!topic || !desc) {
      alert('Please enter both a topic and mistake description.');
      return;
    }

    state.mistakes.unshift({
      id: Date.now(),
      topic,
      desc
    });
    saveState();
    renderMistakes();
    txtMistakeTopic.value = '';
    txtMistakeDesc.value = '';
  });

  window.deleteMistake = function (id) {
    state.mistakes = state.mistakes.filter(m => m.id !== id);
    saveState();
    renderMistakes();
  };

  // Backup & Import
  const btnExportBackup = document.getElementById('btnExportBackup');
  const btnImportBackup = document.getElementById('btnImportBackup');
  const fileImportInput = document.getElementById('fileImportInput');

  btnExportBackup.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `NexusPrep_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  });

  btnImportBackup.addEventListener('click', () => {
    fileImportInput.click();
  });

  fileImportInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        state = Object.assign(state, imported);
        saveState();
        renderDayMission(state.currentDay || 1);
        renderRoadmapGrid();
        renderProjectMilestones();
        renderMistakes();
        alert('Backup successfully restored! ✓');
      } catch (err) {
        alert('Invalid JSON backup file: ' + err.message);
      }
    };
    reader.readAsText(file);
  });

  function init() {
    loadState();
    initNavigation();
    initSystemDesignSubtabs();

    updateHeaderStats();
    renderDayMission(state.currentDay || 1);
    renderRoadmapGrid();
    renderDSAPatterns();
    renderSystemDesign();
    renderProjectMilestones();
    renderBehavioralStories();
    renderMistakes();
  }

  init();
})();
