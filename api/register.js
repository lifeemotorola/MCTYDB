const connectDB = require("./db");
const Member = require("./models/Member");

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  console.log(`Received request to /api/register with method: ${req.method}`);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty." });
    }

    // Generate a unique Tracking/Registration Number
    // We use a combination of count and a random suffix to prevent collisions
    const count = await Member.countDocuments();
    const randomSuffix = Math.floor(10 + Math.random() * 90); // 2-digit random number
    const trackingNo = `MC-2026-${(1001 + count).toString()}${randomSuffix}`;

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
    console.error("Registration API Error Details:", {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    
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