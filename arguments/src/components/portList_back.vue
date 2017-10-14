<template>
  <div>
  <el-table
    :data="tableData"
    border
    @row-dblclick="handleclick"
    style="width: 100%">
    
    <el-table-column
      prop="title"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="backorfont"
      label="前后台"
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
        totalCount: 10,   
        pagesize: 5,
      }
    },
    created(){

       this.getShu();
    
    },
     methods: {
       getShu(){
            var _this=this;
            this.$http.get("/api/apilist/list?type=back").then(function(data){ 
                
                _this.oldData = data.data.data;
                _this.totalCount=data.data.data.length;
                _this.tableData=_this.oldData.slice(0,_this.pagesize);

            })
       },
      handleEdit(index, row) {
       
        this.$router.push({
          name:"amend_port",
          params:{data:row}
        })
      
      },
      handleDelete(index, row) {
        var _this=this;
          this.$http.post("/api/apilist/delete",{
             id:row.id 
          }).then(function (response) {
            var info=response.data;
            switch(info.code){
              case "2032":
                this.getShu();
                alert(info.msg)
               
              break;
              case "2031":
                alert(info.msg)
              break;
            }
          },function (error) {
              console.log(error);
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
            name:"amend_port",
            params:{data:row}
          })
      } 
    }
  }
</script>