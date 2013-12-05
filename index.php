<!DOCTYPE html >
<html>
<head>
    <title>Income Statement Builder</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" href="css/bootstrap.css" type = "text/css">
    <link rel="stylesheet" href="css/main.css" type="text/css">

</head>
<body>


<div class = "container">
    <div id = "income_statement">
        <h3>Income Statement Builder</h3>

        <!-- establish a blank line between each section -->
        <?php $blank_line = "<tr><td class = 'empty'></td><td class = 'empty'></td></tr>"; ?>

        <div>
            <table id = "income_table">

                <thead>
                    <tr>
                        <th>Category</th>
                        <th class = "editable_field year"><span class = "editable_field">2013</span></th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th></th>
                        <th><button type="button" onclick="lockValues()">LOCK VALUES</button></th>
                    </tr>
                </tfoot>
                <tbody>



                <tr>
                    <td class = "total italic">Revenue</td>
                    <td class = "blank"></td>
                </tr>
                <tr>
                    <td class = "editable_field"><span>Component</span></td>
                    <td id = "revenue_comp_1" class = "1"><input placeholder="Revenue" class = "revenue" name="revenue_comp_1"></td>
                </tr>
                <tr class = "new_row">
                    <td class = "rev"></td>
                    <td class = "expandable blank 2"><span>[+]</span></td>
                </tr>

                <tr>
                    <td class = "total summation">Total Revenue</td>
                    <td id = "revenue" class = "calculated_field"><span>Revenue</span></td>
                </tr>
                <?=$blank_line?>
                <tr>
                    <td class = "italic total">Cost of Sales</td>
                    <td class = "blank"></td>
                </tr>
                <tr>
                    <td class = "editable_field"><span>Component</span></td>
                    <td id = "cos_comp_1" class = "1">
                        <input placeholder="Cost of Sales" class = "cos" name="cos_comp_1">
                    </td>
                </tr>
                <tr class = "new_row">
                    <td class = "cost"></td>
                    <td class = "expandable blank 2"><span>[+]</span></td>
                </tr>
                <tr>
                    <td class = "total summation">Total Cost of Sales</td>
                    <td id = "cos" class = "calculated_field"><span>Cost of Sales</span></td>
                </tr>
                <?=$blank_line?>
                <tr class = "italic top_border">
                    <td>Gross Profit</td>
                    <td id = "gross_profit" class = "calculated_field"><span>Gross Profit</span></td>
                </tr>
                <tr class = "italic bottom_border">
                    <td>Gross Margin</td>
                    <td id="gross_margin" class = "calculated_field"><span>Gross Margin</span></td>
                </tr>
                <?=$blank_line?>
                <tr>
                    <td class = "italic total">Operating Expenses</td>
                    <td class = "blank"></td>
                </tr>
                <tr>
                    <td class = "editable_field"><span>Component</span></td>
                    <td id = op_ex_comp_1 class = "1">
                        <input placeholder="Operating Expense" class = "op_ex" name="op_ex_1">
                    </td>
                </tr>
                <tr class = "new_row">
                    <td class = "opex"></td>
                    <td class = "expandable blank 2"><span>[+]</span></td>
                </tr>
                <tr>
                    <td class = "total summation">Total Operating Expenses</td>
                    <td id = "op_ex" class = "calculated_field"><span>Operating Expenses</span></td>
                </tr>
                <?=$blank_line?>
                <tr class = "top_border italic">
                    <td>Operating Profit</td>
                    <td id = op_profit class = "calculated_field"><span>Operating Profit</span></td>
                </tr>
                <tr class = "bottom_border italic">
                    <td>Operating Margin</td>
                    <td id = op_margin class = "calculated_field"><span>Operating Margin</span></td>
                </tr>
                <tr>
                    <td class = "italic total">Other Expenses</td>
                    <td class = "blank"></td>
                </tr>
                <tr>
                    <td class = "editable_field"><span>Component</span></td>
                    <td id = "other_expenses" class = "1">
                        <input placeholder="Other Expenses" class = "other_ex" name="other_ex_1">
                    </td>
                </tr>
                <tr class = "new_row">
                    <td class = "otherex"></td>
                    <td class = "expandable blank 2"><span>[+]</span></td>
                </tr>
                <tr>
                    <td class = "total summation">Total Operating Expenses</td>
                    <td id = "other_ex" class = "calculated_field"><span>Other Expenses</span></td>
                </tr>
                <?=$blank_line?>
                <tr class = "top_border italic">
                    <td>Net Profit</td>
                    <td id = net_profit class = "calculated_field"><span>Net Profit</span></td>
                </tr>
                <tr class = "bottom_border italic">
                    <td>Net Margin</td>
                    <td id = net_margin class = "calculated_field"><span>Net Margin</span></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>




    <br>
    <br>
    <br>
    <br>
    <br>
    <br>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
    <script src = "/js/accounting.js"></script>
    <script src = "/js/income2.js"></script>
</body>
</html>