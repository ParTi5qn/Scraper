require('dotenv').config();
const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

let roc = process.env.ROC;
const url = "https://plaza2.rocvantwente.nl/s/plaza/SitePages/rooster.aspx?jaarweek=&Klas=8AA1&locatie=ALSU"
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const xTable = process.env.XTABLE;

console.log(process.env);

async function getData() {
    
    // Launch puppeteer browser 
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1000,
            height: 700
        },
    });

    // Create new page
    const page = await browser.newPage();
    // Goto the specified url
    await page.goto(url);

    // Fill in the login information and click the login button.
    await page.type("#gebruikersnaam", username);
    await page.type("#wachtwoord", password);
    await Promise.all([
        page.click('[id="inloggen"]'),
        page.waitForNavigation({
            waitUntil: 'networkidle0'
        })
    ]);

    // Wait till the page is loaded
    await sleep(2000);
    // Wait for the table which we want to scrape to be loaded
    await page.waitForXPath(xTable);
    // Get that element and print it to the page
    const [ok] = await page.$x(xTable);
    const txt = await ok.getProperty('textContent');
    const rawText = await txt.jsonValue();
    await page.setContent(rawText);
    console.log({rawText});
    return rawText;
}

// Sets the script to sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(8000, () => getData());