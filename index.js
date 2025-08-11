const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Route to send subscription data to Google Sheets
app.post("/renew", async (req, res) => {
  try {
    const payload = req.body;

    // Send to Google Apps Script
    const scriptURL = process.env.SHEET_SCRIPT_URL;
    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });

    res.status(200).json({ success: true, message: "Data sent to Google Sheets" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error sending to Google Sheets" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

