<template>
    <div>前端接口测试</div>
</template>
<script>
import request from '@/utils/service'
export default {
    data () {
        return {}
    },
    created () {
        this.register().then(res => {
            console.log(res)
            if (res.data.msg) {
                this.$message.success(res.data.msg)
            }
        })
    },
    methods: {
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
        }
    }
}
</script>
