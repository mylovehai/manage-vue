<template>
    <div>
      <el-table
        :data="foodsList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 80%;margin-left: 200px">

        <el-table-column
          prop="title"
          label="食品名称"
          width="200">
        </el-table-column>

        <el-table-column
          prop="cate_name"
          label="分类名称"
          width="200">
        </el-table-column>

        <el-table-column
          prop="information"
          label="食品描述"
          width="230">
        </el-table-column>

        <el-table-column
          prop="sell_price"
          label="售价"
          width="100">
        </el-table-column>

        <el-table-column
          prop="statusText"
          width="100"
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
              @click="handleChange(scope.$index, scope.row)">修改状态</el-button>

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
        :total="this.foodsList.length">
      </el-pagination>

      <el-dialog :visible.sync="Dialog" title="食品信息" :append-to-body="true" style="width: 100%">
        <el-form label-width="80px" style="width: 60%;
        margin-left: 50px;margin-top: 50px">
          <el-form-item label="食品名字">
            <el-input v-model="list.title"></el-input>
          </el-form-item>

          <el-form-item label="分类名字">
            <el-select v-model="list.cate_name" placeholder="请选择">
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
                :disabled="item.disabled">
              </el-option>
            </el-select>
            <!--<el-input v-model="list.cate_name"></el-input>-->
          </el-form-item>

          <el-form-item label="食品描述">
            <el-input v-model="list.information"></el-input>
          </el-form-item>

          <el-form-item label="食品图片">
            <img v-bind:src="list.cover" style="width: 50%">
            <br>
            <br>

            <input type="file" value="" id="file" @change="getFile($event)" >
          </el-form-item>


          <el-form-item label="售价">
            <el-input  v-model="list.sell_price"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
  import {FoodsList,DeleteFood,ChangeStatus,ChangeFoodInfo,CategoryList} from "../api/api";

  export default {
        name: "my_menu",
      data(){
        return{
          foodsList: [],
          categoryList:[],
          Dialog:false,
          list:{
            title: '',
            cate_name: '',
            information: '',
            cover: '',
            sell_price:'',
          },
          foodImg:'',
          value:'',

          currentPage:1,
          pagesize:10,

        }
        },
      methods: {
        handleEdit(index, row) {
          this.list.id = row.id
          this.list.title = row.title
          this.list.cate_name = row.cate_name
          this.list.information = row.information
          this.list.cover = row.cover
          this.list.sell_price = row.sell_price
          this.Dialog = true

        },
        handleDelete(index, row) {
          const foodId = row.id;
          let config ={
            headers: {
              'X-Order-Token': localStorage.getItem('token')
            },
          }
          this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.post(DeleteFood,
              {'id': foodId},config).then(res => {
              if (res.data.errno == 0) {
                this.$message({
                  type:'success',
                  message:'删除成功'
                })
                this.getFoodsList();
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        handleChange(index, row) {
          const food = row;
          let config ={
            headers: {
              'X-Order-Token': localStorage.getItem('token')
            },
          }
          this.$axios.post(ChangeStatus,
            {'food':food},config).then(res => {
            if (res.data.errno == 0) {
              this.$message({
                type:'success',
                message:'切换成功'
              })
            }
            this.getFoodsList();
          })
        },
        onSubmit() {
          let form = new FormData()
          form.append('id',this.list.id)
          form.append('title', this.list.title)
          form.append('cate_name', this.list.cate_name)
          form.append('information', this.list.information)
          form.append('file', this.foodImg)
          form.append('sell_price', this.list.sell_price)
          let config = {
            headers: {'Content-Type': 'multipart/form-data',
              'X-Order-Token': localStorage.getItem('token')}
          };
          this.$axios.post(ChangeFoodInfo, form, config).then(res => {
            if (res.data.errno == 0) {
              this.$message({
                type:'success',
                message:'保存成功'
              })
              this.Dialog = false;
              this.getFoodsList();
            }
          })
        },
        getFile(event) {
          console.log(event);
          this.foodImg = event.target.files[0];
        },
        handleSizeChange: function (size) {
          this.pagesize = size;
          console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function (currentPage) {
          this.currentPage = currentPage;
          console.log(this.currentPage)  //点击第几页
        },


        getFoodsList() {
          let config ={
            headers: {
              'X-Order-Token': localStorage.getItem('token')
            },
          }
          this.$axios.post(FoodsList,{},config).then(res => {
            this.foodsList = res.data.data;
          })
        },
        getCategoryList(){
          let config ={
            headers: {
              'X-Order-Token': localStorage.getItem('token')
            },
          }
          this.$axios.post(CategoryList,{},config).then(res => {
            this.categoryList=res.data.data;
          })
        }
      },
      mounted() {
        this.getFoodsList();
        this.getCategoryList();
      }
    }
</script>

<style scoped>

</style>
