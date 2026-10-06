import { chromium } from 'playwright';

const OUT = 'C:/Users/chris/AppData/Local/Temp/claude/c--Users-chris-OneDrive---rapid-learn-co-uk-Documents-Apps-Competitive-Pricing-SIM/933ca67e-4179-49cd-a931-4f9a69bb6c49/scratchpad';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('console', (m) => console.log('PAGE:', m.text().slice(0, 160)));

async function snap(name) {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  console.log('shot', name, '| url', page.url());
}
async function texts(tag) {
  const btns = await page.$$eval('button', (els) => els.map((e) => e.textContent.trim()).filter(Boolean).slice(0, 60));
  console.log(tag, 'BUTTONS:', JSON.stringify(btns));
}

await page.goto('http://localhost:5173/?dev=1', { waitUntil: 'networkidle' });
await sleep(1200);

// Open DevNav via its aria-label, skipping the timed splash
await page.getByRole('button', { name: /open dev nav/i }).click();
await sleep(400);
await texts('devnav');
await snap('10-devnav-open');

// Jump to Round Select
await page.getByRole('button', { name: /^Round Select$/ }).click();
await sleep(1000);
await texts('round-select');
await snap('11-round-select');

// Dismiss disclaimer modal if present
const ack = page.getByRole('button', { name: /(understood|got it|continue|acknowledge|start)/i });
if (await ack.count()) { await ack.first().click().catch(() => {}); await sleep(600); await snap('12-after-ack'); await texts('after-ack'); }

await browser.close();
console.log('done');
