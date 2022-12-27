var Sort = function (view, calc) {
    this.isSorting = false;
    this.interval = null;
    this.operations = [];

    this.insertionSort2 = function (arr) {
        for (var step = 1; step < arr.length; step++) {
            var key = arr[step];
            var j = step - 1;

            while (key < arr[j] && j >= 0) {
                arr[j + 1] == arr[j];
                --j;
            }

            arr[j + 1] = key;
        }
    }

    this.bubbleSort2 = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr.length - 1 - i; j++) {
                var obj = {
                    firstIndex: j,
                    secondIndex: j + 1,
                    swap: false,
                    lastIndex: null
                }
                if (arr[j] > arr[j + 1]) {
                    calc.swap(arr, j, j + 1);
                    obj.swap = true;
                }
                if (j == arr.length - 2 - i) {
                    obj.lastIndex = j + 1;
                }
                this.operations.push(obj);
            }
        }
    }

    this.doOP = function () {
        var i = 0;
        var that = this;
        var interval = setInterval((function () {
            if (i > 0) {
                view.glow(this.operations[i - 1].firstIndex, view.defaultColor);
                view.glow(this.operations[i - 1].secondIndex, view.defaultColor);
                view.glow(this.operations[i - 1].lastIndex, view.sortedColor)
            }

            view.glow(this.operations[i].firstIndex, view.focusedColor);
            view.glow(this.operations[i].secondIndex, view.focusedColor);

            if (this.operations[i].swap)
                view.swap(this.operations[i].firstIndex, this.operations[i].secondIndex);


            i++;
            if (i == this.operations.length) {
                this.stopSorting();
                clearInterval(interval);
            }

        }).bind(that), 600);

    }

    this.stopSorting = function () {
        this.isSorting = false;
        clearInterval(this.interval);
        view.finishAnimation();
    };

    this.bubbleSort = function (arr) {
        this.isSorting = true;
        var i = 0, j = 0;
        var sorted = true;
        var that = this;
        this.interval = setInterval((function () {
            view.glow(j - 1, view.defaultColor);
            view.glow(j, view.focusedColor);
            view.glow(j + 1, view.focusedColor);

            if (arr[j] > arr[j + 1]) {
                view.swap(j, j + 1);
                calc.swap(arr, j, j + 1);
                sorted = false;
            }
            j++;
            if (j == arr.length - i - 1) {
                if (sorted) {
                    this.stopSorting(view.finishColor);
                }
                else {
                    view.glow(j, view.sortedColor)
                    view.glow(j - 1, view.defaultColor)
                    i++;
                    j = 0;
                    sorted = true;
                    if (i == arr.length - 1) {
                        this.stopSorting(view.finishColor);
                    }
                }
            }
        }).bind(that), 600);
    };

    this.insertionSort = function (arr) {
        this.isSorting = true;
        var currentIndex = 1, lastSortedNum = arr[0], lastSortedIndex = 0, prevIndex = 0;
        var innerLoop = false;

        var that = this;
        this.interval = setInterval((function () {
            view.glow(currentIndex, view.focusedColor);
            view.glow(prevIndex, view.sortedColor);
            console.log(currentIndex, prevIndex, lastSortedIndex);
            if (innerLoop && arr[currentIndex] < arr[prevIndex]) {
                view.swap(currentIndex, prevIndex)
                calc.swap(arr, currentIndex, prevIndex)
                prevIndex--;
                currentIndex--;
            }
            else if (innerLoop && arr[currentIndex] >= arr[prevIndex] || prevIndex == -1) {
                innerLoop = false;
                view.glow(currentIndex, view.sortedColor);
                currentIndex = lastSortedIndex + 1;
                prevIndex = lastSortedIndex;
            }
            else if (!innerLoop && arr[currentIndex] < arr[lastSortedIndex]) {
                innerLoop = true;
                view.swap(currentIndex, prevIndex)
                calc.swap(arr, currentIndex, prevIndex)
                currentIndex--;
                prevIndex--;
            } else if (!innerLoop && arr[currentIndex] >= arr[lastSortedIndex]) {
                lastSortedIndex = prevIndex = currentIndex;
                currentIndex++;
            }
            if (currentIndex == arr.length) {

                this.stopSorting(view.finishColor);
            }


        }).bind(that), 600);

    };
    var merge = function (arr, l, m, r) {
        var n1 = m - l + 1;
        var n2 = r - m;
        // Create temp arrays
        var L = new Array(n1);
        var R = new Array(n2);

        // Copy data to temp arrays L[] and R[]
        for (var i = 0; i < n1; i++)
            L[i] = arr[l + i];
        for (var j = 0; j < n2; j++)
            R[j] = arr[m + 1 + j];

        // Merge the temp arrays back into arr[l..r]

        // Initial index of first subarray
        var i = 0;

        // Initial index of second subarray
        var j = 0;

        // Initial index of merged subarray
        var k = l;
    }
    this.mergeSort = function (arr, l, r) {

        if (l >= r) {
            return;//returns recursively
        }
        var m = l + parseInt((r - l) / 2);
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    };


}

// JavaScript program for Merge Sort

// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
function merge(arr, l, m, r) {
    var n1 = m - l + 1;
    var n2 = r - m;

    // Create temp arrays
    var L = new Array(n1);
    var R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    // Merge the temp arrays back into arr[l..r]

    // Initial index of first subarray
    var i = 0;

    // Initial index of second subarray
    var j = 0;

    // Initial index of merged subarray
    var k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
function mergeSort(arr, l, r) {
    if (l >= r) {
        return;//returns recursively
    }
    var m = l + parseInt((r - l) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

