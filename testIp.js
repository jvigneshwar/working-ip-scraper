const puppeteer = require("puppeteer");
const cliProgress = require('cli-progress');

async function testIp(data) {
    let workingIp = []
    console.log("Testing Ips");
    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_grey);
    bar1.start(data.length, 0);
    let c = 0;
    for (const ipAddress of data) {
        const browser = await puppeteer.launch({
            headless: true,
            args: [`--proxy-server=${ipAddress}`],
            headless: "new"
        });

        try {
            const page = await browser.newPage();
            await page.goto('https://free-proxy-list.net/');
            workingIp.push(ipAddress)
            await page.close();
        } catch (error) {
            // console.error(`Error with IP address ${ipAddress}: ${error}`);
        } finally {
            await browser.close();
        }
        c++;
        bar1.update(c);
    }
    bar1.stop();
    return workingIp;
}


module.exports = {testIp}