const express = require("express")
const router = express.Router()

const ResultController = require("../controllers/result")
const auth = require("../middleware/auth")

router.get("/", auth, ResultController.getMe)
router.get("/tests/:testId", auth, ResultController.getByTestId)
router.get("/user/tests/:testId", auth, ResultController.getByTestIdForTestCreator)
router.post("/tests/:testId", auth, ResultController.create)

module.exports = router