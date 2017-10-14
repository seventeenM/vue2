<template>
<div> 
  <el-table
    :data="tableData5"
     @row-dblclick="handleclick1"
    style="width: 100%">
    <el-table-column type="expand">
      <template scope="props">
             <el-table
                :data="props.row.twodata"
                @row-dblclick="handleclick2"
                style="width: 100%">
                <el-table-column
                  prop="cnname">
                </el-table-column>
                <el-table-column
                  prop="enname">
                </el-table-column>
                <el-table-column>
                  <template scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.$index, scope.row,'two')">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row,'two',props.row.onedata.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
      </template>
    </el-table-column>
    <el-table-column
      label="中文名"
      prop="onedata.cnname">
    </el-table-column>
    <el-table-column
      label="英文名"
      prop="onedata.enname">
    </el-table-column>
     <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row,'one')">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row,'one')">删除</el-button>
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
        tableData5: [],
        currentPage: 1,
        totalCount: 10,   
        pagesize: 5,
        oldData:[]
      }
    },
    created(){
       this.getShu();
    },
     methods: {
       getShu(){
            var _this=this;
            this.$http.get("/api/back_class/class_list").then(function(data){ 
                
                
                  _this.oldData = data.data.data;
                _this.totalCount=data.data.data.length;
                _this.tableData5=_this.oldData.slice(0,_this.pagesize);

            })
       },
      
      handleEdit(index, row,state) {
            if(state=="one"){
               this.$router.push({
                 name:"bianji_one",
                 params:{
                   data:row
                 }
               })
            }else{
               this.$router.push({
                 name:"bianji_two",
                 params:{
                   data:row
                 }
               })
            }
        
      },
      handleDelete(index, row,state,one_id) {
        console.log(row)
       
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          var _this=this;
                if(state=="one"){
                      this.$http.post("/api/back_class/delete_one",{
                            id:row.onedata.id , //一级类名的id
                            enname_one:row.onedata.enname    //一级类名的英文标识
                      }).then(function(data){ 
                        
                         _this.getShu();
                          if(data.code=="1071"){ 
                             
                            alert(data.msg)
                          }
                      })
                }else{
                    this.$http.post("/api/back_class/delete_two",{
                            oneId:one_id,
                            twoId:row.id , //一级类名的id
                            enname_one:row.enname    //一级类名的英文标识
                      }).then(function(data){ 
                        
                         _this.getShu();
                          if(data.code=="1071"){
                            
                            alert(data.msg)
                          }
                      })
                }


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
       handleclick1: function(row,event){
           this.$router.push({
                 name:"bianji_one",
                 params:{
                   data:row
                 }
               })

      } ,
      handleclick2: function(row,event){
          this.$router.push({
                 name:"bianji_two",
                 params:{
                   data:row
                 }
               })

      } ,
      //每页显示数据量变更
      handleSizeChange: function(val) {
          this.pagesize = val;
          this.tableData5=this.oldData.slice((this.currentPage-1)*this.pagesize,((this.currentPage-1)*this.pagesize)+this.pagesize);
      },
      //页码变更
      handleCurrentChange: function(val) {

          this.currentPage = val;

          this.tableData5=this.oldData.slice((this.currentPage-1)*this.pagesize,((this.currentPage-1)*this.pagesize)+this.pagesize);
        
      }
    }
  }
</script>