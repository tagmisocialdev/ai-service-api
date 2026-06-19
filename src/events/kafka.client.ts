import { Kafka, Producer, Consumer } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'ai-service-client',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({ groupId:  });

export async function connectProducer() {
  await producer.connect();
}

export async function connectConsumer() {
  await consumer.connect();
}

export async function publish(topic: string, key: string | null, value: any) {
  await producer.send({ topic, messages: [{ key, value: JSON.stringify(value) }] });
}

export async function subscribe(topic: string, handler: (msg: any) => Promise<void>) {
  await consumer.subscribe({ topic, fromBeginning: false });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const payload = message.value?.toString();
        await handler(JSON.parse(payload || '{}'));
      } catch (e) {
        console.error('Message handling error', e);
      }
    },
  });
}
