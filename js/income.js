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
    $(this).replaceWith($span);

    //When clicked again, the span will change to input
    $span.on("click", switchToInput);

}

// Change to input field when clicked
$(".editable_field").on("click", switchToInput);


var incrementClass = function($currentClass) {
    //Can only do single digit modifications!!!
    // Need to add functionality to move beyond 9.

    //Current number class
    var old_class = Number($currentClass);
    var new_class = old_class+1;
    return new_class.toString();

}



$('.expandable').click(function(){
    //Increment up the class and then add the new row before this row
    var myClass = $(this).attr("class");

    var new_class = $(this.previousElementSibling).attr("class");
    switch(new_class) {
        case "rev": new_class = "revenue";
            var placeholder = "Revenue";
            break;
        case "cost": new_class = "cos";
            var placeholder = "Cost of Sales";
            break;
        case "opex": new_class = "op_ex";
            var placeholder = "Operating Expense";
            break;
        case "otherex": new_class = "other_ex";
            var placeholder = "Other Expenses";
        default:
            break;
    }

    // Determine the length of the 'class' string - functionality only works for single digits.
    var len = myClass.length-1;

    //Extract the first element of the current class to determine what the new row will be called
    var nth_row = Number(myClass.charAt(len));

    //Increment the class number on the expandable row
    $(this).switchClass(myClass.charAt(len),incrementClass(myClass.charAt(len)));

    //Create the new row to add with the unique ID and class number
    var $row =
        "<tr class = 'hidden'>" +
        "<td class = 'editable_field'><span>(click to rename)</span></td>" +
        "<td class = '"+nth_row+"'>" +
        "<input placeholder='"+placeholder +"' class = '" + new_class + "'></td>" +
        "</tr>";

    //Insert the new row before the expandable section
    $(this).parent().before($row);

    //Allow clicks of the editable field to allow user to modify the name
    $(".editable_field").on("click", switchToInput);
    $('input.revenue').change(function(event) {

        //Find the items that have revenue as a calss
        var items = document.getElementsByClassName("revenue");
        var count = items.length;
        var i, sum = 0;
        for(i = 0; i<count; i++){
            sum += parseFloat(items[i].value);
        }
        //Keep the Revenue figure if no numbers entered
        if(isNaN(sum)){
            $('#revenue').html("Revenue");
        }
        //Replace the #revenue html with the sum of the figures
        else {
            $('#revenue').html(sum);
        }
    });

});

// CREATE FUNCTION FOR SUMMING THE CONTRIBUTORS. SEPARATELY, CALL THOSE FUNCTIONS WITH THE PROPER CLASS NAMES AND HTML

/*$('#revenue').click(function(){
    //Find the items that have revenue as a calss
    var items = document.getElementsByClassName("revenue");
    var count = items.length;
    var i, sum = 0;
    for(i = 0; i<count; i++){
        sum += parseFloat(items[i].value);
    }
    //Keep the Revenue figure if no numbers entered
    if(isNaN(sum)){
        $('#revenue').html("Revenue");
    }
    //Replace the #revenue html with the sum of the figures
    else {
        $('#revenue').html(sum);
    }
});*/

$('#cos').click(function(){
    //Find the items that have cos as a class
    var items = document.getElementsByClassName("cos");
    var count = items.length;
    var i, sum = 0;
    for(i = 0; i<count; i++){
        sum += parseFloat(items[i].value);
    }
    //Keep the class figure if no numbers entered
    if(isNaN(sum)){
        $('#cos').html("Cost of Sales");
    }
    //Replace the #class html with the sum of the figures
    else {
        $('#class').html(sum);
    }
});


//Tab to the next field
// Unsure why this is working for me - I did not set the tab key to work as an "onkeyup"
$('input').keyup(function(e) {
    if (e.keyCode==9) {
        console.log("Tab pressed!");
        $(this).next('input').focus();
    }
});

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
//$(".calculated_field").on("click", storeFigures);

var sumRevenue = function() {
    alert("called");
    //Find the items that have revenue as a calss
    var items = document.getElementsByClassName("revenue");
    var count = items.length;
    var i, sum = 0;
    for(i = 0; i<count; i++){
        sum += parseFloat(items[i].value);
    }
    //Keep the Revenue figure if no numbers entered
    if(isNaN(sum)){
        $('#revenue').html("Revenue");
    }
    //Replace the #revenue html with the sum of the figures
    else {
        $('#revenue').html(sum);
    }
};

$("input.revenue").change(sumRevenue());
/*
$('input.revenue').change(function(event) {

    //Find the items that have revenue as a calss
    var items = document.getElementsByClassName("revenue");
    var count = items.length;
    var i, sum = 0;
    for(i = 0; i<count; i++){
        sum += parseFloat(items[i].value);
    }
    //Keep the Revenue figure if no numbers entered
    if(isNaN(sum)){
        $('#revenue').html("Revenue");
    }
    //Replace the #revenue html with the sum of the figures
    else {
        $('#revenue').html(sum);
    }
});
*/
