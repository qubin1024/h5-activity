<template>
<div class="egg-wrap">
    <div class="circular2" @click="showntousu">投诉</div>
    <div class="circular2" style="top:3.8rem;text-align: center;" @click="support">技术支持</div>
    <div class="circular2" style="top:5.2rem;text-align: center;" @click="goapp">进入商家</div>
    <div class="header">
        <img :src="formD.headImage" class="header-img" />
    </div>
    <div id="wrap">
        <div class="rule" @click="ruleShow = !ruleShow" ></div>
        <!--砸蛋区域-->
        
        <div class="box">
            <p class="tips">今天剩余免费<span id="change"></span>次</p>
            <div id="hammer" class="shak"></div>
            <ul class="egg clearfix">
                <li>
                    <img src="../assets/eggImage/egg.png" class="goldegg init">
                    <img src="../assets/eggImage/base.png">
                    <div class="info"></div>
                </li>
                <li>
                    <img src="../assets/eggImage/egg.png" class="goldegg init">
                    <img src="../assets/eggImage/base.png">
                    <div class="info"></div>
                </li>
                <li>
                    <img src="../assets/eggImage/egg.png" class="goldegg init">
                    <img src="../assets/eggImage/base.png">
                    <div class="info"></div>
                </li>
                <li>
                    <img src="../assets/eggImage/egg.png" class="goldegg init">
                    <img src="../assets/eggImage/base.png">
                    <div class="info"></div>
                </li>
                <li>
                    <img src="../assets/eggImage/egg.png" class="goldegg init">
                    <img src="../assets/eggImage/base.png">
                    <div class="info"></div>
                </li>
                <li>
                    <img src="../assets/eggImage/egg.png" class="goldegg init">
                    <img src="../assets/eggImage/base.png">
                    <div class="info"></div>
                </li>
                <li>
                    <img src="../assets/eggImage/egg.png" class="goldegg init">
                    <img src="../assets/eggImage/base.png">
                    <div class="info"></div>
                </li>
                <li>
                    <img src="../assets/eggImage/egg.png" class="goldegg init">
                    <img src="../assets/eggImage/base.png">
                    <div class="info"></div>
                </li>
                <li>
                    <img src="../assets/eggImage/egg.png" class="goldegg init">
                    <img src="../assets/eggImage/base.png">
                    <div class="info"></div>
                </li>
            </ul>
            <!--奖品展示-->
            <div class="awards">
                <img src="../assets/eggImage/prize.png" class="prize">
                <div class="swiper-container">
                    <ul class="swiper-wrapper" v-if="formD.prizeRule">
                        <li v-for="item in JSON.parse(formD.prizeRule)" :key="item.index" class="swiper-slide">
                            <img :src="item.url">
                            <p>{{item.giftName}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--游戏规则弹窗-->
        <div id="mask-rule" v-if="ruleShow">
            <div class="box-rule">
                <span class="star"></span>
                <h2>活动规则说明</h2>
                <span id="close-rule" @click="ruleShow = !ruleShow"></span>
                <div class="con">
                    <div class="text">
                        <p>{{formD.activityRule}}</p>
                    </div>
                </div>
            </div>
        </div>
        <!--中奖提示-->
        <div id="mask">
            <div class="blin"></div>
            <div class="caidai"></div>
            <div class="winning">
                <div class="red-head"></div>
                <div class="red-body"></div>
                <div id="card">
                    <a  href="javascript:void(false)" target="_self" class="win"></a>
                </div>
                <span id="des"></span>
                <!-- <a href="" target="_self" class="btn"></a> -->
                <span id="close" @click="eggclose"></span>
            </div>
        </div>
    </div>
     <div class="middle">
          <content-wrap title="领奖信息">
                    <pre style="white-space: pre-line;font-size: 0.4rem;padding: 0.2rem 0.4rem;word-wrap: break-word;line-height: 0.6rem;display: inline-block;">{{formD.prizeInfo}}</pre>
                </content-wrap>
                <content-wrap title="活动规则">
                    <pre style="white-space: pre-line;font-size: 0.4rem;padding: 0.2rem 0.4rem;word-wrap: break-word;line-height: 0.6rem;display: inline-block;">{{formD.activityRule}}</pre>
                </content-wrap>
                <content-wrap title="机构介绍">
                    <div v-if="!!formD.companyDescription">
                        <div v-for="item in JSON.parse(formD.companyDescription)" :key="item.key" style="line-height: 0.4rem;">
                            <img v-if="item.type == 'uploadImg'" :src="item.img" style=" width: 100%;display: block;" />
                            <pre v-if="item.type == 'uploadText'" style="white-space: pre-line;font-size: 0.4rem;padding: 0.2rem 0.4rem;word-wrap: break-word;line-height: 0.6rem;display: inline-block;">{{item.img}}</pre>
                            <video v-if="item.type == 'uploadVedio'" :src="item.img" ontrols="controls" preload="meta" width="100%" height="240" x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" x5-video-player-fullscreen="true" x5-video-player-type="h5" controls></video>
                            <!-- <video v-if="item.type == 'uploadVedio'" width="100%" height="240" controls>
                                    <source :src="item.img" type="video/ogg">
                                    您的浏览器不支持Video标签。
                                </video> -->
                        </div>
                    </div>
                </content-wrap>
                <content-wrap title="主办方名片">

                    <div style="margin: 1rem auto;height: 3rem;width:3rem;position: relative;">
                        <img :src='formD.thumbnail' v-if='!!formD.thumbnail' style='width: 100%;height: 100%;' />
                    </div>
                    <div class="title-23">
                        <span style="color: #10aeff;background: #fff;padding: 0 10px;">咨询电话</span>
                    </div>
                    <span style="
                    text-align: center;
                    width: 100%;
                    display: inline-block;
                    color: red;
                    font-weight: bold;
                ">{{formD.phone}}</span>
                    <div class="title-23">
                        <span style="color: #10aeff;background: #fff;padding: 0 10px;">坐标位置</span>
                    </div>
                    <span style="display: block;font-size: 0.4rem;color: #843493;padding: 0 15px;" @click="initQQMap">{{formD.address}}</span>
                    <div id="showPosition" style="height: 5rem"></div>
                </content-wrap>
                <div style="width: calc(100% - 2px); min-height: 3rem;margin-bottom:1.5rem;position: relative;">
                    <img src="../assets/eggbg.jpg" width="100%"/>
                </div>
     </div>
    <div v-show="tousuDialog" class="tousu">
                <span style="font-size: 0.5rem;
        font-family: 'yahei';
        color: #9a9a9a;
        line-height: 0.5rem;">请选择投诉该网页的原因:</span>
                <ul>
                    <li @click="tousu">网页包含欺诈信息（如： 假红包）</li>
                    <li @click="tousu">网页包含色情信息</li>
                    <li @click="tousu">网页包含暴力恐怖信息</li>
                    <li @click="tousu">网页包含政治敏感信息</li>
                    <li @click="tousu">网页包含赌博信息</li>
                    <li @click="tousu">网页在手机个人隐私信息（如：钓鱼链接）</li>
                </ul>
            </div>
            <img v-show="supportDialog" src="../assets/support.jpg" style="height: 100%; width: 100%;" class="tousu" />
            <i v-show="supportDialog || appDialog" class="fa fa-times-circle" @click="close" style="position: fixed;right: 0.2rem;top: 0.2rem; font-size: 0.6rem;z-index: 99999;" aria-hidden="true"></i>
            <div v-show="appDialog" style="height: 100%; width: 100%;background: #fff;" class="tousu">
                <img src="../assets/app.png" style="width: 100%;" />
            </div>
    </div>
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
import $ from "jquery";
import Clipboard from "clipboard";
import CountDown from "./count-down.vue";
import ContentWrap from "./content-wrap.vue";
import Data from "./eData.js";
import Scroll from "./scroll.vue";
var baseUrl = require("../../config");
export default {
  name: "app-egg",
  data: function() {
    return {
      userName: "",
      prize: null,
      address: "",
      shown: false,
      shown2: false,
      ruleShow: false,
      pshown: false,
      alertShow: false,
      alertContent: "",
      loading: false,
      tousuDialog: false,
      supportDialog: false,
      appDialog: false,
      home: true,
      ispreview: false,
      users: [],
      user_id: "",
      b_userId: "",
      shareId: "",
      params: {},
      orderList: [],
      packageList: [],
      order: [],
      orderId: null,
      formD: Data,
      isLoading: true,
      name: "",
      tel: "",
      type: "",
      options: [
        {
          key: 0,
          value: "新会（学）员"
        },
        {
          key: 1,
          value: "旧会（学）员"
        }
      ],
      list: [],
      musicUrl: ""
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
    eggInit() {
      var post = this.$http.post;
      var user_id = this.user_id;
      var activityid = this.params.id;
      var $hammer = $("#hammer"),
        $tips = $(".info"),
        $eggList = $(".egg li"), //金蛋父级
        $egg = $(".goldegg"), //金蛋
        $change = $("#change"), //剩余次数
        $des = $("#des"), //剩余次数
        length = $egg.length,
        data = { count: parseInt(this.formD.prizeLeft) || 0 }, //次数
        arr = [],
        openArr, //记录被砸开的蛋的下标数组
        rem = 75;
      $change.html(data.count);
      $egg.eq(length).addClass("jump");
      $tips.eq(length).show();
      setInterval(function() {
        //金蛋跳动
        length++;
        length %= 9;
        $egg.eq((length - 1 < 0 && 8) || length - 1).removeClass("jump");
        $tips.eq((length - 1 < 0 && 8) || length - 1).hide();
        reback();
        $egg.eq(length).addClass("jump");
        $tips.eq(length).show();
      }, 1000);

      function reback() {
        if (!$egg.eq(length).hasClass("init")) {
          //若已砸开
          length++;
          length %= 9;
          reback();
        }
      }

      /*砸蛋事件*/
      for (var i = 0; i < length; i++) {
        $egg.eq(i).data("mark", true); //判断金蛋是否砸开，true表示可砸
        $eggList.eq(i).data("i", i);
        $eggList.eq(i).click(function() {
          //设定剩余抽奖次数，判断用户是否还能点击
          if (data.count > 0) {
            if ($egg.eq($(this).data("i")).data("mark")) {
              ajax($(this));
            } else {
              alert("这枚金蛋已经被您砸开了");
            }
          } else {
            alert("您当前砸蛋次数为0，无法砸蛋");
          }
        });
      }

      function ajax($el) {
        post(baseUrl.apiBaseUrl + "lottery/lottery", {
          user_id: user_id,
          activityId: activityid
        }).then(({ data: res }) => {
          if (res.code == "0000") {
            let _data = res.result.data;
            $des.html(`${_data.giftName},  ${_data.giftDescription}`);
            if (!!_data.url) {
              $(".win").attr("background-image", `url(${_data.url})`);
            }
            eggChange($el.data("i"), res.result.data);
          } else {
            alert(res.msg);
          }
        });
      }
      /*砸蛋事件的处理*/
      function eggChange(i, _data) {
        //砸蛋次数的变化
        data.count--;
        $change.html(data.count);
        $hammer.removeClass("shak"); //清除锤子晃动动画
        //锤子砸蛋的位置
        (i === 0 || i === 3 || i === 6) &&
          $hammer.css("left", 165 / rem + "rem");
        (i === 1 || i === 4 || i === 7) &&
          $hammer.css("left", 415 / rem + "rem");
        (i === 2 || i === 5 || i === 8) &&
          $hammer.css("left", 665 / rem + "rem");
        (i === 0 || i === 1 || i === 2) && $hammer.css("top", 60 / rem + "rem");
        ((i === 3) | (i === 4) || i === 5) &&
          $hammer.css("top", 280 / rem + "rem");
        ((i === 6) | (i === 7) || i === 8) &&
          $hammer.css("top", 500 / rem + "rem");
        //锤子返回
        setTimeout(function() {
          $hammer.css({
            left: 665 / rem + "rem",
            top: 60 / rem + "rem"
          });
        }, 1500);

        //金蛋破裂及锤子动画
        setTimeout(function() {
          $hammer.addClass("hit");
          setTimeout(function() {
            $egg
              .eq(i)
              .prop(
                "src",
                "data:image/png;base64,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"
              );
          }, 300);
          setTimeout(function() {
            $egg.eq(i).removeClass("init");
            win();
            $hammer.removeClass("hit"); //清除锤子砸蛋动画
            $hammer.addClass("shak");

            //记录被砸开的蛋
            arr.push(i); //存入每个砸开蛋的下标
            // $.cookie("eggIndex", arr, {expires: 1});//存入cookie
          }, 600);
        }, 600);
        $egg.eq(i).data("mark", false); //更改金蛋状态为已砸开
      }

      function win() {
        $("#mask").show();
        $("#mask .winning").addClass("reback");
        setTimeout(() => {
          $("#mask #card").addClass("pull");
        }, 500);
      }
    },
    initQQMap() {
      wx.ready(() => {
        wx.openLocation({
          latitude: this.formD.latitude, // 纬度，浮点数，范围为90 ~ -90
          longitude: this.formD.longitude, // 经度，浮点数，范围为180 ~ -180。
          name: "活动地点", // 位置名
          address: this.address, // 地址详情说明
          scale: 10, // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: `http://apis.map.qq.com/uri/v1/marker?marker=coord:${
            this.formD.latitude
          },${this.formD.longitude};title:活动地点;addr:${this.address}` // 在查看位置界面底部显示的超链接,可点击跳转
        });
      });
    },
    mapInit() {
      var self = this;
      if (self.formD.latitude != "" && self.formD.longitude != "") {
        var map = new qq.maps.Map(document.getElementById("showPosition"), {
          center: new qq.maps.LatLng(39.916527, 116.397128),
          zoom: 13,
          panControl: false,
          zoomControl: false,
          scaleControl: false
        });

        var marker = new qq.maps.Marker({
          position: new qq.maps.LatLng(
            self.formD.latitude,
            self.formD.longitude
          ),
          map: map
        });
        var geocoder = new qq.maps.Geocoder({
          complete: function(result) {
            map.setCenter(result.detail.location);
            self.address = result.detail.address;
          }
        });
        geocoder.getAddress(
          new qq.maps.LatLng(self.formD.latitude, self.formD.longitude)
        );
      }
    },
    close() {
      this.supportDialog = false;
      this.appDialog = false;
    },
    support() {
      this.supportDialog = true;
    },
    goapp() {
      this.appDialog = true;
    },
    phone() {
      this.pshown = true;
    },
    showntousu() {
      this.tousuDialog = true;
    },
    tousu() {
      this.$vux.toast.text("投诉成功！", "top");
      this.tousuDialog = false;
    },
    query() {
      if (!!this.form) {
        this.formD = this.form;
        this.ispreview = true;
        this.mapInit();
        return;
      }
      var params = this.$route.query;
      this.params = params;

      if (!params.id) {
        return console.log("id is null");
      }
      this.user_id = params.userId;
      this.shareId = this.params.shareId;
      if (!!this.user_id) {
        this.$http
          .get(baseUrl.apiBaseUrl + "sys/user/info/" + params.userId)
          .then(({ data: res }) => {
            if (res.code != "0000") {
              console.log("获取用户信息失败");
            } else {
              this.userName = res.user.username || res.user.nickname;

              this.loading = true;
              this.$http
                .post(baseUrl.apiBaseUrl + "lottery/info", {
                  activityId: params.id,
                  user_id: params.userId
                })
                .then(({ data }) => {
                  if (data.code == "0") {
                    this.formD = data.lottery;
                    this.mapInit();
                    var fore = data.lottery;
                    document.title = fore.activityName;
                    var thumbnail = data.lottery.thumbnail;
                    this.$nextTick(() => {
                      this.eggInit();
                    });
                  }
                });
            }
          });
      }
    },
    eggclose() {
      $("#mask").hide();
      $("#mask .winning").removeClass("reback");
      $("#mask #card").removeClass("pull");
    }
  },
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
    Scroll,
    ContentWrap,
    CountDown
  }
};
</script>

<style scoped>
@import "../assets/scss/egg.css";
.t-o {
  display: flex;
  font-size: 0.4rem;
  font-weight: bold;
  justify-content: space-between;
  margin: 0.3rem 0px;
}

.t-o span {
  color: red;
}

.panel {
  background: #fff;
  padding: 0 1rem;
}

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

.time-wrap {
  background: #fff;
  margin: 0.5rem;
  font-size: 0.4rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  border-radius: 0.5rem;
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

dd.barline {
  width: 100%;
  background: #fce877;
  height: 0.25rem;
  display: inline-block;
  border-radius: 0.15rem;
  position: relative;
}

.barline img {
  width: 0.5rem;
  margin-top: -0.11rem;
  margin-right: -0.1rem;
}

.barline .price {
  position: absolute;
  right: -0.5rem;
  background: #ff5041;
  padding: 0.1rem 0.15rem;
  border-radius: 0.1rem;
  top: -0.65rem;
}

.barline .price i {
  top: 0.35rem;
  right: 0.45rem;
  width: 0;
  height: 0;
  border-left: 0.2rem solid transparent;
  border-right: 0.2rem solid transparent;
  border-top: 0.2rem solid #ff5041;
  position: absolute;
}

dd.barline div.charts {
  height: 0.25rem;
  position: relative;
  color: #fff;
  line-height: 0.25rem;
  text-indent: 0.05rem;
  background: #eb0000;
  border-radius: 0.15rem;
  text-align: right;
  font-size: 0.24rem;
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

#contentBox-2 {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  background: #edea8f;
  background-size: 50%;
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

.animate {
  animation: myfirst 0.5s ease-in-out infinite alternate running;
}

@keyframes myfirst {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.1);
  }
}

.wrap-tuan {
  position: relative;
  margin: 0.2rem auto;
  height: 2rem;
  border-radius: 5px;
  background: #ff5800;
  padding: 0.1px;
}

.people-wrap {
  width: 3rem;
  margin: 0.1rem;
  height: 1.8rem;
  background: #fff;
  line-height: 1.8rem;
  text-align: center;
  float: left;
}

.prize-wrap {
  width: 4rem;
  margin: 0.1rem;
  height: 1.8rem;
  line-height: 1.8rem;
  text-align: center;
  float: left;
}

.rules {
  display: flex;
  justify-content: space-around;
  padding-top: 0.4rem;
}

.rules > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.2rem;
  background: #fff;
  border-radius: 10px;
}

.rules > div > span {
  font-size: 0.2rem;
  text-align: center;
}
</style>
