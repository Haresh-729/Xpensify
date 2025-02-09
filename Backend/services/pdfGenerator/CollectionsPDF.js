const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon");

const CollectionsPDF = async (collections, days) => {
  try {
    // Create folder if not exists
    const reportsDir = path.join(__dirname, "generatedReports");
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    // Generate file name with current date
    const reportDate = DateTime.now().toFormat("yyyy-MM-dd");
    const pdfFilename = `report_${reportDate}_${days}days.pdf`;
    const pdfPath = path.join(reportsDir, pdfFilename);

    // Generate Table Rows for HTML
    const tableRows = collections
      .map(
        (collection) => `
        <tr>
            <td>${collection.ec_id}</td>
            <td>${collection.name}</td>
            <td>${collection.description}</td>
            <td>${collection.created_by_name}</td>
            <td>${new Date(collection.created_at).toLocaleDateString()}</td>
            <td>${collection.status}</td>
            <td class="participants">
                ${collection.participants.map((p) => `${p}`).join("<br>")}
            </td>
        </tr>`
      )
      .join("");

    // Generate Chart Data
    const chartData = JSON.stringify(
      collections.map((c) => ({ name: c.name, participants: c.participants }))
    );

    // Load the HTML template and replace placeholders
    let htmlTemplate = fs.readFileSync("template.html", "utf8");
    htmlTemplate = htmlTemplate.replace("{{tableRows}}", tableRows);
    htmlTemplate = htmlTemplate.replace("{{chartData}}", chartData);

    // Launch Puppeteer to convert HTML to PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlTemplate);
    await page.pdf({ path: pdfPath, format: "A4", printBackground: true });

    await browser.close();
    return pdfPath;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

module.exports = { CollectionsPDF };
