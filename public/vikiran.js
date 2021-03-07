
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

$(document).ready(()=>{
    $("#form_admin").submit( (e)=>{
        e.preventDefault();
        $.ajax({
            url: '/society',
            data :{
                society: $('#data1').val(),
                event: $('#data2').val(),
                about: $('#data3').val(),
                r1: " "+$('#data4').val(),
                r2: " "+$('#data5').val(),
                r3: " "+$('#data6').val(),
                r4: " "+$('#data7').val(),
                c1: $('#data8').val(),
                c2: $('#data9').val(),
                venue: $('#data10').val(),
                fee: $('#data11:checked').val(),
                prize: $('#data12').val(),
                max_mem: $('#data13').val(),
                poster:$("#data14").val(),
                date:$("#data15").val(),
                time:$("#data16").val()
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
    $("#form_register").submit( (e)=>{
        e.preventDefault();
        if(eval(total)>4)
            total= $('#sel').val();
        $.ajax({
            url: '/register/'+event,
            data :{
                team_name: $('#data1').val(),
                team_leader: $('#data2').val(),
                enroll_no: $('#data3').val(),
                total_members: total,
                college_name: $('#data4').val(),
                email: $('#data5').val(),
                contact: $('#data6').val(),
                member1: $('#data7').val(),
                member2: $('#data8').val(),
                member3: $('#data9').val(),
                member4:  $('#data10').val(),
                transaction: $('#data11').val()
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
    $("#form_members").submit( (e)=>{
        e.preventDefault();
        $.ajax({
            url: '/register/'+ev+"-"+max_mem,
            method: "POST",
            success : function(data){
                window.location.replace(data.link);
            },
            error:function(err){
                alert(JSON.stringify(err.responseText));
            }
        }); 
    });
});

$(document).ready(()=>{
    $("#form_transaction").submit( (e)=>{
        e.preventDefault();
        $.ajax({
            url: '/sahil_malik/transaction',
            data : {
                transaction_no: $('#data').val(),
            },
            method: "POST",
            success : function(data){
                window.location.replace(data.link);
            },
            error:function(err){
                alert(JSON.stringify(err.responseText));
            }
        }); 
    });
})