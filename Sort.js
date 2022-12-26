function Sort() {
    this.bubbleSort = function (arr, view, calc) {
        var i = 0, j = 0;
        var sorted = true;
        interval = setInterval(function () {
            view.glowView(j - 1, view.defaultColor);

            view.glowView(j, view.focusedColor);
            view.glowView(j + 1, view.focusedColor);

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
                        'background-color': view.finishColor
                    }, 100);
                }
                else {
                    view.glowView(j, view.sortedColor)
                    view.glowView(j - 1, view.defaultColor)
                    i++;
                    j = 0;
                    sorted = true;
                    if (i == arr.length - 1) {
                        clearInterval(interval);
                        $("#graph div").animate({
                            'background-color': view.finishColor
                        }, 100);
                    }
                }
            }
        }, 600);
    }

}