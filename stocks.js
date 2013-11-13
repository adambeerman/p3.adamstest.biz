/**
 * Created with JetBrains PhpStorm.
 * User: adam
 * Date: 11/9/13
 * Time: 5:13 PM
 * To change this template use File | Settings | File Templates.
 */

// Yahoo Query Language setup - base for all YQL requests
var yql_base_uri = "http://query.yahooapis.com/v1/public/yql?q=";
var yql_query = "select * from csv where url='http://download.finance.yahoo.com/d/quotes.csv?s=";
var yql_query_end = "&f=snl1q0r1d&e=.csv' and columns='symbol,name,price,ex_div_date,div_pay_date,div'";


//Automatically build the portfolio table which if the user has any stocks saved already in local Storage
$(function() {
    print_portfolio();
});

// Listener for when user clicks on the "Add" button to add a new stock to the list
$('#addStock').click(function() {

    //Should have a validation step to ensure that the entered value actually matches a stock from the database

    //Call the function that processes the request
    stockLookup($('#stockSelector').val().toUpperCase());

    //Reset the input field so that it is blank
    $('#stockSelector').val("");
});

//Listener for when user clicks on the "Remove" button to remove a stock from list
$('#rmStock').click(function() {

    //Should have a validation step to ensure that the entered value actually matches a stock from the database

    //Call the function that processes the request
    removeQuote($('#stockSelector').val().toUpperCase());

    //Reset the input field so that it is blank
    $('#stockSelector').val("");
});

function clearError() {
    $('#error_message').html("<br>");
}

function removeQuote(symbol){
    var stocks = new Array();

    //local storage is a browser feature
    //I don't know if this if/else statement is required

    if (!localStorage.getItem('userStocks')) {
        stocks[0] = symbol;
        localStorage['userStocks']=JSON.stringify(stocks);
    }
    else {

        // generate an array of stocks based on what has already been added
        console.log(localStorage['userStocks']);
        stocks = JSON.parse(localStorage['userStocks']);
        console.log(stocks);

        // find the index of the symbol to remove
        var symbol_index = stocks.indexOf(symbol);
        if (symbol_index>-1){
            var removed = stocks.splice(symbol_index,1);
            console.log('REMOVED = '+ removed);
            console.log("KEPT = " + stocks);
        }
        else {
            $('#error_message').html("Your portfolio does not contain that stock!");
            setTimeout(clearError, 3000);
        }

        localStorage['userStocks']=JSON.stringify(stocks);
        print_portfolio();
    }
}

//Function to query the YQL database and append the new stock info to the data table
function stockLookup(symbol)
{
    //Check that user has entered something valid
    //Do I need to error check to see if the stock actually exists here?
    if (!symbol) {
        alert("Please enter a valid stock symbol");
        return;
    }

    // build YQL query
    var query = yql_base_uri + encodeURIComponent(yql_query + symbol + yql_query_end) + "&format=json&callback=?";

    // ajax request - here, we create the variable "data"
    $.getJSON(query, (function(data) {

        //Stock will not exist if the price is $0
        if (data.query.results.row.price == "0.00") {
            alert("Please enter a valid ticker symbol");
        }

        else {
            // add to portfolio and reprint portfolio
            store_quote(data.query.results.row.symbol);
            print_portfolio();
        }
    }));
}

/* Store a quote from YQL in local storage */

function store_quote(symbol) {

    var stocks = new Array();

    //local storage is a browser feature
    // if storage doesn't exist, get the ball rolling
    if (!localStorage.getItem('userStocks')) {
        stocks[0] = symbol;
        localStorage['userStocks']=JSON.stringify(stocks);
    }
    else {

        // add to storage
        stocks = JSON.parse(localStorage['userStocks']);

        // ignore repeats
        for (var i = 0; i <= stocks.length; i++) {
            if (symbol == stocks[i]) {
                $('#error_message').html("This stock is already in your portfolio");
                setTimeout(clearError, 3000);

                //exit the function if a repeat is found
                return false;
            }
        }

        //Add new symbol as the last value
        stocks[stocks.length] = symbol;

        localStorage['userStocks']=JSON.stringify(stocks);
    }
}

/* Print the portfolio, including default stocks */

function print_portfolio() {

    // if there are no saved stocks, we populate it with some
    // stocks for them
    if (!localStorage.getItem('userStocks')) {

        //Oil Majors as default stocks
        var defaultStocks = ["CVX", "XOM", "TOT"];
        localStorage['userStocks']=JSON.stringify(defaultStocks);
    }

    var stocks = JSON.parse(localStorage['userStocks']);
    console.log(stocks);

    var symbol = "";

    //build the list of symbols to request from YQL
    for (var i = 0; i < stocks.length; i++) {
        symbol = symbol + "+" + stocks[i];
    }

    // build our query
    var query = yql_base_uri + encodeURIComponent(yql_query + symbol + yql_query_end) + "&format=json&callback=?";

    // ajax request
    $.getJSON(query, (function(response) {

        $('#data_table').text("");

        // Table Head
        var tableHead = "<table id=\"portfolioTable\">"
            + "<thead><tr>"
            +   "<th>symbol</th>"
            +   "<th>name</th>"
            +   "<th>price</th>"
            +   "<th>Ex Div Date</th>"
            +   "<th>Div Pay Date</th>"
            +   "<th>Dividend</th>"
            + "</tr></thead>";

        var tableBody = "<tbody>";

        for (var i = 0; i < response.query.count; i++) {

            // Generate a row for each

            tableBody = tableBody
                + padString(response.query.results.row[i].symbol)
                + padString(response.query.results.row[i].name)
                + padString(response.query.results.row[i].price)
                + padString(response.query.results.row[i].ex_div_date)
                + padString(response.query.results.row[i].div_pay_date)
                + padString(response.query.results.row[i].div)
                + "</tr>";
        }
        // when there's only one result

        /*
        if (response.query.count == 1) {
            tableBody = tableBody
                + padString(response.query.results.row.symbol)
                + padString(response.query.results.row.name)
                + padString(response.query.results.row.price)
                + padString(response.query.results.row.ex_div_date)
                + padString(response.query.results.row.div_pay_date)
                + padString(response.query.results.row.div)
                + "</tr>";

        }
        // Multiple Results
        else {


            for (var i = 0; i < response.query.count; i++) {
                // print the output

                tableBody = tableBody
                    + padString(response.query.results.row[i].symbol)
                    + padString(response.query.results.row[i].name)
                    + padString(response.query.results.row[i].price)
                    + padString(response.query.results.row[i].ex_div_date)
                    + padString(response.query.results.row[i].div_pay_date)
                    + padString(response.query.results.row[i].div)

                    + "</tr>";
            }
        }
        */

        var tableEnd = "</tbody><tfoot></tfoot></table>";

        $('#data_table').append(tableHead + tableBody);

        var myTable = document.getElementById('portfolioTable');

    }));

}

function padString(data) {

    var returnString = "<td>" + data + "</td>";
    return returnString;

}


$("#stock").click(function(){
    $.getJSON("demo_ajax_json.js",function(result){
        $.each(result, function(i, field){
            $("div").append(field + " ");
        });
    });
});

//http://query.yahooapis.com/v1/public/yql?q=

function flickrSearch() {
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    $.getJSON( flickerAPI, {
        tags: "mount rainier",
        tagmode: "any",
        format: "json"
    })
        .done(function( data ) {
            $.each( data.items, function( i, item ) {
                $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
                if ( i === 3 ) {
                    return false;
                }
            });
        });
};
