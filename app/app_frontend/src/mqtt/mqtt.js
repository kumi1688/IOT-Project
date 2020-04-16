var mqtt = require("mqtt");

const mqttOptions = {
  host: "210.107.205.27",
  port: "1883",
  protocol: "mqtt"
};

const client = mqtt.connect(mqttOptions);

client.on("connect", function() {
  client.publish("kang", "hellooooo");
});

client.on("message", function(topic, message) {
  // message is Buffer
  console.log(message.toString());
});

export default client;
