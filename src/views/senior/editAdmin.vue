<template>
    <div class="edit-container">
        <el-form :model="Form" :rules="Form.rules" ref="ruleForm" label-position="left" class="card-box admin-form">
            <el-form-item :rules="[
            {required: true, message: '密码不能为空'},
            {min: 5, message: '密码不能小于3位'}
            ]" label="密码" prop="password" label-width="80px">
                <el-input v-model="Form.password"></el-input>
            </el-form-item>
            <el-form-item :rules="[
            {required: true, message: '手机号码不能为空'},
            {min: 11, message: '手机号码是11位'}
            ]" label="手机号码" prop="phone" label-width="80px">
                <el-input v-model="Form.phone"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="permission" label-width="80px">
                <el-select v-model="Form.selectedPermission" placeholder="请选择">
                    <el-option v-for="item in Form.cities" :key="item.value" :label="item.label" :value="item.value">
                        <span style="float: left;">{{ item.label }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核状态" prop="permission" label-width="80px">
                <el-select v-model="Form.sttaus" placeholder="请选择">
                    <el-option v-for="item in Form.statusData" :key="item.value" :label="item.label" :value="item.value">
                        <span style="float:left;">{{ item.label }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="地区" prop="region" label-width="80px">
                <v-distpicker @selected="onDistpickerSelected"></v-distpicker>
            </el-form-item>
            <el-form-item :rules="[
                {required: true, message: '地址不能为空'},
                {min: 5, message: '地址不能小于5位'}
            ]" label="详细地址" prop="addressParams.adderss" label-width="80px">
                <el-input v-model="Form.addressParams.address"></el-input>
            </el-form-item>
            <el-form-item label="用户头像" prop="avatar" label-width="80px">
                <el-upload class="avatar-uploader" action="/" :show-file-list="false" :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button style="width:100%;" type="primary" @click="EditAdmin">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
export default {
    data () {
        return {
            Form: {
                phone: '',
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
                selectedAddress: '',
                selectedOptions: [],
                status: '',
                statusData: [{
                    value: '1',
                    label: '已审核'
                }, {
                    value: '9',
                    label: '未审核'
                }],
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
                selectedpermission: ''
            }
        }
    },
    components: {
        VDistpicker
    },
    methods: {
        onDistpickerSelected () {},
        handleAvatarSuccess () {},
        beforeAvatarUpload () {}
    }
}
</script>
