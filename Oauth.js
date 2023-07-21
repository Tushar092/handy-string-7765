const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const { UserModel } = require('./models/user.models');
require("dotenv").config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:4000/auth/google/callback"
},

  async function (accessToken, refreshToken, profile, cb) {
    const user = await UserModel.find({email: profile._json.email});
    if(user.length == 0){
      const newuser = new UserModel({name: profile._json.name, email: profile._json.email});
      console.log("New user created", accessToken, user);
      await newuser.save();
    }else{
      console.log(accessToken, user);
    }
    return cb(null, user);
  }
));

module.exports = passport;