var swapping = false;
var FIXED = "n";
var ELEMENTWIDTH = 50;
var arr;

$(function () {
    arr = getRandomArr();
    generateDivs(arr);

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
            }, 500, "linear", function () { swapping = false });
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
    for (var i = 0; i < elementsCount; i++) {
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
    return $("<div>")
        .attr("id", FIXED + index).text(number)
        .css({
            left: position + "px",
            height: calcHeight(number, maxValue)
        });
}

function calcHeight(number, maxValue) {
    var minHeight = 50;
    var maxHeight = 150;
    return (((number / maxValue) * maxHeight) + minHeight) + "px";
}

function glowView(index, color) {
    $("#" + FIXED + index).css({'background-color': color });
}

function swapView(inedx1, index2) {
    // Get A strings of id of both elements
    var elem1 = $("#" + FIXED + inedx1);
    var elem2 = $("#" + FIXED + index2);
    console.log(inedx1, elem1, index2, elem2);
    if (!swapping) {
        swapping = true;
    
        var pos1 = parseInt(elem1.css("left"));
        var pos2 = parseInt(elem2.css("left"));
    
        elem1.attr("id", FIXED + index2)
        elem2.attr("id", FIXED + inedx1)
    
        // swap left position of both elements
        elem1.animate({
            left: `${pos2}px`
        }, 500, "linear");
        elem2.animate({
            left: `${[pos1]}px`
        }, 500, "linear", function () {
            swapping = false;
        });

    }
}



// function test() {
//     var all = $("#graph div");
//     for (var i = 0; i < all.length - 1; i++) {
//         for (var j = 0; j < all.length - i - 1; j++) {
//             if (parseInt(all.get(j).innerText) > parseInt(all.get(j + 1).innerText)) {
//                 setTimeout(() => {
//                     console.log(parseInt(all.get(j).innerText), parseInt(all.get(j + 1).innerText));
//                     swapView(j, j + 1);
//                 }, 1000 * (j + 1) * (i + 1));
//             }
//         }
//     }
// }

var funArr = [];
function bubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                setTimeout(function () {
                    swapView(j, j + 1);
                }, 600 * (j + 1) * (i + 1));
                swapNumber(arr, j, j + 1);
            }
        }

    }
}


var operation = [];
var all = $("#graph div");

function bubbleSort2(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                operation.push([j, j + 1])
                swapNumber(arr, j, j + 1);
            }
        }

    }
    doOP();
}
function bubbleSort3(arr) {
    var i = 0, j = 0;
    var sorted = true;
    interval = setInterval(function () {
        glowView(j, 'green');
        glowView(j - 1, 'green');
        glowView(j, 'red');
        glowView(j+1, 'red');
        
        console.log(j, j+1);
        if (arr[j] > arr[j + 1]) {
            swapView(j, j+1);
            swapNumber(arr, j, j+1);
            sorted = false;
        }
        j++;
        if (j == arr.length - i - 1) {
            glowView(j, 'yellow')
            glowView(j-1, 'green')
            i++;
            j = 0
            if (i == arr.length - 1 || (sorted)) {
                clearInterval(interval);
                $("#graph div").animate({
                    'background-color':"green"
                },100);
            }
            

        }
    }, 600);
}

var interval;
var opIndex = 0;
function doOP() {
    interval = setInterval(function () {
        console.log(operation[opIndex]);
        swapView(operation[opIndex][0], operation[opIndex][1])
        opIndex++;
        if (opIndex == operation.length)
            clearInterval(interval);
    }, 600);
}


function swapNumber(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

