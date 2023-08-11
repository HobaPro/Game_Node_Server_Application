const router = require("express").Router();

const CMain = require("../controllers/main.controller");

const authRoute = require("./auth.route");
const progressRoute = require("./progress.route");

router.get("/test", (req, res) => {
    res.status(200).send("Yes I am Working_22");
})

router.get("/connect", (req, res) => {
    res.status(200).send({
        Success: true,
        Data: null,
        Message: "You are Connected with Our Server.",
    });
})
router.get("/getplayers", CMain.GetPlayers);

router.use(authRoute);
router.use(progressRoute);

module.exports = router;