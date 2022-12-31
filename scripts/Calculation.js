//Function Object Holding All The Calculations in the Project
function Calculation() {
    // to store the generated numbers and the max value
    this.generatedArr = [];
    this.maxValue;

    /**
     * scan the array for max value
     * its used to determine the height of the divs
     * @returns max value in array
     */
    this.GetArrMax = function () {
        var max = this.generatedArr[0];
        for (var i in this.generatedArr) {
            if (this.generatedArr[i] > max)
                max = this.generatedArr[i];
        }
        return max;
    }

    /**
     * Generate array of random numbers
     * used on load of the page or pressing random
     * @param {*} min 
     * @param {*} max 
     * @param {*} elementsCount 
     * @returns array of generated numbers
     */
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

    /**
     * take array from the user and Parse it into INT
     * then get and max value of the array
     * @param {*} arr 
     * @returns the new array
     */
    this.enterArray = function (arr) {
        for (var i in arr) {
            //Parseing the string numbers the user entered
            arr[i] = parseInt(arr[i])
        }
        this.generatedArr = arr;
        this.maxValue = this.GetArrMax();
        return this.generatedArr;
    }

    /**
     * swap two numbers in generated array by index
     * @param {*} index1 
     * @param {*} index2 
     */
    this.swap = function (index1, index2) {
        var temp = this.generatedArr[index1];
        this.generatedArr[index1] = this.generatedArr[index2];
        this.generatedArr[index2] = temp;
    }

} 