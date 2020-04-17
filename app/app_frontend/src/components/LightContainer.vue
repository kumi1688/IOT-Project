<template>
  <v-container fluid>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="routePath"
              label="routePath"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-btn
              @click="setUrl"
              color='this.urlSetting ? "primary" : "false"'
              >{{ this.urlSetting ? "저장됨" : "저장필요" }}</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <!-- <div v-for="(bulb, index) in bulbs.state" :key="index">
      <light
        v-if="urlSetting"
        :bulbState="bulb"
        :number="index"
        :routePath="routePath"
      />
    </div> -->
  </v-container>
</template>

<script>
// import axios from "axios";
// import io from "socket.io-client";
// const socket = io("http://localhost:3000");

// import Light from "./Light";

export default {
  components: {
    // light: Light,
  },
  created() {
    // this.getBulbState();
    // this.connectWebSocket();
    // this.updateBulbState();
  },
  methods: {
    // async getBulbState() {
    //   const result = await axios.get("/api");
    //   // console.log(result.data);

    //   this.bulbs.count = result.data.length / 3;
    //   let hueNumber = result.data.map((element) => {
    //     return Number(element.label.split(" ")[0].split("조명")[1]);
    //   });
    //   this.hueNumberSet = new Set(hueNumber);
    //   this.hueNumberSet.forEach((num) => {
    //     this.bulbs.state = [
    //       ...this.bulbs.state,
    //       result.data.filter((element) => element.label.includes(`조명${num}`)),
    //     ];
    //   });
    //   console.log(this.bulbs.state);
    // },
    // connectWebSocket() {
    //   socket.on("connection", () => {
    //     console.log("웹소켓 연결됨");
    //   });
    // },
    // updateBulbState() {
    //   socket.on("bulbState", (data) => {
    //     console.log(data);
    //     // this.bulbState = data.on ? "켜짐" : "꺼짐";
    //   });
    // },
    setUrl() {
      this.urlSetting = true;
    },
  },
  watch: {
    routePath() {
      this.urlSetting = false;
    },
  },
  data() {
    return {
      urlSetting: false,
      routePath: "",
      bulbs: {
        count: 0,
        hueNumberSet: [],
        state: [],
      },
    };
  },
};
</script>
