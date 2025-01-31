import fs from "fs";
import User from "../models/user.js";
import { fileUploadToCloudinary } from "../utils/cloudinary.js";
import { errorHandler } from "../utils/errorHandler.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((val) => val.trim() === "")) {
    return next(errorHandler("All fields are required", 422));
  }

  if (!req.files.profile_photo) {
    return next(errorHandler("Profile photo is required", 422));
  }

  if (!req.files.cover_photo) {
    return next(errorHandler("Cover photo is required", 422));
  }

  const profilePhoto = req.files.profile_photo[0].path;
  const coverPhoto = req.files.cover_photo[0].path;

  try {
    const isUserExisted = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserExisted) next(errorHandler("Email or username already exist."));

    let profile_photo = "";
    let cover_photo = "";

    if (profilePhoto && coverPhoto) {
      profile_photo = await fileUploadToCloudinary(profilePhoto);
      cover_photo = await fileUploadToCloudinary(coverPhoto);
    }

    const user = await User.create({
      email,
      username: username.toLowerCase(),
      password,
      cover_photo,
      profile_photo,
    });

    const newUser = await User.findById(user._id).select(
      "-password -refreshToken -_v"
    );

    if (!newUser) {
      return next(errorHandler());
    }

    res.status(201).json({ user: newUser, message: "Registered Successfully" });
  } catch (error) {
    fs.unlinkSync(profilePhoto);
    fs.unlinkSync(coverPhoto);
    console.log(error);
  }
};

export const getUsers = async (req, res, next) => {
  res.json({ message: "hello" });
};
