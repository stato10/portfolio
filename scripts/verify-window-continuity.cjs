const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const assert = require('node:assert/strict')

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  try {
    for (const mobile of [false, true]) {
      const page = await browser.newPage({ viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 800 } })
      const errors = []
      page.on('pageerror', error => errors.push(error.message))
      await page.goto('http://127.0.0.1:3000/portfolio/terminal')
      const terminal = page.locator('[data-app="terminal"]')
      const input = page.getByRole('textbox', { name: 'Terminal command' })
      await input.fill('whoami')
      await input.press('Enter')
      await input.fill('skills')
      await terminal.evaluate(node => { node.dataset.retentionProbe = 'same-node' })
      if (mobile) {
        await page.getByRole('button', { name: 'Home', exact: true }).click()
      } else {
        await terminal.getByRole('button', { name: 'Minimize Terminal', exact: true }).click()
      }
      await terminal.waitFor({ state: 'hidden' })
      assert.equal(await terminal.count(), 1, 'Window remains mounted')
      assert.equal(await terminal.getAttribute('inert'), '')
      if (mobile) {
        await page.getByRole('button', { name: 'Recents', exact: true }).click()
        await page.locator('.mobile-recents article > button').filter({ hasText: 'Terminal' }).click()
      } else {
        await page.locator('.dock').getByRole('button', { name: 'Restore Terminal', exact: true }).click()
      }
      await input.waitFor()
      assert.equal(await input.inputValue(), 'skills')
      assert.equal(await terminal.getAttribute('data-retention-probe'), 'same-node')
      assert.ok((await terminal.innerText()).includes('Avraham Stato'))
      if (!mobile) {
        await terminal.getByRole('button', { name: 'Maximize Terminal', exact: true }).click()
        await terminal.getByRole('button', { name: 'Restore Terminal', exact: true }).click()
        await page.getByRole('button', { name: 'Work', exact: true }).click()
      } else {
        await page.getByRole('button', { name: 'Home', exact: true }).click()
        await page.getByRole('button', { name: 'Explore my work', exact: true }).click()
      }
      const search = page.getByRole('textbox', { name: 'Search Projects', exact: true })
      await search.fill('Prisma')
      if (!mobile) {
        await page.locator('[data-app="projects"]').getByRole('button', { name: 'Minimize Projects', exact: true }).click()
        await page.locator('.dock').getByRole('button', { name: 'Restore Projects', exact: true }).click()
      } else {
        await page.getByRole('button', { name: 'App drawer', exact: true }).click()
        await page.locator('.mobile-drawer-grid').getByRole('button', { name: 'Projects', exact: true }).click()
      }
      assert.equal(await search.inputValue(), 'Prisma')
      assert.equal(await page.locator('.portfolio-item').count(), 1)
      await page.waitForFunction(() => [...document.querySelectorAll('.app-window:not([aria-hidden="true"])')].every(node => getComputedStyle(node).opacity === '1' && getComputedStyle(node).filter === 'blur(0px)'))
      await page.screenshot({ path: `.impeccable/review/continuity-${mobile ? 'mobile' : 'desktop'}.png` })
      assert.deepEqual(errors, [])
      console.log(`PASS ${mobile ? 'mobile' : 'desktop'}: retained DOM, terminal history/draft, project filter, minimize/home and restore`)
      await page.close()
    }
  } finally { await browser.close() }
}
main().catch(error => { console.error(error); process.exitCode = 1 })
