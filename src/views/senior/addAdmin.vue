<template>
    <div class="admin-container">
        <el-form :model="Form" :rules="Form.rules" label-position="left" class="card-box admin-form">
            <h3 class="title">LoveGo后台管理系统</h3>
            <el-form-item :rules="[
            {required: true, message: '名字不能为空'},
            {min: 3, message: '名字不能少于3位'}
            ]" label="用户名" prop="username" label-width="80px">
                <el-input v-model="Form.username"></el-input>
            </el-form-item>
            <el-form-item :rules="[
            {required: true, message: '手机号码不能为空'},
            {min: 11, message: '手机号码11位'}
            ]" label="手机号码" prop="phone" label-width="80px">
                <el-input v-model="Form.phone"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="permission" label-width="80px">
                <el-select v-model="Form.selectedpermission" placeholder="请选择">
                    <el-option v-for="item in Form.cities" :key="item.value" :label="item.label" :value="item.value">
                        <span style="float: left">{{ item.label }}</span>
                        <span style="float: right;color:#8492a6;font-size:13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="地区" prop="region" label-width="80px">
                <v-distpicker @selected="onDistpickerSelected"></v-distpicker>
            </el-form-item>
            <el-form-item :rules="[
            {required: true, message: '地址不能为空'},
            {min: 5, message: '地址不能小于5位'}
            ]" label="详细地址" prop="Form.addressParams.address" label-width="80px">
                <el-input v-model="Form.addressParams.address"></el-input>
            </el-form-item>
            <el-form-item label="用户头像" prop="avatar" label-width="80px">
                <el-upload class="avatar-uploader" action="http://awei.fun:3333/Unit/uploadfile" :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                    <img v-if="Form.imageUrl" :src="Form.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button style="width:100%;" v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="addAdmin">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
export default {
    data () {
        return {
            fullscreenLoading: false,
            Form: {
                username: '',
                phone: '',
                password: '',
                imageUrl: '',
                addressParams: {
                    province: '',
                    city: '',
                    area: '',
                    address: ''
                },
                rules: {
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'change'
                    }],
                    phone: [{
                        required: true,
                        message: '请输入手机号码',
                        trigger: 'change'
                    }],
                    address: [{
                        required: true,
                        message: '请输入地址',
                        trigger: 'change'
                    }]
                },
                cities: [{
                    value: 'admin',
                    label: '普通管理员'
                }, {
                    value: 'test',
                    label: '测试'
                }, {
                    value: 'root',
                    label: '超级管理员'
                }],
                selectedPermission: ''
            }
        }
    },
    components: {
        VDistpicker
    },
    methods: {
        onDistpickerSelected () {},
        handleAvatarSuccess () {},
        addAdmin () {},
        beforeAvatarUpload () {}
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .admin-container {
    background-color: $bg;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #333;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .admin-form {
      background: #fff;
      border-radius: 10px;
      width: 600px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
}
</style>
