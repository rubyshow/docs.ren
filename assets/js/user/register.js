define(['petitspois', 'vue', 'vueValidator', 'msg', 'loadin'], function ($, Vue, valid, msg, loadin) {

    Vue.use(valid);

    var registerForm = new Vue({
        validator: {
            validates: {
                email: function (val) {
                    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
                }
            }
        },
        data: {
            user:{
                name: '',
                email: '',
                pwd: '',
                pwd_re: ''
            }
        },
        methods: {
            submit: function (e) {
                var user = this.$data.user;
                e.preventDefault();
                if (user.pwd != user.pwd_re) {
                    msg('两次密码输入不一致！', 'danger');
                    return;
                }
                loadin.show();
                $.ajax({type:'POST',dataType:'json', url:'/signup',data:user}).then(function(ret){
                    loadin.hide();
                    msg('注册成功！','success');
                    location.replace('/');
                },function(){
                    msg('注册失败，请重试！', 'danger');
                });
            }
        }
    }).$mount('#registerForm');
});