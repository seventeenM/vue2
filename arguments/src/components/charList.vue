<template>
<div>


  <el-table
    :data="tableData"
    style="width: 100%" >
    <el-table-column
      label="name"
      prop="name">
    </el-table-column>
    <el-table-column
      label="内容"
      prop="content">
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

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  export default {
    data() {
      return {
        tableData:[],
        oldData: [],
        currentPage: 1,
        totalCount: 10,   
        pagesize: 5,
      }
    },
    mounted(){
      this.getShu();
    },
     methods: {
       getShu(){

           var _this=this;
            this.$http.get("/api/char/char_list").then(function(data){ 
                _this.oldData = data.data.data;
                _this.tableData=_this.oldData.slice(0,_this.pagesize);
                _this.totalCount=data.data.data.length;
            })

       },
      handleEdit(index, row) {
           this.$router.push({
            name:"amend_char",
            params:{data:row}
          })

      },
      handleDelete(index, row) {
        var _this=this;
          this.$http.post("/api/char/remove_char",{
             id:row.id
          }).then(function(data){
             
                  if(data.data.code=="6021"){
                      _this.getShu();
                     _this.$message({
                                message: "删除成功!！",
                                type: 'success'
                      });
                  }
              })
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
            name:"amend_char",
            params:{data:row}
          })
         
      } 
    }
  }
</script>