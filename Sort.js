var Sort = function (view, calc, sortOperations) {
    this.PseudoCode = {
        bubbleSort: [
            '<br>do',
            '   swapped = false',
            '   for i = 1 to indexOfLastUnsortedElement-1',
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

        mergeSort: [
            'split each element into partitions of size 1',
            'recursively merge adjacent partitions',
            '  for i = leftPartIdx to rightPartIdx',
            '    if leftPartHeadValue <= rightPartHeadValue',
            '      copy leftPartHeadValue',
            '    else: copy rightPartHeadValue; Increase InvIdx',
            'copy elements back to original array'
        ]

    }

    this.bubbleSort = function (arr) {
        sortOperations.empty();
        sortOperations.PseudoCode = this.PseudoCode.bubbleSort;
        sortOperations.push(new Operation(-1, -1, null, false, 0))
        var swap = true;
        for (var i = 0; i < arr.length && swap; i++) {
            swap = false;
            sortOperations.push(new Operation(-1, -1, null, false, 1))
            for (var j = 0; j < arr.length - 1 - i; j++) {
                var operationObj = new Operation(j, j + 1, null, false, 3);

                if (arr[j] > arr[j + 1]) {
                    calc.swap(j, j + 1);
                    operationObj.swap = true;
                    operationObj.op_id = 4;
                    swap = true;
                }
                if (j == arr.length - 2 - i) {
                    operationObj.lastSortedIndex = j + 1;
                }
                sortOperations.push(operationObj);
            }

            if (swap)
                sortOperations.push(new Operation(-1, -1, null, false, 5))
        }
        sortOperations.startSortingAnimations(view);
    }

    this.selectionSort = function (arr) {
        sortOperations.empty();
        sortOperations.PseudoCode = this.PseudoCode.selectionSort;
        var i, j, minIndex;

        // One by one move boundary of unsorted subarray
        for (i = 0; i < arr.length; i++) {
            sortOperations.push(new Operation(-1, -1, null, false, 0))

            // Find the minimum element in unsorted array
            minIndex = i;
            for (j = i + 1; j < arr.length; j++) {
                var operationObj = new Operation(minIndex, j, null, false, 1);
                if (arr[j] < arr[minIndex]) {
                    operationObj.op_id = 2;
                    minIndex = j;
                }
                sortOperations.push(operationObj);

            }

            // Swap the found minimum element with the first element
            calc.swap(minIndex, i);
            sortOperations.push(new Operation(minIndex, i, i, true, 3));
        }
        sortOperations.startSortingAnimations(view);
    }



    this.insertionSort = function (arr) {
        sortOperations.empty();
        sortOperations.PseudoCode = this.PseudoCode.insertionSort;
        var lastSortedIndex = 0;
        $("#n0").addClass("sorted").css("backgroundColor", view.sortedColor)
        sortOperations.push(new Operation(-1, -1, null, false, 0))
        sortOperations.push(new Operation(-1, -1, null, false, 1))

        for (var currentIndex = 1; currentIndex < arr.length; currentIndex++) {
            sortOperations.push(new Operation(-1, -1, null, false, 2))
            if (arr[currentIndex] >= arr[lastSortedIndex]) {
                lastSortedIndex = currentIndex;
                sortOperations.push(new Operation(currentIndex, lastSortedIndex, currentIndex, false, 4))
            }
            else {
                var temp = currentIndex;
                var rightPosition = false;
                for (var prevIndex = lastSortedIndex; prevIndex >= 0 && !rightPosition; prevIndex--) {
                    sortOperations.push(new Operation(temp, prevIndex, prevIndex, false, 2))
                    if (arr[temp] < arr[prevIndex]) {
                        sortOperations.push(new Operation(temp, prevIndex, prevIndex, true, 3))
                        calc.swap(temp--, prevIndex)
                    } else {
                        sortOperations.push(new Operation(temp, prevIndex, prevIndex, false, 4))
                        rightPosition = true;
                    }
                }
                lastSortedIndex = currentIndex;
            }
        }
        sortOperations.startSortingAnimations(view);
    }



    var merge = function (arr, leftIndex, midIndex, rightIndex) {
        var leftArrLength = midIndex - leftIndex + 1;
        var rightArrLength = rightIndex - midIndex;

        // Create temp arrays
        var L = new Array(leftArrLength);
        var leftIndeces = new Array(leftArrLength);
        var R = new Array(rightArrLength);
        var rightIndeces = new Array(rightArrLength);


        // Copy data to temp arrays L[] and R[]
        for (var i = 0; i < leftArrLength; i++) {
            L[i] = arr[leftIndex + i];
            leftIndeces[i] = leftIndex + i;
        }
        for (var j = 0; j < rightArrLength; j++) {
            R[j] = arr[midIndex + 1 + j];
            rightIndeces[j] = midIndex + 1 + j;

        }

        var operationObj = new mergeOperation(leftIndeces, rightIndeces)
        // Merge the temp arrays back into arr[l..r]

        // Initial index of first subarray
        var i = 0;

        // Initial index of second subarray
        var j = 0;

        // Initial index of merged subarray
        var k = leftIndex;

        while (i < leftArrLength && j < rightArrLength) {
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
        while (i < leftArrLength) {
            arr[k] = L[i];
            i++;
            k++;
        }

        // Copy the remaining elements of
        // R[], if there are any
        while (j < rightArrLength) {
            arr[k] = R[j];
            j++;
            k++;
        }
        sortOperations.push(operationObj);
    }

    this.mergeSort = function (arr, left, right) {
        sortOperations.PseudoCode = this.PseudoCode.mergeSort;
        if (left < right) {

            // Same as (l + r) / 2, but avoids overflow
            // for large l and r
            let mid = left + Math.floor((right - left) / 2);

            // Sort first and second halves
            this.mergeSort(arr, left, mid);
            this.mergeSort(arr, mid + 1, right);

            merge(arr, left, mid, right);

        }
    }


}
