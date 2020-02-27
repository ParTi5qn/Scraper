// Clear the console on startup for Windows.
process.stdout.write("\u001b[2J\u001b[0;0H");


process.stdin.on('keypress', (str, key) => {
	if(key.ctrl && key.name === 'c'){
		exit();
	}
});


require('dotenv').config();
const sql = require("mysql");
const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
//const test = require("/tests/extract_days.js");

const url = "https://plaza2.rocvantwente.nl/s/plaza/SitePages/rooster.aspx?jaarweek=202010&Klas=9AA1&locatie=ALSU"

// Variables starting with an underscore are from DOTENV.
// They are stored in file called .env
// This file contains sensitive information
// And therefore it doesn't get shared on github.
const _u = process.env._USERNAME;
const _p = process.env._PASSWORD;
const xTable = process.env.XTABLE;
let data = {};




// const connection = sql.createConnection({
//     host: 'localhost',
//     user: process.env.DB_USER,
//     password: process.env.DB_USER,
//     database: "rooster"
// });

// connection.connect(err => {
//     if (err) throw err;
//     console.log("Connection established.");
// });

async function getData() {
    // Launch puppeteer browser
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1000,
            height: 700
        },
        // executablePath: "chromium-browser"
        executablePath: "D:\\Users\\Ok\\Desktop\\chrome-win\\chrome-win\\chrome.exe"
    });

    // Create new page
    const page = await browser.newPage();
    // Goto the specified url
    await page.goto(url);

    // Fill in the login information and click the login button.
    await page.type("#gebruikersnaam", _u);
    await page.type("#wachtwoord", _p);
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
    // await page.setContent(rawText);
    data = rawText;
    await browser.close();
    return rawText;
}

// Sets the script to sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/', (req, res) => res.send(data));
app.listen(8000, () => getData());