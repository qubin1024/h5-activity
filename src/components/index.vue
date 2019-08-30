<template>
		<transition name="fade-in">
            <div>
                <div class="music-wrap" v-show="!show">
                    <div class="tips-wrap"><i class="fa fa-tag" aria-hidden="true"></i>小贴士:<br/>
一首好的音乐或旋律会让活动更加生动，据说可以大大提高转化哟，亲，您选了吗？
如果在这里的音乐没有您想要的，还楞在这里干嘛，赶紧岱山您的"音乐"联系我们客户小恋妹妹吧</div>
                    <group style="height: calc(100% - 140px); overflow: auto;" >
                        <cell  v-for="item in musicList" :key="item.key" :title="item.label" @click.native="tab(item)" :class="{'active': item.active == 1}" >
                            <template slot="value">
                                <i  class="fa fa-play-circle play" v-if="item.status == 0" @click="play(item)" aria-hidden="true"></i>
                                <i class="fa fa-stop-circle stop"  v-if="item.status == 1" @click="stop(item)" aria-hidden="true"></i>
                            </template>
                        </cell>
                    </group>
                    <div class="footer" >
                        <div class="btn-hc" @click="cancel">
                            取消
                        </div>
                        <div class="btn-hc" @click="sure">
                            确定
                        </div>
                    </div>
                </div>
                    <div class="contentBox"  v-show="!ispreview && show">
                    <div class="circular" @click="musicClick" ><img src="../assets/music-circle.png" style="width: 1rem; height:1rem;" /><audio id="audio" src="http://www.ytmp3.cn/down/53430.mp3" loop="loop"></audio></div>
                    <div class="header">
                        <!-- <img src="../assets/bg.png" class="header-img"> -->
                        <div style="width: calc(100% - 2px); min-height: 3rem;">
                            <span v-html="headImage" v-if='!!headImage'></span>
                            <i  v-if='!!headImage' class="fa fa-times-circle" @click="deleteThis()" style="position: absolute;left: 0.2rem;top: 0.2rem; font-size: 1rem;z-index: 100;" aria-hidden="true"></i>
                            <img-upload  v-if='!headImage' ref="headImage" placeholder="上传头部图片" @uploadCallback="getHeadUrl($event)"></img-upload>
                        </div>
                    </div>
                    <div class="middle">
                        <div class="wrap">
                            <div class="bg-1">
                                <div class="bg-2">
                                    <div class="title" style="display: none;"></div>
                                </div>
                                <div class="content">
                                    <datetime style="font-size: 0.4rem;" title="活动开始时间"   format='YYYY-MM-DD HH:mm' v-model="formD.startTime"></datetime>
                                    <datetime style="font-size: 0.4rem;" title="活动结束时间"  format='YYYY-MM-DD HH:mm' v-model="formD.endTime"></datetime> 
                                    <x-input title="目标量"  v-model="formD.targetQuantity" style="font-size: 0.4rem;" type="number" :show-clear="showClear" ></x-input>
                                </div>                        
                            </div>
                        </div>
                        <div class="wrap">
                            <div class="bg-1">
                                <div class="bg-2">
                                    <div class="title" style="display: none;"></div>
                                </div>
                                <div class="content">
                                    <div style="margin: 1rem auto;height: 3rem;width:3rem;position: relative;">
                                        <span v-html="image" v-if='!!image'></span>
                                        <i  v-if='!!image' class="fa fa-times-circle" @click="deleteImg()" style="position: absolute;left: -0.8rem;top: -0.8rem; font-size: 1rem;z-index: 100;" aria-hidden="true"></i>
                                        <img-upload  v-if='!image' ref="thumbnail" placeholder="上传缩略图" @uploadCallback="getUrl($event)"></img-upload>
                                    </div>
                                    
                                    <x-input title="活动主题" style="font-size: 0.4rem;"  v-model="formD.activityTheme" :show-clear="showClear"></x-input>
                                    <x-input title="活动名称" style="font-size: 0.4rem;"  v-model="formD.activityName" :show-clear="showClear"></x-input>
                                    <!--<x-input title="活动类型" style="font-size: 0.4rem;"  v-model="formD.activityType" :show-clear="showClear"></x-input>
                                    <x-switch title="是否关注弹出"  v-model="_focusOnPop"></x-switch>
                                    <x-switch title="是否关注发红包"  v-model="_focusOnRed"></x-switch>
                                    <x-switch title="是否关注成功后分享的红包"  v-model="_shareRedEnvelopes"></x-switch>
                                    <x-switch title="不需要付款人数"  v-model="_noPaymentNum"></x-switch>
                                    <x-switch title="音乐自动播放"  v-model="_autoPlayMusic"></x-switch>-->
                                    <x-input title="虚拟人气值"  v-model="formD.virtualPopularity" style="font-size: 0.4rem;" type="number" :show-clear="showClear" ></x-input>
                                    <!-- <x-number title="分销等级"  v-model="formD.distributionSeries" :min='0'></x-number> --> 
                                    <!--<x-input title="触发关键词" v-model="formD.triggerKeywords" style="font-size: 0.4rem;" :show-clear="showClear"></x-input>-->
                                    <x-input title="电话" v-model="formD.phone" style="font-size: 0.4rem;" :show-clear="showClear"></x-input>
                                    <x-input title="产品价格" v-model="formD.productPrice" style="font-size: 0.4rem;" :show-clear="showClear" ></x-input>
                                    <!-- <x-input title="界面模板风格" v-model="formD.templateStyle" style="font-size: 0.4rem;" :show-clear="showClear" ></x-input> -->
                                    <x-input title="红包名称"  v-model="formD.redEnvelopesName" style="font-size: 0.4rem;" :show-clear="showClear" ></x-input>
                                    <x-input title="红包最大值"  v-model="formD.maxValue" style="font-size: 0.4rem;" type="number" :show-clear="showClear" ></x-input>
                                    <x-input title="红包最小值"  v-model="formD.minValue" style="font-size: 0.4rem;" type="number" :show-clear="showClear" ></x-input>
                                    <x-textarea title="红包祝福语" v-model="formD.redEnvelopesBlessings"  :rows="5"  :show-clear="showClear" ></x-textarea> 
                                    <!--<x-input title="微信一键关注" v-model="formD.oneKeyConcern"  style="font-size: 0.4rem;"  :show-clear="showClear"></x-input>
                                    <x-input title="微信关注图-连接" v-model="formD.wechatPic"  style="font-size: 0.4rem;"   :show-clear="showClear"></x-input>
                                     <x-textarea title="微信描述" v-model="formD.wechatDescription"  :rows="5" :show-clear="showClear" ></x-textarea>  -->
                                </div>                        
                            </div>
                        </div>
                        <div class="wrap">
                            <div class="bg-1">
                                <div class="bg-2">
                                    <div class="title">活动规则</div>
                                </div>
                                <div class="content">
                                   <add-img ref="activityRules"></add-img>
                                </div>                              
                            </div>
                        </div>
                        <div class="wrap">
                            <div class="bg-1">
                                <div class="bg-2">
                                    <div class="title">活动说明</div>
                                </div>
                                <div class="content">
                                   <add-img ref="activityDestription" ></add-img>
                                </div>                              
                            </div>
                        </div>
                        <div class="wrap">
                            <div class="bg-1">
                                <div class="bg-2">
                                    <div class="title">红包规则</div>
                                </div>
                                <div class="content">
                                   <add-img ref="redRules" ></add-img>
                                </div>                              
                            </div>
                        </div>
                    </div>
                       
                </div>            
                
                <info v-if='ispreview' ref="info"  :form="formD"></info>
                <div class="footer" v-show="show">
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
</template>

<script>
import { Group, Cell, CellBox, Loading, Datetime, XInput, XNumber, XSwitch, XTextarea, Range } from "vux";
import AddImg from "./addImg.vue";
import ImgUpload from "./imgUpload.vue";
import Info from './info.vue';
import Data from "./data.js";
export default {
  name: "content-t",
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
    Info,
    Range,
    AddImg 
  },
  data() {
    return {
        showClear: false,
        formD: Data,
        isLoading: true,
        show: true,
        musicUrl:"",
        image: '',
        headImage: '',
        ispreview: false,
        activeList:[],
        musicList: [
            {
                label: '天空之城',
                status: 0,
                active: 0,
                value: "http://www.ytmp3.cn/down/53430.mp3"
            },
            {
                label: '天空之城2',
                status: 0,
                active: 0,
                value: "http://www.ytmp3.cn/down/52790.mp3"
            }
        ]
    };
  },
  computed:{
      _focusOnPop: {
            get(){
                return this.formD.focusOnPop == 1 ? true : false;
            },
            set(val){
                this.formD.focusOnPop = val ? 1 : 0
            }
      },
      _focusOnRed: {
            get(){
                return this.formD.focusOnRed == 1 ? true : false;
            },
            set(val){
                this.formD.focusOnRed = val ? 1 : 0
            }
      },
      _shareRedEnvelopes: {
            get(){
                return this.formD.shareRedEnvelopes == 1 ? true : false;
            },
            set(val){
                this.formD.shareRedEnvelopes = val ? 1 : 0
            }
        },
      _noPaymentNum:{
            get(){
                return this.formD.noPaymentNum == 1 ? true : false;
            },
            set(val){
                this.formD.noPaymentNum = val ? 1 : 0
            }
        },
      _autoPlayMusic:{ 
            get(){
                return this.formD.autoPlayMusic == 1 ? true : false;
            },
            set(val){
                this.formD.autoPlayMusic = val ? 1 : 0
            }
      }
  },
  mounted(){
    var reg = /\?id=(\w+)&?/;
    reg.test(location.href);
    const url = "https://wx.sharkmeida.cn/distribution/info/" + RegExp.$1;
      this.$http.get(url).then(({ data }) => {
        if (data.code == "0") {
          this.formD = data.distribution;
            if(data.distribution.activityRules != null){
                var dat = JSON.parse(data.distribution.activityRules)
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
                    
                    this.$refs['activityRules'].activeList = sc
            }
            if(data.distribution.thumbnail != null){
                this.image = "<img src='" + data.distribution.thumbnail + "' style='width: 100%; height: 100%;'/>"
            }
            if(data.distribution.headImage != null || data.distribution.headImage != ''){
                this.headImage = "<img src='" + data.distribution.headImage + "' style='width: 100%; height: 100%;'/>"
            }
            if(data.distribution.activityDestription != null){
                var dat = JSON.parse(data.distribution.activityDestription)
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
                    
                    this.$refs['activityDestription'].activeList = sc
            }
            if(data.distribution.redRules != null){
                var dat = JSON.parse(data.distribution.redRules)
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
                    
                    this.$refs['redRules'].activeList = sc
            }
        }
        });
  },
  methods:{
        deleteImg (){
            this.image = null;
            this.formD.thumbnail = null;
        },
        deleteThis(){
            this.headImage = null;
            this.formD.headImage = null;
        },
      getUrl(url){
          this.formD.thumbnail = url;
          this.image = "<img src='" + url + "' style='width: 100%;height: 100%;'/>";
        //   item.image = url
        //   item.html = "<img src='" + url + "' style='width: 100%; height: 100%;'/>"
      },
       getHeadUrl(url){
          this.formD.headImage = url;
          this.headImage = "<img src='" + url + "' style='width: 100%;height: 100%;'/>";
        //   item.image = url
        //   item.html = "<img src='" + url + "' style='width: 100%; height: 100%;'/>"
      },
      editpage(){
            this.ispreview = !this.ispreview;
      },
      preview(){
            var activityRules = [], activityDestription = [], red_rules = [];
            this.$refs['activityRules'].activeList.forEach(item => {
                activityRules.push({
                    type: item.type,
                    img: item.image
                })
            })
          this.$refs['activityDestription'].activeList.forEach(item => {
              activityDestription.push({
                  type: item.type,
                  img: item.image
              })
          })
          this.$refs['redRules'].activeList.forEach(item => {
              red_rules.push({
                  type: item.type,
                  img: item.image
              })
          })
          
          this.formD.activityRules = JSON.stringify(activityRules);
          this.formD.activityDestription = JSON.stringify(activityDestription);
          this.formD.redRules = JSON.stringify(red_rules);
          this.formD.music = JSON.stringify({
              path:this.musicUrl
            })
            
            var a = JSON.parse(JSON.stringify(this.formD))
           
          
            this.ispreview = !this.ispreview;
            
      },
      save(){
          var activityRules = [], activityDestription = [], red_rules = [];
          this.$refs['activityRules'].activeList.forEach(item => {
              activityRules.push({
                  type: item.type,
                  img: item.image
              })
          })
          this.$refs['activityDestription'].activeList.forEach(item => {
              activityDestription.push({
                  type: item.type,
                  img: item.image
              })
          })

          this.$refs['redRules'].activeList.forEach(item => {
              red_rules.push({
                  type: item.type,
                  img: item.image
              })
          })
          
        
          this.formD.activityRules = JSON.stringify(activityRules);
          this.formD.activityDestription = JSON.stringify(activityDestription);
          this.formD.redRules = JSON.stringify(red_rules);
          this.formD.music = this.musicUrl;
            var a = JSON.parse(JSON.stringify(this.formD))
            this.$vux.loading.show({
                text: 'Loading'
            })
          this.$http.post('https://wx.sharkmeida.cn/distribution/save', a).then(({data}) => {
            this.$vux.loading.hide()
            if(data.code == '0'){
                this.formD.id = data.distribution.id
                this.$vux.alert.show({
                    title: '提示',
                    content: '保存成功！',
                    onShow () {
                    },
                    onHide () {
                    }
                })
                
            }else{
                this.$vux.alert.show({
                    title: '提示',
                    content: '保存失败！',
                    onShow () {
                    },
                    onHide () {
                    }
                })
            }
            })
      },
      cancel(){
          this.stop();
          this.show = !this.show
      },
      musicClick(){
          this.show = !this.show
        if(!this.show){
            this.musicList.forEach(el => {
                if(el.value == this.musicUrl){
                    el.active = 1
                }else{
                    el.active = 0
                }
            })
        }
      },
      play(item){
            var audio = document.getElementById("audio");
            audio.src = item.value;
            audio.loop = true; //歌曲循
            this.musicList.forEach(el => {
                el.status = 0;
            })
            item.status = 1;
             audio.pause();
             audio.load(); 
            audio.play();
      },
      stop(){
          var audio = document.getElementById("audio");
             audio.pause();
             audio.load(); 
             this.musicList.forEach(el => {
                el.status = 0;
            })
      },
      tab(item){
           this.musicList.forEach(el => {
                el.active = 0;
            })
            item.active = 1
      },
      sure(){
          this.stop();
          var item
          this.musicList.forEach(el => {
                if(el.active == 1){
                    item = el;
                };
            })
            if(!!item){
                var audio = document.getElementById("audio");
                audio.src = item.value;
                this.$vux.toast.show({
                    type: "success",
                    text: '选择成功！',
                    position: 'middle'
                })
                this.musicUrl = item.value; 
                this.show = !this.show;
            }else{
                this.$vux.toast.show({
                    type: "warn",
                    text: '请选择一条',
                    position: 'middle'
                })
            }
      }
  }
};
</script>

<style scoped>

.head-cell{
    height: 1.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background: #ef5a5a;
}
.head-cell>div{
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
.head-cell>div.line{
    width: 5px;
    height: 80%;
    background: #fff;
}
.active{
    background: #ccc;
}
.music-wrap{
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
.play{
    font-size: 0.5rem;
    color: #4e9cfd;
}
.stop{
    font-size: 0.5rem;
    color: #4e9cfd;
}
.tips-wrap{
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
</style>
