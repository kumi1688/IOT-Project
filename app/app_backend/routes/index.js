var express = require("express");
var router = express.Router();
const axios = require("axios");

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

router.get("/weather", async (req, res) => {
  const weatherUrl =
    "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=%EC%A2%85%EB%A1%9C%EA%B5%AC&dataTerm=month&pageNo=1&numOfRows=10&ServiceKey=fQQmInPFuI3k1pbQjX1BaCfOE6zFzNXa9hXAEs92vl6OI140GB%2BGkwowNuF0YyKuRNTRFy%2F5BWAZb7N0ZfDuUw%3D%3D&ver=1.3&_returnType=json";
  const result = await axios.get(weatherUrl);
  console.log(result);
  res.send(result.data);
});

module.exports = router;
