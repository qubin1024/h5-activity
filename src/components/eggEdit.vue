<template>
<transition name="fade-in">
    <div>
        <div class="bg-main" ref='bg-main' v-show="!ispreview">
        <div style="width: calc(100% - 2px); min-height: 3rem;">
                <span v-html="headImage" v-if='!!headImage'></span>
                <i  v-if='!!headImage' class="fa fa-times-circle" @click="deleteThis()" style="position: absolute;left: 0.2rem;top: 0.2rem; font-size: 1rem;z-index: 100;" aria-hidden="true"></i>
                <img-upload v-if='!headImage' ref="headImage" placeholder="上传头部图片" @uploadCallback="getHeadUrl($event)"></img-upload>
            </div>
            <div style="width: calc(100% - 2px); min-height: 3rem;">
                <img src="../assets/eggbg.png" width="100%"/>
            </div>
            <content-wrap>
                <x-textarea title="活动标题" v-model="formD.activityName" style="border: 1px dashed #ccc;" :rows="5" :show-clear="showClear"></x-textarea>
            </content-wrap>
            <content-wrap title="规则设置">
                <x-switch title="音乐"  v-model="_music"></x-switch>
                <x-input title="抽奖次数（次）"   v-model="formD.maxTime" type="number" style="font-size: 0.4rem;" :show-clear="showClear"></x-input>
                <x-input title="最多中奖（次）"  v-model="formD.maxWin"  type="number" style="font-size: 0.4rem;" :show-clear="showClear"></x-input>
                <x-switch title="显示奖品份数"  v-model="_showNum"></x-switch>
                <span style="display: block;font-size: 0.3rem;color: #ccc;padding: 0 15px;">（奖品没被抽走一份，奖品份数就少一个）</span>
                <x-input title="额外次数"  v-model="formD.intervals"  type="number" style="font-size: 0.4rem;" :show-clear="showClear"></x-input>
                <span style="display: block;font-size: 0.3rem;color: #ccc;padding: 0 15px;">转发朋友圈可以额外获得抽奖次数：{{formD.intervals}}次，多次转发皆算一次。</span>
                <span style="display: block;font-size: 0.3rem;color: #ccc;padding: 0 15px;">如活动下架，则可以在“商户中心->我的活动->中奖名单”中， 进行兑奖。</span>
            </content-wrap>
            <content-wrap title="奖项设置">
                <span style="display: block;font-size: 0.3rem;color: #ccc;padding: 0 15px;"><i class="fa fa-info-circle" aria-hidden="true"></i> 每个奖项中奖概率与奖品份数无关，用户每次抽奖仅与当前设置得中奖率有关。</span>
                <span style="display: block;font-size: 0.3rem;color: #ccc;padding: 0 15px;"><i class="fa fa-info-circle" aria-hidden="true"></i> 活动进行重可随时进入编辑页面更改奖品份数以及中奖率，切记保持一定得公平性。</span>
                <span style="display: block;font-size: 0.3rem;color: #ccc;padding: 0 15px;"><i class="fa fa-info-circle" aria-hidden="true"></i> 可在商户中心-我的活动-中奖名单重查看详细得中奖信息。</span>
                <span style="display: block;font-size: 0.3rem;color: #ccc;padding: 0 15px;"><i class="fa fa-info-circle" aria-hidden="true"></i> 每种奖品，每个用户最多中能中一次。</span>
                <add-egg ref="prizeRule"></add-egg>
            </content-wrap>
            <content-wrap title="活动规则">
                <x-textarea title="规则信息" v-model="formD.activityRule" style="border: 1px dashed #ccc;" :rows="5" :show-clear="showClear"></x-textarea>
            </content-wrap>
            <content-wrap title="兑奖信息">
                <x-textarea title="时间，地点，电话" v-model="formD.prizeInfo" style="border: 1px dashed #ccc;" :rows="5" :show-clear="showClear"></x-textarea>
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
                <x-input title="电话" v-model="formD.phone" type="number" style="font-size: 0.4rem;" :show-clear="showClear"></x-input>
                <div class="title-23">
                    <span style="color: #10aeff;background: #fff;padding: 0 10px;">选择位置</span>
                </div>
                <x-textarea title="地理位置" v-model="formD.address" style="border: 1px dashed #ccc;" :rows="3" :show-clear="showClear"></x-textarea>
                <span style="display: block;font-size: 0.3rem;color: #843493;padding: 0 15px;">{{address}}</span>
                <div id="container" style="height: 5rem"></div>
            </content-wrap>
            <content-wrap title="店内优惠">
                <span style="display: block;font-size: 0.3rem;color: #ccc;padding: 0 15px;"><i class="fa fa-tag" aria-hidden="true"></i> 在此填写您的店内优惠或活动优惠内容</span>
                <span style="display: block;font-size: 0.3rem;color: #ccc;padding: 0 15px;"><i class="fa fa-tag" aria-hidden="true"></i> 第一条不填写则不显示</span>
                <add-img type="text" ref='discount'></add-img>
            </content-wrap>
            <div style="width: calc(100% - 2px); min-height: 3rem;margin-bottom:1.5rem;position: relative;">
                <img src="../assets/eggbg.jpg" width="100%"/>
            </div>
        </div>
        <egg-index :form="formD" v-if="ispreview"></egg-index>
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
import EggIndex from './egg.vue';
import AddEgg from './addEgg.vue';
import Data from "./eData.js"
export default {
    name: "egg-edit",
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
        EggIndex,
        ContentWrap,
        Range,
        AddImg,
        AddEgg
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
            address: ''
        };
    },
    computed: {
        _showNum: {
            get(){
                return this.formD.showNum == 1 ? true : false;
            },
            set(val){
                this.formD.showNum = val ? 1 : 0
            }
        },
        _music: {
             get(){
                return this.formD.music == 1 ? true : false;
            },
            set(val){
                this.formD.music = val ? 1 : 0
            }
        }
    },
    mounted() {
       if (!this.$route.query.id) {
        this.mapInit();
        return;
        }
        let params = this.$route.query;

        this.params = params;


        const url = "https://wx.sharkmeida.cn/lottery/info/" + params.id;

        this.$http.get(url).then(({
            data
        }) => {
            if (data.code == "0") {
                this.formD = data.lottery;
                if (data.lottery.prizeRule != null) {
                    this.$refs['prizeRule'].activeList = JSON.parse(data.lottery.prizeRule)
                }
                if (data.lottery.thumbnail != null && data.lottery.thumbnail != '') {
                    this.image = "<img src='" + data.lottery.thumbnail + "' style='width: 100%; height: 100%;'/>"
                }
                if (data.lottery.headImage != null && data.lottery.headImage != '') {
                    this.headImage = "<img src='" + data.lottery.headImage + "' style='width: 100%; height: 100%;'/>"
                }
                if (data.lottery.companyDescription != null) {
                    var dat = JSON.parse(data.lottery.companyDescription)
                    var sc = []
                    //this.$refs['activityRules'].activeList = JSON.parse(this.formD.activityRules)
                    dat.forEach(e => {
                        var s = "<img src='" + e.img + "' style='width: 100%; height: 100%;'/>";
                        sc.push({
                            type: e.type,
                            image: e.img,
                            html: s
                        })
                    })

                    this.$refs['companyDescription'].activeList = sc
                }
                if (!!data.lottery.discount && data.lottery.discount != null) {
                    this.$refs['discount'].activeList = JSON.parse(data.lottery.discount)
                }
                this.mapInit()
            }
        });
    },
    methods: {
        mapInit() {
            navigator.geolocation.getCurrentPosition((position) => {
                var self = this;
                var map = new qq.maps.Map(document.getElementById('container'), {
                    center: new qq.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    zoom: 13
                });
                var geocoder = new qq.maps.Geocoder({
                    complete: function (result) {
                        map.setCenter(result.detail.location);
                        self.address = result.detail.address
                    }
                });
                if (self.formD.latitude != '' && self.formD.longitude != '') {
                    var marker = new qq.maps.Marker({
                        position: new qq.maps.LatLng(parseFloat(self.formD.latitude), parseFloat(self.formD.longitude)),
                        map: map
                    });
                    geocoder.getAddress(new qq.maps.LatLng(parseFloat(self.formD.latitude), parseFloat(self.formD.longitude)))
                }

                qq.maps.event.addListener(map, 'click', function (event) {
                    console.log(event)
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
                    qq.maps.event.addListener(map, 'click', function (event) {
                        marker.setMap(null);
                    });

                });
            }, (error) => {
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
            })
        },
        deleteThis() {
            this.headImage = null;
            this.formD.headImage = null;
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
            this.footImage = "<img src='" + url + "' style='width: 100%;height: 100%;'/>";
        },
        deletebg() {
            this.bgImage = null;
            this.$refs['bg-main'].style.background = `#192029`;
            this.formD.bgImage = null;
        },
        getqrUrl(url){
            this.formD.qrImg = url;
            this.projuctImage = "<img src='" + url + "' style='width: 100%;height: 100%;'/>";
        },
        getBgUrl(url) {
            this.formD.bgImage = url;
            this.$refs['bg-main'].style.background = `url(${url})`;
            this.bgImage = "<img src='" + url + "' style='width: 100%;height: 100%;'/>";
        },
        getHeadUrl(url) {
            this.formD.headImage = url;
            this.headImage = "<img src='" + url + "' style='width: 100%;height: 100%;'/>";
        },
        getUrl(url) {
            this.formD.thumbnail = url;
            this.image = "<img src='" + url + "' style='width: 100%;height: 100%;'/>";
        },
        preview() {
             var companyDescription = [],
                discount = [];
            this.$refs['companyDescription'].activeList.forEach(item => {
                companyDescription.push({
                    type: item.type,
                    img: item.image
                })
            })
            this.$refs['discount'].activeList.forEach(item => {
                discount.push({
                    type: item.type,
                    img: item.image
                })
            })

            this.formD.companyDescription = JSON.stringify(companyDescription);
            this.formD.discount = JSON.stringify(discount);
            this.ispreview = !this.ispreview;
        },
        editpage() {
            this.ispreview = !this.ispreview;
        },
        save() {
            var prizeRule = [],
                companyDescription = [],
                discount = [];
            this.$refs['prizeRule'].activeList.forEach((item, index) => {
                prizeRule.push({
                    index: index,
                    gitfId: index,
                    giftName: item.giftName,
                    num: item.num,
                    probability: item.probability,
                    giftDescription: item.giftDescription,
                    url: item.url
                })
            })
            this.$refs['companyDescription'].activeList.forEach(item => {
                companyDescription.push({
                    type: item.type,
                    img: item.image
                })
            })
            this.$refs['discount'].activeList.forEach(item => {
                discount.push({
                    type: item.type,
                    img: item.image
                })
            })

            this.formD.prizeRule = JSON.stringify(prizeRule);
            this.formD.companyDescription = JSON.stringify(companyDescription);
            this.formD.discount = JSON.stringify(discount);
            var a = JSON.parse(JSON.stringify(this.formD))
            this.$vux.loading.show({
                text: 'Loading'
            })
            this.$http.post('https://wx.sharkmeida.cn/lottery/save/', a).then(({
                data
            }) => {
                this.$vux.loading.hide()
                if (data.code == '0') {
                    this.$vux.alert.show({
                        title: '提示',
                        content: '保存成功！',
                        onShow() {},
                        onHide() {}
                    })
                } else {
                    this.$vux.alert.show({
                        title: '提示',
                        content: '保存失败！',
                        onShow() {},
                        onHide() {}
                    })
                }
            })
        }
    },
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
    background: #d32a09;
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

.head-cell>div {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.4rem;
    font-family: 'yahei';
    color: #fff;
}

.head-cell>div.line {
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
    margin: .5rem;
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
    font-size: .6rem;
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
.btn-o{
        width: 100%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    background: #10aeff;
    border-radius: 5px;
    color: #fff;
    box-shadow: -3px 3px 8px 0px #CCC;
    display: block;
}
</style>
