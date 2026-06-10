const connectDB = require("./db");
const Member = require("./models/Member");

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Please provide a tracking number or mobile number." });
    }

    // Search by Tracking Number or Mobile Number
    const member = await Member.findOne({
      $or: [
        { registrationNo: query.trim() },
        { mobileNumber: query.trim() }
      ]
    });

    if (!member) {
      return res.status(404).json({ error: "No registration found with those details." });
    }

    return res.status(200).json({ success: true, data: member });
  } catch (error) {
    console.error("Status Check API Error:", error);
    return res.status(500).json({ 
      error: error.message || "Internal server error while checking status." 
    });
  }
};