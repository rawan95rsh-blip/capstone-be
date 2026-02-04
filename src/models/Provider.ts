import { Schema, model } from "mongoose";

const providerSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    degree: { type: String, required: true },
    degreeAr: { type: String },
    specialization: { type: String, required: true },
    specializationAr: { type: String },
    volunteerCoHost: { type: Boolean, default: false },
    bio: { type: String, required: true },
    bioAr: { type: String },
    sessionIds: [{ type: Schema.Types.ObjectId, ref: "Session" }],
  },
  { timestamps: true }
);

const Provider = model("Provider", providerSchema);
export default Provider;