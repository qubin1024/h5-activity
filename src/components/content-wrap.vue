<template>
	<div class="cwrap-1">
    <div class="title-text" v-if="!!title">{{title}}</div>
    <slot>
    </slot>
    </div>
</template>

<script>
export default {
  name: "content-wrap",
  data() {
    return {
    };
  },
  props: {
      title: {
          type: String
      }
  },
  computed:{
  },
  mounted(){
  },
  methods:{
  }
};
</script>

<style scoped>
.cwrap-1{
    background: #fff;
    border-radius: 0.5rem;
    margin: 2.5rem 0.5rem 0.5rem 0.5rem ;
    position: relative;
    padding: 0.7rem 0.5rem 0.5rem 0.5rem;
    min-height: 1rem;
    font-size: 0.4rem;
}
.title-img{
    left: 10%;
    width: 80%;
    position: absolute;
    top: -2rem;
    height: 2.5rem;
}
.title-text{
    position: absolute;
    color: #fff;
    top: -20px;
    font-size: 0.5rem;
    width: 70%;
    left: 15%;
    font-weight: 600;
    text-align: center;
    line-height: 1rem;
    background: linear-gradient(to bottom,rgb(249, 177, 83) 0%,rgb(255, 4, 0) 100%);
    border-radius: 0.5rem;
    box-shadow: -2px 2px 5px 0px #737373;
}
</style>