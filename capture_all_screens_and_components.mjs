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
  // High-DPI viewport for retina quality
  await page.setViewport({ width: 1280, height: 1100, deviceScaleFactor: 2 });
  const artifactDir = 'C:\\Users\\vedan\\.gemini\\antigravity-ide\\brain\\8a42f4d3-c125-43f5-aa40-ba207987ffb6';

  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });

  // Helper to capture only the mobile screen (.device-frame)
  async function captureDeviceScreen(filename) {
    const frame = await page.$('.device-frame');
    if (frame) {
      const outPath = path.join(artifactDir, filename);
      await frame.screenshot({ path: outPath });
      console.log(`[Screen] Saved: ${filename}`);
    }
  }

  // Helper to capture a specific element / component
  async function captureComponent(selector, filename, padding = 0) {
    const el = await page.$(selector);
    if (el) {
      const outPath = path.join(artifactDir, filename);
      await el.screenshot({ path: outPath });
      console.log(`[Component] Saved: ${filename}`);
    }
  }

  // ==========================================
  // 1. FULL PAGE SCREEN VIEWS (.device-frame)
  // ==========================================

  // Page 1: Today Screen (Normal)
  await page.click('#tabToday');
  await new Promise(r => setTimeout(r, 400));
  await captureDeviceScreen('screen_page_01_today.png');

  // Page 2: Today Screen (Live Recording Active)
  const recBtn = await page.$('.hero-recorder .btn-secondary');
  if (recBtn) {
    await recBtn.click();
    await new Promise(r => setTimeout(r, 400));
    await captureDeviceScreen('screen_page_02_today_recording.png');
    // Stop recording
    const stopBtn = await page.$('.btn-rec-stop');
    if (stopBtn) await stopBtn.click();
    await new Promise(r => setTimeout(r, 300));
  }

  // Page 3: Today Screen (Conflict / Risk State)
  const conflictBtn = await page.$('#btnScenarioConflict');
  if (conflictBtn) {
    await conflictBtn.click();
    await new Promise(r => setTimeout(r, 400));
    await captureDeviceScreen('screen_page_03_today_conflict.png');
    // Reset to normal
    const normalBtn = await page.$('#btnScenarioNormal');
    if (normalBtn) await normalBtn.click();
    await new Promise(r => setTimeout(r, 300));
  }

  // Page 4: Today Screen (Access Denied State)
  const deniedBtn = await page.$('#btnScenarioDenied');
  if (deniedBtn) {
    await deniedBtn.click();
    await new Promise(r => setTimeout(r, 400));
    await captureDeviceScreen('screen_page_04_today_denied.png');
    const normalBtn = await page.$('#btnScenarioNormal');
    if (normalBtn) await normalBtn.click();
    await new Promise(r => setTimeout(r, 300));
  }

  // Page 5: Today Screen (AI Loading State)
  const loadingBtn = await page.$('#btnScenarioLoading');
  if (loadingBtn) {
    await loadingBtn.click();
    await new Promise(r => setTimeout(r, 400));
    await captureDeviceScreen('screen_page_05_today_loading.png');
    const normalBtn = await page.$('#btnScenarioNormal');
    if (normalBtn) await normalBtn.click();
    await new Promise(r => setTimeout(r, 300));
  }

  // Page 6: Ask Screen
  await page.click('#tabAsk');
  await new Promise(r => setTimeout(r, 400));
  await captureDeviceScreen('screen_page_06_ask.png');

  // Page 7: Answer Screen
  const firstPrompt = await page.$('.prompt-item');
  if (firstPrompt) {
    await firstPrompt.click();
    await new Promise(r => setTimeout(r, 400));
    await captureDeviceScreen('screen_page_07_answer.png');
  }

  // Page 8: Meetings Screen (Upcoming Schedule)
  await page.click('#tabMeetings');
  await new Promise(r => setTimeout(r, 400));
  await captureDeviceScreen('screen_page_08_meetings_upcoming.png');

  // Page 9: Meetings Screen (Recorded History Tab)
  const meetingSegBtns = await page.$$('.seg-btn');
  if (meetingSegBtns[1]) {
    await meetingSegBtns[1].click();
    await new Promise(r => setTimeout(r, 400));
    await captureDeviceScreen('screen_page_09_meetings_history.png');
    // Switch back to upcoming
    if (meetingSegBtns[0]) await meetingSegBtns[0].click();
    await new Promise(r => setTimeout(r, 300));
  }

  // Page 10: 60-Sec Pre-Meeting Brief Screen
  const meetingRows = await page.$$('.meeting-row');
  if (meetingRows[0]) {
    await meetingRows[0].click();
    await new Promise(r => setTimeout(r, 400));
    await captureDeviceScreen('screen_page_10_premeeting_brief.png');
  }

  // Page 11: Meeting Output & AI Decisions Screen
  await page.click('#tabMeetings');
  await new Promise(r => setTimeout(r, 300));
  const meetingRows2 = await page.$$('.meeting-row');
  if (meetingRows2[1]) {
    await meetingRows2[1].click();
    await new Promise(r => setTimeout(r, 400));
    await captureDeviceScreen('screen_page_11_meeting_output_decisions.png');
  }

  // Page 12: Meeting Output Verbatim Transcript Tab
  const transcriptSegBtn = await page.$('#btnSegTranscript');
  if (transcriptSegBtn) {
    await transcriptSegBtn.click();
    await new Promise(r => setTimeout(r, 400));
    await captureDeviceScreen('screen_page_12_meeting_output_transcript.png');
  }

  // Page 13: Institutional Sovereign Memory Screen
  await page.click('#tabMemory');
  await new Promise(r => setTimeout(r, 400));
  await captureDeviceScreen('screen_page_13_institutional_memory.png');

  // Page 14: Executive Settings & Governance (More View)
  await page.click('#tabMore');
  await new Promise(r => setTimeout(r, 400));
  await captureDeviceScreen('screen_page_14_executive_settings.png');

  // Page 15: Arabic RTL Today Screen
  const studioBtns = await page.$$('.studio-btn');
  for (const btn of studioBtns) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('العربية') || text.includes('English')) {
      await btn.click();
      break;
    }
  }
  await page.click('#tabToday');
  await new Promise(r => setTimeout(r, 400));
  await captureDeviceScreen('screen_page_15_today_arabic_rtl.png');

  // Switch back to English
  for (const btn of studioBtns) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('English') || text.includes('العربية')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 400));


  // ==========================================
  // 2. MODAL & BOTTOM SHEET SCREENS (.device-frame)
  // ==========================================

  // Sheet 1: Notifications & Reminders Sheet
  await page.click('#notifBellBtn');
  await new Promise(r => setTimeout(r, 400));
  await captureDeviceScreen('screen_sheet_01_notifications.png');
  const closeNotif = await page.$('.sheet-close');
  if (closeNotif) await closeNotif.click();
  await new Promise(r => setTimeout(r, 300));

  // Sheet 2: Why This Answer Sheet
  await page.click('#tabAsk');
  await new Promise(r => setTimeout(r, 300));
  const askPrompt = await page.$('.prompt-item');
  if (askPrompt) await askPrompt.click();
  await new Promise(r => setTimeout(r, 300));
  const whyBtn = await page.$('.answer-footer .btn-link');
  if (whyBtn) await whyBtn.click();
  await new Promise(r => setTimeout(r, 400));
  await captureDeviceScreen('screen_sheet_02_why_this_answer.png');
  const closeWhy = await page.$('.sheet-close');
  if (closeWhy) await closeWhy.click();
  await new Promise(r => setTimeout(r, 300));

  // Sheet 3: Approval Protocol Modal
  await page.click('#tabMeetings');
  await new Promise(r => setTimeout(r, 300));
  const segHistory = await page.$$('.seg-btn');
  if (segHistory[1]) await segHistory[1].click();
  await new Promise(r => setTimeout(r, 300));
  const historyRow = await page.$$('.meeting-row');
  if (historyRow[0]) await historyRow[0].click();
  await new Promise(r => setTimeout(r, 300));
  const signBtn = await page.$('.btn-primary.btn-sm');
  if (signBtn) await signBtn.click();
  await new Promise(r => setTimeout(r, 400));
  await captureDeviceScreen('screen_sheet_03_approval_modal.png');
  const closeAppr = await page.$('.sheet-close');
  if (closeAppr) await closeAppr.click();
  await new Promise(r => setTimeout(r, 300));


  // ==========================================
  // 3. INDIVIDUAL COMPONENT SCREENSHOTS
  // ==========================================

  // Component 1: iOS Status Bar
  await page.click('#tabToday');
  await new Promise(r => setTimeout(r, 300));
  await captureComponent('.ios-status-bar', 'component_01_ios_status_bar.png');

  // Component 2: Dynamic Island (Hardware Pill)
  await captureComponent('.dynamic-island', 'component_02_dynamic_island.png');

  // Component 3: Executive App Header with ADA Logo & Badge
  await captureComponent('.app-header', 'component_03_app_header.png');

  // Component 4: Executive Tab Bar (Floating Frosted Glass Dock)
  await captureComponent('.tab-dock', 'component_04_tab_dock.png');

  // Component 5: 3-Pill Executive KPI Row
  await captureComponent('.kpi-row', 'component_05_kpi_row.png');

  // Component 6: Important Mails & Meetings Priority Briefing Carousel
  await captureComponent('.important-carousel', 'component_06_important_carousel.png');

  // Component 7: Live Meeting Voice Recorder Hero Card
  await captureComponent('.hero-recorder', 'component_07_hero_recorder.png');

  // Component 8: Operational Attention & Delay Risk Card
  const attentionCards = await page.$$('.card');
  if (attentionCards[2]) {
    const outPath = path.join(artifactDir, 'component_08_attention_cards.png');
    await attentionCards[2].screenshot({ path: outPath });
    console.log('[Component] Saved: component_08_attention_cards.png');
  }

  // Component 9: Ask Executive Query Input Card
  await page.click('#tabAsk');
  await new Promise(r => setTimeout(r, 300));
  await captureComponent('.card', 'component_09_ask_query_composer.png');

  // Component 10: Suggested Executive Inquiry Chips
  const promptList = await page.$('.prompts-list');
  if (promptList) {
    const outPath = path.join(artifactDir, 'component_10_suggested_inquiries.png');
    await promptList.screenshot({ path: outPath });
    console.log('[Component] Saved: component_10_suggested_inquiries.png');
  }

  // Component 11: Executive Synthesis Answer Card
  const promptEl = await page.$('.prompt-item');
  if (promptEl) await promptEl.click();
  await new Promise(r => setTimeout(r, 300));
  await captureComponent('.answer-card', 'component_11_answer_card.png');

  // Component 12: Pre-Meeting 60-Sec Briefing Card
  await page.click('#tabMeetings');
  await new Promise(r => setTimeout(r, 300));
  const mRow = await page.$('.meeting-row');
  if (mRow) await mRow.click();
  await new Promise(r => setTimeout(r, 300));
  const briefCard = await page.$('.card');
  if (briefCard) {
    const outPath = path.join(artifactDir, 'component_12_premeeting_brief_card.png');
    await briefCard.screenshot({ path: outPath });
    console.log('[Component] Saved: component_12_premeeting_brief_card.png');
  }

  // Component 13: Verbatim Diarized Transcript Bubbles
  await page.click('#tabMeetings');
  await new Promise(r => setTimeout(r, 300));
  const mRowsAll = await page.$$('.meeting-row');
  if (mRowsAll[1]) await mRowsAll[1].click();
  await new Promise(r => setTimeout(r, 300));
  const tSeg = await page.$('#btnSegTranscript');
  if (tSeg) await tSeg.click();
  await new Promise(r => setTimeout(r, 300));
  const transcriptBubble = await page.$('.transcript-bubble');
  if (transcriptBubble) {
    const outPath = path.join(artifactDir, 'component_13_transcript_bubble.png');
    await transcriptBubble.screenshot({ path: outPath });
    console.log('[Component] Saved: component_13_transcript_bubble.png');
  }

  // Component 14: Institutional Sovereign Memory Records
  await page.click('#tabMemory');
  await new Promise(r => setTimeout(r, 300));
  const memCard = await page.$('.card');
  if (memCard) {
    const outPath = path.join(artifactDir, 'component_14_memory_records.png');
    await memCard.screenshot({ path: outPath });
    console.log('[Component] Saved: component_14_memory_records.png');
  }

  // Component 15: Executive Clearance & Profile Card
  await page.click('#tabMore');
  await new Promise(r => setTimeout(r, 300));
  const profileCard = await page.$('.profile-card');
  if (profileCard) {
    const outPath = path.join(artifactDir, 'component_15_profile_card.png');
    await profileCard.screenshot({ path: outPath });
    console.log('[Component] Saved: component_15_profile_card.png');
  }

  await browser.close();
  console.log('=== All screens and components captured successfully! ===');
}

main().catch(console.error);
