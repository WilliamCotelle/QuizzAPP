const { Router } = require("express");
const mainController = require("./controllers/mainController");
const adminController = require("./controllers/adminController");


const router = Router();


router.get("/", mainController.renderHomePage);
router.get("/quiz/:id", mainController.renderQuizPage);
router.get("/tag", mainController.renderTagsPage);
router.get("/signup",adminController.signupPage);
router.post("/signup", adminController.signupPageAdd);
router.get("/login",adminController.loginPage);
router.post("/login", adminController.login);




module.exports = router;
