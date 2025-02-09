const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.json());

const fetchBills = async (token) => {
  try {
    const response = await axios.get('http://localhost:3000/api/report/get-collection-bills', {
      params: { ec_id: 1 },
      headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoia3VyYWRlaGFyZXNoNDAwMkBnbWFpbC5jb20iLCJpYXQiOjE3MzkwNTQxODgsImV4cCI6MTc0MTY0NjE4OH0.y8FK9u05qkTVfv2MHrh_xeT7k4-5jKoa6lWXVgSNlVs` },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching bills:', error);
    return [];
  }
};

const fetchSingleBillDetails = async (b_id, token) => {
  try {
    const response = await axios.get('http://localhost:3000/api/report/get-single-bill-details', {
      params: { b_id },
      headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoia3VyYWRlaGFyZXNoNDAwMkBnbWFpbC5jb20iLCJpYXQiOjE3MzkwNTQxODgsImV4cCI6MTc0MTY0NjE4OH0.y8FK9u05qkTVfv2MHrh_xeT7k4-5jKoa6lWXVgSNlVs` },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching single bill details:', error);
    return null;
  }
};

const generateHTML = (statusData, vendorData, barChartData, lineChartData, pieChartData) => {
  const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Graphs</title>
      <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    </head>
    <body>
      <div id="statusPieChart"></div>
      <div id="vendorBarChart"></div>
      <div id="itemBarChart"></div>
      <div id="itemLineChart"></div>
      <div id="categoryPieChart"></div>

      <script>
        const statusData = ${JSON.stringify(statusData)};
        const vendorData = ${JSON.stringify(vendorData)};
        const barChartData = ${JSON.stringify(barChartData)};
        const lineChartData = ${JSON.stringify(lineChartData)};
        const pieChartData = ${JSON.stringify(pieChartData)};

        const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff6f61", "#a28eec"];
        const colors2 = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFD433", "#33FFF5", "#8D33FF", "#FF3333", "#33FF85", "#FF8F33"];

        Plotly.newPlot('statusPieChart', [{
          values: statusData.map(d => d.value),
          labels: statusData.map(d => d.name),
          type: 'pie',
          marker: { colors: colors }
        }], { title: 'Bill Status Distribution' });

        Plotly.newPlot('vendorBarChart', [{
          x: vendorData.map(d => d.vendor),
          y: vendorData.map(d => d.amount),
          type: 'bar',
          marker: { color: '#82ca9d' }
        }], { title: 'Vendor Amount Distribution', xaxis: { title: 'Vendor' }, yaxis: { title: 'Amount' } });

        Plotly.newPlot('itemBarChart', [{
          x: barChartData.map(d => d.item),
          y: barChartData.map(d => d.quantity),
          type: 'bar',
          marker: { color: colors2 }
        }], { title: 'Item Quantity Distribution', xaxis: { title: 'Item' }, yaxis: { title: 'Quantity' } });

        Plotly.newPlot('itemLineChart', [{
          x: lineChartData.map(d => d.item),
          y: lineChartData.map(d => d.amount),
          type: 'line',
          marker: { color: '#8884d8' }
        }], { title: 'Item Amount Distribution', xaxis: { title: 'Item' }, yaxis: { title: 'Amount' } });

        Plotly.newPlot('categoryPieChart', [{
          values: pieChartData.map(d => d.value),
          labels: pieChartData.map(d => d.name),
          type: 'pie',
          marker: { colors: colors }
        }], { title: 'Category Amount Distribution' });

        setTimeout(() => {
          const saveGraph = (id, filename) => {
            Plotly.toImage(document.getElementById(id), { format: 'png', width: 800, height: 600 })
              .then(imgData => {
                const link = document.createElement('a');
                link.href = imgData;
                link.download = filename;
                link.click();
              });
          };

          saveGraph('statusPieChart', 'status_pie_chart.png');
          saveGraph('vendorBarChart', 'vendor_bar_chart.png');
          saveGraph('itemBarChart', 'item_bar_chart.png');
          saveGraph('itemLineChart', 'item_line_chart.png');
          saveGraph('categoryPieChart', 'category_pie_chart.png');
        }, 1000);
      </script>
    </body>
    </html>
  `;
  return template;
};

app.post('/generate-report', async (req, res) => {
  const { token, b_id } = req.body;

  const billsData = await fetchBills(token);
  const singleBillData = await fetchSingleBillDetails(b_id, token);

  const statusData = [
    { name: 'Pending', value: billsData.filter(bill => bill.status === 'Pending').length },
    { name: 'Accepted', value: billsData.filter(bill => bill.status === 'Accepted').length },
    { name: 'Rejected', value: billsData.filter(bill => bill.status === 'Rejected').length },
  ];

  const vendorData = billsData.reduce((acc, bill) => {
    const vendor = bill.vendor;
    const amount = bill.final_amount;
    const existingVendor = acc.find(entry => entry.vendor === vendor);

    if (existingVendor) {
      existingVendor.amount += amount;
    } else {
      acc.push({ vendor, amount });
    }
    return acc;
  }, []);

  let barChartData = null;
  let lineChartData = null;
  let pieChartData = null;

  if (singleBillData && singleBillData.items?.length > 0) {
    barChartData = singleBillData.items.map(bill => ({
      item: bill.name,
      quantity: bill.qty,
    }));

    lineChartData = singleBillData.items.map(bill => ({
      item: bill.name,
      amount: bill.amount,
    }));

    const categoryMap = singleBillData.items.reduce((acc, bill) => {
      const category = bill.category?.name || bill.predicted_cat || 'Uncategorized';
      acc[category] = (acc[category] || 0) + bill.amount;
      return acc;
    }, {});

    pieChartData = Object.entries(categoryMap).map(([category, value]) => ({
      name: category,
      value,
    }));
  }

  const htmlContent = generateHTML(statusData, vendorData, barChartData, lineChartData, pieChartData);
  const filePath = path.join(__dirname, 'report.html');
  fs.writeFileSync(filePath, htmlContent);

  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});