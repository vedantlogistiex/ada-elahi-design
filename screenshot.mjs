import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

async function capture(filename = 'preview_dark.png', actions = null) {
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
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });

  if (actions) {
    await actions(page);
  }

  const artifactDir = 'C:\\Users\\vedan\\.gemini\\antigravity-ide\\brain\\8a42f4d3-c125-43f5-aa40-ba207987ffb6';
  const outPath = path.join(artifactDir, filename);
  await page.screenshot({ path: outPath });
  console.log(`Screenshot saved to ${outPath}`);

  await browser.close();
}

const target = process.argv[2] || 'preview_dark.png';
capture(target).catch(console.error);
