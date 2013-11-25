/**
 * Created with JetBrains PhpStorm.
 * User: adam
 * Date: 11/24/13
 * Time: 4:25 PM
 * To change this template use File | Settings | File Templates.
 */

var sumContents = function($className) {

    //Find the items that have revenue as a calss
    var items = document.getElementsByClassName($className);
    var count = items.length;
    var i, sum = 0;
    for(i = 0; i<count; i++){
        sum += parseFloat(accounting.unformat(items[i].value));
    }

    var $fnCall = "#"+ $className;
    //Keep the Revenue figure if no numbers entered
    if(isNaN(sum)){
        $($fnCall).html($className);
    }
    //Replace the #revenue html with the sum of the figures
    else {
        $($fnCall).html(accounting.formatMoney(sum));
    }
};

var profitCalc = function() {
    var rev = accounting.unformat($('#revenue').html());
    var cos = accounting.unformat($('#cos').html());
    var op_ex = accounting.unformat($('#op_ex').html());
    var other_ex = accounting.unformat($('#other_ex').html());

    //If the values aren't NaN's, then we can begin calculating the profits and margins

    $("#gross_profit").html("Gross Profit");
    $("#gross_margin").html("Gross Margin");
    $("#op_profit").html("Operating Profit");
    $("#op_margin").html("Operating Margin");
    $("#net_profit").html("Net Profit");
    $("#net_margin").html("Net Margin");

    if(rev != 0){
        console.log(rev);
        console.log(cos);
        console.log(op_ex);
        console.log(other_ex);
        if(cos != 0){
            console.log("second loop");
            var p = rev - cos;
            var m = Math.round(p/rev*100*10)/10;
            $("#gross_profit").html(accounting.formatMoney(p));
            $("#gross_margin").html(m+ " %");

            if(op_ex != 0){
                var o = p - op_ex;
                var om = Math.round(o/rev * 100*10)/10;
                $("#op_profit").html(accounting.formatMoney(o));
                $("#op_margin").html(om+ " %");

                if(other_ex != 0){

                    var ot = o - other_ex;
                    var otm = Math.round(ot/rev*100*10)/10;
                    $("#net_profit").html(accounting.formatMoney(ot));
                    $("#net_margin").html(otm+ " %");
                }
            }
        }
    }

};

/* ---------------------
 When entries are updated, corresponding "total" is updated as well
 -------------------- */

// On revenue change, sum the contents of the Revenue fields
$('input.revenue').change(function(){
    sumContents("revenue");
});

// On cost of sales change, sum the contents of the Cost of Sales Fields
$('input.cos').change(function(){
    sumContents("cos");
});

// On Op Ex change, sum the contents of the Op Ex Fields
$('input.op_ex').change(function(){
    sumContents("op_ex");
});

// On Other Expenses change, sum the contents of the Other Expenses Fields
$('input.other_ex').change(function(){
    sumContents("other_ex");
});

// When ANY input is changed, reformat for accounting purposes, and call the profitCalc function
$('input').change(function() {
    var $temp = $(this).val();
    $(this).val(accounting.formatMoney($temp));
    profitCalc();
});


/* ---------------------
When entries are updated, corresponding Profit calculations are updated
  -------------------- */

//Gross Profit
$('input.revenue','input.cos').change(function(){
    sumContents("cos");
    var $temp = $(this).val();
    $(this).val(accounting.formatMoney($temp));
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
            "<td class = 'editable_field'><span class = 'editable_field'>(click to rename)</span></td>" +
            "<td class = '"+nth_row+"'>" +
            "<input placeholder='"+placeholder +"' class = '" + new_class + "'></td>" +
            "</tr>";

    //Insert the new row before the expandable section
    $(this).parent().before($row);

    //Allow clicks of the editable field to allow user to modify the name
    //$(".editable_field").on("click", switchToInput);
    $('input.' + new_class).change(function() {
        sumContents(new_class);
        var $temp = $(this).val();
        $(this).val(accounting.formatMoney($temp));
    });

    $(".editable_field").on("click", switchToInput);

});

/* ---------------------------
    Ability to switch the clickable fields between span & input
    -------------------------- */

var switchToInput = function () {
    //create variable $input that contains the previous text contents
    var $input = $("<input>", {
        val: $(this).text(),
        align: "right"
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