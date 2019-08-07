<template>
    <div>
      <el-form ref="form" :model="form" label-width="80px" style="width: 60%;
        margin-left: 50px;margin-top: 50px">
        <el-form-item label="商店名称">
          <el-input v-model="form.shopname"></el-input>
        </el-form-item>

        <el-form-item label="联系人">
          <el-input v-model="form.contact_man"></el-input>
        </el-form-item>

        <el-form-item label="联系电话">
          <el-input v-model="form.contact_mobile"></el-input>
        </el-form-item>

        <el-form-item label="门店图片">
          <img style="width: 20%;height: 20%" v-bind:src="form.store_img">
          <br>
          <el-upload class="upload-demo"
                     style="width: 300px;margin-left: 300px"
                     action="https://morder.mxdanqing.xyz/admin/shop/storeImg"
                     name="storeImg"
                     :on-success="handleStoreSuccess"
                     :before-upload="beforeStoreUpload"
                     ref="newupload"
                     accept=".jpg,.pgn">
            <el-button slot="trigger" size="small" type="primary" style="width: 100px">修改图片</el-button>
            <div class="el-upload__tip" slot="tip" style="color: red">请注意您只能上传.jpg.pgn格式的文件</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="logo图片">
          <img  style="width: 20%;height: 20%" v-bind:src="form.logo_img">
          <br>
            <el-upload class="upload-demo"
                       style="width: 300px;margin-left: 300px"
                       action="https://morder.mxdanqing.xyz/admin/shop/logoImg"
                       name="logoImg"
                       :on-success="handleLogoSuccess"
                       :before-upload="beforeLogoUpload"
                       ref="newupload1"
                       accept=".jpg,.pgn">
              <el-button slot="trigger" size="small" type="primary" style="width: 100px">修改图片</el-button>
              <div class="el-upload__tip" slot="tip" style="color: red">请注意您只能上传.jpg.pgn格式的文件</div>
            </el-upload>
        </el-form-item>

        <el-form-item label="门店地址">

          <el-input placeholder="省" v-model="form.province"></el-input>
          <el-input placeholder="市" v-model="form.city"></el-input>
          <el-input placeholder="区" v-model="form.district"></el-input>
          <el-input placeholder="详细地址" v-model="form.address"></el-input>
        </el-form-item>

        <el-form-item label="外卖电话">
          <el-input  v-model="form.mobile"></el-input>
        </el-form-item>

        <el-form-item label="商家公告">
          <el-input  type="textarea" v-model="form.notice"></el-input>
        </el-form-item>

        <el-form-item label="餐盒费用">
          <el-input  v-model="form.box_cost"></el-input>
        </el-form-item>

        <el-form-item label="配送运费">
          <el-input  v-model="form.send_cost"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>

        </el-form-item>
      </el-form>




    </div>
</template>

<script>
  import {ShopInfo,ChangeShopInfo,LogoImg,StoreImg} from "../api/api";

  export default {
        name: "myshop",
      data(){
          return{
            form: {
              shopname:'',
              contact_man:'',
              contact_mobile:'',
              province:'',
              city:'',
              district:'',
              address:'',
              mobile:'',
              notice:'',
              box_cost:'',
              send_cost:'',
              logo_img:'',
              store_img:''
            },
            LogoImg:'https://morder.mxdanqing.xyz/admin/shop/logoImg',
            StoreImg:'https://morder.mxdanqing.xyz/admin/shop/StoreImg'
          }
      },
      methods:{

        onSubmit:function (){
          let config ={
            headers: {
              'X-Order-Token': localStorage.getItem('token')
            },
          }

          let list = {}
          list.shopname = this.form.shopname
          list.contact_man = this.form.contact_man
          list.contact_mobile = this.form.contact_mobile
          list.province = this.form.province
          list.city = this.form.city
          list.district = this.form.district
          list.address = this.form.address
          list.mobile = this.form.mobile
          list.notice = this.form.notice
          list.box_cost = this.form.box_cost
          list.send_cost = this.form.send_cost
          list.store_img = this.form.store_img
          list.logo_img = this.form.logo_img
          this.$axios.post(ChangeShopInfo,
            {'list': list},config).then(res => {
            if (res.data.data == '保存成功') {
              this.$message({
                type: 'success',
                message: '保存成功'
              });
              this.getShopInfo()
            }
          })
        },
        handleStoreSuccess(res, file) {
          this.form.store_img = res.data.fileUrl;
        },
        beforeStoreUpload(file) {

        },

        handleLogoSuccess(res, file) {
          this.form.logo_img = res.data.fileUrl;
        },
        beforeLogoUpload(file) {

        },
        getShopInfo() {
          let config ={
            headers: {
              'X-Order-Token': localStorage.getItem('token')
            },
          }
          this.$axios.post(ShopInfo,{},config).then(res => {
            if (res.data.data){
              this.form.shopname = res.data.data.shopname
              this.form.contact_man = res.data.data.contact_man
              this.form.contact_mobile = res.data.data.contact_mobile
              this.form.province = res.data.data.province
              this.form.city = res.data.data.city
              this.form.district = res.data.data.district
              this.form.address = res.data.data.address
              this.form.mobile = res.data.data.mobile
              this.form.notice = res.data.data.notice
              this.form.box_cost = res.data.data.box_cost
              this.form.send_cost = res.data.data.send_cost
              this.form.store_img = res.data.data.store_img
              this.form.logo_img = res.data.data.logo_img
            }else {
              console.log('获取数据失败')
            }
          })
        }

      },
      mounted() {
        this.getShopInfo();
        console.log(configToken)
      }

    }
</script>

<style>

</style>
