var Sort = {
    isSorting: false,
    interval: null,

    stopSorting: function (finishColor) {
        Sort.isSorting = false;
        clearInterval(Sort.interval);
        $("#graph div").animate({
            'background-color': finishColor
        }, 100);
    },

    bubbleSort: function (arr, view, calc) {
        Sort.isSorting = true;
        var i = 0, j = 0;
        var sorted = true;
        Sort.interval = setInterval(function () {
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
                    Sort.stopSorting(view.finishColor);
                }
                else {
                    view.glowView(j, view.sortedColor)
                    view.glowView(j - 1, view.defaultColor)
                    i++;
                    j = 0;
                    sorted = true;
                    if (i == arr.length - 1) {
                        Sort.stopSorting(view.finishColor);
                    }
                }
            }
        }, 600);
    },

    insertionSort: function (arr, view, calc) {
        Sort.isSorting = true;
        var currentIndex = 1, lastSortedNum = arr[0], lastSortedIndex = 0, prevIndex = 0;
        var innerLoop = false;

        Sort.interval = setInterval(() => {
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
                Sort.stopSorting(view.finishColor);
            }


        }, 600);

    }
}