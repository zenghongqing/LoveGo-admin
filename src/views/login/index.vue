<template>
    <div class="login-container">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px" label-position="left" class="
        card-box login-form">
            <h3 class="title">vue-admin</h3>
            <el-form-item prop="username">
                <span class="svg-container svg-container_login">
                    <svg-icon icon-class="user"></svg-icon>
                </span>
                <el-input type="text" name="username" v-model="loginForm.username" autoComplete="on" placeholder="username" />
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password"></svg-icon>
                </span>
                <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password"></el-input>
                <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"></svg-icon></span>
            </el-form-item>
            <div style="display:flex;flex:1;justify-content:space-between;align-items:center;">
                <a href="javascript:;" style="color:#409EFF;padding:0px 0 15px;"></a>
                <router-link to="/addAdmin" style="color:#409EFF;padding:0px 0 15px;">注册账号</router-link>
            </div>
            <el-form-item>
                <el-button type="primary" style="width:100%" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data () {
        const validateUsername = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入正确的用户名'))
            } else {
                callback()
            }
        }
        const validatePass = (rule, value, callback) => {
            if (value.length < 5) {
                callback(new Error('密码不能小于5位'))
            } else {
                callback()
            }
        }
        return {
            loginRules: {
                username: [{required: true, trigger: 'blur', validator: validateUsername}],
                password: [{required: true, trigger: 'blur', validator: validatePass}]
            },
            loginForm: {
                username: 'zhq',
                password: '123456'
            },
            pwdType: 'password',
            loading: false
        }
    },
    methods: {
        showPwd () {
            if (this.pwdType === 'password') {
                this.pwdType = ''
            } else {
                this.pwdType = 'password'
            }
        },
        handleLogin () {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$store.dispatch('Login', this.loginForm).then(() => {
                        this.loading = false
                        console.log('跳转')
                        this.$router.push({path: '/'})
                    }).catch((e) => {
                        this.$message.error(e)
                        this.loading = false
                    })
                } else {
                    console.log('error submit')
                    return false
                }
            })
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "../../assets/styles/mixin.scss";
    $bg: #2d3a4b;
    $dark_grey: #889aa4;
    $light_grey: #eee;
    .login-container {
        @include relative;
        height: 100vh;
        background-color: $bg;
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_grey;
            height: 47px;
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_grey;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
            &_login {
                font-size: 20px;
            }
        }
        .title {
            font-size: 26px;
            font-weight: 400;
            color: $light_grey;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 400px;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_grey;
            cursor: pointer;
            user-select:none;
        }
        .thirdparty-button{
            position: absolute;
            right: 35px;
            bottom: 28px;
        }
    }
</style>
