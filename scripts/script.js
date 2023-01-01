var view = new View();
var calc = new Calculation();
var sortOperations = new Operations(view);
var sort = new Sort(view, calc, sortOperations);
var selectedSort = (getCookie('selectedSort') === "undefined") ? 'bubbleSort' : getCookie('selectedSort');
var isPaused = false;
$(function () {
    /**
     * on pressing on new sorting method
     * generate new random arrayh and divs (handleRandom)
     * assign the new sort as selectedSort
     */
    selectSortTye(selectedSort)
    $("ul li").click(function (e) {
        $(".selected").removeClass("selected")
        selectSortTye(e.target.id);
        setCookie("selectedSort", selectedSort);
    });

    /**
     * On the load of the page
     * 1- Generate random array
     * 2- Generate divs from the generated array
     * 3- Generate PseudoCode of the selected sort
    */
    calc.generateRandomArr();
    view.generateDivs(calc.generatedArr, calc.maxValue);
    view.generatePseudoCode(sort.PseudoCode[selectedSort])
    $(".footer").hide(0);
    $("#code").hide(0);

    /**
      * update the speed in sorting animation
      * take the value of the slider as percentage
      * works by stopping the interval and starting the interval with the new speed
      */
    $("#myRange").change(function () {
        sortOperations.delta = view.delta = parseFloat($("#myRange").val()) / 100;
        if (!isPaused)
            if (sortOperations.isSorting) {
                clearInterval(sortOperations.interval);
                startSorting();
            }
    })

    /**
     * open and close controls for the PseudoCode window
     */
    $("#openCodeArrow").click(function () {
        if ($("#openCodeArrow").hasClass("on")) {
            view.closePseudoCode();
        } else {
            view.openPseudoCode();
        }
    })

    $("#random").click(handleRandom);

    /**
     * start button function
     * isSorting is flag to disable the button while sorting
     */
    $("#startSort").click(function () {
        if (!sortOperations.isSorting) {
            // Display controls
            $("#pause").show(0);
            $("#start").hide(0);
            $(".footer").show(0);
            // clear any previous sorting operations
            sortOperations.empty();
            // call sort function based on the selected sort in nav bar
            sort[selectedSort](calc.generatedArr, 0, calc.generatedArr.length - 1);
            if (selectedSort == "mergeSort") {
                sortOperations.resetMergeVariables();
                sortOperations.startMergeAnimation()
            }
            // open PseudoCode window
            view.openPseudoCode();
        }
    });

    /**
     * custom input from the user (create button)
     * validates that all entered values are numbers
     * use it as generated array and generate divs based on it
     */
    $("#enterNumbers").click(function () {
        // put the values into array
        var arr = $("#userNumbers").val().split(",");

        // validates arr values are numbers
        var validNums = true;
        for (const i in arr)
            if (isNaN(arr[i]))
                validNums = false

        // only accept 5 to 15 numbers
        if (arr.length >= 5 && arr.length <= 15 && validNums) {
            // stop current sorting if exist
            sortOperations.stopSorting();
            // use it in genereated array
            calc.enterArray(arr);
            // generate html divs based on new array
            view.generateDivs(calc.generatedArr, calc.maxValue);
            // hide error message
            $("#error").css("display", "none");
        }
        // invalid input
        else {
            $("#error").css("display", "block");
        }
    });



    /**
     * pause button to stop sorting
     */
    $("#pause").click(function () {
        isPaused = true;
        sortOperations.pause();
        // to switch between pause/play
        $("#pause").hide(0);
        $("#start").show(0);
    });

    /**
     * play button to continue sorting
     */
    $("#start").click(function () {
        isPaused = false;
        sortOperations.start();
        // to switch between pause/play
        $("#pause").show(0);
        $("#start").hide(0);
    }).hide(0); // hide play button on load

    $("#next").click(function () {
        if (isPaused)
            sortOperations.forward();
    });

    $("#back").click(function () {
        if (isPaused)
            sortOperations.backward();
    });
})

/** 
 * clear graph and mergeGraph from divs
 * clear sortingOperations and stop sorting
 * generate new array and divs
*/
function handleRandom() {
    $("#graph").empty();
    $("#mergeGraph").empty();
    sortOperations.empty();
    sortOperations.stopSorting();
    calc.generateRandomArr();
    view.generateDivs(calc.generatedArr, calc.maxValue);
    $("#error").css("display", "none");
}

/**
 * startSorting based on selectedSort type
 */
function startSorting() {
    if (selectedSort == "mergeSort")
        sortOperations.startMergeInterval();
    else {
        sortOperations.startSortingAnimations();
    }
}





function selectSortTye(t) {
    handleRandom();
    $("#" + t).addClass("selected");
    selectedSort = $(".selected").attr("id");
    view.generatePseudoCode(sort.PseudoCode[selectedSort])
}