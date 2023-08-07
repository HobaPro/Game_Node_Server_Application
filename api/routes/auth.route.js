const router = require("express").Router();
const CAuth = require("../controllers/auth.controller");

router.post("/api/register", CAuth.Register);
router.post("/api/getuser", CAuth.GetUser);
router.post("/api/login", CAuth.LogIn);

module.exports = router;