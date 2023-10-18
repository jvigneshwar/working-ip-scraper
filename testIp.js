const puppeteer = require("puppeteer");

async function testIp(data) {
    let workingIp = []
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
    }
    return workingIp;
}


module.exports = {testIp}