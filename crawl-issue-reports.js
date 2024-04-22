const fs = require('fs');
const puppeteer = require('puppeteer');

// Base URL for the issues in Apache Camel project.
const baseUrl = 'https://issues.apache.org/jira/browse/CAMEL-';

// Create the links for all issues.
const links = [];
// for (let i = 0; i < 20704; i++) {
for (let i = 10597; i < 10598; i++) {
  links.push(`${baseUrl}${i}`);
}

const getDataLink = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle0' }); // Wait until there are no network connections, addressing the sync problem.

    // Extracting data from the page content
    const type = await page.$eval('#type-val', el => el.textContent.trim());
    const assignee = await page.$eval('#assignee-val', el => el.textContent.trim());
    const created = await page.$eval('#created-val .livestamp', el => el.getAttribute('datetime').trim()); // Get the datetime attribute value
    const createdEpoch = new Date(created).getTime() / 1000; // Convert created date to epoch and remove last zero

    let description = await page.$eval('#description-val', el => el.textContent.trim());
    description = description.replace(/(\r\n|\n|\r|\,)/gm, ' ');

    const commentElements = await page.$$('.issue-data-block.activity-comment.twixi-block.expanded .action-body.flooded');
    let comments = '';
    for (const commentElement of commentElements) {
      const commentText = await commentElement.evaluate(node => node.innerText.trim());
      comments += `${commentText}. `; //Separate comments with a dot.
    }
    comments = comments.replace(/(\r\n|\n|\r|\,)/gm, ' ');

    // Creating CSV content
    const csvContent = `Type,Assignee,Created,Created Epoch,Description,Comments\n`;
    const rowData = `${type},${assignee},${created},${createdEpoch},${description},${comments}\n`;

    // Append row data to CSV content
    fs.writeFileSync('camel_issues.csv', csvContent + rowData, (err) => {
      if (err) throw err;
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    await browser.close();
  }
};

const fetchData = async () => {
  for (const link of links) {
    await getDataLink(link);
  }
};

fetchData();
