<template>
<transition name="fade-in">
    <div>
        <div id="contentBox-2" ref="bg-main2">
            <div class="circular2" @click="showntousu">投诉</div>
            <div class="circular2" style="top:3.8rem;text-align: center;" @click="support">技术支持</div>
            <div class="circular2" style="top:5.2rem;text-align: center;" @click="goapp">进入商家</div>
            <div class="header">
                <img :src="formD.headImage" class="header-img" />
            </div>
                <div class="middle">
                    <count-down class="time-wrap" v-if='!!formD.startTime && formD.endTime' :startTime="formD.startTime" :endTime="formD.endTime"></count-down>
                    <content-wrap>
                        <dd class="barline" v-if="prize != null">
                          <div w="50" :style="{
                                            'width': parseFloat((formD.originalPrice-prize) / (formD.originalPrice - formD.floorPrice)) * 100 + '%'
                                        }" class="charts">
                            <img src="../assets/yuan.png">
                            <div class="price">¥{{prize}}<i></i></div>
                          </div>
                        </dd>
                        <div class="t-o">
                            <div>原价：<span>{{formD.originalPrice}}元</span></div>
                            <div>底价：<span>{{formD.floorPrice}}元</span></div>
                        </div>
                        <img v-if="!!this.shareId" src="../assets/btn-3.png" @click="addZan" class="animate" style="width: 80%;margin: 0.3rem 10%;"/>
                        <img v-if="!this.shareId" src="../assets/btn-6.png" @click="() => {this.shown = !this.shown}" class="animate" style="width: 80%;margin: 0.3rem 10%;"/>
                        <img v-if="!!shareId && b_userId != user_id" src="../assets/btn-6.png" @click="linkreload" class="animate" style="width: 80%;margin: 0.3rem 10%;"/>
                        <img v-if="!!this.shareId && b_userId == user_id" src="../assets/btn-4.png" @click="linkPay" class="animate" style="width: 80%;margin: 0.3rem 10%;"/>
                        <ul class='wrap-wx' v-if="barginLogList.length">
                            <li v-for="(item, index) in barginLogList" :key="index">
                                <img :src="item.headimgurl"/>
                                <div>
                                    <p>{{item.username | filterusername(item.username)}}</p>
                                    <p>{{item.create_time.split(' ')[0]}}</p>
                                </div>
                                <span>帮砍<span style="color: red;">{{parseInt(item.bargin_price)}}</span></span>
                            </li>
                        </ul>
                    </content-wrap>
                        <content-wrap title="奖品信息">
                            <div style="text-align: center;margin: 0.4rem;">本期奖品 <span style="color: red;"> {{formD.prizeNum}} 份</span>， 剩余<span style="color: red;"> {{formD.prizeLeft}} 份</span></div>
                            <div style="text-align: center;margin: 0.4rem;"><span style="color: red;"> {{formD.gift}} 商品</span>，原价<span style="color: red;"> {{formD.originalPrice}}元</span>活动亏本卖， 最低降到<span style="color: red;"> {{formD.floorPrice}}元</span>，数量有限，售完即止。</div>
                            
                            <div v-if="!!formD.prizeDescription  && JSON.parse(formD.prizeDescription).length">
                                <div v-for="item in JSON.parse(formD.prizeDescription)" :key="item.key" style="line-height: 0.4rem;">
                                    <img v-if="item.type == 'uploadImg'" :src="item.img"  style=" width: 100%;display: block;"/>
                                    <pre v-if="item.type == 'uploadText'" style="white-space: pre-line;font-size: 0.4rem;padding: 0.2rem 0.4rem;word-wrap: break-word;line-height: 0.6rem;display: inline-block;">{{item.img}}</pre>
                                    <video  v-if="item.type == 'uploadVedio'" :src="item.img" ontrols="controls" preload="meta" width="100%" height="240" x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" x5-video-player-fullscreen="true" x5-video-player-type="h5" controls></video>
                                    <!-- <video v-if="item.type == 'uploadVedio'" width="100%" height="240" controls>
                                    <source :src="item.img" type="video/ogg">
                                    您的浏览器不支持Video标签。
                                </video> -->
                                </div>
                            </div>
                        </content-wrap>
                        <content-wrap title="活动规则" v-if="!!formD.activityRule">
                            <pre style="white-space: pre-line;font-size: 0.4rem;padding: 0.2rem 0.4rem;word-wrap: break-word;line-height: 0.6rem;display: inline-block;">{{formD.activityRule}}</pre>
                        </content-wrap>
                        <content-wrap title="领奖信息" v-if="!!formD.prizeInfo">
                            <pre style="white-space: pre-line;font-size: 0.4rem;padding: 0.2rem 0.4rem;word-wrap: break-word;line-height: 0.6rem;display: inline-block;">{{formD.prizeInfo}}</pre>
                        </content-wrap>
                        <content-wrap title="机构介绍" v-if="!!formD.companyDescription  && JSON.parse(formD.companyDescription).length">
                            <div >
                                <div v-for="item in JSON.parse(formD.companyDescription)" :key="item.key" style="line-height: 0.4rem;">
                                    <img v-if="item.type == 'uploadImg'" :src="item.img"  style=" width: 100%;display: block;"/>
                                    <pre v-if="item.type == 'uploadText'" style="white-space: pre-line;font-size: 0.4rem;padding: 0.2rem 0.4rem;word-wrap: break-word;line-height: 0.6rem;display: inline-block;">{{item.img}}</pre>
                                    <video  v-if="item.type == 'uploadVedio'" :src="item.img" ontrols="controls" preload="meta" width="100%" height="240" x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" x5-video-player-fullscreen="true" x5-video-player-type="h5" controls></video>
                                    <!-- <video v-if="item.type == 'uploadVedio'" width="100%" height="240" controls>
                                    <source :src="item.img" type="video/ogg">
                                    您的浏览器不支持Video标签。
                                </video> -->
                                </div>
                            </div>
                        </content-wrap>
                        <content-wrap title="主办方名片" v-if="formD.address || formD.phone || formD.thumbnail">

                            <div style="margin: 1rem auto;height: 3rem;width:3rem;position: relative;">
                                <img :src='formD.thumbnail'  v-if='!!formD.thumbnail' style='width: 100%;height: 100%;'/>
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
                                <span style="display: block;font-size: 0.3rem;color: #ccc;padding: 0 15px;">（点击下方位置，直接导航）</span><br/>
                                <span style="display: block;font-size: 0.5rem;color: #843493;padding: 0 15px;" @click="initQQMap">{{formD.address}}</span>
                                <div id="showPosition" style="height: 5rem"></div>
                        </content-wrap>
                        <content-wrap title="店内优惠" v-if="!!formD.discount && JSON.parse(formD.discount).length">
                            <div v-if="!!formD.discount">
                                <div v-for="item in JSON.parse(formD.discount)" :key="item.key" style="line-height: 0.4rem;">
                                    <img v-if="item.type == 'uploadImg'" :src="item.img"  style=" width: 100%;display: block;"/>
                                    <pre v-if="item.type == 'uploadText'" style="white-space: pre-line;font-size: 0.8rem;padding: 0.2rem 0;overflow-wrap: break-word;line-height: 1.2rem;display: inline-block;font-weight: bold;color: #f76800;text-align: center;width: 100%;">{{item.img}}</pre>
                                    <video  v-if="item.type == 'uploadVedio'" :src="item.img" ontrols="controls" preload="meta" width="100%" height="240" x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" x5-video-player-fullscreen="true" x5-video-player-type="h5" controls></video>
                                    <!-- <video v-if="item.type == 'uploadVedio'" width="100%" height="240" controls>
                                    <source :src="item.img" type="video/ogg">
                                    您的浏览器不支持Video标签。
                                </video> -->
                                </div>
                            </div>
                        </content-wrap>
                        <content-wrap title="排行榜">
                          <table>
                              <thead>
                                  <th>排名</th>
                                  <th>姓名</th>
                                  <th>当前价格</th>
                              </thead>
                              <tbody>
                                  <tr v-for="(item, index) in list" :key="index">
                                      <td>
                                          <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{index+1}}</div>
                                      </td>
                                      <td>
                                          <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.username | filterusername(item.username)}}</div>
                                      </td>
                                      <td>
                                          <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.total_price == formD.floorPrice ? "已经降至底价": item.total_price}}</div>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </content-wrap>
                         <img v-if="!!formD.footImage" :src="formD.footImage" class="header-img" />

                        <div class="phone" @click="phone">
                            <img src="../assets/home-o.png" style="width: 0.8rem; height: 0.8rem;"> <a :href="'tel:' + formD.phone" style="font-size: 0.4rem; width: 1rem;
    color: #7eceef;
    font-weight: bold;margin: 0.1rem;
    line-height: 0.4rem;">联系商家</a>
                        </div>
                </div>
            </div>
            <loading :show="loading"></loading>
            <alert :value="alertShow" title="提示" :content="alertContent"></alert>
            <x-dialog :show="shown" :hide-on-blur="true" @on-show="showdialoge">
                    <i class="fa fa-times-circle" aria-hidden="true" @click="shown = !shown" style="font-size: 0.8rem;position: absolute;right: 0;z-index: 1002;"></i>
                    <x-input title="姓名"   type="text" v-model="name" placeholder="请填写真实姓名" style="font-size: 0.4rem;"  ></x-input>
                    <x-input title="电话"  type="tel" v-model="tel" placeholder="请填写真实手机号" style="font-size: 0.4rem;"  ></x-input>
                    <span style="font-size: 0.3rem;color: #ccc;">请如实先填写报名信息，提交信息唯一平团凭证</span>
                    <div style="background: #ef5a5a;
    font-size: 0.5rem;
    line-height: 1rem;
    border-radius: 5px;
    margin: 10px;
    color: #fff;" @click="addActive">提交报名并参加活动</div>
                </x-dialog>
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
            <img v-show="supportDialog" src="../assets/support.jpg" style="height: 100%; width: 100%;" class="tousu"/>
            <i v-show="supportDialog || appDialog" class="fa fa-times-circle" @click="close" style="position: fixed;right: 0.2rem;top: 0.2rem; font-size: 0.6rem;z-index: 99999;" aria-hidden="true"></i>
            <div v-show="appDialog" style="height: 100%; width: 100%;background: #fff;" class="tousu">
                <img src="../assets/app.png" style="width: 100%;"/>
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
import CountDown from "./count-down.vue";
import ContentWrap from "./content-wrap.vue";
import Data from "./page3Data.js";
import Scroll from "./scroll.vue";
var baseUrl = require("../../config");
//id =  95ce4038a19b49f5bfedb8722eef9ecf
export default {
  name: "page3-info",
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
  },
  data() {
    return {
      userName: "",
      prize: null,
      address: "",
      shown: false,
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
      barginLogList: [],
      order: [],
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
  filters: {
    filterusername(userName) {
      if (typeof userName == "string") {
        return userName.replace(
          /^(.{1})(?:[\u4e00-\u9fa5, \w]+)(.{1})$/,
          "$1*$2"
        );
      } else {
        return userName;
      }
    }
  },
  mounted() {
    this.query();
  },
  activated() {
    // this.loading = true;
    // this.$http
    // .get(baseUrl.apiBaseUrl + "bargin/info/" + this.params.id)
    // .then(({ data }) => {
    //   this.loading = false
    //   if (data.code == "0") {
    //     this.formD = data.bargin;
    //     this.list = data.order;
    //     this.$refs["bg-main2"].style.background = !this.formD.bgImage
    //       ? "#edea8f"
    //       : `url(${this.formD.bgImage})`;
    //     this.mapInit();
    //   }
    // })
  },
  methods: {
    linkreload() {
      location.href =
        location.origin +
        "/dist/redirect.html" +
        "?id=" +
        this.params.id +
        "&hash=3pageInfo&shown=1";
    },
    desensitization(str, beginLen, endLen) {
      var len = str.length;
      var firstStr = str.substr(0, beginLen);
      var lastStr = str.substr(endLen);
      var middleStr = str
        .substring(beginLen, len - Math.abs(endLen))
        .replace(/[\s\S]/gi, "*");

      tempStr = firstStr + middleStr + lastStr;

      return tempStr;
    },
    initQQMap() {
      console.log({
        latitude: this.formD.latitude, // 纬度，浮点数，范围为90 ~ -90
        longitude: this.formD.longitude, // 经度，浮点数，范围为180 ~ -180。
        name: "活动地点", // 位置名
        address: this.address, // 地址详情说明
        scale: 10 // 地图缩放级别,整形值,范围从1~28。默认为最大
      });
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
    addActive() {
      if (this.ispreview) {
        return;
      }
      if (!this.name || !this.tel) {
        // 显示文字
        return this.$vux.toast.text("请填写姓名，电话", "top");
      }
      this.$http
        .post(baseUrl.apiBaseUrl + "api/order/saveOrder", {
          activityId: this.params.id,
          from_user: "",
          red_packets: "",
          total_price: this.formD.originalPrice,
          user_name: this.name,
          orderType: "3",
          user_type: "",
          mobile: this.tel,
          user_id: this.user_id
        })
        .then(({ data: res }) => {
          if (res.code == "0000") {
            this.$vux.alert.show({
              title: "提示",
              content: "参加成功！分享好友帮砍价，赢礼品。"
            });
            this.shareId = res.result.order.orderId;
            this.shown = false;
            wx.ready(() => {
              var shareParam = {
                title: `我是${this.name || this.userName}, 参加了${
                  this.formD.activityName
                }`, // 分享标题
                desc: `${this.formD.activityName}, 联系电话: ${this.tel}`, // 分享描述
                link:
                  baseUrl.apiBaseUrl +
                  "dist/redirect.html?id=" +
                  this.params.id +
                  "&userid=" +
                  this.user_id +
                  "&shareId=" +
                  this.shareId +
                  "&hash=3pageInfo", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.formD.thumbnail, // 分享图标
                // type: 'link', // 分享类型,music、video或link，不填默认为link
                // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                trigger: function(res) {
                  console.log("用户点击发送给朋友");
                },
                success: function(res) {
                  console.log("已分享");
                },
                cancel: function(res) {
                  console.log("已取消");
                },
                fail: function(res) {}
              };
              wx.onMenuShareTimeline(shareParam);
              wx.onMenuShareAppMessage(shareParam);
            });
            this.$http
              .post(baseUrl.apiBaseUrl + "bargin/queryBarginLog", {
                orderId: this.shareId
              })
              .then(({ data }) => {
                if (data.code == "0000") {
                  this.barginLogList = data.result.data;
                }
              });
            this.$http
              .post(baseUrl.apiBaseUrl + "api/order/getOrderByOrderId", {
                orderId: res.result.order.orderId
              })
              .then(({ data: res1 }) => {
                if (res1.code == "0000") {
                  this.prize = res1.result.data.total_price;
                  this.b_userId = res1.result.data.user_id;
                }
              });
          } else {
            this.$vux.alert.show({
              title: "提示",
              content: res.msg
            });
          }
        });
    },
    addZan() {
      if (this.ispreview) {
        return;
      }
      if (!this.shareId) {
        // 显示文字
        return this.$vux.toast.text("请参加活动！");
      }
      this.$http
        .post(baseUrl.apiBaseUrl + "bargin/bargin", {
          activityId: this.params.id,
          orderId: this.shareId,
          total_price: this.prize,
          user_id: this.user_id
        })
        .then(({ data }) => {
          if (data.code == 0) {
            this.$vux.alert.show({
              title: "提示",
              content: `恭喜你成功砍价${data.result.data.total_price}元`
            });
            this.$http
            .post(baseUrl.apiBaseUrl + "bargin/queryBarginLog", {
              orderId: this.shareId
            })
            .then(({ data }) => {
              if (data.code == "0000") {
                this.barginLogList = data.result.data;
              }
            });
            this.$http
              .post(baseUrl.apiBaseUrl + "api/order/getOrderByOrderId", {
                orderId: this.shareId
              })
              .then(({ data }) => {
                if (data.code == "0000") {
                  this.prize = data.result.data.total_price;
                  this.b_userId = data.result.data.user_id;
                }
              });
          } else {
            this.$vux.alert.show({
              title: "提示",
              content: data.msg
            });
          }
        });
    },
    linkPay() {
      if (!this.shareId || !this.prize) {
        return this.$vux.alert.show({
          title: "提示",
          content: "订单不存在或者金额异常"
        });
      }
      location.href =
        baseUrl.apiBaseUrl +
        "dist/pay.html?user_id=" +
        this.b_userId +
        "&total_fee=" +
        this.prize +
        "&orderId=" +
        this.shareId;
      // this.$router.replace({
      //   path: "/payInfo",
      //   query: {
      //     orderId: this.shareId,
      //     prize: this.prize,
      //     userId: this.b_userId
      //   }
      // });
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
    showntousu() {
      this.tousuDialog = true;
    },
    phone() {
      this.pshown = true;
    },
    tousu() {
      this.$vux.toast.text("投诉成功！", "top");
      this.tousuDialog = false;
    },
    copy() {
      var clipboard = new Clipboard("#copyBtn");
      clipboard.on("success", e => {
        this.$vux.toast.text("复制成功！", "top");
        e.clearSelection();
      });
    },
    showdialoge() {
      this.name = "";
      this.type = "";
      this.tel = "";
    },
    hidedailog() {
      this.shown = false;
      this.pshown = false;
    },
    stop() {
      var audio = document.getElementById("audio2");
      if (audio == null) return;
      audio.pause();
    },
    play(item) {
      var audio = document.getElementById("audio2");
      if (audio == null) return;
      if (this.formD.autoPlayMusic) {
        let data = JSON.parse(this.formD.music);
        audio.src = data.path;
        audio.pause();
        audio.load();
        audio.play();
      }
    },

    query() {
      if (!!this.form) {
        this.formD = this.form;
        this.ispreview = true;
        this.$refs["bg-main2"].style.background = !this.formD.bgImage
          ? "#edea8f"
          : `url(${this.formD.bgImage})`;
        this.mapInit();
        return;
      }
      var params = this.$route.query;
      this.params = params;

      if (!!params.shareId) {
        this.shareId = params.shareId;
      }

      if (!!params.shown) {
        this.shown = !!params.shown ? true : false;
      }

      if (!!params.code) {
        this.$http
          .get(
            baseUrl.apiBaseUrl +
              "api/wxpay/getUserInfo?code=" +
              params.code +
              "&state=" +
              params.state
          )
          .then(({ data: res }) => {
            if (res.code != "0000") {
              console.log("获取用户信息失败");
            } else {
              this.user_id = res.result.data.user.userId;
              this.userName =
                res.result.data.user.username || res.result.data.user.nickname;
              this.loading = true;
              this.$http
                .get(baseUrl.apiBaseUrl + "bargin/info/" + params.id)
                .then(({ data }) => {
                  if (data.code == "0") {
                    this.formD = data.bargin;
                    this.$refs["bg-main2"].style.background = !this.formD
                      .bgImage
                      ? "#edea8f"
                      : `url(${this.formD.bgImage})`;
                    this.mapInit();
                    var fore = data.bargin;
                    this.list = data.order;
                    document.title = fore.activityName;
                    var thumbnail = data.bargin.thumbnail;
                    var currentUrl = encodeURIComponent(
                      location.href.split("#")[0]
                    );
                    this.$http
                      .post(
                        baseUrl.apiBaseUrl +
                          "api/wxpay/initwxjs?url=" +
                          currentUrl
                      )
                      .then((data, status) => {
                        this.loading = false;
                        wx.config({
                          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                          appId: data.data.result.data.appId, // 必填，公众号的唯一标识
                          timestamp: data.data.result.data.timestamp, // 必填，生成签名的时间戳
                          nonceStr: data.data.result.data.nonceStr, // 必填，生成签名的随机串
                          signature: data.data.result.data.signature, // 必填，签名s
                          jsApiList: [
                            "onMenuShareTimeline",
                            "onMenuShareAppMessage",
                            "chooseWXPay",
                            "openLocation"
                          ] // 必填，需要使用的JS接口列表
                        });

                        wx.ready(() => {
                          wx.error(function(res) {
                            // config 信息验证失败会执行 error 函数，如签名过期导致验证失败，具体错误信息可以打开 config 的 debug 模式查看，也可以在返回的 res 参数中查看，对于 SPA 可以在这里更新签名。
                            console.log(res);
                          });

                          wx.checkJsApi({
                            jsApiList: [
                              "onMenuShareTimeline",
                              "onMenuShareAppMessage",
                              "chooseWXPay"
                            ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                            success: function(res) {
                              // 以键值对的形式返回，可用的api值true，不可用为false
                              // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                              // console.log("checkJsApi" + res);
                            }
                          });

                          var shareParam = {
                            title: `我是${this.userName}, 参加了${
                              fore.activityName
                            }`, // 分享标题
                            desc: `${fore.activityName}, 联系电话: ${
                              fore.phone
                            }`, // 分享描述
                            link:
                              baseUrl.apiBaseUrl +
                              "dist/redirect.html?id=" +
                              params.id +
                              "&userid=" +
                              this.user_id +
                              "&shareId=" +
                              this.shareId +
                              "&hash=3pageInfo", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: thumbnail, // 分享图标
                            // type: 'link', // 分享类型,music、video或link，不填默认为link
                            // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            trigger: function(res) {
                              console.log("用户点击发送给朋友");
                            },
                            success: function(res) {
                              console.log("已分享");
                            },
                            cancel: function(res) {
                              console.log("已取消");
                            },
                            fail: function(res) {}
                          };
                          wx.onMenuShareTimeline(shareParam);
                          wx.onMenuShareAppMessage(shareParam);
                        });
                      });
                  }
                });
            }
          });
      }
      if (!!params.shareId) {
        this.$http
          .post(baseUrl.apiBaseUrl + "api/order/getOrderByOrderId", {
            orderId: params.shareId
          })
          .then(({ data }) => {
            if (data.code == "0000") {
              this.prize = data.result.data.total_price;
              this.b_userId = data.result.data.user_id;
            }
          });
        this.$http
          .post(baseUrl.apiBaseUrl + "bargin/queryBarginLog", {
            orderId: params.shareId
          })
          .then(({ data }) => {
            if (data.code == "0000") {
              this.barginLogList = data.result.data;
            }
          });
      }
    }
  }
};
</script>

<style>
table {
  width: 100%;
  text-align: center;
  line-height: 0.8rem;
}

table th {
  color: #f43530;
}
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
.wrap-wx {
  padding: 0.2rem;
  border-top: 1px dashed #ccc;
}
.wrap-wx li {
  display: flex;
  height: 2rem;
  justify-content: space-between;
  align-items: center;
}
.wrap-wx img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.wrap-wx span {
  width: 4rem;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.wrap-wx p {
  font-size: 0.2rem;
  color: #000;
}
</style>
