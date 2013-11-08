/**
 * Created with JetBrains PhpStorm.
 * User: adam
 * Date: 11/7/13
 * Time: 7:01 PM
 * To change this template use File | Settings | File Templates.
 */

var last_click_result = false;

$('.button').click(function(){
    var selection = $(this).html();

    if(selection == "="){
        var total = eval($('#display').html());
        $('#display').html(total);
        last_click_result = true;
    }
    else {
        if(last_click_result == true){
            console.log("true loop");
            $('#display').html(selection);
            last_click_result = false;
        }
        else { console.log ("false loop");
            $('#display').append(selection);
            last_click_result = false;
        }



    }
});
