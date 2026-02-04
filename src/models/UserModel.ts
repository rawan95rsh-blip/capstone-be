import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    sessions: [{ type: Schema.Types.ObjectId, ref: "Session" }],
});

const User = model("User", userSchema);

export default User;