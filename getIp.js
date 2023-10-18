const puppeteer = require('puppeteer');
const fs = require('fs');

const getIp = async () => {
    try {
        const browser = await puppeteer.launch(
            {
                headless: "new"
            }
        );
        const page = await browser.newPage();
        await page.goto("https://free-proxy-list.net/");

        const data = await page.evaluate(() => {
            ips = [];
            const tr = document.querySelectorAll("tr");
            for (ele of tr) {
                let ip = ele.childNodes[0].innerText;
                let port = ele.childNodes[1].innerText;
                let google = ele.childNodes[5].innerText;
                let http = ele.childNodes[6].innerText;

                if (port === "Date")
                    break;
                if (port === "Port")
                    continue;
                if (http === "yes")
                    ips.push( ip + ":" + port );
            }
            return ips;
        })
        await browser.close();
        // console.log(data);
        return data;

    }
    catch (err) {
        console.log("failed " + err);
    }
};

module.exports = { getIp };