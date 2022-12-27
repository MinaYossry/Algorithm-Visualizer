var view = new View();
var calc = new Calcualtion();
var sortOperations = new Operations();
var sort = new Sort(view, calc, sortOperations);

$(function () {
    $("#displayOver").click(function () {
        if ($("#displayOver").hasClass("on")) {
            $(".over").animate({
                right: "-450px"
            }, 500, "linear");

            $("#displayOver").removeClass("on")
        } else {
            $("#displayOver").addClass("on");
            $(".over").animate({
                right: "0px"
            }, 500, "linear")
        }
    })
    calc.generateRandomArr();
    view.generateDivs(calc.generatedArr, calc.maxValue);

    $("#random").click(function () {
        sortOperations.stopSorting();
        calc.generateRandomArr();
        view.generateDivs(calc.generatedArr, calc.maxValue);
        $("#error").css("display", "none");
    });

    $("#startSort").click(function () {
        if (!sortOperations.isSorting) {
            var selectedSort = $(".selected").attr("id");
            sort[selectedSort](calc.generatedArr);
        }
    });

    $("#enterNumbers").click(function () {
        var arr = $("#userNumbers").val().split(",");
        if (arr.length >= 5 && arr.length <= 15) {
            sortOperations.stopSorting();
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

    $("#pause").click(sortOperations.pause.bind(sortOperations));

    $("#start").click(sortOperations.start.bind(sortOperations, view));

    $("#pause").click(sortOperations.pause.bind(sortOperations));

    $("#next").click(sortOperations.forward.bind(sortOperations, view));

    $("#back").click(sortOperations.backward.bind(sortOperations, view));
})







