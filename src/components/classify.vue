<template>
<div>
  <el-table
    :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    style="width: 60%;margin-left: 200px"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="name"
      label="分类名字"
      width="200">
    </el-table-column>
    <el-table-column
      prop="information"
      label="分类描述"
      width="230">
    </el-table-column>

    <el-table-column
      prop="statusText"
      label="状态">
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleChangeStatus(scope.$index, scope.row)">修改状态</el-button>

      </template>

    </el-table-column>

  </el-table>

  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[5, 10, 20, 40]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="this.tableData2.length">
  </el-pagination>


  <el-dialog :visible.sync="show" title="分类商品" :append-to-body="true" style="width: 80%;">

    <el-form style="margin-left: 100px;" :model="list2" ref="list2">

      <el-form-item label="分类" style="width: 300px;" prop="name">
        <el-input  v-model="list2.name1"></el-input>
      </el-form-item>

      <el-form-item label="描述" style="width: 300px;" prop="information">
        <el-input v-model="list2.information1"></el-input>
      </el-form-item>

      <el-button  style="margin-left: 100px" @click="change">修改</el-button>

    </el-form>
  </el-dialog>
</div>
</template>

<script>
  import {CategoryList, Change, Delete, Status} from "../api/api";

    export default {
        name: "classify",
      data(){
          return{
            tableData2: [],
            list2:{
              id:'',
              name1: '',
              information1: ''
            },
            currentPage:1, //初始页
            pagesize:10,
            show:false,


          }
      },
      methods:{
        handleEdit(index, row) {

          this.list2.name1 = row.name
          this.list2.information1 = row.information
          this.list2.id =row.id
          this.show = true

        },
        handleSizeChange: function (size) {
          this.pagesize = size;
          console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          console.log(this.currentPage)  //点击第几页
        },
        change(){
          let config ={
            headers: {
              'X-Order-Token': localStorage.getItem('token')
            },
          }
          this.$axios.post(Change,
            {'name':this.list2.name1,
             'information':this.list2.information1,
              'id':this.list2.id
            },config).then(res => {
              if (res.data.errno == 0) {
                this.$message({
                  type:'success',
                  message:'保存成功'
                })
                this.getCategoryList()
                this.show = false
              }
          })
        },
        handleDelete(index, row) {
          this.list2 = row
          this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let config ={
              headers: {
                'X-Order-Token': localStorage.getItem('token')
              },
            }
            this.$axios.post(Delete,
              {'id': this.list2.id},config).then(res => {
              if (res.data.data == '删除成功') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getCategoryList();
              }
            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        handleChangeStatus(index, row) {
          this.list2 = row
          console.log(row)
          if (this.list2.status == 1){
            let config ={
              headers: {
                'X-Order-Token': localStorage.getItem('token')
              },
            }
            this.$axios.post(Status,
              {'status':!this.list2.status,
              'id':this.list2.id},config).then(res => {
              if (res.data.data == '切换成功') {
                this.$message({
                  type: 'success',
                  message: '切换成功'
                });
                this.getCategoryList();
              }
            })
          } else {
            let config ={
              headers: {
                'X-Order-Token': localStorage.getItem('token')
              },
            }
            this.$axios.post(Status,
              {'status':1,
                'id':this.list2.id},config).then(res => {
              if (res.data.data == '切换成功') {
                this.$message({
                  type: 'success',
                  message: '切换成功'
                });
                this.getCategoryList();
              }
            })
          }
        },
        getCategoryList(){
          let config ={
            headers: {
              'X-Order-Token': localStorage.getItem('token')
            },
          }
          this.$axios.post(CategoryList,{},config).then(res => {
            this.tableData2=res.data.data;
          })
        }
      },
      mounted(){
        this.getCategoryList();
      }

    }
</script>

<style scoped>

</style>
