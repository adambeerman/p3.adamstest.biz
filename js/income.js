/**
 * Created with JetBrains PhpStorm.
 * User: adam
 * Date: 11/24/13
 * Time: 4:25 PM
 * To change this template use File | Settings | File Templates.
 */


/* unformatNumer is a function for stripping entries of any non-numeric values
    it returns only the number, without any letters.
 */
var unformatNumber = function($number) {

    unformattedNumber = $number;

    //reject any values that are not numbers
    var regex = new RegExp("[^0-9-.]", ["g"]),
        unformattedNumber = parseFloat(
            ("" + $number)
                //.replace(/\((.*)\)/, "-$1") // replace bracketed values with negatives
                .replace(regex, '')         // strip out any cruft
        );

    return unformattedNumber;


};

var moneyFormat = function ($number) {

    var
        $symbol = "$",
        $precision = 2,
        $thousand = ",",
        $decimal = ".",
        $formatPos = "%s%v",
        $formatNeg = "-%s%v";

    // Choose format for numbers:
        var $format = $number < 0 ? $formatNeg : $formatPos;

    // Find the base number, and the number of commas required (for thousands placeholders)

    var negative = $number < 0 ? "-" : "",
        base = Math.round(parseInt($number * 100))/100 + "",
        comma = base.length > 3 ? base.length % 3 : 0;

    // Get the numbers before and after the decimal place
    var prefix = base.split('.')[0],
        suffix = base.split('.')[1];

    // Sort out the numbers after the decimal. Add 0's as appropriate.
    if(isNaN($number)){
        return;
    }
    else if(isNaN(suffix)){
        suffix = "00";
    } else if(suffix.length == 1) {
        suffix = suffix + "0";
    }

    //If negative, find absolute value and store a negative placeholder
    var $neg = "$";

    if(prefix < 0) {
        $neg = "-$";
        prefix = Math.abs(prefix);
    }



    return($neg + prefix + "." + suffix);

    //var $numberFormatted =  negative + (mod ? base.substr(0, mod) + $thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + $thousand);

    //console.log($format.replace('%s', $symbol).replace('%v', $numberFormatted));
    // Return with currency symbol added:

    //return $format.replace('%s', $symbol).replace('%v', $numberFormatted);


};

var doFormat = function($number) {
    $number = accounting.unformat($number);
    $number = accounting.formatMoney($number);
    return $number;
}

var sumContents = function($className) {

    //Find the items that have revenue as a class
    var items = document.getElementsByClassName($className);
    var count = items.length;
    var i, sum = 0;
    for(i = 0; i<count; i++){
        sum += parseFloat(unformatNumber(items[i].value));
    }

    var $fnCall = "#"+ $className;

    //Keep the Revenue figure if no numbers entered
    if(isNaN(sum)){
        $($fnCall).html($className);
    }

    //Replace the #revenue html with the sum of the figures
    else {
        $($fnCall).html(moneyFormat(sum));
    }
};

var profitCalc = function() {
    var rev = unformatNumber($('#revenue').html());
    var cos = unformatNumber($('#cos').html());
    var op_ex = unformatNumber($('#op_ex').html());
    var other_ex = unformatNumber($('#other_ex').html());

    //If the values aren't NaN's, then we can begin calculating the profits and margins

    $("#gross_profit").html("Gross Profit");
    $("#gross_margin").html("Gross Margin");
    $("#op_profit").html("Operating Profit");
    $("#op_margin").html("Operating Margin");
    $("#net_profit").html("Net Profit");
    $("#net_margin").html("Net Margin");

    if(rev != 0){
        if(cos != 0){
            var p = rev - cos;
            var m = Math.round(p/rev*100*10)/10;

            $("#gross_margin").html(m+ " %");
            $("#gross_profit").html(moneyFormat(p));


            if(op_ex != 0){
                var o = p - op_ex;
                var om = Math.round(o/rev * 100*10)/10;
                $("#op_profit").html(moneyFormat(o));
                $("#op_margin").html(om+ " %");

                if(other_ex != 0){

                    var ot = o - other_ex;
                    var otm = Math.round(ot/rev*100*10)/10;
                    $("#net_profit").html(moneyFormat(ot));
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
    $(this).val(doFormat($(this).val()));
    //profitCalc();
});


/* ---------------------
When entries are updated, corresponding Profit calculations are updated
  -------------------- */

//Gross Profit Calculation
$('input.revenue','input.cos').change(function(){
    sumContents("cos");
    var $temp = $(this).val();
    console.log($temp);
    $(this).val(moneyFormat($temp));
});


//This isn't specifically useful for P3, but the goal is to increment classes when a category
// has multiple components
var incrementClass = function($currentClass) {
    //Can only do single digit modifications!!!
    // Need to add functionality to move beyond 9.

    //Current number class
    var old_class = Number($currentClass);
    var new_class = old_class+1;
    return new_class.toString();
}

//Functionality for clicking the [+] sign to expand the rows.
$('.expandable').click(function(){
    //Increment up the class and then add the new row before this row
    var myClass = $(this).attr("class");

    //The previous td's class will tell the program what placeholder to use
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
    $('input.' + new_class).change(function() {
        sumContents(new_class);
        var $temp = $(this).val();
        $(this).val(moneyFormat($temp));
    });

    $('input').change(function() {
        $(this).val(doFormat($(this).val));
        profitCalc();
    });

    $(".editable_field").on("click", switchToInput);

});

/* ---------------------------
    Ability to switch the clickable fields between span & input
    -------------------------- */

var switchToInput = function () {
    //create variable $input that contains the previous text contents
    //console.log($(this).attr("class"));
    if(($(this).attr("class").indexOf("year"))>0){
        var $class = "year";
    }
    else {
        var $class = [];
    }


    var $input = $("<input>", {
        val: $(this).text(),
        class: $class,
        align: "right"
    });
    //$input.addClass("editable_field");
    $(this).children().replaceWith($input);
    $input.select();

    //revert back to span when leaving the field
    $input.on("blur", switchToSpan);
};

var switchToSpan = function () {

    //Special check to remove the characters if the class is a "date"
    if($(this).attr('class').indexOf("year")>-1){
        $(this).val(unformatNumber($(this).val()));
    }

    //Create variable $span that contains the entered values
    var $span = $("<span>", {
        text: $(this).val()
    });

    //$span.addClass("editable_field");
    $(this).replaceWith($span);

    //When clicked again, the span will change to input
    $span.on("click", switchToInput);

}

// Change to input field when clicked
$(".editable_field").on("click", switchToInput);

var lockValues = function() {

    //Find the year that user has chosen to rename the document
    $('h3').html($('.year').text() + " - Income Statement");

    //Convert all the background colors to white & remove the lines & headings
    $('td').css("background-color", "white");
    $('tr.new_row').remove();
    $('th').remove();
    $(".empty").css("border-bottom", "2em solid white");
    $(".calculated_field").css("text-decoration", "none");
    $(".calculated_field").css("text-align", "right");

    //Remove borders around the profits & margins
    $('.top_border td').css("border", "none");
    $('.bottom_border td').css("border", "none");

    //Remove cursor view over the spans
    $('span').css("cursor", "auto");

    //Remove editable features for the final print preview
    $('td.editable_field').removeClass('editable_field');
    $('span.editable_field').toggleClass('editable_field');

    $(".editable_field").on("click",function() {
        alert("activated");
    });

    //Underline & bold formats for accounting
    $("#cos, #op_ex, #other_ex").css("border-bottom","1px solid black");
    //$("#cos, #op_ex, #other_ex").css("text-decoration","underline");
    $("#revenue, #cos, #op_ex, #other_ex, #net_profit").css("font-weight", "bold");
    $("#net_profit").css("border-bottom", "1px double black");

    //Reformat the components
    //Particularly, want the components to be indented
    $('span').css("float", "none");
    $('td:first-child:has(span)').css("text-indent", "25px");
    $('td:first-child:has(span)').css("color", "#787878");
    $('.summation').css("text-indent", "25px");

    //Replace inputs with only the values, by finding "each" input in the #income_table
    $('#income_table').find('input').each(function() {
        $(this).replaceWith("<span>" + this.value + "</span>");
    });
};
