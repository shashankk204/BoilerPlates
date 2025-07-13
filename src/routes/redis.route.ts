import { Router } from "express";
import { getEvents, getValue, pushValue, setValue, TriggerEvent } from "../controller/redis.controller";

const router=Router();


router.post("/setValue",setValue);
router.get("/getValue/:key",getValue);
router.post("/pushValue",pushValue);
router.post("/TriggerEvent",TriggerEvent);
router.get('/getEvents',getEvents)
// router.get("/getValue/:key",getValue);



export default router