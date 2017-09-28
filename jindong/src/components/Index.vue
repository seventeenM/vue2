<template>
  <div class="main">
     <div id="wrap" style="height:100%;" 
                                v-infinite-scroll="loadMore"
                                infinite-scroll-disabled="loading"
                                infinite-scroll-distance="10">
       <header class="header">
                <i class="fa fa-search left"></i>
                <p><input type="text" placeholder="联想笔记本电脑"/></p> 
                <i class="fa fa-search right"></i>
         </header>
       <div id="scroll">
         
            <section class="content" id="sec">
                 <div class="banner">
                 
                    <mt-swipe :auto="4000">
                        <mt-swipe-item v-for="k in data.banner">  
                            <img v-lazy="k.img1" alt=""/>
                            <img v-lazy="k.img" alt=""/>
                        </mt-swipe-item>
                      
                    </mt-swipe>
                   
                 </div>
                 <div class="nav">

                       <mt-swipe :auto="0">
                            <mt-swipe-item> 
                                <div class="alls">
                                    <dl v-for="n in data.nav">
                                        <dt><img v-lazy="n.src" alt=""/></dt>
                                        <dd>
                                            {{n.name}}
                                        </dd>
                                    </dl>
                              
                                </div>     
                            
                            </mt-swipe-item>
                            <mt-swipe-item>
                                <div class="alls">
                                    <dl v-for="n in data.nav">
                                        <dt><img v-lazy="n.src" alt=""/></dt>
                                        <dd>
                                            {{n.name}}
                                        </dd>
                                    </dl>
                                </div>     
                            </mt-swipe-item>
                        </mt-swipe>

                 </div>
                 <div class="hot">
                   <p><span>京东</span> <span>快报</span>   Iphone手机最神奇的功能，原来| <a>更多</a></p>
                 </div>
                 <div class="miaosha">
                        <div class="m_top">
                        <b><i class="fa fa-clock-o"></i>京东秒杀</b>
                        12点场<span class="time">00</span>:<span class="time">02</span>:<span class="time">14</span>
                        <span class="right">京东尖货轮番秒<i class="fa fa-angle-right f16"></i></span>
                        </div>
                        <div class="m_main" id="wrapper">
                          <div id="scroller">
                            <div class="m_sub" v-for="i in data.m_main">
                                <img  v-lazy="i.src" alt="">
                                <p>￥{{i.price}}</p>
                                <span>{{}i.old}</span>
                            </div>
                          
                           
                          </div>
                        </div>
                 </div>
                 <div class="classify">
                     <img src="img/hr/floor_tit.png" alt=""/>
                     <div class="classify_find">
                        <div class="child" v-for="j in data.oneSelf">
                            <h3><img  v-lazy="j.s1" alt=""/></h3>
                            <p>{{j.con}}</p>
                              <div class="imgs">
                               <p v-for="s in j.arr"> <img v-lazy="s"  alt=""/></p>
                             </div>
                        </div>
                         
                     </div>
                 </div>
                 <div class="longImg">
                   <img v-lazy="item" alt=""/>
                 </div>
                   <div class="classify">
                     <div class="classify_find">

                        <div class="child" v-for="j in data.childs">
                             <h2>{{j.s1}}</h2>
                            <p class="red">{{j.con}}</p>
                              <div class="imgs">
                              <p v-for="s in j.arr"> <img v-lazy="s"  alt=""/></p>
                             </div>
                        </div>
                    </div>
                   </div>

                   <div class="banner small">
                 
                    <mt-swipe :auto="2000">
                        <mt-swipe-item>  
                            <img src="img/banner/swiper/1/01.jpg" alt=""/>
                          
                        </mt-swipe-item>
                        <mt-swipe-item>
                            <img src="img/banner/swiper/2/01.jpg" alt=""/>
                        
                        </mt-swipe-item>
                        <mt-swipe-item>
                            <img src="img/banner/swiper/3/01.jpg" alt=""/>
                            
                        </mt-swipe-item>
                    </mt-swipe>
                   
                 </div>
                    <div class="classify">
                     <div class="classify_find">
                      
                         <div class="child" v-for="j in data.childs">
                             <h2>{{j.s1}}</h2>
                            <p class="blue">{{j.con}}</p>
                              <div class="imgs">
                              <p v-for="s in j.arr"> <img v-lazy="s"  alt=""/></p>
                             </div>
                        </div>
                        
                       
                     </div>
                 </div>
                   <div class="banner small">
                 
                    <mt-swipe :auto="2000">
                        <mt-swipe-item>  
                            <img src="img/header_swiper/01.jpg" alt=""/>
                          
                        </mt-swipe-item>
                        <mt-swipe-item>
                            <img src="img/header_swiper/02.jpg" alt=""/>
                        
                        </mt-swipe-item>
                      
                    </mt-swipe>
                   
                 </div>

                   <div class="classify">
                     <div class="classify_find">

                      <div class="child" v-for="j in data.childs">
                             <h2>{{j.s1}}</h2>
                            <p class="purple">{{j.con}}</p>
                              <div class="imgs">
                              <p v-for="s in j.arr"> <img v-lazy="s"  alt=""/></p>
                             </div>
                        </div>

                
                        <div class="child">
                            <div class="all_child">
                               <div class="left">
                                    <h2>玩3C</h2>
                                    <p class="purple">发现品质生</p>
                                    <div class="imgs">
                                        <p> <img src="img/product/01 (47).jpg" alt=""/></p>
                                
                                    </div>
                                </div>
                               <div class="right">
                                    <h2>玩3C</h2>
                                    <p class="purple">发现品质生</p>
                                    <div class="imgs">
                                        <p> <img src="img/product/01 (48).jpg" alt=""/></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div class="child">
                            <div class="all_child">
                               <div class="left">
                                    <h2>玩3C</h2>
                                    <p class="purple">发现品质生</p>
                                    <div class="imgs">
                                        <p> <img src="img/product/01 (47).jpg" alt=""/></p>
                                
                                    </div>
                                </div>
                               <div class="right">
                                    <h2>玩3C</h2>
                                    <p class="purple">发现品质生</p>
                                    <div class="imgs">
                                        <p> <img src="img/product/01 (48).jpg" alt=""/></p>
                                    </div>
                                </div>
                            </div>
                        </div>


                     </div>


                 </div>
               


                <div class="banner small">
                 
                    <mt-swipe :auto="2000">
                        <mt-swipe-item>  
                            <img src="img/header_swiper/03.jpg" alt=""/>
                          
                        </mt-swipe-item>
                        <mt-swipe-item>
                            <img src="img/header_swiper/04.jpg" alt=""/>
                        
                        </mt-swipe-item>
                      
                    </mt-swipe>
                   
                 </div>

                 
                  <div class="banner big">
                 
                    <mt-swipe :auto="0">
                        <mt-swipe-item>  
                            <img src="img/header_swiper/05.jpg" alt=""/>
                          
                        </mt-swipe-item>
                        <mt-swipe-item>
                            <img src="img/header_swiper/06.jpg" alt=""/>
                        
                        </mt-swipe-item>
                      
                    </mt-swipe>
                   
                 </div>

                 <div class="apps" id="wrapper1">
                          <div id="scroller1">
                        
                            <dl>
                                    <dt><img src="img/header_swiper/01.jpg" alt=""/></dt>
                                    <dd>美食</dd>
                            </dl>
                            <dl>
                                    <dt><img src="img/header_swiper/02.jpg" alt=""/></dt>
                                    <dd>潮搭</dd>
                            </dl>
                            <dl>
                                    <dt><img src="img/header_swiper/03.jpg" alt=""/></dt>
                                    <dd>男神</dd>
                            </dl>
                   
                          </div>
                 </div>


                   <div class="classify">
                     <div class="classify_find">
                              
                                <div class="child" v-for="j in data.childs">
                                    <h2>{{j.s1}}</h2>
                                    <p class="red">{{j.con}}</p>
                                    <div class="imgs">
                                    <p v-for="s in j.arr"> <img v-lazy="s"  alt=""/></p>
                                    </div>
                                </div>
                          
                         </div>
                 </div>

                 
            </section>
            <div class="pagination" id="pad">
                      加载中...
           </div>
            </div>
        </div>
    </div>
</template>
<script>
  let data=require("../../data/data.js");
  
   export default{
       data(){
           return {
               items:"img/banner/swiper/1/01.jpg",
               item:"img/hh_02.jpg",
               data:data
           }
       },
       methods:{
                
                loadMore() {
                  
                 var pad=document.getElementById("pad");
                 var sec=document.getElementById("sec");
                       pad.style.display = "block";
                    setTimeout(() => {
                    
                       var arr=data.subChilds;
                       var str="";
                      for(var i=0;i<arr.length;i++){
                            str+=`<div class="child">
                             <h2>${arr[i].s1}</h2>
                            <p class="blue">${arr[i].con}</p>
                              <div class="imgs">
                              <p> <img src='${arr[i].arr}'  alt=""/></p>
                             </div>
                        </div>`        
                     }

                      sec.innerHTML+=`<div class="classify"><div class="classify_find">${str} </div></div>`;
                    
                      pad.style.display = "none";
                      
                    }, 2500);
                  
                }

       },
      mounted(){

      
        
        new this.$Iscroll("#wrapper",{
             scrollX:true,
             scrollY:false,
             mouseWheel: true,
            
         });

        new this.$Iscroll("#wrapper1",{
             scrollX:true,
             scrollY:false,
             mouseWheel: true,
             //scrollbars: true
         });

      
      }
   }
</script>