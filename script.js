

var arr;
var view = new View();
var calc = new Calcualtion();
var sort = new Sort();
$(function () {
    arr = calc.geterateRandomArr();
    view.generateDivs(arr);
    sort.bubbleSort3(arr);
})






