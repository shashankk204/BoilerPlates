import { Request, Response } from "express";
import redis from "../redisClient/redisClient"


export const setValue = async (req: Request, res: Response) => {
    try {
        const result=await redis.set(req.body.key, req.body.value, 
            {condition:"NX"}
        );
        console.log("status:" ,result);
        res.send({ message: "Value saved successfully" });
    } catch (error: any) {
        console.log("err at setValue", error);
        res.send({ error: error.message as string });

    }
}

export const getValue = async (req: Request, res: Response) => {
    try {
        const value = await redis.get(req.params.key);
        res.send({ value: value });
    } catch (error) {
        console.log("err at getValue", error);
        res.send({ error: error });

    }

}

export const pushValue=async (req:Request,res:Response)=>{
    try {
        await redis.lPush(req.body.key,req.body.value);
        res.send({success:true});
    } catch (error) {
        console.log("error at pushValue:",error);
        res.send({"error":"something Went Wrong"})
    }

}


export const TriggerEvent=async (req:Request,res:Response)=>{
    try {
        await redis.xAdd("Event","*",{
            type:req.body.type,
            user:req.body.user
        })
        res.send({success:true});
    } catch (error) {
        console.log("error at TriggerEvent:",error);
        res.send({"error":"something Went Wrong"})
    }

}



export const getEvents=async (req:Request,res:Response)=>{
    try {
        const result=await redis.xRange("Event","-","+");
        res.send({success:true,data:result});
    } catch (error) {
        console.log("error at getEvents:",error);
        res.send({"error":"something Went Wrong"})
    }

}