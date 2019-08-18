<template>
<div>
    <div class="wrap-tuan" v-for="(item, index) in activeList" :key='index'>
        <i class="fa fa-times-circle" v-if="index != 0" @click="deleteThis(index)" style="position: absolute;right: 0.2rem;    top: 0.6rem;
    font-size: 0.8rem;
    z-index: 100;
    color: #fff;z-index: 100;" aria-hidden="true"></i>
        <div class="people-wrap">
            <input v-model="item.giftName" type="text" />
        </div>
        <div class="prize-wrap">
            <div>数量 <input v-model="item.num" type="number" /> 份</div>
            <div>中奖率 <input :value="item.probability * 100" @input="probabilityChange($event, item)" type="number" /> %</div>
        </div>
        <div style="text-align: center;" >
            <input style="width: 5rem;" v-model="item.giftDescription" :disabled="!index" type="text" />   
        </div>
        <div style="margin: 1rem auto;height: 3rem;width:3rem;position: relative;">
            <span v-html="`<img src='${item.url}' style='width: 100%;height: 100%;'/>`" v-if='item.url'></span>
            <i  v-if='item.url' class="fa fa-times-circle" @click="()=>{item.url = ''}" style="position: absolute;left: -0.8rem;top: -0.8rem; font-size: 1rem;z-index: 100;" aria-hidden="true"></i>
            <img-upload v-if='!item.url' ref="thumbnail" placeholder="上传奖品图" @uploadCallback="getUrl($event, item)"></img-upload>
        </div>
    </div>
    <div class='add' @click="addActive"><i class="fa fa-plus" aria-hidden="true"></i> 添加奖项(最多5档)</div>
</div>
</template>

<script>
import ImgUpload from "./imgUpload.vue";
import {
    Group,
    Cell,
    Loading,
    Datetime,
    XInput,
    XNumber,
    XSwitch,
    XTextarea
} from "vux";
export default {
    name: 'add-egg',
    data() {
        return {
            activeList: [{
                giftName: '谢谢惠顾',
                num: 1000000,
                probability: 0.2,
                giftDescription: '谢谢参与奖项',
                url: ''
            }]
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
        probabilityChange($event, item){
            item.probability = parseInt($event.currentTarget.value)/100;
        },
        getUrl(url, item){
            item.url = url;
        },
        blurq(e) {
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; //获取软键盘唤起前浏览器滚动部分的高度
            document.documentElement.scrollTop = scrollTop;
        },
        addActive(type) {
            if (this.activeList.length === 5)
                return;
            this.activeList.push({
                giftName: '',
                num: 0,
                probability: 0,
                giftDescription: '',
                url: ''
            })
        },
        deleteThis(index) {
            this.activeList.splice(index, 1)
        },
        upData(index) {
            this.activeList = this.swapItems(this.activeList, index, index - 1)
        },
        downData(index) {
            this.activeList = this.swapItems(this.activeList, index, index + 1)
        },
        swapItems: function (arr, index1, index2) {
            arr[index1] = arr.splice(index2, 1, arr[index1])[0]
            return arr
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.add {
    height: 1rem;
    border: 1px dashed #d32a09;
    border-radius: 0.5rem;
    width: 100%;
    margin: 0.3rem auto;
    display: flex;
    justify-content: center;
    color: #d32a09;
    color: 0.3rem;
    align-items: center;
}

.tool-bar {
    position: absolute;
    height: 0.8rem;
    top: -0.8rem;
    width: 8.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
}

.tool-bar span {
    display: inline-block;
    width: 1.5rem;
    height: 0.6rem;
    font-size: 0.4rem;
    line-height: 0.6rem;
    text-align: center;
    border-radius: 5px;
    margin: 0 5px;
    background: #000;
}

.wrap-tuan {
    position: relative;
    margin: 0.2rem auto;
    height: 9rem;
    border-radius: 5px;
    background: #ffbe00;
    padding: 0.1px;
    border: 1px dashed #d32a09
}

.people-wrap {
       width: 3rem;
    margin: 0.1rem;
    height: 3rem;
    line-height: 1.8rem;
    text-align: center;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
}
.people-wrap input{
    width: 2rem;
}
.prize-wrap {
    width: 4rem;
    margin: 0.1rem;
    height: 3rem;
    line-height: 1.4rem;
    text-align: center;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.prize-wrap div{
    width: 100%;
}
input {
    background: transparent;
    border: 2px dashed #d32a09;
    width: 1rem;
    height: 1rem;
    border-radius: 5px;
    text-align: center;
}

input:focus {
    outline: none;
}
</style>
