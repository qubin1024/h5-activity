<template>
<div>
    <div class="w-r">
        <p>支付金额</p>
        <div class="shuru">
            <span>¥{{this.$route.query.prize}}</span>
            <div id="div"></div>
        </div>
        <p>支付问题请咨询相关公司</p>
    </div>
    <div class="btn-pay" @click="pay">
        支付
    </div>
</div>
</template>

<script>
var baseUrl = require("../../config");

export default {
  name: "pay-info",
  data: function() {
    return {};
  },
  created() {
    let config = {};
    config.url = window.location.href;
    // 判断当前url是否存在?参数匹配符
    if (!config.url.match(/\?/)) {
      location.replace(
        window.location.href.split("#")[0] + "?" + window.location.hash
      );
      return;
    }
  },
  mounted() {},
  methods: {
    pay() {
      if (!this.$route.query.orderId) {
        // 显示文字
        return this.$vux.toast.text("没有订单id");
      }
      this.$http
        .post(
          baseUrl.apiBaseUrl +
            "api/wxpay/prepay?user_id=" +
            this.$route.query.userId +
            "&total_fee=" +
            this.$route.query.prize +
            "&orderId=" +
            this.$route.query.orderId,
          {}
        )
        .then(({ data: res }) => {
          if (res.code == "0000") {
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
                  this.$router.back(-1);
                } else {
                  this.$vux.toast.text("支付失败！", "top");
                }
              }
            );
          } else {
            this.$vux.alert.show({
              title: "提示",
              content: res.msg
            });
          }
        });
    }
  }
};
</script>

<style>
.w-r {
  margin: 0.45rem;
  border: 0.05rem solid #ccc;
  border-radius: 10px;
  background: #f6f6f6;
  padding: 10px;
}

.btn-pay {
  margin: 20px auto 0;
  width: 90%;
  height: 40px;
  font-size: 16px;
  color: #fff;
  background: #80d983;
  border: 1px solid #47d14c;
  border-radius: 3px;
  line-height: 40px;
  text-align: center;
}

.shuru {
  position: relative;
  margin-bottom: 10px;
}

.shuru span {
  position: absolute;
  top: 5px;
  font-size: 25px;
}

.shuru div {
  border: none;
  width: 100%;
  height: 50px;
  font-size: 25px;
  line-height: 50px;
  border-bottom: 1px solid #cfcfcf;
  text-indent: 30px;
  outline: none;
  white-space: pre;
  overflow-x: scroll;
}

.w-r p {
  font-size: 14px;
  color: #8d8d8f;
}
</style>
