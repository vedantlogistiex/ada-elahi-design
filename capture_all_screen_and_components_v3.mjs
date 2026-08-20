import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const executablePath = fs.existsSync(edgePath) ? edgePath : (fs.existsSync(chromePath) ? chromePath : null);

  if (!executablePath) {
    console.error('No browser executable found');
    return;
  }

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1100, deviceScaleFactor: 2 });
  const artifactDir = 'C:\\Users\\vedan\\.gemini\\antigravity-ide\\brain\\8a42f4d3-c125-43f5-aa40-ba207987ffb6';

  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });

  // DOM Click helper via evaluate
  async function domClick(selector) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) el.click();
    }, selector);
  }

  // Screen capture helper (crops strictly to the phone device screen)
  async function captureScreen(filename) {
    const frame = await page.$('.device-frame');
    if (frame) {
      const outPath = path.join(artifactDir, filename);
      await frame.screenshot({ path: outPath });
      console.log(`[Screen] Saved: ${filename}`);
    }
  }

  // Component capture helper (crops strictly to the component element)
  async function captureComp(selector, filename) {
    const el = await page.$(selector);
    if (el) {
      const outPath = path.join(artifactDir, filename);
      await el.screenshot({ path: outPath });
      console.log(`[Component] Saved: ${filename}`);
    } else {
      console.log(`[Component] NOT FOUND: ${selector}`);
    }
  }

  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  console.log('=== 1. CAPTURING PURE SCREEN VIEWS (MOBILE VIEWPORT ONLY) ===');

  // 1. Today Screen
  await domClick('#tabToday');
  await wait(400);
  await captureScreen('screen_01_today.png');

  // 2. Today Screen (Live Recording Active)
  await domClick('.btn-record');
  await wait(400);
  await captureScreen('screen_02_today_live_recording.png');
  await captureComp('.ios-island', 'component_02_dynamic_island_recording.png');
  await captureComp('.live-recording-bar', 'component_02b_live_recording_banner.png');
  await domClick('.btn-rec-stop');
  await wait(300);

  // 3. Today Screen (Conflict Warning)
  await domClick('#btnSceneConflict');
  await wait(400);
  await captureScreen('screen_03_today_conflict_warning.png');
  await domClick('#btnSceneNormal');
  await wait(300);

  // 4. Today Screen (Security Denied)
  await domClick('#btnSceneDenied');
  await wait(400);
  await captureScreen('screen_04_today_security_denied.png');
  await domClick('#btnSceneNormal');
  await wait(300);

  // 5. Today Screen (AI Loading)
  await domClick('#btnSceneLoading');
  await wait(400);
  await captureScreen('screen_05_today_ai_loading.png');
  await domClick('#btnSceneNormal');
  await wait(300);

  // 6. Ask Screen
  await domClick('#tabAsk');
  await wait(400);
  await captureScreen('screen_06_ask_query.png');

  // 7. Answer Screen
  await domClick('.prompt-item');
  await wait(400);
  await captureScreen('screen_07_answer_brief.png');

  // 8. Meetings Screen (Upcoming Schedule)
  await domClick('#tabMeetings');
  await wait(400);
  await captureScreen('screen_08_meetings_upcoming.png');

  // 9. Meetings Screen (Recorded History)
  await page.evaluate(() => {
    const segs = document.querySelectorAll('.seg-btn');
    if (segs[1]) segs[1].click();
  });
  await wait(400);
  await captureScreen('screen_09_meetings_history.png');
  await page.evaluate(() => {
    const segs = document.querySelectorAll('.seg-btn');
    if (segs[0]) segs[0].click();
  });
  await wait(300);

  // 10. 60-Sec Pre-Meeting Brief Screen
  await page.evaluate(() => {
    const mRows = document.querySelectorAll('.meeting-row');
    if (mRows[0]) mRows[0].click();
  });
  await wait(400);
  await captureScreen('screen_10_premeeting_brief.png');

  // 11. Meeting Output & Decisions Screen
  await domClick('#tabMeetings');
  await wait(300);
  await page.evaluate(() => {
    const mRows = document.querySelectorAll('.meeting-row');
    if (mRows[1]) mRows[1].click();
  });
  await wait(400);
  await captureScreen('screen_11_meeting_output_decisions.png');

  // 12. Meeting Output Verbatim Transcript Tab
  await domClick('#btnSegTranscript');
  await wait(400);
  await captureScreen('screen_12_meeting_output_transcript.png');

  // 13. Institutional Sovereign Memory Screen
  await domClick('#tabMemory');
  await wait(400);
  await captureScreen('screen_13_institutional_memory.png');

  // 14. Executive Settings & Governance Screen
  await domClick('#tabMore');
  await wait(400);
  await captureScreen('screen_14_executive_settings.png');

  // 15. Notifications Bottom Sheet Screen
  await domClick('#notifBellBtn');
  await wait(400);
  await captureScreen('screen_15_notifications_sheet.png');
  await captureComp('#sheetNotifications', 'component_18_notifications_sheet_panel.png');
  await domClick('#sheetNotifications .sheet-close');
  await wait(300);

  // 16. Why This Answer Sheet Screen
  await domClick('#tabAsk');
  await wait(300);
  await domClick('.prompt-item');
  await wait(300);
  await domClick('.answer-footer .btn-link');
  await wait(400);
  await captureScreen('screen_16_why_this_answer_sheet.png');
  await captureComp('#sheetWhyThisAnswer', 'component_19_why_this_answer_sheet_panel.png');
  await domClick('#sheetWhyThisAnswer .sheet-close');
  await wait(300);

  // 17. Approval Protocol Modal Screen
  await domClick('#tabMeetings');
  await wait(300);
  await page.evaluate(() => {
    const segs = document.querySelectorAll('.seg-btn');
    if (segs[1]) segs[1].click();
  });
  await wait(300);
  await page.evaluate(() => {
    const mRows = document.querySelectorAll('.meeting-row');
    if (mRows[0]) mRows[0].click();
  });
  await wait(300);
  await domClick('.btn-primary.btn-sm');
  await wait(400);
  await captureScreen('screen_17_approval_protocol_modal.png');
  await captureComp('#sheetApproval', 'component_20_approval_modal_panel.png');
  await domClick('#sheetApproval .sheet-close');
  await wait(300);

  // 18. Arabic RTL Today Screen
  await page.evaluate(() => {
    const studioBtns = document.querySelectorAll('.studio-btn');
    for (const b of studioBtns) {
      if (b.textContent.includes('العربية') || b.textContent.includes('English')) {
        b.click();
        break;
      }
    }
  });
  await domClick('#tabToday');
  await wait(400);
  await captureScreen('screen_18_arabic_rtl_today.png');

  // Switch back to English
  await page.evaluate(() => {
    const studioBtns = document.querySelectorAll('.studio-btn');
    for (const b of studioBtns) {
      if (b.textContent.includes('English') || b.textContent.includes('العربية')) {
        b.click();
        break;
      }
    }
  });
  await wait(400);

  console.log('=== 2. CAPTURING ISOLATED INDIVIDUAL COMPONENTS ===');
  await wait(2600); // Allow any toast notifications to cleanly fade out

  // Component 1: Dynamic Island (Idle)
  await domClick('#tabToday');
  await wait(300);
  await captureComp('.ios-island', 'component_01_dynamic_island_idle.png');

  // Component 3: iOS Status Bar
  await captureComp('.ios-status-bar', 'component_03_ios_status_bar.png');

  // Component 4: App Nav Header
  await captureComp('.app-nav-header', 'component_04_app_nav_header.png');

  // Component 5: Floating Tab Bar
  await captureComp('.app-tab-bar', 'component_05_floating_tab_bar.png');

  // Component 6: KPI Metrics Strip
  await captureComp('.kpi-row', 'component_06_kpi_metrics_strip.png');

  // Component 7: Hero Recorder Card
  await captureComp('.btn-record', 'component_07_hero_recorder_card.png');

  // Component 8: Priority Briefing Card (First Carousel Card)
  await domClick('#tabToday');
  await wait(400);
  const firstCard = await page.$('[style*="scrollSnapAlign"]');
  if (firstCard) {
    const outPath = path.join(artifactDir, 'component_08_priority_briefing_card.png');
    await firstCard.screenshot({ path: outPath });
    console.log('[Component] Saved: component_08_priority_briefing_card.png');
  }

  // Component 9: What Needs Attention Action List Card
  const attCard = await page.$('#viewToday .card');
  if (attCard) {
    const outPath = path.join(artifactDir, 'component_09_attention_action_items.png');
    await attCard.screenshot({ path: outPath });
    console.log('[Component] Saved: component_09_attention_action_items.png');
  }

  // Component 10: Ask Trigger Search Capsule
  await captureComp('.ask-capsule', 'component_10_ask_trigger_capsule.png');

  // Component 11: Ask Query Composer Card
  await domClick('#tabAsk');
  await wait(300);
  await captureComp('.ask-input-wrap', 'component_11_ask_query_composer.png');

  // Component 12: Suggested Inquiry Chips
  const promptEl = await page.$('.prompt-item');
  if (promptEl) {
    const outPath = path.join(artifactDir, 'component_12_suggested_inquiry_chip.png');
    await promptEl.screenshot({ path: outPath });
    console.log('[Component] Saved: component_12_suggested_inquiry_chip.png');
  }

  // Component 13: Executive Answer Card
  await domClick('.prompt-item');
  await wait(300);
  await captureComp('.answer-card', 'component_13_executive_answer_card.png');

  // Component 14: Pre-Meeting Brief Card
  await domClick('#tabMeetings');
  await wait(300);
  await page.evaluate(() => {
    const m = document.querySelectorAll('.meeting-row');
    if (m[0]) m[0].click();
  });
  await wait(300);
  const briefCard = await page.$('.screen-view.active .card');
  if (briefCard) {
    const outPath = path.join(artifactDir, 'component_14_premeeting_brief_card.png');
    await briefCard.screenshot({ path: outPath });
    console.log('[Component] Saved: component_14_premeeting_brief_card.png');
  }

  // Component 15: Verbatim Transcript Bubble
  await domClick('#tabMeetings');
  await wait(300);
  await page.evaluate(() => {
    const m = document.querySelectorAll('.meeting-row');
    if (m[1]) m[1].click();
  });
  await wait(300);
  await domClick('#btnSegTranscript');
  await wait(300);
  await captureComp('.transcript-bubble', 'component_15_verbatim_transcript_bubble.png');

  // Component 16: Institutional Memory Records
  await domClick('#tabMemory');
  await wait(300);
  const memCard = await page.$('.screen-view.active .card');
  if (memCard) {
    const outPath = path.join(artifactDir, 'component_16_institutional_memory_records.png');
    await memCard.screenshot({ path: outPath });
    console.log('[Component] Saved: component_16_institutional_memory_records.png');
  }

  // Component 17: Executive Profile Row
  await domClick('#tabMore');
  await wait(300);
  await captureComp('.profile-row', 'component_17_executive_profile_row.png');

  await browser.close();
  console.log('=== COMPLETE: ALL 18 SCREENS AND 19 COMPONENTS CAPTURED! ===');
}

main().catch(console.error);
