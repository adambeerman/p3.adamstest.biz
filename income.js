/**
 * Created with JetBrains PhpStorm.
 * User: adam
 * Date: 11/10/13
 * Time: 2:07 PM
 * To change this template use File | Settings | File Templates.
 */

var switchToInput = function () {
    //create variable $input that contains the previous text contents
    var $input = $("<input>", {
        val: $(this).text(),
        type: "text"
    });
    $input.addClass("editable_field");
    $(this).children().replaceWith($input);
    $input.select();

    //revert back to span when leaving the field
    $input.on("blur", switchToSpan);

};

var switchToSpan = function () {
    //Create variable $span that contains the entered values
    var $span = $("<span>", {
        text: $(this).val()
    });


    $span.addClass("editable_field");
    $span.addClass("dollars");
    $(this).replaceWith($span);
    //When clicked again, the span will change to input
    $span.on("click", switchToInput);
}

// Change to input field when clicked
$(".editable_field").on("click", switchToInput);



var storeFigures = function(){

    $revenue = Number($('#revenue span').text());
    $cos = Number($('#cos span').text());
    if(isNaN($revenue)){
        $('#margin_alert').html("Need revenue figure");
        setTimeout(clearMarginAlert, 3000);
    }
    else if(isNaN($cos)){
        $('#margin_alert').html("Need cost of sales figure");
        setTimeout(clearMarginAlert, 3000);
    }
    else {
        $grossMargin= $revenue - $cos;
        $("#gross_margin span").text($grossMargin);
        $("#gross_margin span").addClass("dollars");
    }

};

var clearMarginAlert = function(){
    $("#margin_alert").html("<br>");
}

$("#income_statement").on('keydown', 'input', function(e) {
    var keyCode = e.keyCode || e.which;

    if (keyCode == 9) {
        e.preventDefault();
        // call custom function here
        $('span').next().select();
    }
});

//Calculate when a calculated_field is clicked.
$(".calculated_field").on("click", storeFigures);