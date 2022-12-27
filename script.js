$(function () {
    var view = new View();
    var calc = new Calcualtion();
    var sort = new Sort(view, calc);
    calc.generateRandomArr();
    view.generateDivs(calc.generatedArr, calc.maxValue);

    $("#random").click(function () {
        Sort.stopSorting();
        calc.generateRandomArr();
        view.generateDivs(calc.generatedArr, calc.maxValue);
        $("#error").css("display", "none");
    });

    $("#startSort").click(function () {
        if (!Sort.isSorting) {
            var selectedSort = $(".selected").attr("id");
            Sort[selectedSort](calc.generatedArr, view, calc);
        }
    });

    $("#enterNumbers").click(function () {
        var arr = $("#userNumbers").val().split(",");
        if (arr.length >= 5 && arr.length <= 15) {
            Sort.stopSorting();
            calc.enterArray(arr);
            view.generateDivs(calc.generatedArr, calc.maxValue);
            $("#error").css("display", "none");
        }
        else {
            $("#error").css("display", "inline-block");
        }
    });

    $("ul li").click(function (e) {
        $(".selected").removeClass("selected")
        $(e.target).addClass("selected");
    });
})







