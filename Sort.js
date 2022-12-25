function Sort() {
    var view = new View();
    var calc = new Calcualtion();

    this.bubbleSort3 = function (arr) {
        var i = 0, j = 0;
        var sorted = true;
        interval = setInterval(function () {
            view.glowView(j, 'green');
            view.glowView(j - 1, 'green');
            view.glowView(j, 'red');
            view.glowView(j + 1, 'red');

            console.log(j, j + 1);
            if (arr[j] > arr[j + 1]) {
                view.swapView(j, j + 1);
                calc.swap(arr, j, j + 1);
                sorted = false;
            }
            j++;
            if (j == arr.length - i - 1) {
                view.glowView(j, 'yellow')
                view.glowView(j - 1, 'green')
                i++;
                j = 0
                if (i == arr.length - 1 || (sorted)) {
                    clearInterval(interval);
                    $("#graph div").animate({
                        'background-color': "green"
                    }, 100);
                }
            }
        }, 600);
    }

}