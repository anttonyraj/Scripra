import { chromium } from 'playwright';

async function diagnose() {
  const url = 'https://teams.live.com/meet/932993881634?p=heji32WXSI6tohmypU';
  console.log('Launching browser to inspect Teams page:', url);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream']
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
    permissions: ['microphone', 'camera']
  });

  const page = await context.newPage();

  console.log('Navigating...');
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  console.log('Page title:', await page.title());
  console.log('Current URL:', page.url());

  // Dump all clickable elements: button, a, [role='button']
  const elements = await page.evaluate(() => {
    const list = [];
    const candidates = document.querySelectorAll('button, a, [role="button"], [data-tid]');
    candidates.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      list.push({
        idx,
        tag: el.tagName,
        text: (el.innerText || '').trim().replace(/\s+/g, ' '),
        ariaLabel: el.getAttribute('aria-label') || '',
        dataTid: el.getAttribute('data-tid') || '',
        role: el.getAttribute('role') || '',
        href: el.getAttribute('href') || '',
        id: el.id || '',
        className: (el.className && typeof el.className === 'string') ? el.className.slice(0, 50) : '',
        visible: rect.width > 0 && rect.height > 0,
      });
    });
    return list;
  });

  console.log('Found elements:', JSON.stringify(elements, null, 2));

  // Also check if there are iframes
  const frames = page.frames();
  console.log('Frame count:', frames.length);
  for (let i = 0; i < frames.length; i++) {
    console.log(`Frame ${i} URL:`, frames[i].url());
  }

  // Take screenshot
  await page.screenshot({ path: 'scratch/teams-page.png' });
  console.log('Screenshot saved to scratch/teams-page.png');

  await browser.close();
}

diagnose().catch(err => {
  console.error('Diagnosis error:', err);
});
