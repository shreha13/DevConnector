const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const profileController = require("../controllers/profile");
const authMiddleware = require("../middleware/Auth");

//@route    /api/profile/me
//@desc     Get User Profile
//@access   private
router.get("/me", authMiddleware, profileController.GetProfile);

//@route    /api/profile
//@desc     Edit User Profile
//@access   private
router.post(
  "/",
  authMiddleware,
  [
    check("status", "Status is required").not().isEmpty(),
    check("skills", "Enter atleast one skill").trim().not().isEmpty(),
  ],
  profileController.EditProfile
);

//@route    /api/profile/experience
//@desc     Add User Profile Experience
//@access   private
router.put(
  "/experience",
  authMiddleware,
  [
    check("title", "Title is required").trim().not().isEmpty(),
    check("company", "Company is required").trim().not().isEmpty(),
    check("from", "From Date is required").trim().not().isEmpty(),
  ],
  profileController.AddExperience
);

//@route    /api/profile/experience/:experienceId
//@desc     Edit User Profile Experience
//@access   private
router.post(
  "/experience/:experienceId",
  authMiddleware,
  [
    check("title", "Title is required").trim().not().isEmpty(),
    check("company", "Company is required").trim().not().isEmpty(),
    check("from", "From Date is required").trim().not().isEmpty(),
  ],
  profileController.EditExperience
);

//@route    /api/profile/education
//@desc     Edit User Profile Education
//@access   private
router.put(
  "/education",
  authMiddleware,
  [
    check("school", "School Name is required").trim().not().isEmpty(),
    check("degree", "Degree is required").trim().not().isEmpty(),
    check("fieldofstudy", "Field of study is required").trim().not().isEmpty(),
    check("from", "From Date is required").trim().not().isEmpty(),
  ],
  profileController.AddEducation
);

//@route    /api/profile/education/:eductaionid
//@desc     Edit User Profile Education
//@access   private
router.post(
  "/education/:educationId",
  authMiddleware,
  [
    check("school", "School Name is required").trim().not().isEmpty(),
    check("degree", "Degree is required").trim().not().isEmpty(),
    check("fieldofstudy", "Field of study is required").trim().not().isEmpty(),
    check("from", "From Date is required").trim().not().isEmpty(),
  ],
  profileController.EditEducation
);

//@route    /api/profile
//@desc     Get User Profile
//@access   Public
router.get("/", profileController.GetAllProfiles);

//@route    /api/profile/?id
//@desc     Get User Profile by userid
//@access   Public
router.get("/user/:userId", profileController.GetProfileByUserId);

//@route    /api/profile
//@desc     Delete user, profile, post
//@access   Private
router.delete("/", authMiddleware, profileController.DeleteProfile);

//@route    /api/profile/experience/:experienceid
//@desc     Delete user, profile, post
//@access   Private
router.delete("/experience/:experienceId", authMiddleware, profileController.DeleteExperience);

//@route    /api/profile
//@desc     Delete user, profile, post
//@access   Private
router.delete("/education/:educationId", authMiddleware, profileController.DeleteEducation);

//@route    /api/profile/github/:username
//@desc     Delete user, profile, post
//@access   Private
router.get("/github/:username", profileController.GetGithubRepo);

module.exports = router;
