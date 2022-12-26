$(function () {
    var view = new View();
    var calc = new Calcualtion();
    var sort = new Sort();

    calc.generateRandomArr();
    view.generateDivs(calc.generatedArr, calc.maxValue);

    $("#random").click(function () {
        calc.generateRandomArr();
        view.generateDivs(calc.generatedArr, calc.maxValue);
    });

    $("#startSort").click(function () {
        sort.bubbleSort(calc.generatedArr, view, calc);
    });

    $("#enterNumbers").click(function () {
        var arr = $("#userNumbers").val().split(",");
        console.log(arr);
        calc.enterArray(arr);
        view.generateDivs(calc.generatedArr, calc.maxValue);
    });
})







