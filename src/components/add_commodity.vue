<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" style="width: 60%;
        margin-left: 50px;margin-top: 50px">
      <el-form-item label="食品名字">
        <el-input v-model="form.title"></el-input>
      </el-form-item>


      <el-form-item label="分类名字" style="width: 300px;white-space: nowrap;">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in category"
            :key="item.id"
            :label="item.name"
            :value="item.name"
            :disabled="item.disabled">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit"></el-button>
      </el-form-item>


      <el-form-item label="商品描述">
        <el-input v-model="form.information"></el-input>
      </el-form-item>

      <el-form-item label="食品图片">

        <el-upload
          class="upload-demo"
          action="https://morder.mxdanqing.xyz/admin/foods/addFoodImg/"
          ref="ref1"
          name="foodImg"
          :on-success="handleFoodImgSuccess"
          :before-upload="beforeFoodImgUpload"

          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>


      <el-form-item label="售价">
        <el-input v-model="form.sell_price"></el-input>
      </el-form-item>

      <el-button type="primary" @click="onSubmit">添加商品</el-button>
    </el-form>

    <el-dialog :visible.sync="show" title="添加分类" :append-to-body="true" style="width: 80%;">

      <el-form style="margin-left: 100px;" :model="addCategoryInfo" ref="addCategoryInfo">
        <el-form-item label="分类名称" style="width: 300px;" prop="name">
          <el-input  v-model="addCategoryInfo.name"></el-input>
        </el-form-item>

        <el-form-item label="描述" style="width: 300px;" prop="information">
          <el-input v-model="addCategoryInfo.information"></el-input>
        </el-form-item>

        <el-button  style="margin-left: 100px" @click="addCategory">添加</el-button>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  import {CategoryList, AddCategory, AddFood} from "../api/api";

  export default {
    name: "add_commodity",
    data() {
      return {
        category: [],
        value: '',
        form: {
          title: '',
          information: '',
          cover: '',
          sell_price: '',
        },
        addCategoryInfo:{
          name:'',
          information:''
        },
        show: false

      }
    },
    methods: {
      handleEdit(){
        this.show = true
      },
      addCategory(){
        let config ={
          headers: {
            'X-Order-Token': localStorage.getItem('token')
          },
        }
        const categoryInfo = {
          name:this.addCategoryInfo.name,
          information:this.addCategoryInfo.information
        }
        this.$axios.post(AddCategory, {categoryInfo: categoryInfo},config).then(res=>{
            if (res.data.errno==0){
              this.$message({
                type: 'success',
                message: '成功添加分类'
              })
              this.show = false;
              this.getCategoryList();
            }
        })
      },

      onSubmit: function () {
        const food = {
          title: this.form.title,
          cate_name: this.value,
          information: this.form.information,
          cover: this.form.cover,
          sell_price: this.form.sell_price
        }
        let config ={
          headers: {
            'X-Order-Token': localStorage.getItem('token')
          },
        }
        this.$axios.post(AddFood, {food: food},config).then(res => {
          if (res.data.data == '添加成功') {
            this.$message({
              type: 'success',
              message: '成功添加商品'
            })
            this.form.title = ''
            this.form.information = ''
            this.form.cover = ''
            this.form.sell_price = ''
            this.value = ''
          }
        })
      },
      handleFoodImgSuccess(res, file) {
        if (res.errno != 0) {
          alert('图片上传失败，请重新选择图片')
        } else {
          this.form.cover = res.data.fileUrl;
        }
      },
      beforeFoodImgUpload(file) {

      },
      getCategoryList() {
        let config ={
          headers: {
            'X-Order-Token': localStorage.getItem('token')
          },
        }
        this.$axios.post(CategoryList,{},config).then(res => {
          this.category = res.data.data;
        })
      }
    },
    mounted() {
      this.getCategoryList()
    }
  }
</script>

<style>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
