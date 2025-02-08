const cron = require("node-cron");
const axios = require("axios");

console.log("Cron job started...");

// Run every Monday at 9 AM for a weekly report
cron.schedule("0 9 * * 1", async () => {
  console.log("Triggering weekly detailed report...");
  await axios.get("http://localhost:5173/sendreport?days=7&type=detailed");
});

// Run on the 1st of every month at 10 AM for a monthly report
cron.schedule("0 10 1 * *", async () => {
  console.log("Triggering monthly summary report...");
  await axios.get("http://localhost:5173/sendreport?days=30&type=summary");
});
