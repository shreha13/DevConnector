const { validationResult } = require("express-validator");
const config = require("config");
const request = require("request");

const Profile = require("../models/Profile");
const User = require("../models/User");

exports.GetProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.userId }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res
        .status(404)
        .json({ msg: "There is no profile for this user." });
    }
    return res.status(200).json({ profile });
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

exports.EditProfile = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((i) => i.msg),
      message: "Validation failed!",
    });
  }

  const {
    company,
    status,
    website,
    location,
    skills,
    bio,
    githubusername,
    youtube,
    instagram,
    twitter,
    linekdin,
    facebook,
  } = req.body;

  const profileData = {};
  profileData.user = req.userId;
  profileData.status = status;
  profileData.skills = skills.split(",").map((skill) => skill.trim());

  if (company) profileData.company = company;
  if (website) profileData.website = website;
  if (location) profileData.lolocation = location;
  if (bio) profileData.bio = bio;
  if (githubusername) profileData.githubusername = githubusername;

  profileData.social = {};

  if (facebook) profileData.social.facebook = facebook;
  if (linekdin) profileData.social.linekdin = linekdin;
  if (instagram) profileData.social.instagram = instagram;
  if (twitter) profileData.social.twitter = twitter;
  if (youtube) profileData.social.youtube = youtube;

  try {
    let profile = await Profile.findOne({ user: req.userId });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.userId },
        { $set: profileData },
        { new: true }
      ).populate("user", ["name", "avatar"]);

      return res.json({ profile });
    }

    profile = new Profile(profileData);
    await profile.save();
    return res.json({ profile });
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

exports.AddExperience = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((i) => i.msg),
      message: "Validation failed!",
    });
  }

  const { company, title, description, location, from, to, current } = req.body;

  const experienceData = {
    company,
    title,
    location,
    description,
    from,
    to,
    current,
  };

  try {
    let profile = await Profile.findOne({ user: req.userId });
    if (!profile) {
      return res.status(404).json({ msg: "No profile found." });
    }
    profile.experience.unshift(experienceData);
    await profile.save();

    return res.json({ profile });
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

exports.AddEducation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((i) => i.msg),
      message: "Validation failed!",
    });
  }

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  const educationData = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    let profile = await Profile.findOne({ user: req.userId });
    if (!profile) {
      return res.status(404).json({ msg: "No profile found." });
    }
    profile.education.unshift(educationData);
    await profile.save();

    return res.json({ profile });
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

exports.GetAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    return res.json({ profiles });
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

exports.GetProfileByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const profile = await Profile.findOne({ user: userId }).populate("user", [
      "name",
      "avatar",
    ]);

    if (!profile) {
      return res.status(404).json({ msg: "No profile found." });
    }

    return res.json({ profile });
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "No profile found." });
    }
    return res.status(400).json({ errors: err.message });
  }
};

exports.DeleteProfile = async (req, res, next) => {
  const userId = req.userId;
  try {
    await Profile.findOneAndRemove({ user: userId });
    await User.findOneAndRemove({ _id: userId });

    return res.status(301).json({ msg: "User deleted" });
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

exports.EditExperience = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((i) => i.msg),
      message: "Validation failed!",
    });
  }

  const { company, title, description, location, from, to, current } = req.body;

  const experienceData = {
    company,
    title,
    location,
    description,
    from,
    to,
    current,
  };

  try {
    let profile = await Profile.findOne({ user: req.userId });
    if (!profile) {
      return res.status(404).json({ msg: "No profile found." });
    }
    let experience = profile.experience.find(
      (i) => i.id == req.params.experienceId
    );
    let experienceInd = profile.experience.findIndex(
      (i) => i.id == req.params.experienceId
    );

    if (experienceInd === -1)
      return res.status(404).json({ msg: "Experience not found" });

    experienceData._id = req.params.experienceId;

    profile.experience[experienceInd] = experienceData;
    await profile.save();

    return res.json({ profile });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Experience not found" });
    }
    return res.status(400).json({ errors: err.message });
  }
};

exports.EditEducation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((i) => i.msg),
      message: "Validation failed!",
    });
  }

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  const educationData = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    let profile = await Profile.findOne({ user: req.userId });
    if (!profile) {
      return res.status(404).json({ msg: "No profile found." });
    }
    let education = profile.education.find(
      (i) => i.id == req.params.educationId
    );
    let educationInd = profile.education.findIndex(
      (i) => i.id == req.params.educationId
    );

    if (educationInd === -1)
      return res.status(404).json({ msg: "Education not found" });

    educationData._id = req.params.educationId;

    profile.education[educationInd] = educationData;
    await profile.save();

    return res.json({ profile });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Education not found" });
    }
    return res.status(400).json({ errors: err.message });
  }
};

exports.GetAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    return res.json({ profiles });
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

exports.GetProfileByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const profile = await Profile.findOne({ user: userId }).populate("user", [
      "name",
      "avatar",
    ]);

    if (!profile) {
      return res.status(404).json({ msg: "No profile found." });
    }

    return res.json({ profile });
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "No profile found." });
    }
    return res.status(400).json({ errors: err.message });
  }
};

exports.DeleteProfile = async (req, res, next) => {
  const userId = req.userId;
  try {
    await Profile.findOneAndRemove({ user: userId });
    await User.findOneAndRemove({ _id: userId });

    return res.status(301).json({ msg: "User deleted" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(400).json({ errors: err.message });
  }
};

exports.DeleteExperience = async (req, res, next) => {
  const userId = req.userId;
  const experienceId = req.params.experienceId;
  try {
    const profile = await Profile.findOne({ user: userId });
    const removeIndex = profile.experience
      .map((i) => i.id)
      .indexOf(experienceId);

    if (removeIndex === -1)
      return res.status(404).json({ msg: "Experience not found" });

    profile.experience.splice(removeIndex, 1);
    await profile.save();

    return res.status(301).json({ profile });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Experience not found" });
    }
    return res.status(400).json({ errors: err.message });
  }
};

exports.DeleteEducation = async (req, res, next) => {
  const userId = req.userId;
  const educationId = req.params.educationId;
  try {
    const profile = await Profile.findOne({ user: userId });
    const removeIndex = profile.education.map((i) => i.id).indexOf(educationId);

    if (removeIndex === -1)
      return res.status(404).json({ msg: "Education not found" });

    profile.education.splice(removeIndex, 1);
    await profile.save();

    return res.status(301).json({ profile });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Education not found" });
    }
    return res.status(400).json({ errors: err.message });
  }
};

exports.GetGithubRepo = (req, res, next) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&access_token=${config.get(
        "githubAccessToken"
      )}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) {
        return res.status(400).json({ msg: error });
      }
      if (response.statusCode != 200) {
        return res.status(400).json({ msg: "Github profile not found" });
      }
      return res.json(JSON.parse(body));
    });
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};
