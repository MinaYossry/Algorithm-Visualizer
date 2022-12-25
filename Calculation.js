function Calcualtion() {
    var GetArrMax = function (arr) {
        var max = arr[0];
        for (var i in arr) {
            if (arr[i] > max)
                max = arr[i];
        }
        return max;
    }
    var geterateRandomArr = function (min = 1, max = 50, elementsCount = 10) {
        var result = [];
        for (var i = 0; i < elementsCount; i++) {
            var randomNumber = Math.floor(Math.random() * (max - min)) + min;
            result.push(randomNumber);
        }
        return result;
    }
    var swap = function (arr, index1, index2) {
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
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
    // function bubbleSort3(arr) {
    //     var i = 0, j = 0;
    //     interval = setInterval(function () {
    //         glowView(i, j)
    //         j++;
    //         console.log(i, j);
    //         if (arr[j] > arr[j + 1]) {

    //             swapView(j, j + 1);
    //             swapNumber(arr, j, j + 1);
    //         }
    //         if (j == arr.length - i) {
    //             i++;
    //             j = 0
    //         }
    //         if (i > arr.length)
    //             clearInterval(interval);
    //     }, 300);
    // }
    var interval;
    var opIndex = 0;
    var doOP = function () {
        interval = setInterval(function () {
            console.log(operation[opIndex]);
            swapView(operation[opIndex][0], operation[opIndex][1])
            opIndex++;
            if (opIndex == operation.length)
                clearInterval(interval);
        }, 600);
    }




} 