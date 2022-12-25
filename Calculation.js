function Calcualtion() {
    this.GetArrMax = function (arr) {
        var max = arr[0];
        for (var i in arr) {
            if (arr[i] > max)
                max = arr[i];
        }
        return max;
    }
    this.geterateRandomArr = function (min = 1, max = 50, elementsCount = 10) {
        var result = [];
        for (var i = 0; i < elementsCount; i++) {
            var randomNumber = Math.floor(Math.random() * (max - min)) + min;
            result.push(randomNumber);
        }
        return result;
    }
    this.swap = function (arr, index1, index2) {
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }

    var interval;
    var opIndex = 0;
    this.doOP = function (operationArr) {
        interval = setInterval(function () {
            console.log(operationArr[opIndex]);
            swapView(operationArr[opIndex][0], operationArr[opIndex][1])
            opIndex++;
            if (opIndex == operationArr.length)
                clearInterval(interval);
        }, 600);
    }

    this.getMax = function (arr) {
        var max = arr[0];
        for (var i in arr) {
            if (arr[i] > max)
                max = arr[i];
        }
        return max;
    }


} 