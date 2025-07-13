import express from "express";
import RedisRouter from "./routes/redis.route"
import TrafficCnt from "./middleware/APIHitCount";


const app=express();
const PORT=5000;
app.use(express.json());
app.use(TrafficCnt);


app.use("/api/redis",RedisRouter)



app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});