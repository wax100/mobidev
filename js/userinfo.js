function parseGetParams() { 
    var $_GET = {}; 
    var __GET = window.location.search.substring(1).split("&"); 
    for(var i=0; i<__GET.length; i++) { 
        var getVar = __GET[i].split("="); 
        $_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
    } 
    return $_GET; 
} 

$(document).ready(function() 
{
    var get = parseGetParams();
    console.log (get.id);
    if (get.id ==undefined)
    
    {
        $('.span3').remove();
        return;
    }
    $.ajax({
        type: "GET",
        url: 'https://api.github.com/users/'+get.id,
        
        success: function (data)
        {
            $('#avatar').attr('src',data.avatar_url);
            $('#name').html(data.name);
            $('#nick').append(data.login);
            $('#foll').append(data.followers);
            $('#company').append(data.company);
            $('#blog').attr('href', data.blog);
            $('#blog').html(data.blog);
            
            $.ajax({
                type: "GET",
                url: 'getLikes.php',
                data: {get: 'get', type:'User', id: data.id },
                success: function (datas)
                {
                    var getdata = $.parseJSON(datas);
                        if (getdata.status==0)
                        {
                            $('#like').addClass('btn-success');
                            $('#like').html('Like');
                        }
                        else
                        {
                            $('#like').addClass('btn-danger');
                            $('#like').html('Unlike');
                        }
                       $('#like').attr('data-action', data.id);
                }
            });
            
        }
    });
    
    $(document).on('click', '#like', function() 
    {
        $.ajax({
        type: "GET",
        url: 'getLikes.php',
        data: {like: $(this).html(), id: $(this).data('action'), type: 'User'},
        success: function (data)
        {
            if (data)
            {
                if (like=='Like')
                {
                    $('#like').removeClass('btn-success').addClass('btn-danger');
                    $('#like').html('Unlike');
                }
                else
                {
                    $('#like').removeClass('btn-danger').addClass('btn-success');
                    $('#like').html('Like');
                }
            }
        }
    });
    return false;
    });
    
    });
