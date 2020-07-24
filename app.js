const puppeter = require('puppeteer')

async function start(){

    async function loadMore(page, selector){
        const moreButton = await page.$(selector)
        if  (moreButton) {
            await moreButton.click()
            await page.waiFor(selector, {timeout: 3000})
            await loadMore(page, selector)
        }
    }

    async function getComments(page,selector){
        const commnets = await page.$$eval(selector, link => links.map(link => link.innerText))
        return commnets
    }


    const browser = await puppeter.launch()
    const page = await browser.newPage
    await page.goto('link')

    await loadMore(page, 'tag');
    const commnets = await getComments(page, '.campo span a')
    const counted = count(arrobas)
    const sorted = sort(counted) 
    sorted.foreEach(arroba => {console.log})
    
    await browser.close()
}

function    count(arrobas){
    const count = {}
    arrobas.foreEach(arroba => { count [arroba] = (count[arroba] || 0) + 1})
    return count
}

function sort(counted) {
    const entries = Object.entries(counted)
    const sorted = entries.sort((a ,b) => b[1] -a[1])
    return sorted
}

start()