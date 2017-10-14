<template>
<div>
 
  <el-table
    :data="tableData2"
    style="width: 100%"
       @row-dblclick="dbclick"
    :row-class-name="tableRowClassName">
     <el-table-column
      prop="cnname_one"
      label="课程"
      width="180">
    </el-table-column>
    <el-table-column
      prop="editer"
      label="作者"
      width="180">
    </el-table-column>
    <el-table-column
      prop="article_name"
      label="标题">
    </el-table-column>

     <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">查看</el-button>
       
      </template>
    </el-table-column>
  </el-table>

     <div class="block">
    
         <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalCount">
         </el-pagination>

     </div>

</div>
</template>

<style>
  .el-table .info-row {
    background: #c9e5f5;
  }
.cell{
     text-align:center;
}
  .el-table .positive-row {
    text-align:center;
    background: #e2f0e4;
  }
</style>

<script>
  export default {
    methods: {
       dbclick(i){
         this.$parent.obj=i
         this.$router.push({ path: '/cha',query:{data:i}});
      },
      tableRowClassName(row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },
      handleEdit(index, row) {
          this.$parent.obj=row
          this.$router.push({ path: '/cha',query:{data:row} });
      },
       //每页显示数据量变更
      handleSizeChange: function(val) {
          this.pagesize = val;
          this.tableData2=this.oldData.slice((this.currentPage-1)*this.pagesize,((this.currentPage-1)*this.pagesize)+this.pagesize);
      },
      //页码变更
      handleCurrentChange: function(val) {

          this.currentPage = val;

          this.tableData2=this.oldData.slice((this.currentPage-1)*this.pagesize,((this.currentPage-1)*this.pagesize)+this.pagesize);
        
      },
      getShu(){
           var _this=this;
            this.$http.get("/api/front_article/getArticleAll").then(function(data){
            
              if(data.data.code=="6012"){
                    data.data.data.forEach(function(item){
                     
                        if(item.cnname_two==_this.$route.query.data){
                           _this.$parent.obj={cnname_one:item.cnname_one,cnname_two:item.cnname_two};
                           _this.oldData.push(item)
                        }
                    })
                    _this.totalCount=_this.oldData.length;
                    _this.tableData2=_this.oldData.slice(0,_this.pagesize);
              }
          })
      }
    },
    data() {
      return {
        tableData2: [],
        currentPage: 1,
        totalCount: 10,   
        pagesize: 5,
        oldData:[]
      }
    },
    watch:{
      $route(){
          this.oldData=[];
          this.oldData=[];
          this.getShu();
      }
    },
    mounted(){

       this.getShu()

    }
  }
</script>