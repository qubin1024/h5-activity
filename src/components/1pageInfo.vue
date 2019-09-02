<template>
		<transition name="fade-in">
            <div  style="
    position: absolute;
    top: 0;
    left: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #feb71d;
">
                <div id="contentBox" >
                    <div class="middle">
                        <div class="panel"  v-if="!!formD.activityDestription">
                            <span class="panel-head">{{formD.page1Title}}</span>
                            <div>
                                <div v-for="item in JSON.parse(formD.activityDestription)" :key="item.key" style="line-height: 0.4rem;">
                                    <img v-if="item.type == 'uploadImg'" :src="item.img"  style=" width: 100%;display: block;"/>
                                    <pre v-if="item.type == 'uploadText'" style="white-space: pre-line;font-size: 0.4rem;font-weight: bold;padding: 0.2rem 0.4rem;word-wrap: break-word;line-height: 0.6rem;display: inline-block;">{{item.img}}</pre>
                                    <video  v-if="item.type == 'uploadVedio'" :src="item.img" ontrols="controls" preload="meta" width="100%" height="240" x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" x5-video-player-fullscreen="true" x5-video-player-type="h5" controls></video>
                                </div>
                            </div>
                        </div>
                    </div>
                    <loading :show="loading"></loading>
                </div>
            </div>
		</transition>
</template>
<script>
import {
  Selector,
  XDialog,
  Alert,
  Group,
  Cell,
  Loading,
  Datetime,
  XInput,
  XNumber,
  XSwitch,
  XTextarea
} from "vux";
import Clipboard from "clipboard";
import Data from "./data.js";
import Scroll from "./scroll.vue";
var baseUrl = require("../../config");
export default {
  name: "page1-info",
  components: {
    Selector,
    XDialog,
    Alert,
    Loading,
    Group,
    Cell,
    Loading,
    Datetime,
    XInput,
    XNumber,
    XSwitch,
    XTextarea,
    Scroll
  },
  data() {
    return {
      loading: false,
      users: [],
      user_id: "",
      params: {},
      orderList: [],
      packageList: [],
      order: [],
      formD: Data
    };
  },
  props: {
    form: {
      type: Object
    }
  },
  mounted() {
    this.query();
  },
  methods: {
    query() {
      if (!!this.form) {
        this.formD = this.form;
        return;
      }
      var params = this.$route.query,
        user_id;

      this.params = this.$route.query;
      if (!params.id) {
        return console.log("id is null");
      }

      const url = baseUrl.apiBaseUrl + "course/info/" + params.id;
      this.$http.get(url).then(({ data }) => {
        if (data.code == "0") {
          this.formD = JSON.parse(data.course.courseContent);
        }
      });
    }
  }
};
</script>

<style scoped>
.panel {
  background: #fff;
  padding: 0 1rem;
}
.panel-head {
  display: inline-block;
  font-family: "yahei";
  font-size: 0.4rem;
  height: 0.6rem;
  line-height: 0.6rem;
  color: #ef5a5a;
  border-bottom: 2px solid #ef5a5a;
}
.wrap-3 {
  display: flex;
  padding: 0.5rem;
  overflow: auto;
  justify-content: flex-start;
  border-top: 1px solid #ccc;
  background: #fff;
  flex-wrap: wrap;
}
.wrap-3 > div {
  display: flex;
  width: 1rem;
  height: 1.7rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0.2rem;
}
.wrap-3 img {
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
}
.phone-wrap {
  list-style: none;
  font-size: 0.6rem;
  text-align: left;
  color: #2b2a2a;
  font-family: yahei;
}
.phone-wrap li a {
  color: #2b2a2a;
}
.phone-wrap li {
  color: #2b2a2a;
  border-bottom: 1px solid #ccc;
  padding: 0.2rem 1rem;
}
.phone {
  height: 1rem;
  width: 2rem;
  position: fixed;
  bottom: 5rem;
  right: 0;
  border: 1px solid #ccc;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-right: 0;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 0.1rem;
}
.wrap-3 span {
  font-size: 0.2rem;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 1rem;
  text-align: center;
}
.wrap-2 {
  display: flex;
  justify-content: center;
  height: 2rem;
  padding: 0 1rem;
  background: #fff;
}
.wrap-2 .img {
  width: 2rem;
  height: 2rem;
}
.wrap-2 .text {
  width: 6rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-family: "yahei";
  font-size: 0.2rem;
  line-height: 0.5rem;
}

.head-cell {
  height: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: #ef5a5a;
}
.head-cell2 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: #ef5a5a;
}
.head-cell > div {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.4rem;
  font-family: "yahei";
  color: #fff;
}
.head-cell > div.line {
  width: 5px;
  height: 80%;
  background: #fff;
}
.active {
  background: #ccc;
}
.music-wrap {
  position: fixed;
  overflow: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #fff;
  padding-bottom: 1.5rem;
}
.play {
  font-size: 0.5rem;
  color: #4e9cfd;
}
.stop {
  font-size: 0.5rem;
  color: #4e9cfd;
}
.tips-wrap {
  width: 9rem;
  margin: 0.5rem;
  font-size: 0.2rem;
  height: 3rem;
  border: 1px dashed #ccc;
  border-radius: 10px;
  text-align: center;
  color: #bfbdbd;
  font-family: yahei;
}
#contentBox {
  background: #fff;
}
* {
  margin: 0;
  padding: 0;
}
.header-img {
  width: 100%;
  display: block;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.5rem;
  background: #fff;
  border-top: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.btn-h {
  width: 33%;
  height: 100%;
  line-height: 1.6rem;
  text-align: center;
  background: #ef5a5a;
  color: #fff;
  font-size: 0.3rem;
}
.btn-c {
  border-radius: 0;
  width: 33%;
  height: 100%;
  line-height: 1.6rem;
  text-align: center;
  background: #ef5a5a;
  color: #fff;
  font-size: 0.3rem;
}

.wrap {
  position: relative;
  padding: 1rem 0.4rem;
}
.type .weui-label {
  width: 40px !important;
}
.middle {
  padding-bottom: 1.6rem;
}
.bg-1 {
  background: #fff;
  width: 8.8rem;
  padding: 0.2rem;
  border-radius: 0.2rem;
}
.title {
  background: url(../assets/title.png) center no-repeat;
  border-radius: 1rem;
  background-size: cover;
  height: 1rem;
  width: 6rem;
  position: absolute;
  left: 50%;
  top: 0.1rem;
  margin-left: -3rem;
  font-size: 0.6rem;
  text-align: center;
  color: #fff;
  font-weight: bold;
  line-height: 1rem;
}
.content {
  min-height: 3rem;
  padding: 0.8rem 0 0 0;
  font-size: 0.4rem;
}
.circular {
  -webkit-box-align: center;
  -webkit-box-pack: center;
  align-items: center;
  background: #fff;
  border-radius: 50%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 1rem;
  right: 0.3rem;
  z-index: 100;
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 1s;
  -moz-transition-property: -moz-transform;
  -moz-transition-duration: 1s;
  -webkit-animation: rotate 3s linear infinite;
  -moz-animation: rotate 3s linear infinite;
  -o-animation: rotate 3s linear infinite;
  animation: rotate 3s linear infinite;
}
.circular2 {
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-align-items: center;
  align-items: center;
  background: #fff;
  border-radius: 50%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  position: fixed;
  top: 2.4rem;
  right: 0.3rem;
  z-index: 100;
  color: #fff;
  background: #ccc;
  font-size: 14px;
  line-height: 15px;
  width: 40px;
  height: 40px;
  border: 5px solid #fff;
}
@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-moz-keyframes rotate {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(359deg);
  }
}
@-o-keyframes rotate {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(359deg);
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
.tousu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #efefef;
  z-index: 9999;
}
.tousu ul {
  list-style: none;
  font-size: 0.5rem;
  font-family: "yahei";
  background: #fff;
  padding: 0 0.5rem;
}
.tousu ul li {
  list-style: none;
  padding: 0.2rem 0.2rem;
  border-bottom: 1px solid #ccc;
}
</style>
