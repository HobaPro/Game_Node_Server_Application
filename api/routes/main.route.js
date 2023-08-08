const router = require("express").Router();

const CMain = require("../controllers/main.controller");

const authRoute = require("./auth.route");
const progressRoute = require("./progress.route");

router.get("/test", (req, res) => {
    res.status(200).send("Yes I am Working_22");
})

router.get("/api/connect", (req, res) => {
    res.status(200).send({Success: true, StatusCode: 200, Data: null, Message: ""});
})
router.get("/api/getplayers", CMain.GetPlayers);

router.use(authRoute);
router.use(progressRoute);

module.exports = router;