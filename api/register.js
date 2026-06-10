const connectDB = require("./db");
const Member = require("./models/Member");

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(450).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();
    const data = req.body;

    // Basic Validation
    if (!data.fullName || !data.gender || !data.dateOfBirth || !data.mobileNumber) {
      return res.status(400).json({
        error: "Missing required fields: Full Name, Gender, DOB, and Mobile Number are required.",
      });
    }

    if (!data.isDeclared) {
      return res.status(400).json({
        error: "You must accept the Member's Declaration to submit.",
      });
    }

    // Generate a unique tracking number for the application
    // Format: MC-YYYY-XXXX (e.g. MC-2026-1048)
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingNo = `MC-${year}-${randomSuffix}`;

    const newMemberData = {
      ...data,
      registrationNo: trackingNo,
      status: "pending",
      dateOfRegistration: new Date(),
    };

    const newMember = new Member(newMemberData);
    await newMember.save();

    return res.status(201).json({
      success: true,
      message: "Registration submitted successfully!",
      trackingNo: trackingNo,
      memberId: newMember._id,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      error: error.message || "Something went wrong while saving your registration.",
    });
  }
};
