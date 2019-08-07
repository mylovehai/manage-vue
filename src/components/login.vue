<template>

  	<div >

	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p style="color: rebeccapurple">商家管理系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.email" placeholder="请输入邮箱"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm" class="submit_btn">登陆</el-button>
				  	</el-form-item>
				</el-form>
				<!--<p class="tip">温馨提示：</p>-->
				<!--<p class="tip">未登录过的新用户，自动注册</p>-->
				<!--<p class="tip">注册过的用户可凭账号密码登录</p>-->
	  		</section>

	  	</transition>

  	</div>


</template>

<script>
  import {Login} from "../api/api";

  export default {
	    data(){
			return {
				loginForm: {
					email: '',
					password: '',
				},
				showLogin: false,
			}
		},
		mounted(){
      this.showLogin = true;

			},

		methods: {
      async submitForm(){

        let config ={
          headers: {
            'X-Order-Token': localStorage.getItem('token')
          },
        }
        this.$axios.post(Login, {'email':this.loginForm.email, 'password':this.loginForm.password},
          config).then(res => {
              if (res.data.errno == 0) {

                // 接收到token后将token存储到localstorage// 前缀必须要加
                //"Bearer " +
                localStorage.setItem('token',res.data.data.token)
                console.log(localStorage.getItem('token'))

                if(localStorage.getItem('token')){ //判断本地是否存在access_token
                  this.$router.push('/myshop')
                }else {
                  this.$router.push('/');
                }
              }else {
                this.$router.push('/');
                this.$message({
                  type: 'fail',
                  message: res.data.data
                })
              }
          })

        //this.$router.push('myshop')
      }
		},

	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
