const cron = require("node-cron");
const axios = require("axios");
const mailsenderAttachment = require("../../services/mail/mailsenderAttachment");
const pdfReportTemplate = require("../../services/mail/mail/templates/pdfReportTemplate");
const { reportTriggering } = require("../collection");
const { getAllUsersByRole } = require("../account");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


// Function to generate report & send email
const generateAndEmailReport = async (days) => {
    console.log("into generateEmailReport");
  try {
    console.log(`📌 Generating ${days}-day report...`);
    
    // Step 1: Trigger report generation
    // const reportResponse = await axios.get(`http://localhost:5000/reportTriggering?days=${days}&detailed=true`);
    const reportResponse = await reportTriggering(days, true);
    console.log(reportResponse.pdfPath, "after reportTrigger...")
    if (!reportResponse.pdfPath) throw new Error("PDF generation failed.");

    const pdfPath = reportResponse.pdfPath;
    console.log("✅ Report Generated:", pdfPath);

    // Step 2: Wait 5 minutes before sending emails
    console.log("⏳ Waiting 5 minutes before sending emails...");
    await delay(2 * 0 * 1000);

    // Step 3: Get user emails
    const emails = await getAllUsersByRole(1);
    if (!emails) throw new Error("No valid email addresses found.");

    // Step 4: Send email with attachment
    const emailSubject = `📢 ${days}-Day Report Available`;
    const emailBody = pdfReportTemplate(days, pdfPath);

    console.log("📧 Report email sent to:", emails);
    const emailString = emails.usersData.map(user => user.email).join(",");
    console.log(emailString);
    await mailsenderAttachment(emailString, emailSubject, emailBody, pdfPath);
  } catch (error) {
    console.error("❌ Error in cron job:", error);
  }
};

// Daily report (Every day at 9 AM)
cron.schedule("22 9 * * *", async () => {  
    await generateAndEmailReport(1); 
  });
// Weekly (Sunday at midnight)
cron.schedule("0 0 * * 0", async () => {
  await generateAndEmailReport(7);
});

// Monthly (1st at midnight)
cron.schedule("0 0 1 * *", async () => {
  await generateAndEmailReport(30);
});

console.log("✅ Cron jobs scheduled for weekly and monthly report generation.");
