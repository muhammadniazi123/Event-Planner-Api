import express from "express"
import Controller from "../controllers/usercontroller.js"
import validateMiddleware from "../middleware/validate_middleware.js";
import schemas from "../validator/auth_validator.js";
const router = express.Router()
const { signupSchema, loginSchema } = schemas;


router.route("/register").post( validateMiddleware(signupSchema), Controller.register)
router.route("/login").post( validateMiddleware(loginSchema), Controller.login)


export default router