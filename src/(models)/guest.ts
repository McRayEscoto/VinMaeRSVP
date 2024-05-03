import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI || "");
mongoose.Promise = global.Promise;

interface GuestData {
  clusterId: number;
  isAttending: boolean;
  guestnames: string[];
}

const guestSchema = new Schema<GuestData>(
  {
    clusterId: { type: Number, required: true },
    isAttending: { type: Boolean, required: true },
    guestnames: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Guest = mongoose.models.Guest || mongoose.model("Guest", guestSchema);

export default Guest;