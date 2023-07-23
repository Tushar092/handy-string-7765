const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },
    password: String,
    mobile: {
      type: Number,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: "Mobile number must be a 10-digit number",
      },
    },

    role: {
      type: String,
      enum: ["admin", "user", "guest"],
      default: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    indexes: [{ email: 1 }],
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
