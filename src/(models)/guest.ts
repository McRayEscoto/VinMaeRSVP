import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI || "");
mongoose.Promise = global.Promise;

interface GuestDetails {
  guestname: string;
  address: string;
}

interface GuestData {
  clusterId: number;
  isAttending: boolean;
  guestdetails: GuestDetails[];
}

const guestDetailsSchema = new Schema<GuestDetails>({
  guestname: { type: String, required: true },
  address: { type: String, required: true },
});

const guestSchema = new Schema<GuestData>(
  {
    clusterId: { type: Number, required: true },
    isAttending: { type: Boolean, required: true },
    guestdetails: [guestDetailsSchema],
  },
  {
    timestamps: true,
  }
);

const Guest = mongoose.models.Guest || mongoose.model("Guest", guestSchema);

export default Guest;