/**
 * Created by petitspois on 15/3/11.
 */
define(['petitspois','vue','loadin'],function($, Vue, loadin){

    //tab
    $('#tab-user').children().on('click',function(){
        $('#tab-user').children().each(function(){
            $(this).removeClass('active');
        });
        $(this).addClass('active');
    });

    //loadmore

    var page = 1;

    Vue.config.delimiters = ['(%', '%)'];

    new Vue({
        el:'#v-more',
        data:{
            ops:[],
            extra:remain
        },
        methods:{
            more:function(e){
                var me = this;
                loadin.show('load');
                var url = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
                if(url){
                    page++;
                    $.ajax({url:'/user/'+ url,type:'POST',data:{page:page}}).then(function(ret){
                        ret = JSON.parse(ret);
                        me.ops = me.ops.concat(ret.data);
                        me.extra = ret.extra;
                        loadin.hide();
                    },function(){});
                }
            }
        }
    });


});