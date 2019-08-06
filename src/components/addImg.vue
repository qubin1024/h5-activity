<template>
  <div>
       <div style="position: relative;margin: 1rem auto;height:4rem;" v-for="(item, index) in activeList" :key='index'>
                <div class="tool-bar"><span @click="upData(index)" v-if="index != 0">上移</span><span v-if="index != activeList.length-1" @click="downData(index)">下移</span></div>
                <i class="fa fa-times-circle" @click="deleteThis(index)" style="position: absolute;right: 0.2rem;top: -0.6rem; font-size: 0.6rem;z-index: 100;" aria-hidden="true"></i>
                <span v-html="item.html" v-if='item.type == "uploadImg" && !!item.image'></span>
                <img-upload  ref="activelist" @uploadCallback="getUrl($event, item)" v-if='item.type == "uploadImg" && !item.image'></img-upload>
                <x-textarea title="文字" v-model="item.image"  v-if='item.type == "uploadText"' :rows="5" :show-clear="false" @on-focus="blurq($event)"></x-textarea> 
                <x-textarea title="视频链接" v-model="item.image"  v-if='item.type == "uploadVedio"' :rows="5" :show-clear="false" @on-focus="blurq($event)"></x-textarea> 
        </div>
        <div class='add' v-if="!type || type=='img'" @click="addActive('uploadImg')"><i class="fa fa-plus" aria-hidden="true"></i> 添加图片</div>
        <div class='add' v-if="!type || type=='text'" @click="addActive('uploadText')"><i class="fa fa-plus" aria-hidden="true"></i> 添加文字</div>
        <div class='add' v-if="!type || type=='vedio'" @click="addActive('uploadVedio')"><i class="fa fa-plus" aria-hidden="true"></i> 添加视频链接</div>
  </div>
</template>

<script>
import ImgUpload from "./imgUpload.vue";
import { Group, Cell, Loading, Datetime, XInput, XNumber, XSwitch, XTextarea } from "vux";
export default {
  name: 'AddImg',
  data () {
    return {
      activeList: []
    }
  },
  components: {
      ImgUpload,
      XTextarea
  },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  methods: {
      blurq(e){
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//获取软键盘唤起前浏览器滚动部分的高度
        document.documentElement.scrollTop = scrollTop;
      },
      getUrl(url, item){
          item.image = url
          item.html = "<img src='" + url + "' style='width: 100%; height: 100%;'/>"
      },
      addActive(type){
          this.activeList.push({
              type: type,
              image: '',
              html: ''
          })
      },
      deleteThis(index){
          this.activeList.splice(index, 1)
      },
      upData (index) {
        　this.activeList = this.swapItems(this.activeList, index, index - 1)
      },
      downData (index) {
          this.activeList = this.swapItems(this.activeList, index, index + 1)
      },
      swapItems: function(arr, index1, index2){
    　　  arr[index1] = arr.splice(index2,1,arr[index1])[0]
    　　  return arr
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add {
  height: 1rem;
  border: 1px dashed #2196f3;
  border-radius: 0.5rem;
  width: 100%;
  margin: 0.3rem auto;
  display: flex;
  justify-content: center;
  color: #2196f3;
  color: 0.3rem;
  align-items: center;
}
.tool-bar{
 position: absolute;
 height: 0.8rem;
 top: -0.8rem;
 width: 8.5rem;
 display: flex;
 justify-content: flex-start;
 align-items: center;
}
.tool-bar span{
    display: inline-block;
    width: 1.5rem;
    height: 0.6rem;
    font-size: 0.4rem;
    line-height: 0.6rem;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    margin: 0 5px;
    background: #000;
}
</style>
