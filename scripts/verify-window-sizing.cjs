const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const assert = require('node:assert/strict')
const sizes = [[320,568],[390,844],[844,390],[768,1024],[1280,800],[1920,1080]]
const apps = ['welcome','projects','music','terminal','about','resume','contact','ai-lab','systems']
async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  const failures = []
  try {
    for (const [width,height] of sizes) {
      const page = await browser.newPage({ viewport: {width,height}, reducedMotion: 'reduce' })
      page.on('pageerror', error => failures.push(error.message))
      for (const app of apps) {
        await page.goto(`http://127.0.0.1:3000/portfolio/${app}`, {waitUntil:'domcontentloaded'})
        const win = page.locator(`[data-app="${app}"]:not(.music-mini-window)`)
        await win.waitFor({state:'visible'})
        await win.locator('.window-content > :not(.app-loading)').waitFor()
        await page.waitForTimeout(500)
        const metrics = await win.evaluate(node => {
          const content = node.querySelector('.window-content')
          const rect = node.getBoundingClientRect()
          return {x:rect.x,y:rect.y,w:rect.width,h:rect.height,overflow:document.documentElement.scrollWidth>innerWidth,
            contentOverflow:content.scrollWidth-content.clientWidth,
            font:Math.min(...[...content.querySelectorAll('p')].filter(p=>p.getClientRects().length).map(p=>parseFloat(getComputedStyle(p).fontSize))),
            clipping:[...content.querySelectorAll('div,section,article')].filter(e=>e.clientWidth && e.scrollWidth>e.clientWidth+3 && getComputedStyle(e).overflowX==='visible').slice(0,4).map(e=>e.className)}
        })
        try {
          assert.ok(!metrics.overflow && metrics.x>=-3 && metrics.y>=-3 && metrics.x+metrics.w<=width+3 && metrics.y+metrics.h<=height+3, JSON.stringify(metrics))
          assert.ok(metrics.contentOverflow<=2, `content overflow: ${metrics.contentOverflow}`)
          assert.ok(metrics.font>=15, `small paragraph: ${metrics.font}`)
        } catch(error) { failures.push(`${width}x${height} ${app}: ${error.message}`) }
        if(metrics.clipping.length) console.log('CHECK',width,app,metrics.clipping)
        if(['welcome','music','about','contact'].includes(app) && [390,768,1920].includes(width))
          await page.screenshot({path:`.impeccable/review/sizing-${app}-${width}.png`})
      }
      console.log(`CHECKED ${width}x${height}: ${apps.length} apps`)
      await page.close()
    }
    assert.deepEqual(failures, [])
    console.log('PASS: 54 responsive app layouts, readable paragraphs and viewport bounds')
  } finally { await browser.close() }
}
main().catch(error=>{console.error(error);process.exitCode=1})
