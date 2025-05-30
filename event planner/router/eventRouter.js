import express, { Router } from "express";
import Controller from "../controllers/eventcontroller.js"
import validateMiddleware from "../middleware/validate_middleware.js";
import schemas from "../validator/event_validator.js";

const { createEventSchema, findEventByNameSchema, findEventByDateSchema } = schemas
const router= express.Router();

router.route("/CreateEvent").post( validateMiddleware(createEventSchema), Controller.createEvent);
router.route("/findEventbyName").get( validateMiddleware(findEventByNameSchema), Controller.findEventbyName);
router.route("/findEventbyDate").get( validateMiddleware(findEventByDateSchema), Controller.findEventbyDate);

export default router; 