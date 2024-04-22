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
    await page.goto(url, { waitUntil: 'networkidle0' });
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
    const commentElements = await page.$$('.issue-data-block.activity-comment.twixi-block.expanded .action-body.flooded');
    let comments = '';
    for (const commentElement of commentElements) {
      const commentText = await commentElement.evaluate(node => node.innerText.trim());
      comments += `${commentText}. `; //Separate comments with a dot.
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

// For each link found, get the data.
const fetchData = async () => {
  for (const link of links) {
    console.log("Getting data from: " + link);
    await getDataLink(link);
  }
};

fetchData();
