//Function Object Holding All The Calculations in the Project

function Calcualtion() {
    this.generatedArr = [];
    this.maxValue;
    
    //Array to save the operations to control the animation
    //and the next & back Buttons
    this.operations = [];

    //Func to get the max value of the generated array 
    this.GetArrMax = function () {
        var max = this.generatedArr[0];
        for (var i in this.generatedArr) {
            if (this.generatedArr[i] > max)
                max = this.generatedArr[i];
        }
        return max;
    }

    //Func to generate random array every time the user click Random Button & Any sort type in nav bar
    this.generateRandomArr = function (min = 1, max = 50, elementsCount = 10) {
        this.generatedArr = [];
        for (var i = 0; i < elementsCount; i++) {
            
            //Random numbers that will be generated in the array usig => Math.random() func
            var randomNumber = Math.floor(Math.random() * (max - min)) + min;
            this.generatedArr.push(randomNumber);
        }
        this.maxValue = this.GetArrMax();
        return this.generatedArr;
    }

    //Func for the input that takes array from the user
    this.enterArray = function (arr) {
        for (var i in arr) {
            
            //Parseing the string numbers the user entered
            arr[i] = parseInt(arr[i])
        }
        this.generatedArr = arr;
        this.maxValue = this.GetArrMax();
        return this.generatedArr;
    }

    // Swap Func for all Sort Types
    this.swap = function (arr, index1, index2) {
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }

} 