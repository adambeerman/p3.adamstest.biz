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

    // Determine the length of the 'class' string - functionality only works for single digits.
    var len = myClass.length-1;
    console.log("length " + len);

    //Extract the first element of the current class to determine what the new row will be called
    var nth_row = Number(myClass.charAt(len));

    //Increment the class number on the expandable row
    $(this).switchClass(myClass.charAt(len),incrementClass(myClass.charAt(len)));

    //Create the new row to add with the unique ID and class number
    var $row =
        "<tr class = 'hidden'>" +
        "<td class = 'editable_field'><span>(click to rename)</span></td>" +
        "<td id = 'revenue_comp_"+nth_row+"' class = '"+nth_row+" editable_field'>" +
        "<input placeholder='Revenue' name='revenue_comp_"+nth_row+"'></td>" +
        "</tr>";

    //Insert the new row before the expandable section
    $(this).parent().before($row);

    //Allow clicks of the editable field to allow user to modify the name
    $(".editable_field").on("click", switchToInput);

});

// CALCULATION OF ALL THE REVENUE COMPONENTS //
var calcRevenue = function(){
    var rev_items = document.getElementsByName("rev_comp_1");
    var rev_item_count = rev_items.length;
    console.log(rev_items);

}

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

$('span').change(function(){
    $("#margin_alert").html("Span Field has changed!");
});