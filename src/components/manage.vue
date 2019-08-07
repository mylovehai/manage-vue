<template>
  <el-container style="height:1000px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu background-color="#545c64"
      text-color="#fff" :default-openeds="['1','3','2']"
      >
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>我的店铺</template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="jump">店铺信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>


        <el-submenu index="2">
          <template slot="title"></i>店铺管理</template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="jump1">分类管理</el-menu-item>
            <el-menu-item index="2-2" @click="jump2">添加商品</el-menu-item>
            <el-menu-item index="2-3" @click="jump3">我的菜单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">订单列表</template>
          <el-menu-item-group>
            <el-menu-item index="3-2" @click="jump4">订单管理</el-menu-item>
          </el-menu-item-group>

        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>

      <el-header style="font-size: 20px">


          <span style="margin-left: 200px;color: #ff6859">商铺后台管理系统</span>



        <el-dropdown>
          <i class="el-icon-setting" style="margin-left: 1100px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="quit">退出</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>

        <span style="color: #555555">{{name}}</span>

      </el-header>

      <el-main>
     <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>

</template>

<script>
    export default {
      data() {
        return {
          name:'admin',

        }
      },
      methods:{

        quit:function () {
          //清除token
          // var storage = window.localStorage;
          // storage.clear();
          this.$router.push('/');

        },
        jump:function (){
          this.$router.push('/myshop');

        },
        jump1:function () {
          this.$router.push('/classify');

        },
        jump2:function () {
          this.$router.push('/add_commodity');
        },
        jump3:function () {
          this.$router.push('/my_menu');
        },
        jump4:function () {
          this.$router.push('/order');
        }


      }


    }
</script>


<style>
  .el-header {
    background-color: #7fd1b5;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  body {
      /*background-image: url(/static/beijing.jpg);*/
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center center;
    }



</style>
