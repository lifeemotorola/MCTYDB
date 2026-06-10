const mongoose = require("mongoose");

const DependentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  relationship: { type: String, required: true },
});

const MemberSchema = new mongoose.Schema(
  {
    registrationNo: { type: String, unique: true, sparse: true },
    dateOfRegistration: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // A. Personal Information
    fullName: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    dateOfBirth: { type: Date, required: true },
    age: { type: Number, required: true },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Separated", "Widowed"],
      required: true,
    },
    nationality: { type: String, required: true, trim: true },
    countyOfOrigin: { type: String, required: true, trim: true },
    homeAddress: { type: String, required: true, trim: true },
    houseNumberLandmark: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    alternativeNumber: { type: String, trim: true },
    emailAddress: { type: String, trim: true },

    // B. Employment / Livelihood Information
    livelihood: {
      type: String,
      enum: [
        "Government Employee",
        "Private Employee",
        "Business Owner",
        "Petty Trader",
        "Farmer",
        "Fisherman/Fisherwoman",
        "Driver/Rider",
        "Teacher",
        "Health Worker",
        "Student",
        "Unemployed",
        "Other",
      ],
      required: true,
    },
    livelihoodOther: { type: String, trim: true },
    employerName: { type: String, trim: true },
    monthlyIncome: {
      type: String,
      enum: [
        "Less than LD$10,000",
        "LD$10,000 - LD$25,000",
        "LD$25,001 - LD$50,000",
        "Above LD$50,000",
      ],
      required: true,
    },

    // C. Household Information
    numberOfDependents: { type: Number, required: true, default: 0 },
    dependents: [DependentSchema],
    totalPersonsInHousehold: { type: Number, required: true, default: 1 },

    // D. Community Information
    durationOfResidency: {
      type: String,
      enum: ["Less than 1 Year", "1-5 Years", "6-10 Years", "More than 10 Years"],
      required: true,
    },
    residentialStatus: {
      type: String,
      enum: ["Property Owner", "Tenant", "Relative/Dependent", "Caretaker"],
      required: true,
    },
    isRegisteredVoter: { type: Boolean, required: true, default: false },
    willingToParticipate: { type: Boolean, required: true, default: true },
    areasOfInterest: { type: [String], default: [] },
    areasOfInterestOther: { type: String, trim: true },

    // E. Emergency Contact Information
    emergencyName: { type: String, required: true, trim: true },
    emergencyRelationship: { type: String, required: true, trim: true },
    emergencyPhone: { type: String, required: true, trim: true },
    emergencyAddress: { type: String, required: true, trim: true },

    // F. Member Declaration
    isDeclared: { type: Boolean, required: true },
    declarationDate: { type: Date, required: true, default: Date.now },

    // G. Community Office Use Only
    officeReceivedBy: { type: String, trim: true },
    officePositionReceivedBy: { type: String, trim: true },
    officeDateReceived: { type: Date },
    officeApprovedBy: { type: String, trim: true },
    officePositionApprovedBy: { type: String, trim: true },
    officeRemarks: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

// Check if model exists before compiling to avoid OverwriteModelError
const Member = mongoose.models.Member || mongoose.model("Member", MemberSchema);

module.exports = Member;
