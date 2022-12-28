function Calcualtion() {
    this.generatedArr = [];
    this.maxValue;
    this.operations = [];

    this.GetArrMax = function () {
        var max = this.generatedArr[0];
        for (var i in this.generatedArr) {
            if (this.generatedArr[i] > max)
                max = this.generatedArr[i];
        }
        return max;
    }

    this.generateRandomArr = function (min = 1, max = 50, elementsCount = 10) {
        this.generatedArr = [];
        for (var i = 0; i < elementsCount; i++) {
            var randomNumber = Math.floor(Math.random() * (max - min)) + min;
            this.generatedArr.push(randomNumber);
        }
        this.maxValue = this.GetArrMax();
        return this.generatedArr;
    }

    this.enterArray = function (arr) {
        for (var i in arr) {
            arr[i] = parseInt(arr[i])
        }
        this.generatedArr = arr;
        this.maxValue = this.GetArrMax();
        return this.generatedArr;
    }

    this.swap = function (arr, index1, index2) {
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }

    this.sortype = function (viewObj) {
        let i = 0, j = 0;
        let sorted = true;
        interval = setInterval(function () {
            viewObj.glow(j, '#678983');
            viewObj.glow(j - 1, '#678983');
            viewObj.glow(j, 'red');
            viewObj.glow(j + 1, 'red');

            if (arr[j] > this.generatedArr[j + 1]) {
                viewObj.swap(j, j + 1);
                calc.swap(this.generatedArr, j, j + 1);
                sorted = false;
            }
            j++;
            if (j == this.generatedArr.length - i - 1) {
                if (sorted) {
                    clearInterval(interval);
                    $("#graph div").animate({
                        'background-color': "#181D31"
                    }, 100);
                }
                else {
                    viewObj.glow(j, 'rgb(200 94 21)')
                    viewObj.glow(j - 1, '#678983')
                    i++;
                    j = 0;
                    sorted = true;
                    if (i == this.generatedArr.length - 1) {
                        clearInterval(interval);
                        $("#graph div").animate({
                            'background-color': "#181D31"
                        }, 100);
                    }
                }
            }
        }, 600);
    }
} 