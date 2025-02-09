const pdfReportTemplate = (days, reportLink) => {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>📢 Weekly/Monthly Report</h2>
        <p>Hello,</p>
        <p>The latest <b>${days}-day</b> report has been generated.</p>
        <p>📄 <a href="${reportLink}" target="_blank">Download Report</a></p>
        <p>Best Regards,<br>Git Win It Team</p>
      </div>
    `;
  };
  
  module.exports = pdfReportTemplate;
  