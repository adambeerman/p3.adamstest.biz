<!DOCTYPE html >
<html>
<head>
    <title>Income Statement Builder</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" href="css/bootstrap.css" type = "text/css">
    <link rel="stylesheet" href="css/main.css" type="text/css">

</head>
<body>

<div class ="container">
    <h3> Income Statement Builder</h3>
    <h5 class = "bio">JavaScript Application for Harvard Extension CSci E-15<br>
        Instructor: Susan Buck<br>
        by Adam Beerman</h5>
    <h6 class = "hidden"><button>Show Intro</button></h6>
    <div id = "intro">
        Welcome to the Income Statement Builder!
        Fill in your revenue sources, cost of goods sold, operating expenses, as well as any other expenses.
        The built-in features will automatically calculate your subtotals and margins.
        <br><br>
        Some nifty features:
        <ul>
            <li>
                Click on the year in the upper-right corner to adjust. This will be displayed on your final income statement.
            </li>
            <li>
                Click the "[+]" icon to create an additional entry.<br>
                The builder will automatically sum the components to create the total
            </li>
            <li>
                Click on the component names to rename them.
            </li>
            <li>
                When you have finalized your income statement, click "Click to Finalize Income Statement" !
            </li>
            <li>
                Click anywhere in the introduction to hide
            </li>
        </ul>
        Additionally, please note that I am using an "accounting.js" add-in which helps with
        the formatting of numbers.<br>
        <button>Hide Intro</button>
        <br><br>
    </div>
    <div id = "income_statement">
        <div id = "head">
            <div class = "row-fluid">
                <div class = "span8">
                    <button type="button" onclick="lockValues()">Click to Finalize Income Statement</button>
                </div>
                <div class = "span4">
                    <span class = "editable_field year" title = "Click to Modify">2013</span>
                </div>
            </div>
        </div>

        <div id = "revenue">
            <h4>Revenue</h4>
            <div class = "row-fluid">
                <div class = "span8">
                    <span class = "editable_field">Component</span><br>
                    <span class = "expandable_left">&nbsp;</span>
                    <div>&nbsp;</div>
                    <div><span class = "total summation">Total Revenue</span></div>


                </div>
                <div class = "span4">
                    <span><input placeholder="Revenue" class = "revenue"></span><br>
                    <span class = "expandable_right">[+]</span>
                    <div>&nbsp;</div>
                    <div id = "revenue_sum" class = "calculated_field"><span>Revenue</span></div>
                </div>
            </div>
        </div>

        <div id = "cos">
            <h4>Cost of Goods Sold</h4>
            <div class = "row-fluid">
                <div class = "span8">
                    <span class = "editable_field">Component</span><br>
                    <span class = "expandable_left">&nbsp;</span>
                    <div>&nbsp;</div>
                    <div><span class = "total summation">Total Cost of Goods Sold</span></div>
                </div>
                <div class = "span4">
                    <span><input placeholder="Cost of Goods" class = "cos"></span><br>
                    <span class = "expandable_right">[+]</span>
                    <div>&nbsp;</div>
                    <div id = "cos_sum" class = "calculated_field"><span>Total Cost of Goods</span></div>
                </div>
            </div>
        </div>

        <div id = "gross">
            <h4></h4>
            <div class = "row-fluid">
                <div class = "span8 italic">
                    <span>Gross Profit</span><br>
                    <span>Gross Margin</span>
                </div>
                <div class = "span4 italic">
                    <span id = "gross_profit" class = "calculated_field">Gross Profit</span><br>
                    <span id = "gross_margin" class = "calculated_field">Gross Margin</span>
                </div>
            </div>
        </div>

        <div id = "opex">
            <h4>Operating Expenses</h4>
            <div class = "row-fluid">
                <div class = "span8">
                    <span class = "editable_field">Component</span><br>
                    <span class = "expandable_left">&nbsp;</span>
                    <div>&nbsp;</div>
                    <div><span class = "total summation">Total Operating Expenses</span></div>
                </div>
                <div class = "span4">
                    <span><input placeholder="Op Ex" class = "opex"></span><br>
                    <span class = "expandable_right">[+]</span>
                    <div>&nbsp;</div>
                    <div id = "opex_sum" class = "calculated_field"><span>Op Ex</span></div>
                </div>
            </div>
        </div>

        <div id = "op">
            <h4></h4>
            <div class = "row-fluid">
                <div class = "span8 italic">
                    <span>Operating Profit</span><br>
                    <span>Operating Margin</span>
                </div>
                <div class = "span4 italic">
                    <span id = "op_profit" class = "calculated_field">Operating Profit</span><br>
                    <span id = "op_margin" class = "calculated_field">Operating Margin</span>
                </div>
            </div>
        </div>

        <div id = "otherex">
            <h4>Other Expenses</h4>
            <div class = "row-fluid">
                <div class = "span8">
                    <span class = "editable_field">Component</span><br>
                    <span class = "expandable_left">&nbsp;</span>
                    <div>&nbsp;</div>
                    <div><span class = "total summation">Total Other Expenses</span></div>
                </div>
                <div class = "span4">
                    <span><input placeholder="Other Expenses" class = "otherex"></span><br>
                    <span class = "expandable_right">[+]</span>
                    <div>&nbsp;</div>
                    <div id = "otherex_sum" class = "calculated_field"><span>Other Expenses</span></div>
                </div>
            </div>
        </div>

        <div id = "net">
            <h4></h4>
            <div class = "row-fluid">
                <div class = "span8 italic">
                    <span>Net Profit</span><br>
                    <span>Net Margin</span>
                </div>
                <div class = "span4 italic">
                    <span id = "net_profit" class = "calculated_field">Net Profit</span><br>
                    <span id = "net_margin" class = "calculated_field">Net Margin</span>
                </div>
            </div>
        </div>
        <div id = "foot">
            <button type="button" onclick="lockValues()">Finalize Income Statement</button>
        </div>

    </div>


</div>



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
    <script src = "/js/accounting.js"></script>
    <script src = "/js/income.js"></script>
</body>
</html>