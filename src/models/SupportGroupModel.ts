import { Schema, model } from "mongoose";

const supportGroupSchema = new Schema(
  {
    title: {
        type: String,
        required: true,
      },

description: {
  type: String,
},

supporterName: {
    type: String,
    required: true,
  },

  supporterRole: {
    type: String,
    enum: ["doctor", "volunteer"],
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },

  },
  { timestamps: true }
);

const SupportGroup = model("SupportGroup", supportGroupSchema);
export default SupportGroup;