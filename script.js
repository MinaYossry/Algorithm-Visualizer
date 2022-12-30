var view = new View();
var calc = new Calcualtion();
var sortOperations = new Operations();
var sort = new Sort(view, calc, sortOperations);

$(function () {
    $("#openCodeArrow").click(function () {
        if ($("#openCodeArrow").hasClass("on")) {
            view.closePseudoCode();
        } else {
            $("#displayOver").addClass("on");
            $(".over").animate({
                right: "0px"
            }, 500, "linear")
        }
    })
    calc.generateRandomArr();
    view.generateDivs(calc.generatedArr, calc.maxValue);
    view.generatePseudoCode(sort.PseudoCode[selectedSort])

    $("#random").click(function () {
        sortOperations.stopSorting();
        calc.generateRandomArr();
        view.generateDivs(calc.generatedArr, calc.maxValue);
        $("#error").css("display", "none");
    });

    $("#startSort").click(function () {
        if (!sortOperations.isSorting) {
            sortOperations.sortOperations = [];
            console.log("clicked");
            selectedSort = $(".selected").attr("id");
            sort[selectedSort](calc.generatedArr, 0, calc.generatedArr.length - 1);
            if (selectedSort == "mergeSort") {
                sortOperations.startMergeAnimation(view)
            }
            view.openPseudoCode();
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

    $("#pause").click(function () {
        sortOperations.pause();
        $("#pause").hide(0);
        $("#start").show(0);
    });

    $("#start").click(function () {
        sortOperations.start(view);
        $("#pause").show(0);
        $("#start").hide(0);
    }).hide(0);

    $("#pause").click(sortOperations.pause.bind(sortOperations));

    $("#next").click(sortOperations.forward.bind(sortOperations, view));

    $("#back").click(sortOperations.backward.bind(sortOperations, view));
})







