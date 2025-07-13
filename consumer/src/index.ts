import { createClient } from "redis";


type XReadType = {
    name: string;
    messages: {
        id: string;
        message: {
            type: string,
            user: string
        };
    }[]
}[]

const redis = createClient();


redis.on("error", err => console.log("unable to connect to the redis", err));


// redis.connect().then(async () => {
//     let lastId = "$";
//     while (true) {

//         const res = await redis.xRead({
//             key: "Event",
//             id: lastId
//         }, {
//             BLOCK: 0
//         }
//         ) as XReadType
//         if (res) {
//             for (let message of res[0].messages) {
//                 console.log(message.id, "===>", message.message.type, "===>", message.message.user);
//             }
//         }
//         else {
//             console.log("no data found");
//         }
//     }
// })

// redis.connect().then(()=>{
//     console.log("connected to redis");
//     redis.SUBSCRIBE("Room1",(message,channel)=>{
//         console.log(message);
//     })
// })

// redis.connect().then(()=>{
//     console.log("connected to redis");
//     setInterval(() => {
//         redis.PUBLISH("Room2","")
//     }, 2000);
// })
