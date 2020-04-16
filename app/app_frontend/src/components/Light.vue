<template>
  <v-container>
    <v-row justify="space-around">
      <v-col>
        <h2>{{ this.hueNumber }}번 전구</h2>
        <v-color-picker
          @input="setColor"
          class="ma-2"
          hide-mode-switch
          v-model="currentColorRGB"
        />
      </v-col>
      <v-col>
        <v-switch
          v-model="currentPower"
          :label="currentPower ? '켜짐' : '꺼짐'"
        ></v-switch>
        <v-slider
          v-model="currentTemperature"
          min="153"
          max="500"
          label="색 온도"
        ></v-slider>

        <h2>hue : {{ this.currentColorHSV.hue }}</h2>
        <h2>saturation : {{ this.currentColorHSV.saturation }}</h2>
        <h2>brightness : {{ this.currentColorHSV.brightness }}</h2>
        <h2>온도 : {{ this.currentTemperature }}</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { rgbToHsv, HSBToRGB } from "./rgbToHue";
import axios from "axios";

export default {
  props: ["bulbState", "number", "routePath"],
  created() {
    console.log(this.bulbState);
    console.log(this.routePath);

    this.updateBulbState();
    this.hueNumber = this.getHueNumber(this.bulbState[0]);
  },
  watch: {
    currentPower() {
      console.log(this.currentPower);
      // `/api/hue/power`

      axios.put(`/api/${this.routePath}/${this.hueNumber}`, {
        power: this.currentPower,
        hue: this.currentColorHSV.hue,
        saturation: this.currentColorHSV.saturation,
        brightness: this.currentColorHSV.brightness,
        colorTemperature: this.colorTemperature
      });
    },
    currentTemperature() {
      console.log(this.currentTemperature);
      // "/api/hue/temperature"
      axios.put(`/api/${this.routePath}/${this.hueNumber}`, {
        power: this.currentPower,
        hue: this.currentColorHSV.hue,
        saturation: this.currentColorHSV.saturation,
        brightness: this.currentColorHSV.brightness,
        colorTemperature: this.colorTemperature
      });
    }
  },
  methods: {
    updateBulbState() {
      this.color = this.bulbState.filter(
        element => element.properties.name === "color"
      )[0];
      this.power = this.bulbState.filter(
        element => element.properties.name === "power"
      )[0];
      this.temperature = this.bulbState.filter(
        element => element.properties.name === "colorTemperature"
      )[0];
      this.currentPower = this.power.properties.value === "on";
    },
    setInitialColor() {
      const result = HSBToRGB({
        h: this.color.properties.hue.value,
        s: this.color.properties.saturation.value,
        b: this.color.properties.brightness.value
      });
      console.log(result);
    },
    getHueNumber(element) {
      return Number(element.label.split(" ")[0].split("조명")[1]);
    },
    setColor() {
      // console.log(this.currentColorRGB);
      const red = parseInt(this.currentColorRGB.substr(1, 2), 16);
      const green = parseInt(this.currentColorRGB.substr(3, 2), 16);
      const blue = parseInt(this.currentColorRGB.substr(5, 2), 16);

      const result = rgbToHsv(red, green, blue);

      this.currentColorHSV = {
        hue: parseInt(result[0], 10),
        saturation: parseInt(result[1], 10),
        brightness: parseInt(result[2], 10)
      };

      // "/api/hue/color"
      axios.put(`/api/${this.routePath}/${this.hueNumber}`, {
        power: this.currentPower,
        hue: this.currentColorHSV.hue,
        saturation: this.currentColorHSV.saturation,
        brightness: this.currentColorHSV.brightness,
        colorTemperature: this.colorTemperature
      });
      console.log(this.currentColorHSV);
    }
  },
  data() {
    return {
      currentColorRGB: "",
      currentColorHSV: {},
      currentPower: false,
      currentTemperature: 153,
      color: null,
      power: null,
      temperature: null,
      hueNumber: 0
    };
  }
};
</script>
