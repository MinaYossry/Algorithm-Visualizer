var Sort = {
    bubbleSort: function (arr, view, calc) {
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
    },

    insertionSort: function (arr, view, calc) {
        var currentIndex = 1, lastSortedNum = arr[0], lastSortedIndex = 0, prevIndex = 0;
        var innerLoop = false;

        var interval = setInterval(() => {
            view.glowView(currentIndex, view.focusedColor);
            view.glowView(prevIndex, view.sortedColor);
            console.log(currentIndex, prevIndex, lastSortedIndex);
            if (innerLoop && arr[currentIndex] < arr[prevIndex]) {
                view.swapView(currentIndex, prevIndex)
                calc.swap(arr, currentIndex, prevIndex)
                prevIndex--;
                currentIndex--;
            }
            else if (innerLoop && arr[currentIndex] >= arr[prevIndex] || prevIndex == -1) {
                innerLoop = false;
                view.glowView(currentIndex, view.sortedColor);
                currentIndex = lastSortedIndex + 1;
                prevIndex = lastSortedIndex;
            }
            else if (!innerLoop && arr[currentIndex] < arr[lastSortedIndex]) {
                innerLoop = true;
                view.swapView(currentIndex, prevIndex)
                calc.swap(arr, currentIndex, prevIndex)
                currentIndex--;
                prevIndex--;
            } else if (!innerLoop && arr[currentIndex] >= arr[lastSortedIndex]) {
                lastSortedIndex = prevIndex = currentIndex;
                currentIndex++;
            }
            if (currentIndex == arr.length) {

                clearInterval(interval);
                $("#graph div").animate({
                    'background-color': view.finishColor
                }, 100);
            }


        }, 600);

    }
}