var swapping = false;
var FIXED = "n";
var ELEMENTWIDTH = 50;

$(function () {
    $(".graph div").each(function (idx, elem) {
        elem.style.height = (((parseInt(elem.innerText) / 50) * 150) + 50) + "px";
    });


    $("#test").click(function (first, second) {
        if (!swapping) {
            swapping = true;

            var left = parseInt($(".two").css("left"));
            var right = parseInt($(".five").css("left"));
            $(".two").animate({
                left: `${right}px`
            }, 500, "linear");
            $(".five").animate({
                left: `${left}px`
            }, 500, "linear", () => (swapping = false));
        }
    })
})


function getMax(arr) {
    var max = arr[0];
    for (var i in arr) {
        if (arr[i] > max)
            max = arr[i];
    }
    return max;
}

function getRandomArr(min = 1, max = 50, elementsCount = 10) {
    var result = [];
    for (let i = 0; i < elementsCount; i++) {
        var randomNumber = Math.floor(Math.random() * (max - min)) + min;
        result.push(randomNumber);
    }
    return result;
}



function generateDivs(arr) {
    $("#graph").empty();
    var totalWidth = ELEMENTWIDTH * arr.length;
    var startItem = Math.trunc(totalWidth / -2);
    var maxValue = getMax(arr);
    for (var i = 0; i < arr.length; i++) {
        $("#graph").append(generateDiv(i, arr[i], startItem, maxValue));
        startItem += ELEMENTWIDTH;
    }
}

function generateDiv(index, number, position, maxValue) {
    return $("<div>").attr("id", FIXED + index).text(number).css({ left: position + "px", height: calcHeight(number, maxValue) });
}

function calcHeight(number, maxValue) {
    var minHeight = 50;
    var maxHeight = 150;
    return (((number / maxValue) * maxHeight) + minHeight) + "px";
}


var count = 0;
function swapView(inedx1, index2) {
    // Get A strings of id of both elements
    console.log(++count);
    var elem1 = $("#" + FIXED + inedx1);
    var elem2 = $("#" + FIXED + index2);
    console.log(elem1, elem2);

    if (!swapping) {
        swapping = true;

        var pos1 = parseInt(elem1.css("left"));
        var pos2 = parseInt(elem2.css("left"));

        // swap left position of both elements
        elem1.animate({
            left: `${pos2}px`
        }, 0, "linear");
        elem2.animate({
            left: `${[pos1]}px`
        }, 0, "linear", () => (swapping = false));
    }
}


function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                setTimeout(() => {
                    swapView(j, j + 1);
                }, 200 * (j + 1) * (i + 1));
                swapNumber(arr, j, j + 1);
            }

        }

    }
}

function swapNumber(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}