<template>
   <div id="conAll">
    	<header class="header">
			<p>购物车(10)</p>
			<a class="compile">编辑</a>
		</header>
		<section class="content">
			
			<div class="con">
				<div class="shang" v-for="key in alldata">
					<div class="top">
						<input type="checkbox">
					
						<label for="">{{key.name}} <span>></span></label>
					</div>
					<div class="bot">
						<dl v-for="k in key.arr">
							<dt><input type="checkbox"></dt>
							
							<dd><img v-bind:src="k.src" alt=""></dd>
							<dd class="direction">
								<h3>{{k.title}}
									<img src="images/shang_03.jpg" alt="">
								</h3>
								<p>
									<span class="price">￥{{k.price}}</span>
									<span class="yuan">￥{{k.old}}</span>
									<span class="num"><button @click="push(k)">-</button><span>X {{code[k.id]}}</span><button @click="add(k)">+</button></span>
								</p>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		</section>
		<div class="all">
			<p class="check"><input type="checkbox"> 全选</p>
			<p class="sum">合计: <span>￥0</span></p>
			<p class="jie"><button>结算(<span>0</span>)</button></p>
		</div>
		<footer class="footer">
			<ul class="list">
				<li v-test="use">
					<i class="fa fa-home"></i>
					<span>首页</span>
				</li>
				<li>
					<i class="fa fa-heart"></i>
					<span>微淘</span>
				</li>
				<li>
					<i class="fa fa-comment-o"></i>
					<span>消息</span>
				</li>
				<li>
					<i class="fa fa-shopping-cart"></i>
					<span>购物车</span>
				</li>
				<li>
					<i class="fa fa-user-o"></i>
					<span>我的</span>
				</li>
			</ul>
		</footer>


   </div>
</template>
<script>
   import {mapState,mapMutations,mapGetters,mapActions} from "vuex";
   export default {
       computed:mapState(["code","alldata"]),//对象写法
      // computed:mapGetters(["code"]) ,
       data(){
           return {
               brr:null,
			   use:"aaaa",
			   sub:""
           }
       },
        mounted(){
            // this.axios.get("/tab").then(function(rs){
            //   this.brr=rs.data;
            // }.bind(this))
        },
		methods:{
			...mapActions(["dataB"]),
			...mapMutations(["add","push"])
            
		},
		created(){
			this.dataB(this)
		},
       directives:{
          test:{
             componentUpdated(el,binging){
                console.log(binging)
			 },
			  bind(el,binging){
                console.log(binging)
			 },
           }
        }
   
   }


</script>