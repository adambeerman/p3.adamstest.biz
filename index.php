<!DOCTYPE html>
<html>
<head>
    <title></title>
    <link rel="stylesheet" href="main.css" type="text/css">


</head>
<body>

<div id = "income_statement">
    <h3>Income Statement Builder</h3>

    <!-- establish a blank line between each section -->
    <?php $blank_line = "<tr><td></td><td class = 'blank'></td></tr>"; ?>

    <div class = "column">
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>2013</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>Category</th>
                    <th>2013</th>
                </tr>
            </tfoot>
            <tbody>



            <tr>
                <td class = "italic">Revenue</td>
                <td class = "blank"></td>
            </tr>


            <tr>
                <td>component</td>
                <td id = "revenue_comp_1" class = "editable_field 1"><input placeholder="Revenue" name="revenue_comp_1"></td>
            </tr>
            <tr class = "new_row">
                <td></td>
                <td class = "expandable blank 2"><span>[+]</span></td>
            </tr>

            <tr>
                <td class = "total">Total Revenue</td>
                <td id = "revenue" class = "calculated_field"><span>Revenue</span></td>
            </tr>
            <?=$blank_line?>
            <tr>
                <td class = "italic">Cost of Sales</td>
                <td class = "blank"></td>
            </tr>
            <tr>
                <td>component</td>
                <td id = "cos_comp_1" class = "editable_field"><input placeholder="Cost of Sales" name="cos_comp_1"></td>
            </tr>
            <tr>
                <td class = "total">Total Cost of Sales</td>
                <td id = "cos" class = "calculated_field"><span>Cost of Sales</span></td>
            </tr>
            <?=$blank_line?>
            <tr class = "top_border">
                <td class = "italic">Gross Profit</td>
                <td id = "gross_profit" class = "calculated_field"><span>Gross Profit</span></td>
            </tr>
            <tr class = "bottom_border">
                <td class = "italic">Gross Margin</td>
                <td id="gross_margin" class = "calculated_field"><span>Gross Margin</span></td>
            </tr>
            <?=$blank_line?>
            <tr>
                <td>Operating Expenses</td>
                <td class = "blank"></td>
            </tr>
            <tr>
                <td>component</td>
                <td id = op_ex_comp_1 class = "editable_field"><span>Enter Amt</span></td>
            </tr>
            <tr>
                <td class = "total">Total Operating Expenses</td>
                <td id = "op_ex" class = "calculated_field"><span>Operating Expenses</span></td>
            </tr>
            <?=$blank_line?>
            <tr>
                <td>Operating Profit</td>
                <td id = op_profit class = "calculated_field"><span>Operating Profit</span></td>
            </tr>
            <tr></tr>
            <tr>
                <td>Other Expenses</td>
                <td id = "other_expenses" class = "editable_field"><span>Enter Amt</span></td>
            </tr>
            <tr>
                <td>Net Profit</td>
                <td id = "profit" class = "calculated_field"><span>Net Profit</span></td>
            </tr>
            </tbody>
        </table>
    </div>

    <div id = "margin_alert"><br></div>
    <button onclick = "storeFigures()">Calculate Margin!</button>
    <br>




    <!-- <h4>Revenue</h4>
    <div id ="revenue">
        <h5>components</h5>
    </div>

    <h4>Cost of Sales</h4>
    <div id = "cos">
        <h5>components</h5>
    </div>
    <h4>Gross Margin</h4>
    <div id="gross_margin">
        <h5>0</h5>
    </div>
    <h4>Operating Expenses</h4>
    <div id = "op_ex">
        <h5>components</h5>
    </div> -->

</div>





    <br>
    <br>
    <br>
    <br>
    <br>
    <br>



    <h3>STOCK API PRACTICE</h3>

    <form>
        <input type = "text" id = "stockSelector" name="symbol" placeholder="Enter Stock Symbol">
        <input type = "button" id = "addStock" value = "Add!">
        <input type = "button" id = "rmStock" value = "Remove!">
    </form>
    <div id = "error_message">
        <br>
    </div>
    <!-- <button onclick="myFunction()">Try it!</button> -->

    <div id = "data_table">

    </div>

    <br><br>


    <h3>CALCULATOR!</h3>

    <div id = "calculator">
        <div id = "display"></div>

        <div id = "keypad">
            <div id = "one" class = "button">1</div>
            <div id = "two" class = "button">2</div>
            <div id = "three" class = "button">3</div>
            <div id = "four" class = "button">4</div>
            <div id = "five" class = "button">5</div>
            <div id = "six" class = "button">6</div>
            <div id = "seven" class = "button">7</div>
            <div id = "eight" class = "button">8</div>
            <div id = "nine" class = "button">9</div>
            <div id = "zero" class = "button">0</div>
            <div id = "plus" class = "button">+</div>
            <div id = "minus" class = "button">-</div>
            <div id = "equal" class = "button">=</div>
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
    <script src = "/calculator.js"></script>
    <script src = "/stocks.js"></script>
    <script src = "/income.js"></script>
</body>
</html>