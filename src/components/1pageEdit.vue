<template>
	<div>
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
                    <div class="contentBox"  v-show="!ispreview">
                    <div class="middle">
                        <div class="wrap">
                            <div class="bg-1">
                                <div class="bg-2">
                                    <div class="title54167">{{formD.page1Title}}</div>
                                </div>
                                <div class="content">
                                   <add-img ref="activityDestription" ></add-img>
                                </div>                              
                            </div>
                        </div>
                    </div>
                </div>            
                <page1Info v-if='ispreview' ref="info"  :form="formD"></page1Info>
                <div class="footer">
                        <div class="btn-hc" v-if="!ispreview"  @click="preview">
                            预览页面
                        </div>
                        <div class="btn-hc" v-if="ispreview" @click="editpage">
                            编辑页面
                        </div>
                        <div class="btn-hc" @click="save">
                            保存数据
                        </div>
                    </div>
            </div>
		</transition>
    </div>
</template>

<script>
import {
  Group,
  Cell,
  CellBox,
  Loading,
  Datetime,
  XInput,
  XNumber,
  XSwitch,
  XTextarea,
  Range
} from "vux";
import AddImg from "./addImg.vue";
import ImgUpload from "./imgUpload.vue";
import page1Info from "./1pageInfo.vue";
import Data from "./data.js";
export default {
  name: "page1-edit",
  components: {
    Group,
    Cell,
    CellBox,
    Loading,
    Datetime,
    XInput,
    XNumber,
    XSwitch,
    XTextarea,
    ImgUpload,
    page1Info,
    Range,
    AddImg
  },
  data() {
    return {
      formD: Data,
      params: {
        id: ""
      },
      ispreview: false
    };
  },
  computed: {},
  mounted() {
    let params = this.$route.query;
    this.params = this.$route.query;
    if (!!params.name) {
      this.formD.page1Title = decodeURIComponent(params.name);
    }
    if (!this.$route.query.id) {
      return;
    }
    const url = "https://wx.sharkmeida.cn/course/info/" + params.id;
    this.$http.get(url).then(({ data }) => {
      if (data.code == "0") {
        this.formD = JSON.parse(data.course.courseContent);
        if (data.course.courseContent != null) {
          let activityDestription = JSON.parse(this.formD.activityDestription);
          let sc = [];
          activityDestription.forEach(e => {
            var s =
              "<img src='" + e.img + "' style='width: 100%; height: 100%;'/>";
            sc.push({
              type: e.type,
              image: e.img,
              html: s
            });
          });
          this.$refs["activityDestription"].activeList = sc;
        }
      }
    });
  },
  methods: {
    editpage() {
      this.ispreview = !this.ispreview;
    },
    preview() {
      let activityDestription = [];
      this.$refs["activityDestription"].activeList.forEach(item => {
        activityDestription.push({
          type: item.type,
          img: item.image
        });
      });
      this.formD.activityDestription = JSON.stringify(activityDestription);
      this.ispreview = !this.ispreview;
    },
    save() {
      let activityDestription = [];
      this.$refs["activityDestription"].activeList.forEach(item => {
        activityDestription.push({
          type: item.type,
          img: item.image
        });
      });
      this.formD.activityDestription = JSON.stringify(activityDestription);
      var a = JSON.stringify(this.formD);
      this.$vux.loading.show({
        text: "Loading"
      });
      this.$http
        .post("https://wx.sharkmeida.cn/course/save", {
          courseContent: a,
          courseType: 0,
          id: this.params.id
        })
        .then(({ data }) => {
          this.$vux.loading.hide();
          if (data.code == "0") {
            this.$vux.alert.show({
              title: "提示",
              content: "保存成功！",
              onShow() {},
              onHide() {}
            });
          } else {
            this.$vux.alert.show({
              title: "提示",
              content: "保存失败！",
              onShow() {},
              onHide() {}
            });
          }
        });
    }
  }
};
</script>

<style >
.head-cell {
  height: 1.5rem;
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
.contentBox {
  width: 100%;
  background: #feb71d;
}
* {
  margin: 0;
  padding: 0;
}
.header-img {
  width: 100%;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 10rem;
  height: 1.5rem;
  background: #fff;
  border-top: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  z-index: 1111;
}
.btn-hc {
  width: 4rem;
  height: 1rem;
  border-radius: 0.5rem;
  line-height: 1rem;
  text-align: center;
  background: #699acc;
  color: #fff;
  font-size: 0.5rem;
}

.wrap {
  position: relative;
  padding: 1rem 0.4rem;
}
.middle {
  padding-bottom: 1.6rem;
}
.bg-1 {
  background: #fff;
  padding: 0.2rem;
  border-radius: 0.2rem;
}
.bg-2 {
  background: #fff;
  width: 80%;
  padding: 0.2rem 0;
  border-radius: 1rem;
  position: absolute;
  top: 0.7rem;
  height: 0.2rem;
  left: 10%;
}
.title54167 {
  background: url(../assets/title.png) center no-repeat;
  background-size: cover;
  height: 1rem;
  width: 80%;
  position: absolute;
  left: 10%;
  top: 0.1rem;
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
</style>
