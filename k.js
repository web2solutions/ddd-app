const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka1:9092'],
});

;(async () => {
  const producer = kafka.producer({ 
    createPartitioner: Partitioners.LegacyPartitioner
  });

  await producer.connect()
  
  const data = await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  });

  console.log(data);

  await producer.disconnect()
})()