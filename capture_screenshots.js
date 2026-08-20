import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const CHROME_PATHS = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
];

let executablePath = CHROME_PATHS.find(p => fs.existsSync(p));
console.log('Using executable:', executablePath);

async function capture() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--no-first-run',
      '--no-default-browser-check'
    ]
  });

  console.log('Browser launched');
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 960, deviceScaleFactor: 2 });
  
  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  console.log('Page loaded');

  async function snap(filename, label) {
    const frame = await page.$('#deviceFrame');
    if (frame) {
      await frame.screenshot({ path: path.join(outDir, filename) });
      console.log(`[Captured] ${filename} - ${label}`);
    } else {
      await page.screenshot({ path: path.join(outDir, filename) });
      console.log(`[Captured Full] ${filename} - ${label}`);
    }
  }

  // 1. Today View
  await page.waitForSelector('#viewToday', { timeout: 10000 });
  await new Promise(r => setTimeout(r, 600));
  await snap('01_today_view.png', 'Today View');

  // 2. Notifications & Reminders Sheet
  await page.click('#notifBellBtn');
  await new Promise(r => setTimeout(r, 600));
  await snap('02_notifications_reminders_sheet.png', 'Notifications Sheet');
  await page.click('.sheet-close-btn');
  await new Promise(r => setTimeout(r, 400));

  // 3. Ask View
  await page.click('#tabAsk');
  await new Promise(r => setTimeout(r, 500));
  await snap('03_ask_view.png', 'Ask View');

  // 4. Answer View
  await page.click('.prompt-chip');
  await new Promise(r => setTimeout(r, 500));
  await snap('04_answer_view.png', 'Answer View');

  // 5. Why This Answer? Sheet
  await page.click('.evidence-bar-btn');
  await new Promise(r => setTimeout(r, 500));
  await snap('05_why_this_answer_audit_sheet.png', 'Why This Answer Sheet');
  await page.click('.sheet-close-btn');
  await new Promise(r => setTimeout(r, 400));

  // 6. Approval Required Modal
  await page.click('button[data-i18n="actionAuthorize"]');
  await new Promise(r => setTimeout(r, 500));
  await snap('06_approval_confirmation_modal.png', 'Approval Modal');
  await page.click('.sheet-close-btn');
  await new Promise(r => setTimeout(r, 400));

  // 7. Meetings View - Upcoming Schedule
  await page.click('#tabMeetings');
  await new Promise(r => setTimeout(r, 500));
  await snap('07_meetings_schedule_view.png', 'Meetings Upcoming Schedule');

  // 8. Meetings View - Recorded History
  await page.click('#btnMtgHistory');
  await new Promise(r => setTimeout(r, 500));
  await snap('08_meetings_recorded_history_view.png', 'Meetings Recorded History');

  // 9. Pre-Meeting Brief View
  await page.click('#btnMtgSchedule');
  await new Promise(r => setTimeout(r, 300));
  await page.click('.meeting-item-card');
  await new Promise(r => setTimeout(r, 500));
  await snap('09_pre_meeting_brief_view.png', 'Pre-Meeting Brief');

  // 10. Meeting Output View - AI Decisions & Actions
  await page.click('button[data-i18n="enterMeetingBtn"]');
  await new Promise(r => setTimeout(r, 500));
  await snap('10_meeting_output_decisions_view.png', 'Meeting Output - Decisions');

  // 11. Meeting Output View - Verbatim Diarized Transcript
  await page.click('#btnSegTranscript');
  await new Promise(r => setTimeout(r, 500));
  await snap('11_meeting_output_transcript_view.png', 'Meeting Output - Transcript');

  // 12. Institutional Memory View
  await page.click('#tabMemory');
  await new Promise(r => setTimeout(r, 500));
  await snap('12_institutional_memory_view.png', 'Institutional Memory');

  // 13. More View (Executive Settings & Governance)
  await page.click('#tabMore');
  await new Promise(r => setTimeout(r, 500));
  await snap('13_executive_settings_more_view.png', 'Executive Settings & Governance');

  // 14. Elahi Active Recording State (Dynamic Island Waveform)
  await page.click('#tabToday');
  await new Promise(r => setTimeout(r, 400));
  await page.click('.hero-record-btn');
  await new Promise(r => setTimeout(r, 600));
  await snap('14_elahi_active_recording_state.png', 'Elahi Recording State');
  await page.click('.btn-rec-stop');
  await new Promise(r => setTimeout(r, 400));

  // 15. Arabic RTL Flagship Screen
  await page.click('#tabToday');
  await new Promise(r => setTimeout(r, 300));
  const langButtons = await page.$$('.studio-btn');
  for (const btn of langButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Language') || text.includes('العربية')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));
  await snap('15_arabic_rtl_today_view.png', 'Arabic RTL Today Screen');

  await browser.close();
  console.log('\nSUCCESS: All 15 screenshots captured in screenshots/ directory!');
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
