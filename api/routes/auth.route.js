const router = require("express").Router();
const CAuth = require("../controllers/auth.controller");

router.post("/register", CAuth.Register);
router.get("/getuser/:Username", CAuth.GetUser);
router.post("/generate-access-token", CAuth.GenerateAccessToken);
router.get("/getmydata", CAuth.CheckUserAuthorization, CAuth.GetMyData);
router.delete("/deleteme", CAuth.CheckUserAuthorization, CAuth.DeleteMe);

module.exports = router;