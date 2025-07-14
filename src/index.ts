import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"]
})

const producer = kafka.producer();

const consumer = kafka.consumer({ groupId: "my-app3" });


async function main() {
    // await producer.connect()
    // await producer.send({
    //     topic: 'test-events',
    //     messages: [
    //         { value: 'Hello KafkaJS user!' },
    //     ],
    // })

      await consumer.connect();
      await consumer.subscribe({
        topic: "test-events", fromBeginning: true
      })

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log("======================================\n",{
            offset: message.offset,
            value: message?.value?.toString(),
          },
        "\n======================================\n")
        },
      })
}


main();