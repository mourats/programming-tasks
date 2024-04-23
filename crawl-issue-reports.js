const fs = require('fs');
const puppeteer = require('puppeteer');

// Base URL for the issues in Apache Camel project.
const baseUrl = 'https://issues.apache.org/jira/browse/CAMEL-';

// Create the links for all issues. Exist a total of 20704 issues.
const links = [];
for (let i = 1; i < 20705; i++) {
  links.push(`${baseUrl}${i}`);
}

const getDataLink = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Open the link provided and wait until all network connections are finished. Resolve the sync problem for complete page loading.
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    const content = await page.content();

    // Extracting type data from the page content, if it exists.
    const type = content.includes('id="type-val"') ? await page.$eval('#type-val', el => el.textContent.trim()) : '';

    // Extracting assignee data from the page content, if it exists.
    const assignee = content.includes('id="assignee-val"') ? await page.$eval('#assignee-val', el => el.textContent.trim()) : '';

    let created = '';
    let createdEpoch = '';
    // Extract the created data from the page content, if it exists, and derive the creation epoch as well.
    if (content.includes('id="created-val"')) {
      created = await page.$eval('#created-val .livestamp', el => el.getAttribute('datetime').trim()); // Get the datetime attribute value.
      createdEpoch = new Date(created).getTime() / 1000; // Convert created date to epoch and remove last zeros.
    }

    // Extracting description data from the page content, if it exists.
    let description = content.includes('id="description-val"') ? await page.$eval('#description-val', el => el.textContent.trim()) : '';

    // Remove everything that could break the csv file;
    description = description.replace(/(\r\n|\n|\r|\,)/gm, ' ');

    // Extracting comments data from the page content, if it exists.
    const commentBlocks = await page.$$('.issue-data-block.activity-comment.twixi-block.expanded');
    let comments = '';
    for (const commentBlock of commentBlocks) {
      // Extract the comment user.
      const userElement = await commentBlock.$('.action-details .user-hover');
      const user = await userElement.evaluate(node => node.innerText.trim());

      // Extract the datetime of the comment.
      const datetimeElement = await commentBlock.$('.action-details time');
      const datetime = await datetimeElement.evaluate(node => node.getAttribute('datetime'));

      // Extract the comment text.
      const commentBodyElement = await commentBlock.$('.action-body');
      const commentText = await commentBodyElement.evaluate(node => node.innerText.trim());

      // Concat each part with two dots, as asked.
      const concatenatedComment = `${user}:${datetime}:${commentText}`;
      comments += `${concatenatedComment}. `; // Divide the comments with dot and space.
    }
    comments = comments.replace(/(\r\n|\n|\r|\,)/gm, ' ');

    // Append row data to CSV content
    const rowData = `${type},${assignee},${created},${createdEpoch},${description},${comments}\n`;
    fs.appendFileSync('camel_issues.csv', rowData);

  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    await browser.close();
  }
};

// Creating the CSV header.
const csvContent = `Type,Assignee,Created,Created Epoch,Description,Comments\n`;
fs.writeFileSync('camel_issues.csv', csvContent);

// Creating sleep function.
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// For each link found, get the data.
const fetchData = async () => {
  let mount = 0;
  for (const link of links) {
    console.log("Getting data from: " + link);
    await getDataLink(link);

    // After every 500 requests, wait five minutes. 
    // Mechanism to avoid being blocked by Jira server due to too many requests.
    if (mount === 500) {
      await sleep(300000);
      mount = 0;
    }
    mount++;
  }
};

fetchData();
