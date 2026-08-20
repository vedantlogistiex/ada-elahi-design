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
  await page.setViewport({ width: 1280, height: 1050, deviceScaleFactor: 2 });
  const artifactDir = 'C:\\Users\\vedan\\.gemini\\antigravity-ide\\brain\\8a42f4d3-c125-43f5-aa40-ba207987ffb6';

  const screens = [
    {
      name: 'preview_light_today.png',
      action: async (p) => {
        await p.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
        await p.waitForSelector('#tabToday');
        await p.click('#tabToday');
        await new Promise(r => setTimeout(r, 400));
      }
    },
    {
      name: 'preview_light_ask.png',
      action: async (p) => {
        await p.click('#tabAsk');
        await new Promise(r => setTimeout(r, 400));
      }
    },
    {
      name: 'preview_light_answer.png',
      action: async (p) => {
        const prompt = await p.$('.prompt-item');
        if (prompt) await prompt.click();
        await new Promise(r => setTimeout(r, 400));
      }
    },
    {
      name: 'preview_light_why.png',
      action: async (p) => {
        const whyBtn = await p.$('.answer-footer .btn-link');
        if (whyBtn) await whyBtn.click();
        await new Promise(r => setTimeout(r, 400));
      }
    },
    {
      name: 'preview_light_meetings.png',
      action: async (p) => {
        const closeBtn = await p.$('.sheet-close');
        if (closeBtn) await closeBtn.click();
        await new Promise(r => setTimeout(r, 300));
        await p.click('#tabMeetings');
        await new Promise(r => setTimeout(r, 400));
      }
    },
    {
      name: 'preview_light_premeeting.png',
      action: async (p) => {
        const meetingRows = await p.$$('.meeting-row');
        if (meetingRows[0]) await meetingRows[0].click();
        await new Promise(r => setTimeout(r, 400));
      }
    },
    {
      name: 'preview_light_meetingoutput.png',
      action: async (p) => {
        await p.click('#tabMeetings');
        await new Promise(r => setTimeout(r, 300));
        const meetingRows = await p.$$('.meeting-row');
        if (meetingRows[1]) await meetingRows[1].click();
        await new Promise(r => setTimeout(r, 400));
      }
    },
    {
      name: 'preview_light_approval.png',
      action: async (p) => {
        await p.click('#tabMeetings');
        await new Promise(r => setTimeout(r, 300));
        // Switch to history tab
        const segBtns = await p.$$('.seg-btn');
        if (segBtns[1]) await segBtns[1].click();
        await new Promise(r => setTimeout(r, 300));
        const meetingRows = await p.$$('.meeting-row');
        if (meetingRows[0]) await meetingRows[0].click();
        await new Promise(r => setTimeout(r, 300));
        const signBtn = await p.$('.btn-primary.btn-sm');
        if (signBtn) await signBtn.click();
        await new Promise(r => setTimeout(r, 400));
      }
    },
    {
      name: 'preview_light_memory.png',
      action: async (p) => {
        const closeBtn = await p.$('.sheet-close');
        if (closeBtn) await closeBtn.click();
        await new Promise(r => setTimeout(r, 300));
        await p.click('#tabMemory');
        await new Promise(r => setTimeout(r, 400));
      }
    },
    {
      name: 'preview_light_more.png',
      action: async (p) => {
        await p.click('#tabMore');
        await new Promise(r => setTimeout(r, 400));
      }
    },
    {
      name: 'preview_light_notif.png',
      action: async (p) => {
        await p.click('#notifBellBtn');
        await new Promise(r => setTimeout(r, 400));
      }
    },
    {
      name: 'preview_light_arabic.png',
      action: async (p) => {
        const closeBtn = await p.$('.sheet-close');
        if (closeBtn) await closeBtn.click();
        await new Promise(r => setTimeout(r, 300));
        await p.click('#tabToday');
        await new Promise(r => setTimeout(r, 300));
        const studioBtns = await p.$$('.studio-btn');
        for (const btn of studioBtns) {
          const text = await p.evaluate(el => el.textContent, btn);
          if (text.includes('العربية') || text.includes('English')) {
            await btn.click();
            break;
          }
        }
        await new Promise(r => setTimeout(r, 400));
      }
    }
  ];

  for (const s of screens) {
    await s.action(page);
    const outPath = path.join(artifactDir, s.name);
    await page.screenshot({ path: outPath });
    console.log(`Saved: ${s.name}`);
  }

  await browser.close();
}

main().catch(console.error);
