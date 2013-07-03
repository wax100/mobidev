$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: 'https://api.github.com/users/yiisoft/repos',
        
        success: function (data){
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
    
    $.ajax({
        type: "GET",
        url: 'https://api.github.com/repos/yiisoft/yii/contributors',
        // data: {slice :"(0, 10)"},
        success: function (data)
        {
            var out='';
            for (var i=0; i<5; i++)
            {
                users.push(data[i].id);
                out=out+'<div class="user"><a href ="'+data[i].url+'" id="'+data[i].id+'" target="_blank">'+data[i].login+'</a></div><a class="like" href="#"></a><br>';
            }
            console.log(users);
            var ht = $('#right').html() + out;
            $('#right').html(ht);
        },
        complete: function( jqXHR, textStatus )
        {
            $.ajax({
                type: "GET",
                url: 'getLikes.php',
                data: {users: users},
               // dataType: 'json',
                success: function (data)
                {
                    var getdata = $.parseJSON(data);
                    var st ='';
                    for (var i=0; i<getdata.length;i++)
                    {
                       st ='';
                       if (getdata[i].status)
                       {
                        st ='Unlike'
                       }
                       else
                       {
                        st ='Like'
                       }
                       $('#'+getdata[i].id).parent().next().html(st);
                    }
                }
            });
        }
        
    }); 
    
    
});
