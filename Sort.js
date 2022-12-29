var Sort = function (view, calc, sortOperations) {
    this.PseudoCode = {
        bubbleSort: [
            '<br>do',
            '   swapped = false<br>   for i = 1 to indexOfLastUnsortedElement-1',
            '       if leftElement > rightElement',
            '           swap(leftElement, rightElement)<br>           swapped = true; ++swapCounter',
            'while swapped<br><br>',
        ],
        selectionSort: [
            '<br>repeat(numOfElements - 1) times<br>   set the first unsorted element as the minimum<br>   for each of the unsorted elements',
            '       if element < currentMinimum',
            '           set element as new minimum',
            '   swap minimum with first unsorted position<br><br>',
        ]
        ,
        insertionSort: [
            'mark first element as sorted',

            'for each unsorted element X<br>    "extract" the element X',

            '   for j = lastSortedIndex down to 0',

            '       if current element j > X<br>       move sorted element to the right by 1',

            '   break loop and insert X here',
        ],

    }

    this.bubbleSort = function (arr) {
        sortOperations.empty();
        sortOperations.PseudoCode = this.PseudoCode.bubbleSort;
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

    this.selectionSort = function (arr) {
        sortOperations.empty();
        var i, j, minIndex;

        // One by one move boundary of unsorted subarray
        for (i = 0; i < arr.length; i++) {
            sortOperations.push(new Operation(-1, -1, null, false, 0))

            // Find the minimum element in unsorted array
            minIndex = i;
            for (j = i + 1; j < arr.length; j++) {
                var operationObj = new Operation(minIndex, j, null, false, 1);
                if (arr[j] < arr[minIndex]) {
                    sortOperations.push(operationObj);
                    sortOperations.push(new Operation(-1, -1, null, false, 2))
                    minIndex = j;
                    continue;
                }
                sortOperations.push(operationObj);

            }
            var operationObj = new Operation(minIndex, i, i, true, 3);

            // Swap the found minimum element with the first element
            calc.swap(arr, minIndex, i);
            sortOperations.push(operationObj);
        }
        sortOperations.startSortingAnimations(view);
    }



    this.insertionSort = function (arr) {
        sortOperations.empty();
        sortOperations.PseudoCode = ['']
        var lastSortedIndex = 0;
        $("#n0").addClass("sorted").css("backgroundColor", view.sortedColor)
        sortOperations.push(new Operation(-1, -1, null, false, 0))

        for (var currentIndex = 1; currentIndex < arr.length; currentIndex++) {
            sortOperations.push(new Operation(-1, -1, null, false, 2))
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



    var merge = function merge(arr, l, m, r) {
        var n1 = m - l + 1;
        var n2 = r - m;

        // Create temp arrays
        var L = new Array(n1);
        var leftIndeces = new Array(n1);
        var R = new Array(n2);
        var rightIndeces = new Array(n2);


        // Copy data to temp arrays L[] and R[]
        for (var i = 0; i < n1; i++) {
            L[i] = arr[l + i];
            leftIndeces[i] = l + i;
        }
        for (var j = 0; j < n2; j++) {
            R[j] = arr[m + 1 + j];
            rightIndeces[j] = m + 1 + j;

        }

        var operationObj = new mergeOperation(leftIndeces, rightIndeces)
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
        sortOperations.push(operationObj);
        console.log(sortOperations.sortOperations);
    }

    this.mergeSort = function mergeSort(arr, l, r) {
        if (l < r) {

            // Same as (l + r) / 2, but avoids overflow
            // for large l and r
            let m = l + Math.floor((r - l) / 2);

            // Sort first and second halves
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);

            merge(arr, l, m, r);

        }
    }


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

