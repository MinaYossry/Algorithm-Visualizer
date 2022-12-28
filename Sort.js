var Sort = function (view, calc, sortOperations) {
    this.insertionSort2 = function (arr) {
        sortOperations.empty();
        sortOperations.op = ['']
        var lastSortedIndex = 0;
        $("#n0").addClass("sorted").css("backgroundColor", view.sortedColor)
        for (var currentIndex = 1; currentIndex < arr.length; currentIndex++) {
            if (arr[currentIndex] >= arr[lastSortedIndex]) {
                lastSortedIndex = currentIndex;
                sortOperations.push(new Operation(currentIndex, lastSortedIndex, currentIndex, false))
            }
            else {
                var temp = currentIndex;
                for (var prevIndex = lastSortedIndex; prevIndex >= 0; prevIndex--) {
                    if (arr[temp] < arr[prevIndex]) {
                        sortOperations.push(new Operation(temp, prevIndex, prevIndex, true))
                        calc.swap(arr, temp--, prevIndex)
                    }
                }
                lastSortedIndex = currentIndex;
            }
        }
        sortOperations.startSortingAnimations(view);
    }
    this.bubbleSort2OP = [
        'do',
        '   swapped = false<br>   for i = 1 to indexOfLastUnsortedElement-1',
        '       if leftElement > rightElement',
        '           swap(leftElement, rightElement)<br>           swapped = true; ++swapCounter',
        'while swapped',
    ]
    this.bubbleSort2 = function (arr) {
        sortOperations.empty();
        sortOperations.op = this.bubbleSort2OP;
        sortOperations.push(new Operation(-1, -1, null, false, 0))
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr.length - 1 - i; j++) {
                var operationObj = new Operation(j, j + 1, null, false, 2);

                if (arr[j] > arr[j + 1]) {
                    calc.swap(arr, j, j + 1);
                    operationObj.swap = true;
                    operationObj.op_id = 3;
                }
                if (j == arr.length - 2 - i) {
                    operationObj.lastSortedIndex = j + 1;
                }
                sortOperations.push(operationObj);
            }
            sortOperations.push(new Operation(-1, -1, null, false, 4))
        }
        sortOperations.startSortingAnimations(view);
    }

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

