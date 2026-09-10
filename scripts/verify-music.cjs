const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const assert = require('node:assert/strict')

// Live integration check: requires access to Spotify and plays a short preview.
async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:3000/portfolio/'
  try {
    for (const mobile of [false, true]) {
      const page = await browser.newPage({ viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 800 }, reducedMotion: 'reduce' })
      await page.goto(base + 'music')
      const embed = page.locator('iframe[title="Spotify Embed: Stato"]')
      await embed.waitFor()
      assert.equal(await embed.getAttribute('src'), 'https://open.spotify.com/embed/playlist/4NkNJ6YpE7DaDlWvlvUGIS')
      const frame = await (await embed.elementHandle()).contentFrame()
      await frame.getByText('Stato', { exact: true }).first().waitFor()
      await frame.getByRole('button', { name: 'Play track', exact: true }).first().click()
      await frame.getByRole('button', { name: /Pause/ }).first().waitFor()
      await embed.evaluate(node => { node.dataset.continuityProbe = 'retained' })
      if (mobile) {
        await page.getByRole('button', { name: 'Home', exact: true }).click()
      } else {
        await page.locator('[data-app="music"]').getByRole('button', { name: 'Minimize Music', exact: true }).click()
      }
      const mini = page.getByRole('region', { name: 'Music mini player', exact: true })
      await mini.waitFor({ state: 'visible' })
      assert.equal(await mini.getAttribute('inert'), null)
      assert.equal(await embed.getAttribute('data-continuity-probe'), 'retained')
      await frame.getByRole('button', { name: /Pause/ }).first().waitFor()
      await mini.getByRole('button', { name: 'Restore Music window', exact: true }).click()
      assert.equal(await embed.getAttribute('data-continuity-probe'), 'retained')
      await frame.getByRole('button', { name: /Pause/ }).first().waitFor()
      await frame.getByRole('button', { name: /Pause/ }).first().click()
      await page.getByRole('button', { name: 'Reload Spotify player' }).click()
      assert.equal(await embed.getAttribute('data-continuity-probe'), null)
      assert.equal(await page.getByRole('link', { name: 'Open Stato playlist in Spotify' }).getAttribute('href'), 'https://open.spotify.com/playlist/4NkNJ6YpE7DaDlWvlvUGIS')
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
      await page.getByRole('button', { name: 'Close Music', exact: true }).click()
      await embed.waitFor({ state: 'detached' })
      await page.keyboard.press('Control+k')
      await page.getByRole('textbox', { name: 'Search apps, projects and skills' }).fill('spotify')
      await page.getByRole('option').filter({ hasText: 'Music' }).click()
      await embed.waitFor()
      if (mobile) await page.getByRole('button', { name: 'Home', exact: true }).click()
      else await page.locator('[data-app="music"]').getByRole('button', { name: 'Minimize Music', exact: true }).click()
      await page.getByRole('button', { name: 'Close Music mini player', exact: true }).click()
      await embed.waitFor({ state: 'detached' })
      console.log(`PASS ${mobile ? 'mobile' : 'desktop'}: Spotify preview controls, retained iframe, restore, retry, external link, close, search and overflow`)
      await page.close()
    }
  } finally { await browser.close() }
}
main().catch(error => { console.error(error); process.exitCode = 1 })
