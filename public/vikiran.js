
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

$(document).ready(()=>{
    $("#form_admin").submit( (e)=>{
        e.preventDefault();
        $.ajax({
            url: '/event',
            data :{
                event: $('#data1').val(),
                about: $('#data2').val(),
                r1:  $('#data3').val()==''?' ':$('#data3').val().trim(),
                r2:  $('#data4').val()==''?' ':$('#data4').val().trim(),
                r3:  $('#data5').val()==''?' ':$('#data5').val().trim(),
                r4:  $('#data6').val()==''?' ':$('#data6').val().trim(),
                c1: $('#data7').val(),
                c2: $('#data8').val(),
                venue: $('#data9').val(),
                prize: $('#data10').val(),
                max_mem: $('#data11').val(),
                poster:$("#data12").val(),
                date:$("#data13").val(),
                time:$("#data14").val()
            },
            method: "POST",
            success : function(data){
                window.location.replace(data.link);
                alert(JSON.stringify(data.message));
            },
            error:function(err){
                alert(JSON.stringify(err.responseText));
            }
        });
    });
});

$(document).ready(()=>{
    $("#form_admin_update").submit( (e)=>{
        var str= window.location.pathname;
        var id= str.substring(str.lastIndexOf('/')+1);
        e.preventDefault();
        $.ajax({
            url: `/event/${id}`,
            data :{
                event: $('#data1').val(),
                about: $('#data2').val(),
                r1:  $('#data3').val()==''?' ':$('#data3').val().trim(),
                r2:  $('#data4').val()==''?' ':$('#data4').val().trim(),
                r3:  $('#data5').val()==''?' ':$('#data5').val().trim(),
                r4:  $('#data6').val()==''?' ':$('#data6').val().trim(),
                c1: $('#data7').val(),
                c2: $('#data8').val(),
                venue: $('#data9').val(),
                prize: $('#data10').val(),
                max_mem: $('#data11').val(),
                poster:$("#data12").val(),
                date:$("#data13").val(),
                time:$("#data14").val()
            },
            method: "PUT",
            success : function(data){
                window.location.replace(data.link);
                alert(JSON.stringify(data.message));
            },
            error:function(err){
                alert(JSON.stringify(err.responseText));
            }
        }); 
    });
});

$(document).ready(()=>{
    $("#form_register").submit( (e)=>{
        e.preventDefault();
        $.ajax({
            url: `/payment/${event}`,
            data :{
                team_name: $('#data1').val(),
                p1: $('#data2').val(),
                p2: $('#data3').val(),
                p3: $('#data4').val(),
                p4: $('#data5').val(),
                p5: $('#data6').val(),
                college_name: $('#data7').val(),
                email: $('#data8').val(),
                contact: $('#data9').val()
            },
            method: "POST",
            success : function(data){
                window.location.replace(data.link);
                alert(JSON.stringify(data.message));
            },
            error:function(err){
                alert(JSON.stringify(err.responseText));
            }
        }); 
    });
});