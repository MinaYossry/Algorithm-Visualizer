var view = new View();
var calc = new Calcualtion();
var sortOperations = new Operations();
var sort = new Sort(view, calc, sortOperations);
var selectedSort = $(".selected").attr("id");

$(function () {

    $("#myRange").change(function (e) {
        sortOperations.speed = view.speed = parseFloat($("#myRange").val()) / 100;
        if (sortOperations.isSorting) {
            clearInterval(sortOperations.interval)
            sortOperations.startSortingAnimations(view);
        }

    }
    )

    $("#openCodeArrow").click(function () {
        if ($("#openCodeArrow").hasClass("on")) {
            view.closePseudoCode();
        } else {
            view.openPseudoCode();
        }
    })

    calc.generateRandomArr();
    view.generateDivs(calc.generatedArr, calc.maxValue);
    view.generatePseudoCode(sort.PseudoCode[selectedSort])

    $(".footer").hide(0);

    $("#random").click(handleRandom);

    $("#startSort").click(function () {
        if (!sortOperations.isSorting) {
            $(".footer").show(0);
            sortOperations.sortOperations = [];
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
        handleRandom();
        $(".selected").removeClass("selected")
        $(e.target).addClass("selected");
        selectedSort = $(".selected").attr("id");
        view.generatePseudoCode(sort.PseudoCode[selectedSort])
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


function handleRandom() {
    $("#graph").empty();
    sortOperations.sortOperations = [];
    sortOperations.stopSorting();
    calc.generateRandomArr();
    view.generateDivs(calc.generatedArr, calc.maxValue);
    $("#error").css("display", "none");
    $("#mergeGraph").empty();
}






