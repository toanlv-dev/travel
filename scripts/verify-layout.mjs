/**
 * Kiểm layout bằng Chrome thật: tràn ngang, vùng chạm, nền section, reduced-motion.
 * Chạy: npm run serve rồi npm run verify   (mặc định http://localhost:4180)
 *       npm run verify -- <url>
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] ?? 'http://localhost:4180';
const PAGES = [
  { label: 'EN', path: '/' },
  { label: 'VI', path: '/vi/' },
];
const WIDTHS = [375, 390, 414, 768, 1024, 1280, 1440];

let failed = 0;
const check = (ok, msg) => {
  if (!ok) failed++;
  console.log(`${ok ? '  ✅' : '  ❌'} ${msg}`);
};

const browser = await chromium.launch({ channel: 'chrome' });

for (const { label, path } of PAGES) {
  console.log(`\n═══ ${label} — ${BASE}${path}`);
  const ctx = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const page = await ctx.newPage();
  await page.goto(BASE + path, { waitUntil: 'networkidle' });

  // <html lang> đúng bản
  const lang = await page.getAttribute('html', 'lang');
  check(lang === (label === 'EN' ? 'en' : 'vi'), `<html lang="${lang}">`);

  // Tràn ngang ở mọi breakpoint
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.waitForTimeout(120);
    const overflow = await page.evaluate((vw) => {
      // Slide carousel nằm ngoài khung nhìn là bình thường — chúng bị cha overflow-hidden cắt,
      // không làm trang cuộn ngang. Chỉ tính phần tử thực sự đẩy rộng trang.
      const clipped = (el) => {
        for (let p = el.parentElement; p; p = p.parentElement) {
          const ox = getComputedStyle(p).overflowX;
          if (ox === 'hidden' || ox === 'clip' || ox === 'auto' || ox === 'scroll') return true;
        }
        return false;
      };
      const bad = [...document.querySelectorAll('*')].filter(
        (el) => el.getBoundingClientRect().right > vw + 0.5 && !clipped(el),
      );
      return { count: bad.length, doc: document.documentElement.scrollWidth, sample: bad[0]?.tagName };
    }, w);
    check(
      overflow.count === 0 && overflow.doc <= w + 0.5,
      `${w}px — không tràn ngang (scrollWidth=${overflow.doc}${overflow.count ? `, ${overflow.count} phần tử tràn, vd <${overflow.sample}>` : ''})`,
    );
  }

  // Vùng chạm ≥ 44px ở mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(120);
  const smallTargets = await page.evaluate(() =>
    // sr-only chỉ bung ra khi focus — kiểm riêng ở dưới
    [...document.querySelectorAll('a:not(.sr-only), button:not(.sr-only), [role="button"]')]
      .map((el) => ({ t: el.tagName, txt: el.textContent?.trim().slice(0, 24), r: el.getBoundingClientRect() }))
      .filter((x) => x.r.width > 0 && (x.r.height < 44 || x.r.width < 44))
      .map((x) => `<${x.t}> "${x.txt}" ${Math.round(x.r.width)}×${Math.round(x.r.height)}`),
  );
  check(smallTargets.length === 0, `vùng chạm ≥ 44px (${smallTargets.length} vi phạm) ${smallTargets.join(' | ')}`);

  // Skip link: ẩn lúc bình thường, nhưng khi focus phải hiện và đủ lớn để bấm
  const skip = await page.evaluate(() => {
    const el = document.querySelector('a.sr-only');
    if (!el) return null;
    el.focus();
    const r = el.getBoundingClientRect();
    return { w: r.width, h: r.height, visible: getComputedStyle(el).position === 'fixed' };
  });
  check(
    skip !== null && skip.h >= 44 && skip.w >= 44,
    `skip link khi focus: hiện và đủ lớn (${Math.round(skip?.w ?? 0)}×${Math.round(skip?.h ?? 0)})`,
  );

  // Hero phải cao đúng 1 màn hình và không bị thanh địa chỉ cắt
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(150);
  const hero = await page.evaluate(() => {
    const el = document.querySelector('#hero');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const h1 = el.querySelector('h1')?.getBoundingClientRect();
    const cta = el.querySelector('a[href^="tel:"]')?.getBoundingClientRect();
    return { h: r.height, vh: window.innerHeight, h1Bottom: h1?.bottom, ctaBottom: cta?.bottom };
  });
  check(hero !== null, 'có section #hero');
  check(
    hero !== null && Math.abs(hero.h - hero.vh) < 2,
    `hero cao đúng 1 màn hình (${Math.round(hero?.h ?? 0)}px / viewport ${hero?.vh}px)`,
  );
  check(
    hero !== null && (hero.ctaBottom ?? 1e9) <= hero.vh,
    `CTA hero nằm trong màn hình đầu (đáy CTA ${Math.round(hero?.ctaBottom ?? 0)}px)`,
  );

  // Anchor scroll không được để header che mất tiêu đề
  const firstAnchor = await page.evaluate(() => document.querySelector('nav a[href^="#"]')?.getAttribute('href'));
  if (firstAnchor) {
    await page.evaluate((h) => { window.location.hash = h; }, firstAnchor);
    await page.waitForTimeout(500);
    const hidden = await page.evaluate((h) => {
      const sec = document.querySelector(h);
      const heading = sec?.querySelector('h2');
      if (!heading) return null;
      const hd = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
      return { top: heading.getBoundingClientRect().top, headerH: hd };
    }, firstAnchor);
    check(
      hidden !== null && hidden.top >= hidden.headerH - 1,
      `anchor ${firstAnchor}: tiêu đề không bị header che (top=${Math.round(hidden?.top ?? 0)}, header=${Math.round(hidden?.headerH ?? 0)})`,
    );
    await page.evaluate(() => { window.location.hash = ''; window.scrollTo(0, 0); });
    await page.waitForTimeout(200);
  }

  // Thanh gọi nhanh: hiện ở mobile, ẩn từ md
  const barSel = 'nav.fixed.inset-x-0.bottom-0';
  const bar375 = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? getComputedStyle(el).display : 'không thấy';
  }, barSel);
  await page.setViewportSize({ width: 1024, height: 800 });
  await page.waitForTimeout(150);
  const bar1024 = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? getComputedStyle(el).display : 'không thấy';
  }, barSel);
  check(bar375 !== 'none' && bar375 !== 'không thấy', `thanh gọi nhanh hiện ở 375px (display=${bar375})`);
  check(bar1024 === 'none', `thanh gọi nhanh ẩn ở 1024px (display=${bar1024})`);
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(150);

  // Card trong cùng một hàng phải đều chiều cao — nội dung hai ngôn ngữ dài ngắn khác nhau
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.waitForTimeout(200);
  const rows = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('#why li')];
    const byRow = new Map();
    for (const c of cards) {
      const r = c.getBoundingClientRect();
      const key = Math.round(r.top);
      byRow.set(key, [...(byRow.get(key) ?? []), Math.round(r.height)]);
    }
    return [...byRow.values()];
  });
  const uneven = rows.filter((hs) => new Set(hs).size > 1);
  check(
    rows.length > 0 && uneven.length === 0,
    `card WhyUs đều chiều cao theo hàng (${rows.length} hàng${uneven.length ? `, lệch: ${JSON.stringify(uneven)}` : ''})`,
  );
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(150);

  // Chữ nằm trên ảnh thì PHẢI có nền đặc phía sau. Token màu để dạng hex sẽ khiến Tailwind
  // bỏ qua lớp có độ mờ (bg-base/95) một cách im lặng — header từng mất sạch nền vì lỗi này.
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(() => window.scrollTo({ top: 2000, behavior: 'instant' }));
  await page.waitForTimeout(400);
  const onImage = await page.evaluate(() => {
    const alpha = (c) => {
      const m = c.match(/rgba?\(([^)]+)\)/);
      if (!m) return 0;
      const parts = m[1].split(/[\s,/]+/).filter(Boolean);
      return parts.length > 3 ? Number(parts[3]) : 1;
    };
    const header = document.querySelector('header');
    const badge = document.querySelector('#tours li span');
    return {
      header: alpha(getComputedStyle(header).backgroundColor),
      badge: badge ? alpha(getComputedStyle(badge).backgroundColor) : null,
    };
  });
  check(onImage.header >= 0.9, `header cuộn xuống có nền đặc (alpha=${onImage.header})`);
  check(
    onImage.badge !== null && onImage.badge >= 0.9,
    `nhãn miền trên ảnh tour có nền đặc (alpha=${onImage.badge})`,
  );
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(200);

  // Nền section phải xen kẽ — hai section liền nhau không cùng màu nền
  const bgs = await page.evaluate(() =>
    [...document.querySelectorAll('section')]
      // #hero phủ kín bằng ảnh, màu nền của nó chỉ hiện lúc ảnh chưa về → không tính xen kẽ
      .filter((s) => s.id !== 'hero')
      .map((s) => getComputedStyle(s).backgroundColor),
  );
  const solid = bgs.filter((b) => b !== 'rgba(0, 0, 0, 0)');
  const alternating = solid.every((bg, i) => i === 0 || bg !== solid[i - 1]);
  check(alternating && solid.length >= 3, `nền xen kẽ (${solid.length} section đặc)`);

  await ctx.close();
}

// Reduced motion: Reveal phải hiện sẵn, không có transform
console.log('\n═══ prefers-reduced-motion: reduce');
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  reducedMotion: 'reduce',
});
const page = await ctx.newPage();
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
const reveal = await page.evaluate(() => {
  const el = document.querySelector('[data-reveal]');
  if (!el) return null;
  const cs = getComputedStyle(el);
  return { opacity: cs.opacity, transform: cs.transform };
});
check(reveal !== null, 'tìm thấy phần tử Reveal');
check(reveal?.opacity === '1', `Reveal hiện sẵn (opacity=${reveal?.opacity})`);
check(
  reveal?.transform === 'none' || reveal?.transform === 'matrix(1, 0, 0, 1, 0, 0)',
  `Reveal không dịch chuyển (transform=${reveal?.transform})`,
);
await ctx.close();

// Đối chứng: KHÔNG bật reduced-motion thì Reveal phải thật sự ẩn rồi mới hiện.
// Thiếu bước này, một Reveal hỏng (luôn trả div thường) vẫn qua được test ở trên.
console.log('\n═══ đối chứng: prefers-reduced-motion: no-preference');
const ctx2 = await browser.newContext({
  viewport: { width: 1280, height: 700 },
  reducedMotion: 'no-preference',
});
const p2 = await ctx2.newPage();
await p2.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
const sel = '[data-reveal]';
await p2.waitForSelector(sel);
const before = await p2.evaluate((s) => {
  const el = document.querySelector(s);
  return el ? getComputedStyle(el).opacity : null;
}, sel);
check(before !== null && Number(before) < 1, `trước khi cuộn tới: Reveal đang ẩn (opacity=${before})`);

await p2.locator(sel).first().scrollIntoViewIfNeeded();
await p2.waitForTimeout(700);
const after = await p2.evaluate((s) => {
  const el = document.querySelector(s);
  return el ? getComputedStyle(el).opacity : null;
}, sel);
check(after === '1', `sau khi cuộn tới: Reveal đã hiện (opacity=${after})`);
await ctx2.close();

// SmartImage: trình duyệt phải chọn WebP, và chọn đúng mốc theo bề rộng hiển thị
console.log('\n═══ SmartImage — định dạng & mốc srcset');
// iPhone 8 là DPR 2: 375px CSS ở 1 cột cần ~750 device px → phải chọn mốc 960w, không phải 480w.
// Nếu chỉ test DPR 1 thì mốc nào cũng ra 480w và test không chứng minh được gì.
// Hero phủ 100vw nên mốc chọn theo chính bề rộng viewport × DPR
for (const [w, dpr, expect] of [[375, 2, '960'], [375, 1, '480'], [1440, 1, '1600']]) {
  const c = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: dpr });
  const pg = await c.newPage();
  const imgReqs = [];
  pg.on('request', (r) => {
    if (r.resourceType() === 'image') imgReqs.push(r.url().split('/').pop());
  });
  await pg.goto(BASE + '/', { waitUntil: 'networkidle' });
  await pg.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pg.waitForTimeout(900);
  const picked = imgReqs.filter((u) => u.startsWith('sapa-terraces'));
  check(
    picked.length > 0 && picked.every((u) => u.endsWith('.webp')),
    `${w}px @${dpr}x — chỉ tải WebP, không tải JPEG (${[...new Set(picked)].join(', ') || 'không có ảnh nào'})`,
  );
  check(
    picked.some((u) => u.includes(`-${expect}.`)),
    `${w}px @${dpr}x — chọn mốc ${expect}w theo sizes (đã tải: ${[...new Set(picked)].join(', ')})`,
  );
  await c.close();
}

// Tour: lọc theo miền, mở lịch trình, và TUYỆT ĐỐI không có giá / nút đặt tour
console.log('\n═══ Tour: lọc & lịch trình');
const c9 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const p9 = await c9.newPage();
await p9.goto(BASE + '/', { waitUntil: 'networkidle' });
await p9.locator('#tours').scrollIntoViewIfNeeded();
await p9.waitForTimeout(500);

const allCards = await p9.locator('#tours li > button').count();
check(allCards === 6, `hiện đủ 6 tour (đang ${allCards})`);

const absTop = () => p9.evaluate(() => document.querySelector('#tours ul').getBoundingClientRect().top + window.scrollY);
const beforeH = await absTop();
await p9.locator('#tours [role="tab"]').nth(1).click();
await p9.waitForTimeout(350);
const filtered = await p9.locator('#tours li > button').count();
const afterH = await absTop();
check(filtered === 2, `lọc miền Bắc còn ${filtered} tour (mong đợi 2)`);
check(Math.abs(beforeH - afterH) < 2, `đổi tab không làm nhảy layout (lệch ${Math.abs(beforeH - afterH).toFixed(1)}px)`);

const selected = await p9.locator('#tours [role="tab"][aria-selected="true"]').count();
check(selected === 1, `đúng 1 tab được đánh dấu chọn (${selected})`);

await p9.locator('#tours [role="tab"]').first().click();
await p9.waitForTimeout(300);

// Bàn phím: Enter trên card mở hộp lịch trình, Esc đóng
await p9.locator('#tours li button').first().focus();
await p9.keyboard.press('Enter');
await p9.waitForTimeout(350);
check(await p9.locator('[role="dialog"]').isVisible(), 'Enter trên card mở hộp lịch trình');
const dlgText = await p9.locator('[role="dialog"]').innerText();
check(/\d/.test(dlgText) && dlgText.length > 80, 'hộp lịch trình có nội dung từng ngày');
check(
  (await p9.locator('[role="dialog"] a[href^="tel:"]').count()) > 0,
  'hộp lịch trình có nút gọi',
);
await p9.keyboard.press('Escape');
await p9.waitForTimeout(300);
check(!(await p9.locator('[role="dialog"]').isVisible()), 'Esc đóng hộp lịch trình');

// Không có giá, không có nút đặt tour — yêu cầu của khách hàng
const priceLike = await p9.evaluate(() => {
  const t = document.querySelector('#tours').innerText;
  const patterns = [/[0-9][0-9.,]*\s*(₫|VND|USD|\$)/i, /\$\s*[0-9]/, /[0-9][.,][0-9]{3}\s*đ/i];
  return patterns.filter((re) => re.test(t)).map(String);
});
check(priceLike.length === 0, `không có giá tiền trên card (${priceLike.join(', ') || 'sạch'})`);

const bookLike = await p9.evaluate(() => {
  const t = document.querySelector('#tours').innerText.toLowerCase();
  return ['đặt tour', 'đặt ngay', 'book now', 'book this', 'add to cart'].filter((w) => t.includes(w));
});
check(bookLike.length === 0, `không có nút đặt tour (${bookLike.join(', ') || 'sạch'})`);

// Carousel điểm đến: vuốt được và chỉ toàn điểm đến trong nước
const destCount = await p9.locator('#destinations li figure').count();
check(destCount === 9, `carousel có 9 điểm đến (đang ${destCount})`);
const foreign = await p9.evaluate(() => {
  const t = document.querySelector('#destinations').innerText;
  return ['Italy', 'Thailand', 'Thái Lan', 'New York', 'Paris', 'Pháp'].filter((w) => t.includes(w));
});
check(foreign.length === 0, `không có điểm đến nước ngoài (${foreign.join(', ') || 'sạch'})`);

const first = await p9.evaluate(() => document.querySelector('#destinations li').getBoundingClientRect().left);
await p9.locator('#destinations button[aria-label]').nth(1).click();
await p9.waitForTimeout(700);
const moved = await p9.evaluate(() => document.querySelector('#destinations li').getBoundingClientRect().left);
check(moved < first - 20, `nút next cuộn carousel (${Math.round(first)} → ${Math.round(moved)})`);
await c9.close();

// CountUp: đếm một lần rồi dừng, cuộn qua lại không đếm lại
console.log('\n═══ CountUp');
const c7 = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const p7 = await c7.newPage();
await p7.goto(BASE + '/', { waitUntil: 'networkidle' });

const beforeScroll = await p7.evaluate(() => document.querySelector('[data-countup]')?.textContent);
await p7.locator('[data-countup]').first().scrollIntoViewIfNeeded();
await p7.waitForTimeout(1800);
const afterScroll = await p7.evaluate(() => ({
  text: document.querySelector('[data-countup]')?.textContent,
  state: document.querySelector('[data-countup]')?.getAttribute('data-countup'),
}));
check(beforeScroll === '0', `trước khi cuộn tới: bắt đầu từ 0 (đang "${beforeScroll}")`);
check(afterScroll.state === 'done', `đếm xong (state=${afterScroll.state}, hiện "${afterScroll.text}")`);

// Cuộn đi rồi quay lại — con số phải giữ nguyên, không đếm lại từ 0
await p7.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await p7.waitForTimeout(400);
await p7.evaluate(() => window.scrollTo(0, 0));
await p7.waitForTimeout(300);
await p7.locator('[data-countup]').first().scrollIntoViewIfNeeded();
await p7.waitForTimeout(300);
const again = await p7.evaluate(() => document.querySelector('[data-countup]')?.textContent);
check(again === afterScroll.text, `cuộn lại không đếm lại ("${again}")`);

// Định dạng số phải theo locale: 8,500 ở bản en và 8.500 ở bản vi
const nums = async (path) => {
  const pg = await c7.newPage();
  await pg.goto(BASE + path, { waitUntil: 'networkidle' });
  await pg.locator('[data-countup]').first().scrollIntoViewIfNeeded();
  await pg.waitForTimeout(1800);
  const all = await pg.evaluate(() => [...document.querySelectorAll('[data-countup]')].map((e) => e.textContent));
  await pg.close();
  return all;
};
const enNums = await nums('/');
const viNums = await nums('/vi/');
check(enNums.some((n) => n.includes('8,500')), `bản EN dùng dấu phẩy: ${enNums.join(' · ')}`);
check(viNums.some((n) => n.includes('8.500')), `bản VI dùng dấu chấm: ${viNums.join(' · ')}`);
check(viNums.some((n) => n.includes('4,9')), 'bản VI dùng dấu phẩy thập phân (4,9)');
await c7.close();

// Giảm chuyển động: hiện thẳng số cuối, không đếm
const c8 = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
const p8 = await c8.newPage();
await p8.goto(BASE + '/', { waitUntil: 'networkidle' });
const reducedNum = await p8.evaluate(() => ({
  text: document.querySelector('[data-countup]')?.textContent,
  state: document.querySelector('[data-countup]')?.getAttribute('data-countup'),
}));
check(
  reducedNum.state === 'done' && reducedNum.text !== '0',
  `reduced-motion: hiện sẵn số cuối "${reducedNum.text}" mà không cần cuộn`,
);
await c8.close();

// Drawer mobile: mở/đóng bằng bàn phím, bẫy focus, đóng bằng Esc
console.log('\n═══ Drawer mobile (bàn phím)');
const c4 = await browser.newContext({ viewport: { width: 375, height: 667 } });
const p4 = await c4.newPage();
await p4.goto(BASE + '/', { waitUntil: 'networkidle' });

const trigger = p4.locator('header button[aria-label]').first();
await trigger.press('Enter');
await p4.waitForTimeout(350);
const opened = await p4.locator('[role="dialog"]').isVisible();
check(opened, 'mở drawer bằng phím Enter');

const focusInside = await p4.evaluate(() => {
  const dlg = document.querySelector('[role="dialog"]');
  return !!dlg && dlg.contains(document.activeElement);
});
check(focusInside, 'focus được đưa vào trong drawer');

// Tab vòng quanh phải không thoát ra ngoài drawer
let escaped = false;
for (let i = 0; i < 14; i++) {
  await p4.keyboard.press('Tab');
  const inside = await p4.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"]');
    return !!dlg && dlg.contains(document.activeElement);
  });
  if (!inside) { escaped = true; break; }
}
check(!escaped, 'bẫy focus: Tab 14 lần không thoát khỏi drawer');

await p4.keyboard.press('Escape');
await p4.waitForTimeout(350);
check(!(await p4.locator('[role="dialog"]').isVisible()), 'đóng drawer bằng Escape');

const restored = await p4.evaluate(() => document.activeElement?.tagName === 'BUTTON');
check(restored, 'focus trả về nút mở menu sau khi đóng');
await c4.close();

// Đổi ngôn ngữ phải giữ nguyên vị trí đang đứng
console.log('\n═══ LangSwitcher giữ anchor');
const c5 = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const p5 = await c5.newPage();
await p5.goto(BASE + '/#about', { waitUntil: 'networkidle' });
await p5.waitForTimeout(400);
await p5.locator('header a[hreflang="vi"]').first().click();
await p5.waitForLoadState('networkidle');
const urlAfter = new URL(p5.url());
check(
  urlAfter.pathname === '/vi/' && urlAfter.hash === '#about',
  `/#about → ${urlAfter.pathname}${urlAfter.hash} (mong đợi /vi/#about)`,
);
check((await p5.getAttribute('html', 'lang')) === 'vi', 'trang đích là bản tiếng Việt');
await c5.close();

// Header bản tiếng Việt (chữ dài hơn 15–25%) không được tràn hàng ở 1024px
console.log('\n═══ Header tiếng Việt ở 1024px');
const c6 = await browser.newContext({ viewport: { width: 1024, height: 800 } });
const p6 = await c6.newPage();
await p6.goto(BASE + '/vi/', { waitUntil: 'networkidle' });
const navWrap = await p6.evaluate(() => {
  const links = [...document.querySelectorAll('header nav a')];
  if (!links.length) return null;
  const tops = new Set(links.map((a) => Math.round(a.getBoundingClientRect().top)));
  const header = document.querySelector('header').getBoundingClientRect();
  // Chữ TRONG một mục bị xuống dòng thì các mục vẫn cùng một hàng — phải đo riêng.
  // Không đo bằng chiều cao (min-h-11 làm mọi link cao 44px) mà đếm số dòng của chính CHỮ:
  // lấy rect của từng text node rồi đếm số mốc `top` khác nhau.
  const textLines = (el) => {
    const tops = new Set();
    for (const node of el.childNodes) {
      if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) continue;
      const r = document.createRange();
      r.selectNodeContents(node);
      for (const rect of r.getClientRects()) tops.add(Math.round(rect.top));
    }
    return tops.size;
  };
  const wrapped = links
    .concat([...document.querySelectorAll('header > div > a, header > div > div > a')])
    .filter((a) => textLines(a) > 1)
    .map((a) => a.textContent.trim().slice(0, 20));
  return { rows: tops.size, headerH: header.height, count: links.length, wrapped };
});
check(navWrap?.rows === 1, `menu ${navWrap?.count} mục nằm trên 1 hàng (đang ${navWrap?.rows} hàng)`);
check((navWrap?.headerH ?? 0) <= 88, `header không bị đội cao (${Math.round(navWrap?.headerH ?? 0)}px)`);
check(
  navWrap !== null && navWrap.wrapped.length === 0,
  `không mục nào trong header bị xuống dòng (${navWrap?.wrapped.join(', ') || 'sạch'})`,
);
await c6.close();

// Khách hàng · cảm nhận · thư viện ảnh
console.log('\n═══ Clients / Testimonials / Gallery');
const c10 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const p10 = await c10.newPage();
await p10.goto(BASE + '/', { waitUntil: 'networkidle' });
await p10.locator('#clients').scrollIntoViewIfNeeded();
await p10.waitForTimeout(400);

const logos = await p10.evaluate(() => {
  const els = [...document.querySelectorAll('#clients ul > li')];
  const tops = new Set(els.map((e) => Math.round(e.getBoundingClientRect().top)));
  // Logo thật cao thấp khác nhau; cái phải thẳng hàng là cái HỘP chứa nó
  const boxes = new Set(els.map((e) => Math.round(e.firstElementChild.getBoundingClientRect().height)));
  return { n: els.length, rows: tops.size, boxes: [...boxes] };
});
check(logos.n === 6, `6 ô logo khách hàng (${logos.n})`);
check(logos.rows === 1, `1280px: 6 ô trên 1 hàng (đang ${logos.rows} hàng)`);
check(logos.boxes.length === 1, `hộp logo cùng chiều cao (${logos.boxes.join(', ')}px)`);

// Chưa có logo thật → ô phải NHÌN RÕ là chỗ chờ, kèm câu giải thích
const ph = await p10.evaluate(() => {
  const boxes = [...document.querySelectorAll('#clients [data-placeholder="client-logo"]')];
  return {
    n: boxes.length,
    dashed: boxes.every((b) => getComputedStyle(b).borderStyle === 'dashed'),
    text: document.querySelector('#clients').innerText,
  };
});
check(ph.n === 6 && ph.dashed, `ô logo là placeholder viền đứt (${ph.n} ô, dashed=${ph.dashed})`);
check(/placeholder/i.test(ph.text), 'có câu ghi rõ đang chờ logo thật');

await p10.setViewportSize({ width: 375, height: 667 });
await p10.waitForTimeout(250);
const cols375 = await p10.evaluate(() => {
  const els = [...document.querySelectorAll('#clients ul > li')];
  const top = Math.round(els[0].getBoundingClientRect().top);
  return els.filter((e) => Math.round(e.getBoundingClientRect().top) === top).length;
});
check(cols375 === 2, `375px: lưới logo 2 cột (đang ${cols375})`);
await p10.setViewportSize({ width: 1280, height: 900 });
await p10.waitForTimeout(250);

// Cảm nhận: trích dẫn dài ngắn khác nhau không được làm nhảy chiều cao carousel
await p10.locator('#testimonials').scrollIntoViewIfNeeded();
await p10.waitForTimeout(400);
const railH = () => p10.evaluate(() => Math.round(document.querySelector('#testimonials ul').getBoundingClientRect().height));
const h0 = await railH();
await p10.locator('#testimonials button[aria-label]').nth(1).click();
await p10.waitForTimeout(600);
await p10.locator('#testimonials button[aria-label]').nth(1).click();
await p10.waitForTimeout(600);
const h1 = await railH();
check(h0 > 0 && h0 === h1, `chuyển cảm nhận không đổi chiều cao (${h0}px → ${h1}px)`);

const stars = await p10.evaluate(() => {
  const first = document.querySelector('#testimonials li [role="img"]');
  return { svg: first?.querySelectorAll('svg').length ?? 0, label: first?.getAttribute('aria-label') ?? '' };
});
check(stars.svg === 5, `mỗi cảm nhận có 5 sao (${stars.svg})`);
check(/\d/.test(stars.label), `dải sao có nhãn chữ cho screen reader ("${stars.label}")`);
check(
  /sample|mẫu/i.test(await p10.locator('#testimonials').innerText()),
  'có câu ghi rõ đây là cảm nhận mẫu',
);

// Thư viện ảnh + lightbox
await p10.locator('#gallery').scrollIntoViewIfNeeded();
await p10.waitForTimeout(400);
const tiles = await p10.locator('#gallery li button').count();
check(tiles === 8, `thư viện có 8 ảnh (${tiles})`);

await p10.locator('#gallery li button').first().click();
await p10.waitForTimeout(400);
check(await p10.locator('[role="dialog"]').isVisible(), 'bấm ảnh mở lightbox');

const locked = await p10.evaluate(() => {
  const y = window.scrollY;
  window.scrollBy(0, 400);
  return { moved: window.scrollY !== y };
});
check(!locked.moved, 'mở lightbox thì nền không cuộn được');

const counter = () => p10.evaluate(() => document.querySelector('[role="dialog"] h2, [role="dialog"] [id]')?.innerText ?? '');
const shot1 = await counter();
await p10.keyboard.press('ArrowRight');
await p10.waitForTimeout(250);
await p10.keyboard.press('ArrowRight');
await p10.waitForTimeout(250);
const shot3 = await counter();
check(shot1 !== shot3 && /3/.test(shot3), `mũi tên chuyển ảnh ("${shot1}" → "${shot3}")`);

// Vòng lại ở hai đầu: ảnh 3 → trái 3 lần → phải về ảnh cuối
for (let i = 0; i < 3; i++) {
  await p10.keyboard.press('ArrowLeft');
  await p10.waitForTimeout(150);
}
check(/8\/8|8 of 8/.test(await counter()), `qua khỏi ảnh đầu thì vòng về ảnh cuối ("${await counter()}")`);

// Bấm vào ảnh KHÔNG được đóng, bấm khoảng trống quanh ảnh thì đóng
await p10.mouse.click(640, 450);
await p10.waitForTimeout(300);
check(await p10.locator('[role="dialog"]').isVisible(), 'bấm vào chính tấm ảnh thì không đóng');
await p10.mouse.click(640, 880);
await p10.waitForTimeout(400);
check(!(await p10.locator('[role="dialog"]').isVisible()), 'bấm khoảng trống quanh ảnh thì đóng');

await p10.locator('#gallery li button').nth(2).click();
await p10.waitForTimeout(400);
await p10.keyboard.press('Escape');
await p10.waitForTimeout(400);
check(!(await p10.locator('[role="dialog"]').isVisible()), 'Esc đóng lightbox');

// Đóng xong phải đứng ở ảnh ĐANG xem, không nhảy về ảnh đã bấm lúc mở
const focusedIdx = await p10.evaluate(() =>
  [...document.querySelectorAll('#gallery li button')].indexOf(document.activeElement),
);
check(focusedIdx === 2, `focus trả về đúng ô ảnh đang xem (ô thứ ${focusedIdx + 1}, mong đợi 3)`);
await c10.close();

// Bài viết · dải liên hệ · footer
console.log('\n═══ Posts / ContactCta / Footer');
const c11 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const p11 = await c11.newPage();
await p11.goto(BASE + '/', { waitUntil: 'networkidle' });

// Khách đã chốt KHÔNG làm form — kiểm toàn trang, không riêng khối liên hệ
const formish = await p11.evaluate(() =>
  [...document.querySelectorAll('form, input, textarea, select')].map((e) => e.tagName),
);
check(formish.length === 0, `toàn trang không có form/ô nhập (${formish.join(', ') || 'sạch'})`);

await p11.locator('#posts').scrollIntoViewIfNeeded();
await p11.waitForTimeout(400);
const posts = await p11.locator('#posts li > button').count();
check(posts === 3, `3 card bài viết (${posts})`);
check(
  /sample|mẫu/i.test(await p11.locator('#posts').innerText()),
  'có câu ghi rõ đây là bài mẫu',
);

await p11.locator('#posts li > button').first().click();
await p11.waitForTimeout(400);
const article = await p11.locator('[role="dialog"]').innerText();
check(article.length > 300, `bấm card mở hộp đọc bài (${article.length} ký tự)`);
await p11.keyboard.press('Escape');
await p11.waitForTimeout(300);
check(!(await p11.locator('[role="dialog"]').isVisible()), 'Esc đóng hộp đọc bài');

// Dải liên hệ: hotline bấm gọi được, có Zalo + Messenger + email
await p11.locator('#contact').scrollIntoViewIfNeeded();
await p11.waitForTimeout(400);
const contact = await p11.evaluate(() => {
  const sec = document.querySelector('#contact');
  const href = (sel) => sec.querySelector(sel)?.getAttribute('href') ?? '';
  const tel = sec.querySelector('a[href^="tel:"]');
  return {
    tel: href('a[href^="tel:"]'),
    telSize: tel ? Math.round(parseFloat(getComputedStyle(tel).fontSize)) : 0,
    zalo: href('a[href*="zalo.me"]'),
    messenger: href('a[href*="m.me"]'),
    mail: href('a[href^="mailto:"]'),
    maps: href('a[href*="google.com/maps"]'),
    iframes: sec.querySelectorAll('iframe').length,
  };
});
// Dạng E.164 có dấu + là đúng chuẩn: khách nước ngoài bấm gọi được ngay
check(/^tel:\+?\d{8,}$/.test(contact.tel), `hotline là link gọi được (${contact.tel})`);
check(contact.telSize >= 28, `hotline in cỡ lớn (${contact.telSize}px)`);
// Messenger tự ẩn khi company.messenger còn null — chưa có trang thì không được trỏ vào link chết
check(!!contact.zalo, `có nút Zalo (${contact.zalo})`);
check(
  contact.messenger === '' || /^https:\/\/m\.me\//.test(contact.messenger),
  contact.messenger ? `nút Messenger trỏ đúng m.me (${contact.messenger})` : 'chưa có Messenger → nút tự ẩn, không có link chết',
);
check(!!contact.mail, `có link email (${contact.mail})`);
// Đã chốt: KHÔNG nhúng iframe bản đồ, chỉ link ra Google Maps
check(contact.iframes === 0 && !!contact.maps, `bản đồ là link, không phải iframe (${contact.iframes} iframe)`);

// Mọi link mở tab mới phải có rel="noopener"
const unsafe = await p11.evaluate(() =>
  [...document.querySelectorAll('a[target="_blank"]')]
    .filter((a) => !(a.getAttribute('rel') ?? '').includes('noopener'))
    .map((a) => a.getAttribute('href')),
);
check(unsafe.length === 0, `link mở tab mới đều có rel=noopener (${unsafe.length} thiếu)`);

// Footer
const footer = await p11.evaluate(() => {
  const f = document.querySelector('footer');
  return {
    exists: !!f,
    text: f?.innerText ?? '',
    links: f?.querySelectorAll('a').length ?? 0,
    top: f?.querySelector('a[href="#main"]') !== null,
  };
});
check(footer.exists && footer.links >= 8, `footer có ${footer.links} liên kết`);
check(footer.text.includes(String(new Date().getFullYear())), 'bản quyền ghi đúng năm hiện tại');
check(footer.top, 'footer có link lên đầu trang');

// Cuộn hết trang ở 375px: thanh gọi nhanh dính đáy không được đè lên cuối footer
await p11.setViewportSize({ width: 375, height: 667 });
await p11.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
await p11.waitForTimeout(800);
await p11.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
await p11.waitForTimeout(500);
const covered = await p11.evaluate(() => {
  const bar = document.querySelector('nav.fixed.inset-x-0.bottom-0')?.getBoundingClientRect();
  const last = document.querySelector('footer a[href="#main"]')?.getBoundingClientRect();
  return bar && last ? { bar: Math.round(bar.top), last: Math.round(last.bottom) } : null;
});
check(
  covered !== null && covered.last <= covered.bar,
  `cuối trang: thanh gọi nhanh không che footer (đáy link ${covered?.last}px, thanh ở ${covered?.bar}px)`,
);
await c11.close();

// CLS: SmartImage khoá aspect-ratio nên ảnh tải xong không được làm nhảy layout
console.log('\n═══ CLS (ngân sách ≤ 0.05)');
const c3 = await browser.newContext({ viewport: { width: 375, height: 667 }, deviceScaleFactor: 2 });
const p3 = await c3.newPage();
await p3.addInitScript(() => {
  window.__cls = 0;
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
  }).observe({ type: 'layout-shift', buffered: true });
});
await p3.goto(BASE + '/', { waitUntil: 'networkidle' });
for (let i = 0; i < 6; i++) {
  await p3.evaluate(() => window.scrollBy(0, window.innerHeight));
  await p3.waitForTimeout(250);
}
const cls = await p3.evaluate(() => window.__cls);
check(cls <= 0.05, `CLS = ${cls.toFixed(4)}`);
await c3.close();

await browser.close();
console.log(failed === 0 ? '\n✅ TẤT CẢ PASS' : `\n❌ ${failed} kiểm tra THẤT BẠI`);
process.exit(failed === 0 ? 0 : 1);
