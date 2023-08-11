const router = require("express").Router();

const CProgress = require("../controllers/progress.controller");

router.put("/game/finish-rated", CProgress.FinishGameRatedMode);
router.put("/game/finish-unrated", CProgress.FinishGameUnRatedMode);

module.exports = router;