require('dotenv').config({path:'.env'})
const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const port = 8000;

const roc = "https://plaza2.rocvantwente.nl/s/plaza/SitePages/rooster.aspx?jaarweek=&Klas=8AA1&locatie=ALSU";
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
let data = {};

//console.log({username, password});

let b = false;

async function getData(url = "https://plaza2.rocvantwente.nl/s/plaza/SitePages/rooster.aspx?jaarweek=&Klas=8AA1&locatie=ALSU"){
     const browser = await puppeteer.launch({
	executablePath: 'chromium-browser',
        headless: false,
        args: ['--start-fullscreen']
     });

    const page = await browser.newPage();
    await page.goto(url);
    await page.authenticate(username, password);
   

    const hrefElement = await page.$eval('#gebruikersnaam', el => el);
    await page.type("#gebruikersnaam", username);
    await page.type("#wachtwoord", password);
    await Promise.all([
        page.click('[id="inloggen"]'),
        page.waitForNavigation({ waitUntil: 'networkidle0' })
    ]).then(() => { b = true});

        if(b == true){
	const [ok] = await page.$x('//*[@id="ctl42_g_42ada3a4_d403_4da4_b79b_5c6fde1cb161_RoosterPageRooster"]/table');
        const txt = await ok.getProperty('textContent');
        data = await txt.jsonValue();
        page.setContent(rt);
	}
}

getData(roc);



app.get('/', (req, res) => {res.send(data) });
app.listen(port, () => {});

























