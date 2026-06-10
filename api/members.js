const connectDB = require("./db");
const Member = require("./models/Member");

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    await connectDB();
    const { id } = req.query;

    // --- CASE 1: FETCH / UPDATE / DELETE SINGLE RECORD ---
    if (id) {
      if (req.method === "GET") {
        const member = await Member.findById(id);
        if (!member) {
          return res.status(404).json({ error: "Member not found" });
        }
        return res.status(200).json({ success: true, data: member });
      }

      if (req.method === "PUT") {
        const updateData = req.body;
        const member = await Member.findById(id);
        if (!member) {
          return res.status(404).json({ error: "Member not found" });
        }

        const updatedMember = await Member.findByIdAndUpdate(
          id,
          { $set: updateData },
          { new: true, runValidators: true }
        );

        return res.status(200).json({
          success: true,
          message: "Member updated successfully",
          data: updatedMember,
        });
      }

      if (req.method === "DELETE") {
        const deletedMember = await Member.findByIdAndDelete(id);
        if (!deletedMember) {
          return res.status(404).json({ error: "Member not found" });
        }
        return res.status(200).json({
          success: true,
          message: "Member registration deleted successfully",
        });
      }

      return res.status(405).json({ error: "Method not allowed" });
    }

    // --- CASE 2: FETCH ALL RECORD LIST WITH SEARCH & FILTERS ---
    if (req.method === "GET") {
      const { search = "", status = "", gender = "" } = req.query;
      const query = {};

      if (search) {
        query.$or = [
          { fullName: { $regex: search, $options: "i" } },
          { mobileNumber: { $regex: search, $options: "i" } },
          { registrationNo: { $regex: search, $options: "i" } },
          { countyOfOrigin: { $regex: search, $options: "i" } },
        ];
      }

      if (status) {
        query.status = status;
      }

      if (gender) {
        query.gender = gender;
      }

      const members = await Member.find(query).sort({ createdAt: -1 });

      const stats = {
        total: await Member.countDocuments({}),
        pending: await Member.countDocuments({ status: "pending" }),
        approved: await Member.countDocuments({ status: "approved" }),
        rejected: await Member.countDocuments({ status: "rejected" }),
      };

      return res.status(200).json({
        success: true,
        data: members,
        stats,
      });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Admin Members Endpoint Error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};
