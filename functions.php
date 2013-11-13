<?php
/**
 * Created by JetBrains PhpStorm.
 * User: adam
 * Date: 11/9/13
 * Time: 12:01 PM
 * To change this template use File | Settings | File Templates.
 */

public function getYahooData($symbol, $startDate, $endDate) {
    $sym = strtoupper($symbol);
    $dates1 = str_split($startDate,1);
    $dates2 = str_split($endDate,1);
    $str1 = "http://download.finance.yahoo.com/d/quotes.csv?s=";
    //Stock ID
    $str2 = "%40%5E".$sym;
    //Parameters requested
    //a0 = ASK
    //b0 = BID
    //n = name, s = symbol, l1 = last value, o = open, p = close
    $str3 = "&f=nsl1op";

    //Static
    $str4 = "&e=.csv";

    $url = $str1.$str2.$str3.$str4;

    $data = file_get_contents($url);


} #end of function

    #takes a text symbol, text start and end dates in yyyy-mm-dd form
    #getYahooData("SPY","2013-01-01","2013-10-21")
    #build url
    sym <- toupper(symbol)
  dates1 <- strsplit(startDate,'-')[[1]]
  dates2 <- strsplit(endDate,'-')[[1]]
  dates1[2] <- as.character(as.numeric(dates1[2]) - 1)
  dates2[2] <- as.character(as.numeric(dates2[2]) - 1)
  str1 <- paste("http://ichart.finance.yahoo.com/table.csv?s=",sym,sep="")
  str2 <- paste("&a=",dates1[2], "&b=", dates1[3], "&c=", dates1[1], "&d=", dates2[2], "&e=", dates2[3], "&f=", dates2[1], "&g=d&ignore=.csv",sep="")
  strURL <- paste(str1,str2,sep="")
  #get data
  data <- read.csv(strURL)
  data = data[order(nrow(data):1),]
  return (data)
}