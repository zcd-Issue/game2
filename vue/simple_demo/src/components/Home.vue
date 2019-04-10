<template>
  <div class="hello">
  	<mt-tabbar v-model="selected">
		  <mt-tab-item id="Home">
		    <img slot="icon" src="../assets/img/home1.jpg" v-if="selected=='Home'" >
		    <img slot="icon" src="../assets/img/home.jpg" v-else>
		    首页
		  </mt-tab-item>
		  <mt-tab-item id="Course">
		    <img slot="icon" src="../assets/img/course1.jpg" v-if="selected=='Course'">
		    <img slot="icon" src="../assets/img/course.jpg" v-else>
		    课程
		  </mt-tab-item>
		  <mt-tab-item id="Found">
		    <img slot="icon" src="../assets/img/found1.jpg" v-if="selected=='Found'">
		    <img slot="icon" src="../assets/img/found.jpg" v-else>
		    发现
		  </mt-tab-item>
		  <mt-tab-item id="my">
		  	<i class="icon iconfont icon-people display" ></i>
		    <!--<img slot="icon" src="../assets/img/my.jpg">-->
		    <!--<img slot="icon" src="../assets/img/my1.jpg">-->
		    我的
		  </mt-tab-item>
		</mt-tabbar>
		
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      selected: 'Home'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.mint-tabbar > .mint-tab-item.is-selected{
	color: #4ab6de;
	background: #fafafa;
}
.mint-tab-item{
	color: #c5c5c5;
}
.display{
	display: block;
}
</style>
