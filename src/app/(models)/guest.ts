import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI || "");
mongoose.Promise = global.Promise;

interface GuestName {
  id: string;
  name: string;
}

const guestSchema = new Schema(
  {
    clusterId: Number,
    guestnames: [{ id: String, name: String }]
  },
  {
    timestamps: true,
  }
);

const Guest = mongoose.models.Guest || mongoose.model("Guest", guestSchema);

export default Guest;