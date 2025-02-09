const express = require('express');
const cors = require('cors');
require('dotenv').config();
require("../Backend/services/cronJob/cronJob");
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
const profileRoutes = require('./routes/profile');
const collectionRoutes = require('./routes/collection');
const policyRoutes = require('./routes/policy');
const ocrRoutes = require("./routes/ocr");
const reportRoutes = require("./routes/report");

const app = express();

// Allow requests from specific origin (frontend domain)
// const allowedOrigins = ['https://shree-vidya-saraswati-pujan.netlify.app'];
const allowedOrigins = ['http://localhost:5173', '*'];
app.use(cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        // console.log("errorrrr...")
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to the ReGenest Server.');
  });

app.use('/api/auth', authRoutes);
app.use('/api/user', accountRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/collection', collectionRoutes);
app.use('/api/policy', policyRoutes);
app.use('/api/ocr', ocrRoutes);
app.use("/api/report", reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//Following code for running the server on specific network i.e. IP
// app.listen(PORT, '10.112.9.12', () => {
//     console.log(`Server running on port ${PORT}`);
//   });
