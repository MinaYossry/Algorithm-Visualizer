$(function () {
    var view = new View();
    var calc = new Calcualtion();
    var sort = new Sort(view, calc);
    calc.generateRandomArr();
    view.generateDivs(calc.generatedArr, calc.maxValue);

    $("#random").click(function () {
        calc.generateRandomArr();
        view.generateDivs(calc.generatedArr, calc.maxValue);
    });

    $("#startSort").click(function () {
        var selectedSort = $(".selected").attr("id");
        sort[selectedSort](calc.generatedArr);
    });

    $("#enterNumbers").click(function () {
        var arr = $("#userNumbers").val().split(",");
        calc.enterArray(arr);
        view.generateDivs(calc.generatedArr, calc.maxValue);
    });

    $("ul li").click(function (e) {
        $(".selected").removeClass("selected")
        $(e.target).addClass("selected");
    });
})







