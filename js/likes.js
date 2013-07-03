function likes(like, id, type)
{
    $.ajax({
        type: "GET",
        url: 'getLikes.php',
        data: {like: like, id: id, type: type},
        success: function (data)
        {
            if (data)
            {
                if (like=='Like')
                {
                    $('#stat_'+id).removeClass('btn-success').addClass('btn-danger');
                    $('#stat_'+id).html('Unlike');
                }
                else
                {
                    $('#stat_'+id).removeClass('btn-danger').addClass('btn-success');
                    $('#stat_'+id).html('Like');
                }
            }
        }
    });
    return;
}
function search(keyword)
{
    $.ajax({
        type: "GET",
        url: ' https://api.github.com/legacy/repos/search/'+keyword,
        success: function (data)
        {
            for (var key in data) 
            {
                // var val = data[key];
                //alert (key+' = '+val);
            }
        }
    });
    
    $.ajax({
        type: "GET",
        url: 'getLikes.php',
        data: {like: $(this).html(), type:'User'},
        success: function (data)
        {
            var getdata = $.parseJSON(data);
            var out='';
            for (var i=0; i<getdata.length;i++)
            {
                st ='';
                if (getdata[i].status)
                {
                    $('#stat_'+getdata[i].id).addClass('btn-success');
                    $('#stat_'+getdata[i].id).html('Like');
                }
                else
                {
                    $('#stat_'+getdata[i].id).addClass('btn-danger');
                    $('#stat_'+getdata[i].id).html('Unlike');
                }
                $('#stat_'+getdata[i].id).data('action', getdata[i].id);
            }
        }
    });
    
}    