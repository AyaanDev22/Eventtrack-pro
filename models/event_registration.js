const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: Number, required: true },
    organization: { type: String, trim: true },
    attendanceStatus: { type: String, enum: ["PENDING", "PRESENT"], default: "PENDING" },

    registrationId: { type: String, required: true, unique: true },
    qrCodeData: { type: String,  unique: true } // this is what QR will contain
  },
  { timestamps: true }
);

// Prevent duplicate registration for same event
registrationSchema.index({ eventId: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("Registration", registrationSchema);
