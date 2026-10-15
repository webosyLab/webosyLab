import {test,expect} from '@playwright/test';
const slugs=['sadeghieh-residential','aksaya-office','marzdaran-residential','taranom-beauty-clinic'];
test('pages, project routes, refresh, images and console',async({page})=>{const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));for(const route of ['/','/projects','/about','/contact',...slugs.map(s=>`/projects/${s}`)]){await page.goto(route);await expect(page.locator('h1')).toBeVisible();await expect(page.locator('html')).toHaveAttribute('dir','rtl');expect(await page.locator('header nav a').count()).toBe(4);await expect(page.locator('header nav a.active')).toHaveCount(1);for(const img of await page.locator('img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);}}await page.reload();await expect(page.locator('h1')).toContainText('ترنم');expect(errors).toEqual([]);await page.goto('/projects/unknown');await expect(page.locator('h1')).toContainText('ساخته نشده');});
test('project cards and lightbox keyboard',async({page})=>{await page.goto('/projects');await page.locator('.project-card').first().click();await expect(page).toHaveURL(/sadeghieh/);await page.getByRole('button',{name:'نمایش بزرگ تصویر مفهومی'}).click();await expect(page.getByRole('dialog')).toBeVisible();await expect(page.getByRole('button',{name:'بستن تصویر'})).toBeFocused();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);await expect(page.getByRole('button',{name:'نمایش بزرگ تصویر مفهومی'})).toBeFocused();});
test('form validates Persian phone and never claims delivery',async({page})=>{await page.goto('/contact');await page.getByRole('button',{name:'آماده‌سازی پیام'}).click();await expect(page.locator('.error')).toHaveCount(3);await page.getByLabel('نام و نام خانوادگی').fill('کاربر نمونه');await page.getByLabel('شماره همراه').fill('۰۹۱۲۱۲۳۴۵۶۷');await page.getByLabel('درباره پروژه').fill('برای بازسازی فضای مسکونی درخواست مشاوره دارم.');await page.getByRole('button',{name:'آماده‌سازی پیام'}).click();await expect(page.getByRole('status')).toContainText('هنوز هیچ پیامی ارسال نشده');await expect(page.getByRole('link',{name:'باز کردن برنامه پیامک'})).toHaveAttribute('href',/^sms:09021556690/);});
test('mobile menu and no horizontal overflow',async({page})=>{await page.setViewportSize({width:375,height:812});for(const path of ['/','/projects','/about','/contact','/projects/sadeghieh-residential']){await page.goto(path);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();}await page.getByRole('button',{name:'باز کردن منو'}).click();await page.locator('header nav').getByRole('link',{name:'پروژه‌ها'}).click();await expect(page).toHaveURL(/\/projects$/);await expect(page.getByRole('button',{name:'باز کردن منو'})).toHaveAttribute('aria-expanded','false');await page.goto('/');await page.screenshot({path:'/tmp/vishara-mobile.png',fullPage:true});await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'/tmp/vishara-desktop.png',fullPage:true});});

test('shared design tokens and responsive background assets', async ({page}) => {
  for (const route of ['/', '/projects', '/about', '/contact']) {
    await page.goto(route);
    expect(await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      return ['--color-bg', '--color-surface', '--color-surface-secondary', '--color-gold', '--color-gold-light', '--color-purple', '--color-purple-dark', '--color-text', '--color-text-secondary', '--color-border'].map(name => root.getPropertyValue(name).trim().toUpperCase());
    })).toEqual(['#080808','#121212','#1B1B1B','#D4AF37','#F2D675','#6D28D9','#3B0764','#F5F3EF','#A3A3A3','#2B2B2B']);
    expect(await page.evaluate(() => getComputedStyle(document.body, '::before').pointerEvents)).toBe('none');
  }
  for (const asset of ['/images/achaemenid-architect.webp', '/images/achaemenid-architect-mobile.webp']) {
    const response = await page.request.get(asset);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('image/webp');
  }
  await page.setViewportSize({width:375,height:812});
  expect(await page.evaluate(() => getComputedStyle(document.body,'::before').position)).toBe('absolute');
  expect(await page.evaluate(() => getComputedStyle(document.body,'::before').backgroundImage)).toContain('achaemenid-architect-mobile.webp');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  expect(await page.locator('.hero-image img').evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
});
