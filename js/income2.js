/**
 * Created with JetBrains PhpStorm.
 * User: adam
 * Date: 11/24/13
 * Time: 4:25 PM
 * To change this template use File | Settings | File Templates.
 */

var sumRevenue = function() {
    console.log("sumRevenue called");
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

$('input.revenue').change(function(){
    sumRevenue();
});

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
    //$(".editable_field").on("click", switchToInput);
    $('input.revenue').change(function() {
        sumRevenue()
    });

});