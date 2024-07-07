const { Schema, model } = require("mongoose");

const reservationSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    session: {
      type: Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation;