<template>

  <div>
    <div class="img-404"></div>
    <div class="btn">
      <el-button type="primary" @click="to">返回首页</el-button>
    </div>
  </div>

</template>

<script>
  export default {
    methods:{
      to(){
        this.$router.push({path:'/'});
      }
    }
  }
</script>

<style lang="scss">
  .img-404{
    background: url("https://i1.fuimg.com/714579/5286364504960fe1.png") center center no-repeat;
    height: 560px;
  }
  .btn{
    margin: 0 auto;
    text-align: center;
    padding: 20px 0;
  }

</style>
