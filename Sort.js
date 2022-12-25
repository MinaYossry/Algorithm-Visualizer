function Sort() {
    var view = new View();
    var calc = new Calcualtion();

    this.bubbleSort3 = function (arr) {
        let i = 0, j = 0;
        let sorted = true;
        interval = setInterval(function () {
            view.glowView(j, '#678983');
            view.glowView(j - 1, '#678983');
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
                if (sorted) {
                    clearInterval(interval);
                    $("#graph div").animate({
                        'background-color': "#181D31"
                    }, 100);
                }
                else {
                    view.glowView(j, 'rgb(200 94 21)')
                    view.glowView(j - 1, '#678983')
                    i++;
                    j = 0;
                    sorted = true;
                    if (i == arr.length - 1) {
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