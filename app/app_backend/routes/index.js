var express = require("express");
var router = express.Router();
const axios = require("axios");

const testData = [
  {
    resource: "PhilipsHue.Bridge1.1.1",
    label: "조명9 Power",
    properties: {
      name: "power",
      type: "enum",
      enum: ["on", "off"],
      value: "on",
    },
  },
  {
    resource: "PhilipsHue.Bridge1.1.1",
    label: "조명9 Color",
    properties: {
      name: "color",
      type: "object",
      hue: {
        type: "integer",
        minimum: 0,
        maximum: 65535,
        value: 40000,
      },
      saturation: {
        type: "integer",
        minimum: 0,
        maximum: 254,
        value: 150,
      },
      brightness: {
        type: "integer",
        minimum: 0,
        maximum: 254,
        value: 50,
      },
    },
  },
  {
    resource: "PhilipsHue.Bridge1.1.1",
    label: "조명9 온도",
    properties: {
      name: "colorTemperature",
      type: "integer",
      minimum: 2000,
      maximum: 6500,
      value: 3000,
      unit: "k",
      step: 50,
    },
  },
  {
    resource: "PhilipsHue.Bridge1.2.1",
    label: "조명11 power",
    properties: {
      name: "power",
      type: "enum",
      enum: ["on", "off"],
      value: "off",
    },
  },
  {
    resource: "PhilipsHue.Bridge1.2.1",
    label: "조명11 Color",
    properties: {
      name: "color",
      type: "object",
      hue: {
        type: "integer",
        minimum: 0,
        maximum: 65535,
        value: 40000,
      },
      saturation: {
        type: "integer",
        minimum: 0,
        maximum: 254,
        value: 100,
      },
      brightness: {
        type: "integer",
        minimum: 0,
        maximum: 254,
        value: 200,
      },
    },
  },
  {
    resource: "PhilipsHue.Bridge1.2.1",
    label: "조명11 온도",
    properties: {
      name: "colorTemperature",
      type: "integer",
      minimum: 2000,
      maximum: 6500,
      value: 3000,
      unit: "k",
      step: 50,
    },
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send(testData);
});

const hueBaseUrl =
  "http://210.107.205.200:8080/api/wkcBD-lTULsGrCJ2hqZZqgeQsfathjs6zc3Rul1O/lights";

router.put("/hue/color/:id", function (req, res) {
  // console.log(req.body);
  console.log(req.params);
  const number = req.body.number;
  const data = req.body;
  delete data.number;
  console.log(data);
  console.log("color");
  axios.put(`${hueBaseUrl}/${number}/state`, data);
  res.sendStatus(200);
});

router.put("/hue/temperature/:id", function (req, res) {
  const number = req.body.number;
  const data = req.body;
  delete data.number;
  // console.log(data);
  console.log("temperature");
  // axios.put(`${hueBaseUrl}/${number}/state`, data);
  res.sendStatus(200);
});

router.put("/hue/power/:id", function (req, res) {
  console.log(req.params);
  // const number = req.body.number;
  const data = req.body;
  console.log(data);
  // delete data.number;
  // console.log(data);
  console.log("power");
  // axios.put(`${hueBaseUrl}/${req.params.id}/state`, data);
  res.sendStatus(200);
});

module.exports = router;
