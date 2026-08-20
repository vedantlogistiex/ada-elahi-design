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

  async function captureScreen(filename) {
    const frame = await page.$('.device-frame');
    if (frame) {
      const outPath = path.join(artifactDir, filename);
      await frame.screenshot({ path: outPath });
      console.log(`[Screen] Saved: ${filename}`);
    }
  }

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

  console.log('=== 1. CAPTURING FULL PHONE SCREEN VIEWS ===');

  // 1. Today View
  await page.click('#tabToday');
  await wait(400);
  await captureScreen('screen_01_today.png');

  // 2. Today View (Live Recording Active)
  const heroRec = await page.$('.btn-record');
  if (heroRec) {
    await heroRec.click();
    await wait(400);
    await captureScreen('screen_02_today_live_recording.png');
    await captureComp('.ios-island', 'component_02_dynamic_island_recording.png');
    await captureComp('.live-recording-bar', 'component_02b_live_recording_banner.png');
    const stopBtn = await page.$('.btn-rec-stop');
    if (stopBtn) await stopBtn.click();
    await wait(300);
  }

  // 3. Today View (Conflict Warning)
  await page.click('#btnSceneConflict');
  await wait(400);
  await captureScreen('screen_03_today_conflict_warning.png');
  await page.click('#btnSceneNormal');
  await wait(300);

  // 4. Today View (Security Denied)
  await page.click('#btnSceneDenied');
  await wait(400);
  await captureScreen('screen_04_today_security_denied.png');
  await page.click('#btnSceneNormal');
  await wait(300);

  // 5. Today View (AI Loading)
  await page.click('#btnSceneLoading');
  await wait(400);
  await captureScreen('screen_05_today_ai_loading.png');
  await page.click('#btnSceneNormal');
  await wait(300);

  // 6. Ask View
  await page.click('#tabAsk');
  await page.waitForSelector('.prompt-item');
  await wait(400);
  await captureScreen('screen_06_ask_query.png');

  // 7. Answer View
  await page.click('.prompt-item');
  await page.waitForSelector('.answer-card');
  await wait(400);
  await captureScreen('screen_07_answer_brief.png');

  // 8. Meetings View (Upcoming)
  await page.click('#tabMeetings');
  await page.waitForSelector('.meeting-row');
  await wait(400);
  await captureScreen('screen_08_meetings_upcoming.png');

  // 9. Meetings View (History)
  const meetingSegs = await page.$$('.seg-btn');
  if (meetingSegs[1]) {
    await meetingSegs[1].click();
    await wait(400);
    await captureScreen('screen_09_meetings_history.png');
    // switch back to upcoming
    if (meetingSegs[0]) await meetingSegs[0].click();
    await wait(300);
  }

  // 10. Pre-Meeting Brief View
  const mRows1 = await page.$$('.meeting-row');
  if (mRows1[0]) {
    await mRows1[0].click();
    await wait(400);
    await captureScreen('screen_10_premeeting_brief.png');
  }

  // 11. Meeting Output (AI Decisions & Actions)
  await page.click('#tabMeetings');
  await wait(300);
  const mRows2 = await page.$$('.meeting-row');
  if (mRows2[1]) {
    await mRows2[1].click();
    await wait(400);
    await captureScreen('screen_11_meeting_output_decisions.png');
  }

  // 12. Meeting Output (Verbatim Transcript)
  await page.click('#btnSegTranscript');
  await wait(400);
  await captureScreen('screen_12_meeting_output_transcript.png');

  // 13. Institutional Memory View
  await page.click('#tabMemory');
  await wait(400);
  await captureScreen('screen_13_institutional_memory.png');

  // 14. Executive Settings View (More)
  await page.click('#tabMore');
  await wait(400);
  await captureScreen('screen_14_executive_settings.png');

  // 15. Notifications Bottom Sheet
  await page.click('#notifBellBtn');
  await wait(400);
  await captureScreen('screen_15_notifications_sheet.png');
  await captureComp('#sheetNotifications', 'component_18_notifications_sheet_panel.png');
  const closeNotif = await page.$('#sheetNotifications .sheet-close');
  if (closeNotif) await closeNotif.click();
  await wait(300);

  // 16. Why This Answer Sheet
  await page.click('#tabAsk');
  await page.waitForSelector('.prompt-item');
  await page.click('.prompt-item');
  await page.waitForSelector('.answer-card');
  await wait(300);
  await page.click('.answer-footer .btn-link');
  await wait(400);
  await captureScreen('screen_16_why_this_answer_sheet.png');
  await captureComp('#sheetWhyThisAnswer', 'component_19_why_this_answer_sheet_panel.png');
  const closeWhy = await page.$('#sheetWhyThisAnswer .sheet-close');
  if (closeWhy) await closeWhy.click();
  await wait(300);

  // 17. Approval Protocol Modal
  await page.click('#tabMeetings');
  await wait(300);
  const segHist = await page.$$('.seg-btn');
  if (segHist[1]) await segHist[1].click();
  await wait(300);
  const histRow = await page.$$('.meeting-row');
  if (histRow[0]) await histRow[0].click();
  await wait(300);
  const signBtn = await page.$('.btn-primary.btn-sm');
  if (signBtn) await signBtn.click();
  await wait(400);
  await captureScreen('screen_17_approval_protocol_modal.png');
  await captureComp('#sheetApproval', 'component_20_approval_modal_panel.png');
  const closeAppr = await page.$('#sheetApproval .sheet-close');
  if (closeAppr) await closeAppr.click();
  await wait(300);

  // 18. Arabic RTL Today View
  const studioBtns = await page.$$('.studio-btn');
  for (const btn of studioBtns) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('العربية') || text.includes('English')) {
      await btn.click();
      break;
    }
  }
  await page.click('#tabToday');
  await wait(400);
  await captureScreen('screen_18_arabic_rtl_today.png');

  // Switch back to English
  for (const btn of studioBtns) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('English') || text.includes('العربية')) {
      await btn.click();
      break;
    }
  }
  await wait(400);

  console.log('=== 2. CAPTURING ISOLATED INDIVIDUAL COMPONENTS ===');

  // Component 1: Dynamic Island (Idle)
  await page.click('#tabToday');
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

  // Component 10: Ask Trigger Capsule
  await captureComp('.ask-capsule', 'component_10_ask_trigger_capsule.png');

  // Component 11: Ask Query Composer Card
  await page.click('#tabAsk');
  await page.waitForSelector('.ask-input-wrap');
  await captureComp('.ask-input-wrap', 'component_11_ask_query_composer.png');

  // Component 12: Suggested Inquiry Chips
  const promptItems = await page.$$('.prompt-item');
  if (promptItems[0]) {
    const outPath = path.join(artifactDir, 'component_12_suggested_inquiry_chip.png');
    await promptItems[0].screenshot({ path: outPath });
    console.log('[Component] Saved: component_12_suggested_inquiry_chip.png');
  }

  // Component 13: Executive Answer Card
  await promptItems[0].click();
  await page.waitForSelector('.answer-card');
  await captureComp('.answer-card', 'component_13_executive_answer_card.png');

  // Component 14: Pre-Meeting Brief Card
  await page.click('#tabMeetings');
  await page.waitForSelector('.meeting-row');
  const meetRows = await page.$$('.meeting-row');
  if (meetRows[0]) await meetRows[0].click();
  await page.waitForSelector('.screen-view.active .card');
  const briefCard = await page.$('.screen-view.active .card');
  if (briefCard) {
    const outPath = path.join(artifactDir, 'component_14_premeeting_brief_card.png');
    await briefCard.screenshot({ path: outPath });
    console.log('[Component] Saved: component_14_premeeting_brief_card.png');
  }

  // Component 15: Verbatim Transcript Bubble
  await page.click('#tabMeetings');
  await page.waitForSelector('.meeting-row');
  const meetRowsOutput = await page.$$('.meeting-row');
  if (meetRowsOutput[1]) await meetRowsOutput[1].click();
  await page.waitForSelector('#btnSegTranscript');
  await page.click('#btnSegTranscript');
  await page.waitForSelector('.transcript-bubble');
  await captureComp('.transcript-bubble', 'component_15_verbatim_transcript_bubble.png');

  // Component 16: Institutional Memory Records
  await page.click('#tabMemory');
  await page.waitForSelector('.screen-view.active .card');
  const memCard = await page.$('.screen-view.active .card');
  if (memCard) {
    const outPath = path.join(artifactDir, 'component_16_institutional_memory_records.png');
    await memCard.screenshot({ path: outPath });
    console.log('[Component] Saved: component_16_institutional_memory_records.png');
  }

  // Component 17: Executive Profile Row
  await page.click('#tabMore');
  await page.waitForSelector('.profile-row');
  await captureComp('.profile-row', 'component_17_executive_profile_row.png');

  await browser.close();
  console.log('=== COMPLETE: ALL 18 SCREENS AND 19 COMPONENTS CAPTURED! ===');
}

main().catch(console.error);
