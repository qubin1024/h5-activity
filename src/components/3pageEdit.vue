<template>
<transition name="fade-in">
    <div>
        <div class="bg-main" ref='bg-main' v-show="!ispreview">
            <div style="width: calc(100% - 2px); min-height: 3rem;">
                <span v-html="headImage" v-if='!!headImage'></span>
                <i  v-if='!!headImage' class="fa fa-times-circle" @click="deleteThis()" style="position: absolute;left: 0.2rem;top: 0.2rem; font-size: 1rem;z-index: 100;" aria-hidden="true"></i>
                <img-upload v-if='!headImage' ref="headImage" placeholder="上传头部图片" @uploadCallback="getHeadUrl($event)"></img-upload>
            </div>
            <content-wrap title="活动信息">
                <x-textarea title="活动标题:" v-model="formD.activityName" style="border: 1px dashed #ccc;" :rows="5" :show-clear="showClear"></x-textarea>
                <datetime style="font-size: 0.4rem;" title="活动开始时间:" format='YYYY-MM-DD HH:mm' v-model="formD.startTime"></datetime>
                <datetime style="font-size: 0.4rem;" title="活动结束时间:" format='YYYY-MM-DD HH:mm' v-model="formD.endTime"></datetime>
                <span style="font-size: 0.4rem;text-align: right;display: block;">（活动周期建议7-10天）</span>
            </content-wrap>
            <content-wrap title="奖品信息">
                <x-input title="本期奖品(份数):" v-model="formD.prizeNum" style="font-size: 0.4rem;" type="number" :show-clear="showClear"></x-input>
                <x-input title="原价（元）:" v-model.number="formD.originalPrice" style="font-size: 0.4rem;"  :show-clear="showClear"></x-input>
                <x-input title="底价（元）:" v-model.number="formD.floorPrice" style="font-size: 0.4rem;"  :show-clear="showClear"></x-input>
                <x-input title="砍价次数:" v-model.number="formD.barginNum" style="font-size: 0.4rem;"  :show-clear="showClear"></x-input>
                <span style="display: block;font-size: 0.4rem;font-weight：bold;color: #000;padding: 0 15px;">每次减价范围：</span>
                <x-input title="最少（元）:" v-model.number="formD.minReduction" style="font-size: 0.4rem;"  :show-clear="showClear"></x-input>
                <x-input title="最多（元）:" v-model.number="formD.maxReduction" style="font-size: 0.4rem;"  :show-clear="showClear"></x-input>
                <span style="display: block;font-size: 0.3rem;color: #ccc;padding: 0 15px;">参考公式： （原价-底价）/ 大致帮忙减人数=帮减范围平均数，帮减范围平均数-10=最小值，帮减范围平均数+10=最大值。建议设置20-40人帮减即可减至底价</span>
                <x-input title="活动礼品:" v-model="formD.gift" style="font-size: 0.4rem;" :show-clear="showClear"></x-input>
                <x-input title="间隔时间:" v-model="formD.restrictTime" type="number" style="font-size: 0.4rem;" :show-clear="showClear"></x-input>
                <span style="display: block;font-size: 0.3rem;color: #ccc;padding: 0 15px;">报名者每隔<span style="color: red;">{{formD.restrictTime}}</span>小时可以在给自己砍价，间隔时间不能小于1</span>
                <add-img ref="prizeDescription"></add-img>
            </content-wrap>
            <content-wrap title="活动规则">
                <x-textarea title="规则信息:" v-model="formD.activityRule" style="border: 1px dashed #ccc;" :rows="5" :show-clear="showClear"></x-textarea>
            </content-wrap>
            <content-wrap title="领奖信息">
                <x-textarea title="信息描述:" v-model="formD.prizeInfo" style="border: 1px dashed #ccc;" :rows="5" :show-clear="showClear"></x-textarea>
            </content-wrap>
            <content-wrap title="机构介绍">
                <add-img ref="companyDescription"></add-img>
            </content-wrap>
            <content-wrap title="主办方名片">
                <span style="display: block;font-size: 0.3rem;color: #ccc;padding: 0 15px;">完善的主办方信息可以让用户更全方位的了解主办方，可以很好的提高活动效果</span>
                <div style="margin: 1rem auto;height: 3rem;width:3rem;position: relative;">
                    <span v-html="image" v-if='!!image'></span>
                    <i  v-if='!!image' class="fa fa-times-circle" @click="deleteImg()" style="position: absolute;left: -0.8rem;top: -0.8rem; font-size: 1rem;z-index: 100;" aria-hidden="true"></i>
                    <img-upload v-if='!image' ref="thumbnail" placeholder="上传缩略图" @uploadCallback="getUrl($event)"></img-upload>
                </div>
                <div class="title-23">
                    <span style="color: #10aeff;background: #fff;padding: 0 10px;">咨询电话</span>
                </div>
                <x-input title="电话:" v-model="formD.phone" type="number" style="font-size: 0.4rem;" :show-clear="showClear"></x-input>
                <div class="title-23">
                    <span style="color: #10aeff;background: #fff;padding: 0 10px;">选择位置</span>
                </div>
                <x-textarea title="地理位置:" v-model="formD.address" style="border: 1px dashed #ccc;" :rows="3" :show-clear="showClear"></x-textarea>
                <span style="display: block;font-size: 0.3rem;color: #843493;padding: 0 15px;">{{address}}</span>
                <div id="container" style="height: 5rem"></div>
            </content-wrap>
            <content-wrap title="店内优惠">
                <span style="display: block;font-size: 0.3rem;color: #ccc;padding: 0 15px;"><i class="fa fa-tag" aria-hidden="true"></i> 在此填写您的店内优惠或活动优惠内容</span>
                <span style="display: block;font-size: 0.3rem;color: #ccc;padding: 0 15px;"><i class="fa fa-tag" aria-hidden="true"></i> 第一条不填写则不显示</span>
                <add-img type="text" ref='discount'></add-img>
            </content-wrap>
            <div style="width: calc(100% - 2px); min-height: 3rem;margin-bottom:1.5rem;position: relative;">
                <span v-html="bgImage" v-if='!!bgImage'></span>
                <i  v-if='!!bgImage' class="fa fa-times-circle" @click="deletebg()" style="position: absolute;left: 0.2rem;top: 0.2rem; font-size: 1rem;z-index: 100;" aria-hidden="true"></i>
                <img-upload v-if='!bgImage' ref="bgImage" placeholder="上传背景图片" @uploadCallback="getBgUrl($event)"></img-upload>
            </div>
            <div style="width: calc(100% - 2px); min-height: 3rem;margin-bottom:1.5rem;position: relative;">
                <span v-html="footImage" v-if='!!footImage'></span>
                <i  v-if='!!footImage' class="fa fa-times-circle" @click="deletefoot()" style="position: absolute;left: 0.2rem;top: 0.2rem; font-size: 1rem;z-index: 100;" aria-hidden="true"></i>
                <img-upload v-if='!footImage' ref="footImage" placeholder="上传底部图片" @uploadCallback="getFootUrl($event)"></img-upload>
            </div>
        </div>
        <page3-Info :form="formD" v-if="ispreview"></page3-Info>
        <div class="footer">
            <div class="btn-hc" v-if="!ispreview" @click="preview">
                预览页面
            </div>
            <div class="btn-hc" v-if="ispreview" @click="editpage">
                编辑页面
            </div>
            <div class="btn-hc" style="color: #fff; background: rgb(132, 52, 147); " @click="save">
                保存数据
            </div>
        </div>
    </div>
</transition>
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
import ContentWrap from "./content-wrap.vue";
import AddImg from "./addImg.vue";
import ImgUpload from "./imgUpload.vue";
import page3Info from "./3pageInfo.vue";
import AddTuan from "./addtuan.vue";
import Data from "./page3Data.js";
var baseUrl = require("../../config");
export default {
  name: "page3-edit",
  components: {
    Group,
    AddTuan,
    Cell,
    CellBox,
    Loading,
    Datetime,
    XInput,
    XNumber,
    XSwitch,
    XTextarea,
    ImgUpload,
    page3Info,
    ContentWrap,
    Range,
    AddImg
  },
  data() {
    return {
      ispreview: false,
      showClear: false,
      headImage: null,
      footImage: null,
      projuctImage: null,
      bgImage: null,
      image: null,
      formD: Data,
      address: ""
    };
  },
  computed: {},
  mounted() {
    if (!this.$route.query.id) {
      this.mapInit();
      return;
    }
    let params = this.$route.query;

    this.params = params;

    const url = baseUrl.apiBaseUrl + "bargin/info/" + params.id;

    this.$http.get(url).then(({ data }) => {
      if (data.code == "0") {
        this.formD = data.bargin;
        if (data.bargin.prizeDescription != null) {
          var dat = JSON.parse(data.bargin.prizeDescription);
          var sc = [];
          //this.$refs['activityRules'].activeList = JSON.parse(this.formD.activityRules)
          dat.forEach(e => {
            var s =
              "<img src='" + e.img + "' style='width: 100%; height: 100%;'/>";
            sc.push({
              type: e.type,
              image: e.img,
              html: s
            });
          });

          this.$refs["prizeDescription"].activeList = sc;
        }
        if (data.bargin.thumbnail != null && data.bargin.thumbnail != "") {
          this.image =
            "<img src='" +
            data.bargin.thumbnail +
            "' style='width: 100%; height: 100%;'/>";
        }
        if (data.bargin.headImage != null && data.bargin.headImage != "") {
          this.headImage =
            "<img src='" +
            data.bargin.headImage +
            "' style='width: 100%; height: 100%;'/>";
        }
        if (data.bargin.footImage != null && data.bargin.footImage != "") {
          this.footImage =
            "<img src='" +
            data.bargin.footImage +
            "' style='width: 100%; height: 100%;'/>";
        }
        if (data.bargin.bgImage != null && data.bargin.bgImage != "") {
          this.bgImage =
            "<img src='" +
            data.bargin.bgImage +
            "' style='width: 100%; height: 100%;'/>";
        }

        // if (data.bargin.qrImg != null && data.bargin.qrImg != '') {
        //     this.projuctImage = "<img src='" + data.bargin.qrImg + "' style='width: 100%; height: 100%;'/>"
        // }
        if (data.bargin.companyDescription != null) {
          var dat = JSON.parse(data.bargin.companyDescription);
          var sc = [];
          //this.$refs['activityRules'].activeList = JSON.parse(this.formD.activityRules)
          dat.forEach(e => {
            var s =
              "<img src='" + e.img + "' style='width: 100%; height: 100%;'/>";
            sc.push({
              type: e.type,
              image: e.img,
              html: s
            });
          });

          this.$refs["companyDescription"].activeList = sc;
        }
        if (data.bargin.discount != null) {
          var dat = JSON.parse(data.bargin.discount);
          var sc = [];
          //this.$refs['activityRules'].activeList = JSON.parse(this.formD.activityRules)
          dat.forEach(e => {
            var s =
              "<img src='" + e.img + "' style='width: 100%; height: 100%;'/>";
            sc.push({
              type: e.type,
              image: e.img,
              html: s
            });
          });

          this.$refs["discount"].activeList = sc;
        }
        this.mapInit();
      }
    });
  },
  methods: {
    mapInit() {
      navigator.geolocation.getCurrentPosition(
        position => {
          var self = this;
          var map = new qq.maps.Map(document.getElementById("container"), {
            center: new qq.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            ),
            zoom: 13
          });
          var geocoder = new qq.maps.Geocoder({
            complete: function(result) {
              map.setCenter(result.detail.location);
              self.address = result.detail.address;
            }
          });
          if (self.formD.latitude != "" && self.formD.longitude != "") {
            var marker = new qq.maps.Marker({
              position: new qq.maps.LatLng(
                parseFloat(self.formD.latitude),
                parseFloat(self.formD.longitude)
              ),
              map: map
            });
            geocoder.getAddress(
              new qq.maps.LatLng(
                parseFloat(self.formD.latitude),
                parseFloat(self.formD.longitude)
              )
            );
          }

          qq.maps.event.addListener(map, "click", function(event) {
            console.log(event);
            var lat = parseFloat(event.latLng.lat);
            var lng = parseFloat(event.latLng.lng);
            self.formD.latitude = lat;
            self.formD.longitude = lng;
            var latLng = new qq.maps.LatLng(lat, lng);
            //调用获取位置方法
            geocoder.getAddress(latLng);
            var marker = new qq.maps.Marker({
              position: event.latLng,
              map: map
            });
            qq.maps.event.addListener(map, "click", function(event) {
              marker.setMap(null);
            });
          });
        },
        error => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("您拒绝对获取地理位置的请求");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("位置信息是不可用的");
              break;
            case error.TIMEOUT:
              alert("请求您的地理位置超时");
              break;
            case error.UNKNOWN_ERROR:
              alert("未知错误");
              break;
          }
        }
      );
    },
    deleteThis() {
      this.headImage = null;
      this.formD.headImage = null;
    },
    deleteqrImg() {
      this.projuctImage = null;
      this.formD.qrImg = null;
    },
    deleteImg() {
      this.image = null;
      this.formD.thumbnail = null;
    },
    deletefoot() {
      this.footImage = null;
      this.formD.footImage = null;
    },
    getFootUrl(url) {
      this.formD.footImage = url;
      this.footImage =
        "<img src='" + url + "' style='width: 100%;height: 100%;'/>";
    },
    deletebg() {
      this.bgImage = null;
      this.$refs["bg-main"].style.background = `#192029`;
      this.formD.bgImage = null;
    },
    getqrUrl(url) {
      this.formD.qrImg = url;
      this.projuctImage =
        "<img src='" + url + "' style='width: 100%;height: 100%;'/>";
    },
    getBgUrl(url) {
      this.formD.bgImage = url;
      this.$refs["bg-main"].style.background = `url(${url})`;
      this.bgImage =
        "<img src='" + url + "' style='width: 100%;height: 100%;'/>";
    },
    getHeadUrl(url) {
      this.formD.headImage = url;
      this.headImage =
        "<img src='" + url + "' style='width: 100%;height: 100%;'/>";
    },
    getUrl(url) {
      this.formD.thumbnail = url;
      this.image = "<img src='" + url + "' style='width: 100%;height: 100%;'/>";
    },
    preview() {
      var prizeDescription = [],
        companyDescription = [],
        discount = [];
      this.$refs["prizeDescription"].activeList.forEach(item => {
        prizeDescription.push({
          type: item.type,
          img: item.image
        });
      });
      this.$refs["companyDescription"].activeList.forEach(item => {
        companyDescription.push({
          type: item.type,
          img: item.image
        });
      });
      this.$refs["discount"].activeList.forEach(item => {
        discount.push({
          type: item.type,
          img: item.image
        });
      });

      this.formD.prizeDescription = JSON.stringify(prizeDescription);
      this.formD.companyDescription = JSON.stringify(companyDescription);
      this.formD.discount = JSON.stringify(discount);
      // this.formD.music = JSON.stringify({
      //     path: this.musicUrl
      // })
      this.formD.total_price = this.formD.originalPrice;
      this.ispreview = !this.ispreview;
    },
    editpage() {
      this.ispreview = !this.ispreview;
    },
    save() {
      var prizeDescription = [],
        companyDescription = [],
        discount = [];
      this.$refs["prizeDescription"].activeList.forEach(item => {
        prizeDescription.push({
          type: item.type,
          img: item.image
        });
      });
      this.$refs["companyDescription"].activeList.forEach(item => {
        companyDescription.push({
          type: item.type,
          img: item.image
        });
      });
      this.$refs["discount"].activeList.forEach(item => {
        discount.push({
          type: item.type,
          img: item.image
        });
      });

      this.formD.prizeDescription = JSON.stringify(prizeDescription);
      this.formD.companyDescription = JSON.stringify(companyDescription);
      this.formD.discount = JSON.stringify(discount);
      // this.formD.music = JSON.stringify({
      //     path: this.musicUrl
      // })
      this.formD.total_price = this.formD.originalPrice;
      var a = JSON.parse(JSON.stringify(this.formD));
      this.$vux.loading.show({
        text: "Loading"
      });
      this.$http
        .post(baseUrl.apiBaseUrl + "bargin/save/", a)
        .then(({ data }) => {
          this.$vux.loading.hide();
          if (data.code == "0") {
            this.formD.id = data.bargin.id;
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

<style>
.title-23 {
  border: 1px solid #ccc;
  text-align: center;
  height: 0;
  font-size: 0.4rem;
  line-height: 0rem;
  width: 60%;
  left: 20%;
  position: relative;
  margin: 0.5rem 0;
}

.bg-main {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  background: #edea8f;
  background-size: 50%;
}

table {
  width: 100%;
  text-align: center;
  line-height: 0.8rem;
}

table th {
  color: #f43530;
}

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
  background: rgb(247, 247, 247);
  color: rgb(69, 69, 69);
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

.title {
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
