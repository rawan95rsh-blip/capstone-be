import { Schema, model } from "mongoose";

const sessionSchema = new Schema(
  {
    name: { type: String, required: true },
    providerId: { type: Schema.Types.ObjectId, ref: "Provider", required: true }, // no privider model
    // providerName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    format: { type: String, enum: ["Online", "In-Person"], required: true },
    description: { type: String },
    availability: { type: String, enum: ["Mixed", "Female", "Male"], required: true },
    language: { type: String, enum: ["English", "Arabic", "Bilingual"], required: true },
    enrolledCount: { type: Number, default: 0 },
    maxParticipants: { type: Number, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Session = model("Session", sessionSchema);
export default Session;