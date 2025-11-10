import { Router } from "express";
import { createTransfer, validateAcount } from "../controllers/transferController.js";
import { sendSingleSms, sendSMS } from "../controllers/smsController.js";

const router = Router()

router.post('/validate', validateAcount)
router.post('/transfer', createTransfer)
router.post('/sendSMS', sendSMS)
router.get('/singleSMS', sendSingleSms)

export default router