<template>
  <div>
  <el-table
    :data="tableData"
    border
    @row-dblclick="handleclick"
    style="width: 100%">
    
    <el-table-column
      prop="article_name"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="editer"
      label="作者"
      width="180">
    </el-table-column>
    <el-table-column
      prop="time"
      label="时间">
    </el-table-column>
     <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

<script>
  export default {
    data() {
      return {
        oldData:[],
        tableData: [],
        currentPage: 1,
        totalCount: 0,   
        pagesize: 5,
      
      }
    },
    watch:{
      totalCount(){
        console.log(22222)
        // this.tableData=this.tableData
      }
    },
    created(){
       this.getShu();
     
    },
     methods: {
       getShu(){
           var _this=this;
          this.$http.get("/api/back_article/getArticle").then(function(data){ 
              
              _this.oldData = data.data.data;
              _this.totalCount=data.data.data.length;
              _this.tableData=_this.oldData.slice(0,_this.pagesize);
              
          })
       },
      handleEdit(index, row) {
       
       
        this.$router.push({
          name:"amend_art",
          params:{data:row}
        })
      
      },
      handleDelete(index, row) {

        var _this=this;
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {



          this.$http.post("/api/back_article/deleteOne",{
             id:row.id ,
             enname_one:row.enname_one  
          }).then(function (response) {
            var info=response.data;
            switch(info.code){
              case "3041":
                 _this.getShu();
              break;
              case "3040":
                alert(info.msg)
              break;
            }
          },function (error) {
              console.log(error);
          })

         this.$message({
            type: 'success',
            message: '删除成功!'
          });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });



      },
     //每页显示数据量变更
      handleSizeChange: function(val) {
          this.pagesize = val;
          this.tableData=this.oldData.slice((this.currentPage-1)*this.pagesize,((this.currentPage-1)*this.pagesize)+this.pagesize);
      },
      //页码变更
      handleCurrentChange: function(val) {

          this.currentPage = val;

          this.tableData=this.oldData.slice((this.currentPage-1)*this.pagesize,((this.currentPage-1)*this.pagesize)+this.pagesize);
        
      } ,
      handleclick: function(row,event){
     
          this.$router.push({
            name:"amend_art",
            params:{data:row}
          })
      } 

    }
  }
</script>