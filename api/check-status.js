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
    return res.status(450).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        error: "Please provide a Tracking Reference or Mobile Number.",
      });
    }

    const cleanedQuery = query.trim();

    const member = await Member.findOne({
      $or: [
        { registrationNo: cleanedQuery },
        { mobileNumber: cleanedQuery },
        { alternativeNumber: cleanedQuery },
      ],
    });

    if (!member) {
      return res.status(404).json({
        error: "No registration found matching that Reference or Mobile Number.",
      });
    }

    // Return safe data
    return res.status(200).json({
      success: true,
      data: {
        fullName: member.fullName,
        registrationNo: member.registrationNo,
        status: member.status,
        dateOfRegistration: member.dateOfRegistration,
        officeApprovedBy: member.officeApprovedBy,
        officeRemarks: member.officeRemarks,
      },
    });
  } catch (error) {
    console.error("Status Check Error:", error);
    return res.status(500).json({
      error: "An error occurred while checking status.",
    });
  }
};
