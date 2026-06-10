const connectDB = require("./db");
const Member = require("./models/Member");

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();

    // Generate a unique Tracking/Registration Number
    // Format: MC-2026-XXXX (starting from 1001)
    const count = await Member.countDocuments();
    const trackingNo = `MC-2026-${(1001 + count).toString()}`;

    const memberData = {
      ...req.body,
      registrationNo: trackingNo,
      status: "pending",
    };

    const newMember = new Member(memberData);
    await newMember.save();

    return res.status(201).json({
      success: true,
      message: "Registration submitted successfully",
      trackingNo: trackingNo,
    });
  } catch (error) {
    console.error("Registration API Error:", error);
    
    // Handle Mongoose validation errors or duplicate keys
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: "A member with this information is already registered." 
      });
    }

    return res.status(500).json({ 
      error: error.message || "Internal server error occurred during registration." 
    });
  }
};