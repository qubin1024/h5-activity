<template>
		<transition name="fade-in">
            <div>
                <div id="contentBox" >
                    <div class="circular" ><img src="../assets/music-circle.png" style="width: 50px; height:50px;" /><audio id="audio2" :src="formD.music.path"  loop="loop"></audio></div>
                    <div class="circular2" @click="showntousu">投诉</div>
                    <div class="circular2" style="top:3.8rem;text-align: center;" @click="support">技术支持</div>
                    <div class="circular2" style="top:5.2rem;text-align: center;" @click="goapp">进入商家</div>
                    <div class="header">
                        <img :src="formD.headImage" class="header-img">
                    </div>
                    <div class="middle">
                        <div class="head-cell">
                            <div>
                                <span><i class="fa fa-eercast" aria-hidden="true"></i> 目标量</span>
                                <span>{{formD.targetQuantity}}</span>
                            </div>
                            <div class="line"></div>
                            <div>
                                <span><i class="fa fa-snowflake-o" aria-hidden="true"></i> 参与者</span>
                                <span>{{users.length}}</span>
                            </div>
                            <div class="line"></div>
                            <div>
                                <span><i class="fa fa-share-alt" aria-hidden="true"></i> 访问量</span>
                                <span>{{formD.visits + formD.virtualPopularity}}</span>
                            </div>    
                        </div>   
                         <count-down v-if="!!formD.endTime" :startTime="formD.startTime" :endTime="formD.endTime"  endText="已经结束了"></count-down>
                         <div class="wrap-2" v-show="active == 'pay'">
                             <div class="img"><img width="100%" height="100%" src="../assets/logo.jpg" /></div>
                             <div class="text">
                                 <span style="font-size: 0.3rem;">鲨鱼传媒-孙Techer</span>
                                 <span style="color: #a5a5a5;">邀请您参与本活动，机不可失，失不再来哦！</span>
                             </div>
                         </div>
                         <div class="wrap-3" v-show="active == 'pay'" >
                             <div v-for="(item, index) in users" :key="index">
                                 <img :src="item.headimgurl"/>
                                 <span>{{item.nickname}}</span>
                             </div>
                         </div>
                        <div class="panel" v-show="active == 'pay'">
                            <span class="panel-head">购买记录</span>
                            <div>
                                <scroll :list="order"></scroll>
                            </div>
                        </div>
                        <div class="panel"  v-show="active == 'pay'" v-if="!!formD.activityRules">
                            <span class="panel-head">活动介绍</span>
                            <div>
                                <div v-for="item in JSON.parse(formD.activityRules)" :key="item.key" style="line-height: 0.4rem;">
                                    <img v-if="item.type == 'uploadImg'" :src="item.img"  style=" width: 100%;display: block;"/>
                                    <pre v-if="item.type == 'uploadText'" style="white-space: pre-line;font-size: 0.4rem;font-weight: bold;padding: 0.2rem 0.4rem;word-wrap: break-word;line-height: 0.6rem;display: inline-block;">{{item.img}}</pre>
                                    <video  v-if="item.type == 'uploadVedio'" :src="item.img" ontrols="controls" preload="meta" width="100%" height="240" x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" x5-video-player-fullscreen="true" x5-video-player-type="h5" controls></video>
                                    <!-- <video v-if="item.type == 'uploadVedio'" width="100%" height="240" controls>
                                        <source :src="item.img" type="video/ogg">
                                        您的浏览器不支持Video标签。
                                    </video> -->
                                </div>
                            </div>
                        </div>
                        <div  v-show="active == 'pay'" class="phone" @click="phone">
                        <img src="../assets/home-o.png" style="width: 0.8rem; height: 0.8rem;"> <a :href="'tel:' + formD.phone" style="font-size: 0.4rem; width: 1rem;
    color: #7eceef;
    font-weight: bold;margin: 0.1rem;
    line-height: 0.4rem;">联系商家</a>
                        </div>
                        <div class="panel" v-show="active == 'pay'" v-if="!!formD.activityDestription">
                            <span class="panel-head">创建活动说明</span>
                            <div>
                                <div v-for="item in JSON.parse(formD.activityDestription)" :key="item.key" style="line-height: 0.4rem;">
                                    <img v-if="item.type == 'uploadImg'" :src="item.img"  style=" width: 100%;display: block;"/>
                                    <pre v-if="item.type == 'uploadText'" style="white-space: pre-line;font-size: 0.4rem;font-weight: bold;padding: 0.2rem 0.4rem;word-wrap: break-word;line-height: 0.6rem;display: inline-block;">{{item.img}}</pre>
                                    <video  v-if="item.type == 'uploadVedio'" :src="item.img" ontrols="controls" preload="meta" width="100%" height="240" x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" x5-video-player-fullscreen="true" x5-video-player-type="h5" controls></video>

                                </div>
                            </div>
                        </div>
                        <div class="panel"  v-show="active == 'order'" >
                            <span class="panel-head">我的订单</span>
                            <div>
                                <div class="head-cell" style="background: rgb(236, 236, 236);border-radius: 0.1rem;border: 1px solid #ccc;height:1rem;">
                                  <div style="color:#ef5a5a;">
                                      <span><i class="fa fa-user-circle" aria-hidden="true"></i> 头像</span>
                                  </div>
                                  <div class="line" style="background: #ccc; height: 100%;width: 2px;"></div>
                                  <div style="color:#ef5a5a;">
                                      <span><i class="fa fa-jpy" aria-hidden="true"></i> 金额</span>
                                  </div>
                                  <div class="line" style="background: #ccc; height: 100%;width: 2px;"></div>
                                  <div style="color:#ef5a5a;">
                                      <span><i class="fa fa-recycle" aria-hidden="true"></i> 状态</span>
                                  </div>    
                              </div>  
                              <div v-for="item in orderList" :key="item.order_id" class="head-cell" style="background: rgb(236, 236, 236);border-radius: 0.1rem;border: 1px solid #ccc;height:1rem;border-top:0;">
                                  <div style="color:#ef5a5a;">
                                      <span><img :src="item.headimgurl" style="width: 0.7rem;height: 0.7rem;" /></span>
                                  </div>
                                  <div class="line" style="background: #ccc; height: 100%;width: 2px;"></div>
                                  <div style="color:#ef5a5a;">
                                      <span>{{item.total_price}}</span>
                                  </div>
                                  <div class="line" style="background: #ccc; height: 100%;width: 2px;"></div>
                                  <div style="color:#ef5a5a;">
                                      <span>{{item.order_status}}</span>
                                  </div>    
                              </div>  
                              
                            </div>
                        </div>
                        <div class="panel" v-show="active == 'order'" v-if="!!formD.redRules">
                                  <span class="panel-head">红包发放说明</span>
                                  <div>
                                      <div v-for="item in JSON.parse(formD.redRules)" :key="item.key" style="line-height: 0.4rem;">
                                          <img v-if="item.type == 'uploadImg'" :src="item.img"  style=" width: 100%;display: block;"/>
                                          <pre v-if="item.type == 'uploadText'" style="white-space: pre-line;font-size: 0.4rem;font-weight: bold;padding: 0.2rem 0.4rem;word-wrap: break-word;line-height: 0.6rem;display: inline-block;">{{item.img}}</pre>
                                          <video  v-if="item.type == 'uploadVedio'" :src="item.img" ontrols="controls" preload="meta" width="100%" height="240" x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" x5-video-player-fullscreen="true" x5-video-player-type="h5" controls></video>
                                      </div>
                                  </div>
                              </div>
                        <div class="panel"  v-show="active == 'package'" >
                            <span class="panel-head">我的推广红包 </span>
                           <div>
                                <div class="head-cell" style="background: rgb(236, 236, 236);border-radius: 0.1rem;border: 1px solid #ccc;height:1rem;">
                                  <div style="color:#ef5a5a;">
                                      <span><i class="fa fa-user-circle" aria-hidden="true"></i> 客户</span>
                                  </div>
                                  <div class="line" style="background: #ccc; height: 100%;width: 2px;"></div>
                                  <div style="color:#ef5a5a;">
                                      <span><i class="fa fa-recycle" aria-hidden="true"></i>状态</span>
                                  </div>
                                  <div class="line" style="background: #ccc; height: 100%;width: 2px;"></div>
                                  <div style="color:#ef5a5a;">
                                      <span><i class="fa fa-jpy" aria-hidden="true"></i> 收益</span>
                                  </div>    
                              </div>  
                              <div v-for="item in packageList" :key="item.order_id" class="head-cell" style="background: rgb(236, 236, 236);border-radius: 0.1rem;border: 1px solid #ccc;height:1rem;border-top:0;">
                                  <div style="color:#ef5a5a;">
                                      <span><img :src="item.headimgurl" style="width: 0.7rem;height: 0.7rem;" /></span>
                                  </div>
                                  <div class="line" style="background: #ccc; height: 100%;width: 2px;"></div>
                                  <div style="color:#ef5a5a;">
                                      <span>{{item.order_status}}</span>
                                  </div>
                                  <div class="line" style="background: #ccc; height: 100%;width: 2px;"></div>
                                  <div style="color:#ef5a5a;">
                                      <span>{{item.total_price}}</span>
                                  </div>    
                              </div>  
                              <span style="font-size: 0.3rem;">红包领取请到微信“服务通知”查看领取</span>
                            </div>
                        </div>
                        <div class="footer">
                            <div class="btn-c" v-show="home" @click="show" style="width: 50%;" :style="{'background': active == 'pay' ? '#fdd926' : ''}">
                                <i class="fa fa-shopping-cart" aria-hidden="true"></i> 我要抢购
                            </div>
                            <div class="btn-c" v-show="home" @click="getorder" style="width: 50%;" :style="{'background': active == 'order' ? '#fdd926' : ''}">
                                <i class="fa fa-shopping-cart" aria-hidden="true"></i> 我的订单
                            </div>
                            <div class="btn-c" v-show="!home" @click="goback">
                                <i class="fa fa-bullhorn" aria-hidden="true"></i> 返回首页
                            </div>
                            <div class="btn-c" v-show="!home"  @click="getorder" :style="{'background': active == 'order' ? '#fdd926' : ''}">
                               <i class="fa fa-list-alt" aria-hidden="true"></i>  我的订单
                            </div>
                            <div class="btn-c" v-show="!home" @click="package" :style="{'background': active == 'package' ? '#fdd926' : ''}">
                                <i class="fa fa-bullhorn" aria-hidden="true"></i> 我的推广红包
                            </div>
                        </div>
                    </div>
                </div>
                <loading :show="loading"></loading>
                <alert :value="alertShow" title="提示" :content="alertContent"></alert>
                <x-dialog :show="shown" :hide-on-blur="true" @on-show="showdialoge">
                    <i class="fa fa-times-circle" aria-hidden="true" @click="hidedailog" style="font-size: 0.8rem;position: absolute;right: 0;z-index: 1002;"></i>
                    <x-input title="姓名"   type="text" v-model="name" placeholder="请填写真实姓名" style="font-size: 0.4rem;"  ></x-input>
                    <x-input title="电话"  type="tel" v-model="tel" placeholder="请填写真实手机号" style="font-size: 0.4rem;"  ></x-input>
                    <selector class="type" title="类别" v-model="type" placeholder="请选择状态" style="font-size: 0.4rem;" direction="ltr" :options="options"></selector>
                    <span style="font-size: 0.3rem;color: #ccc;">请如实先填写报名信息，提交信息唯一平团凭证</span>
                    <div style="background: #ef5a5a;
    font-size: 0.5rem;
    line-height: 1rem;
    border-radius: 5px;
    margin: 10px;
    color: #fff;" @click="pay">提交报名并团购</div>
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
                <div  v-show="appDialog"  style="height: 100%; width: 100%;background: #fff;"  class="tousu">
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
import Data from "./data.js";
import Scroll from "./scroll.vue";
//id =  95ce4038a19b49f5bfedb8722eef9ecf
const url = "https://wx.sharkmeida.cn/distribution/info/" + RegExp.$1;
console.log(url);
export default {
  name: "info",
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
    CountDown
  },
  data() {
    return {
      userName: "",
      shown: false,
      pshown: false,
      alertShow: false,
      alertContent: "",
      loading: false,
      tousuDialog: false,
      supportDialog: false,
      appDialog: false,
      home: true,
      active: "pay",
      users: [],
      user_id: "",
      params: {},
      orderList: [],
      packageList: [],
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
    copy() {
      var clipboard = new Clipboard("#copyBtn");
      clipboard.on("success", e => {
        this.$vux.toast.text("复制成功！", "top");
        e.clearSelection();
      });
    },
    show() {
      this.active = "pay";
      this.shown = true;
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
    goback() {
      this.home = true;
      this.active = "pay";
    },
    getorder() {
      this.active = "order";
      this.home = false;
      this.loading = true;
      this.$http
        .post(
          "https://wx.sharkmeida.cn/api/order/getOrderByUserIdAndActivityId",
          {
            activityId: this.params.id,
            from_user: this.user_id || ""
          }
        )
        .then(({ data: res }) => {
          this.orderList = res.result.data;
          this.loading = false;
        });
    },
    package() {
      this.active = "package";
      this.loading = true;
      this.$http
        .post("https://wx.sharkmeida.cn/api/order/getOrderByFromUserId ", {
          activityId: this.params.id,
          from_user: this.params.userid || ""
        })
        .then(({ data: res }) => {
          this.loading = false;
          this.packageList = res.result.data;
        });
    },
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
          break;
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
          break;
        default:
          return 0;
          break;
      }
    },
    pay() {
      let max = this.formD.maxValue;
      let min = this.formD.minValue;
      if (!this.name || this.type === "" || !this.tel) {
        // 显示文字
        return this.$vux.toast.text("请填写姓名，电话，类别", "top");
      }
      this.shown = false; 
      this.$http
        .post("https://wx.sharkmeida.cn/api/order/save", {
          activityId: this.params.id,
          from_user: this.params.userid || "",
          red_packets: this.randomNum(min, max),
          total_price: this.formD.productPrice,
          user_name: this.name,
          user_type: this.type,
          mobile: this.tel,
          user_id: this.user_id
        })
        .then(({ data: res }) => {
          console.log(res);
          if (res.code != "0000") {
            return;
          } else {
            this.$http
              .post(
                "https://wx.sharkmeida.cn/api/wxpay/prepay?user_id=" +
                  this.user_id +
                  "&total_fee=" +
                  this.formD.productPrice.toFixed(2) +
                  "&orderId=" +
                  res.result.orderId,
                {}
              )
              .then(({ data: res }) => {
                console.log(res);
                WeixinJSBridge.invoke(
                  "getBrandWCPayRequest",
                  {
                    appId: "wx2517d7a8920ab213",
                    timeStamp: res.result.timestamp,
                    // 支付签名随机串，不长于 32 位
                    nonceStr: res.result.nonceStr,
                    // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    package: res.result.package,
                    // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    signType: "MD5",
                    // 支付签名
                    paySign: res.result.paySign
                  },
                  res => {
                    //支付成功或失败前台判断
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                      this.$vux.toast.text("支付成功！", "top");
                    } else {
                      this.$vux.toast.text("支付失败！", "top");
                    }
                  }
                );
              
              });
          }
        });
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
        this.play();
        return;
      }
      var params = this.$route.query,
        user_id;
      
      this.params = params;
      if (!params.id) {
        return console.log("id is null");
      }
      if (!!params.code) {
        this.$http
          .get(
            "https://wx.sharkmeida.cn/api/wxpay/getUserInfo?code=" +
              params.code +
              "&state=" +
              params.state
          )
          .then(({ data: res }) => {
            if (res.code != "0000") {
              console.log("获取用户信息失败");
            } else {
              console.log("添加浏览者信息：", res.result.data.user.userId);
              user_id = res.result.data.user.userId;
              this.userName = res.result.data.user.username;
              this.user_id = user_id;
              this.loading = true;
              this.$http.get(url).then(({ data }) => {
                if (data.code == "0") {
                  this.formD = data.distribution;
                  var fore = data.distribution;
                  document.title = fore.activityTheme;
                  this.users = data.user;
                  this.order = data.order;
                  this.formD.music = !!this.formD.music
                    ? JSON.parse(this.formD.music)
                    : "";
                  var thumbnail = data.distribution.thumbnail;
                  var currentUrl = encodeURIComponent(
                    location.href.split("#")[0]
                  );
                  //encodeURIComponent(location.href);

                  console.log(currentUrl);
                  //encodeURIComponent(location.href.split('#')[0])
                  this.$http
                    .post(
                      "https://wx.sharkmeida.cn/api/wxpay/initwxjs?url=" +
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
                          "chooseWXPay"
                        ] // 必填，需要使用的JS接口列表
                      });

                      wx.ready(() => {
                        // alert('wx ready')

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
                            fore.activityTheme
                          }`, // 分享标题
                          desc: `${fore.activityTheme}, 联系电话: ${
                            fore.phone
                          }`, // 分享描述
                          link:
                            "https://wx.sharkmeida.cn/dist/redirect.html?id=" +
                            params.id +
                            "&userid=" +
                            this.user_id +
                            "&hash=Info",
                          // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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

                        console.log(shareParam);
                        wx.onMenuShareTimeline(shareParam);
                        wx.onMenuShareAppMessage(shareParam);
                      });
                    });
                }
              });
              this.$http
                .post("https://wx.sharkmeida.cn/distribution/addWatcher", {
                  id: params.id,
                  watcher: res.result.data.user.userId
                })
                .then(({ data: res }) => {
                  console.log("添加成功信息：", res);
                });
            }
          });
      }
    }
  }
};
</script>

<style >
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
