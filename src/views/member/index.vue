<template>
    <div class="member">
        <div>前端接口测试</div>
        <div class="phone">
            <input type="tel" v-model="phone" placeholder="请输入手机号" name="registerdphone">
            <input type="tel" v-model="code" placeholder="请输入验证码" name="registerdcode">
            <div class="registerd-getcode" @click="getPhoneCheckCode">获取验证码</div>
        </div>
        <hr>
        <div class="pay">
            <button @click="pay">支付</button>
        </div>
        <button>注册</button>
    </div>
</template>
<script>
import request from '@/utils/service'
export default {
    data () {
        return {
            phone: '',
            code: ''
        }
    },
    created () {
        // this.register().then(res => {
        //     console.log(res)
        //     if (res.data.msg) {
        //         this.$message.success(res.data.msg)
        //     }
        // })
        // this.pay()
    },
    methods: {
        // 注册
        register () {
            let datas = {
                username: 'zqq',
                password: '123',
                phone: '17665360871',
                challengecode: '30242',
                MemberToken: ''
            }
            return request({
                url: '/api/Register',
                method: 'post',
                data: datas
            })
        },
        // 发送短信验证码
        getPhoneCheckCode () {
            if (/^1[34578]\d{9}$/.test(this.phone)) {
                request({
                    url: '/api/SendPhoneMessage',
                    method: 'post',
                    data: {
                        phone: this.phone
                    }
                }).then(res => {
                    console.log(res, 'res')
                })
            } else {
                this.$message.error('请填写正确的手机号码')
            }
        },
        // 支付宝当面付
        async pay () {
            const result = await request({
                url: '/api/alipay',
                method: 'post',
                data: {
                    subject: '辣条',
                    out_trade_no: '1232423',
                    total_amount: '1'
                }
            })
            console.log(decodeURIComponent(result.data), 'result')
            // window.location.href = result.data
        }
    }
}
</script>
<style lang="scss" scoped>
.member {
    .phone {
        width: 300px;
        .registerd-getcode {
            background-color: red;
            color: #fff;
            width: 80px;
            display: inline-block;
        }
    }
}
</style>
