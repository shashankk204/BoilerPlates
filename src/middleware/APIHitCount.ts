import { NextFunction, Request, Response } from "express"
import redis from "../redisClient/redisClient"
const TrafficCnt=async (req:Request,res:Response,next:NextFunction) => {
    try {
        
        await redis.incr("traffic");
        next();
    } catch (error) {
        console.log("Error At TrafficCnt Middleware",error);
        res.send({"error":"something Went Wrong"});
    }    
}

export default TrafficCnt;