$(function () {
    var view = new View();
    var calc = new Calcualtion();
    var sort = new Sort(view, calc);
    calc.generateRandomArr();
    view.generateDivs(calc.generatedArr, calc.maxValue);

    $("#random").click(function () {
        sort.stopSorting();
        calc.generateRandomArr();
        view.generateDivs(calc.generatedArr, calc.maxValue);
        $("#error").css("display", "none");
    });

    $("#startSort").click(function () {
        if (!sort.isSorting) {
            var selectedSort = $(".selected").attr("id");
            sort[selectedSort](calc.generatedArr);
        }
    });

    $("#enterNumbers").click(function () {
        var arr = $("#userNumbers").val().split(",");
        if (arr.length >= 5 && arr.length <= 15) {
            sort.stopSorting();
            calc.enterArray(arr);
            view.generateDivs(calc.generatedArr, calc.maxValue);
            $("#error").css("display", "none");
        }
        else {
            $("#error").css("display", "block");
        }
    });

    $("ul li").click(function (e) {
        $(".selected").removeClass("selected")
        $(e.target).addClass("selected");
    });
})







