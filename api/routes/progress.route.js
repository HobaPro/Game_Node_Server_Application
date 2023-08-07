const router = require("express").Router();

const CProgress = require("../controllers/progress.controller");

router.put("/api/iwonrated", CProgress.IWonRated);
router.put("/api/iwonunrated", CProgress.IWonUnrated);

router.put("/api/ilostrated", CProgress.ILostRated);
router.put("/api/ilostunrated", CProgress.ILostUnrated);

module.exports = router;