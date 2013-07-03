$(document).ready(function() 
{
    $.ajax({
        type: "GET",
        url: 'https://api.github.com/users/yiisoft/repos',
        
        success: function (data)
        {
            var yii = data[0];
            $('#name').text(data[0].full_name);
            $('#descrp').text(data[0].description);
            $('#watchers').text(data[0].watchers);
            $('#forks').text(data[0].forks);
            $('#op_issues').text(data[0].open_issues);
            $('#homepage').attr('href', data[0].homepage);
            $('#homepage').text(data[0].homepage);
            $('#repo').attr('href', data[0].svn_url);
            $('#repo').text(data[0].svn_url);
            $('#created').text(data[0].created_at);
        }
    });
    
    
    var users= Array();
    var out='';
    var out2='';
    
    $.ajax({
        type: "GET",
        url: 'https://api.github.com/repos/yiisoft/yii/contributors',
        // data: {slice :"(0, 10)"},
        success: function (data)
        {
            for (var i=0; i<5; i++)
            {
                users.push(data[i].id);
                out=out+'<li><span><a  href ="/userinfo.html?&id='+data[i].login+'" id="'+data[i].id+'">'+data[i].login+'</a></span></li>';
                out2=out2+'<li><a class="btn" href ="#" data-type="User" data-action="'+data[i].id+'" id="stat_'+data[i].id+'" ></a></li>';
            }
            $('#list_contr').append(out);
            $('#contr_stat').append(out2);

        },
        complete: function( jqXHR, textStatus )
        {
            $.ajax({
                type: "GET",
                url: 'getLikes.php',
                data: {users: users, type:'User'},
                success: function (data)
                {
                    var getdata = $.parseJSON(data);
                    var out='';
                    for (var i=0; i<getdata.length;i++)
                    {
                        st ='';
                        if (getdata[i].status)
                        {
                            $('#stat_'+getdata[i].id).addClass('btn-danger');
                            $('#stat_'+getdata[i].id).html('Unlike');
                        }
                        else
                        {
                            $('#stat_'+getdata[i].id).addClass('btn-success');
                            $('#stat_'+getdata[i].id).html('Like');
                        }
                    }
                }
            });
        }
    }); 
$(document).on('click', 'a.btn', function() 
    {
        likes($(this).html(), $(this).data('action'),$(this).data('type') );
        return false;
    });
    
});
