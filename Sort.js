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

    /**
     * BubbleSort algorithm used to sort the generated array
     * it save every operation is sortOperations array to animate it later
     * Operation Object Parameters (firstIndex, SecondIndex, sortedIndex, swap, pseudoCode step)
     * @param {*} arr 
     */
    this.bubbleSort = function (arr) {
        // clear any previous sorting operations
        sortOperations.empty();
        sortOperations.PseudoCode = this.PseudoCode.bubbleSort;

        // to highlight first line of pseudo code at the beginning
        sortOperations.push(new Operation(-1, -1, null, false, 0))

        // flag to check if the array is already sorted - set to true to enter the loop for the first time
        var swap = true;
        for (var i = 0; i < arr.length && swap; i++) {
            swap = false;
            // to highlight the second line of pseudo code
            sortOperations.push(new Operation(-1, -1, null, false, 1))
            for (var j = 0; j < arr.length - 1 - i; j++) {
                // create operation object with the current indeces under consideration
                // begin with swap = false
                var operationObj = new Operation(j, j + 1, null, false, 3);

                // right number is bigger that left number
                // must be swapped
                if (arr[j] > arr[j + 1]) {
                    // swap in generated array
                    calc.swap(j, j + 1);
                    // set operation object flag to true
                    operationObj.swap = true;
                    operationObj.op_id = 4;
                    // still not sorted
                    swap = true;
                }

                // if true it means it's the last step in the inner loop
                // so the last number must be and biggest number and sorted
                if (j + 1 == arr.length - 1 - i) {
                    operationObj.lastSortedIndex = j + 1;
                }

                // insert operation
                sortOperations.push(operationObj);
            }

            // to hightlight the last line in pseudo code
            if (swap)
                sortOperations.push(new Operation(-1, -1, null, false, 5))
        }

        // start animation after the sort is done
        sortOperations.startSortingAnimations(view);
    }

    /**
     * SelectionSort algorithm used to sort the generated array
     * it save every operation is sortOperations array to animate it later
     * at every operation it compares the current minimum number with the current number
     * Operation Object Parameters (firstIndex, SecondIndex, sortedIndex, swap, pseudoCode step)
     * @param {*} arr 
     */
    this.selectionSort = function (arr) {
        // clear any previous sorting operations
        sortOperations.empty();
        sortOperations.PseudoCode = this.PseudoCode.selectionSort;

        // to save the index in minimum number
        var minIndex;

        // One by one move boundary of unsorted subarray
        for (var i = 0; i < arr.length; i++) {
            // to highlight the first line in pseudo code
            sortOperations.push(new Operation(-1, -1, null, false, 0))

            // Find the minimum element in unsorted array
            minIndex = i;
            for (var j = i + 1; j < arr.length; j++) {
                // create operation object with the current indeces under consideration
                // all operations swaps are false
                // it only get the index of the minimum number
                var operationObj = new Operation(minIndex, j, null, false, 1);

                // set the new index with minimum
                if (arr[j] < arr[minIndex]) {
                    operationObj.op_id = 2;
                    minIndex = j;
                }
                sortOperations.push(operationObj);

            }

            // Swap the found minimum element with the first unsorted element
            calc.swap(minIndex, i);
            sortOperations.push(new Operation(minIndex, i, i, true, 3));
        }

        // start animation after the sort is done
        sortOperations.startSortingAnimations(view);
    }

    /**
     * InsertionSort algorithm used to sort the generated array
     * it save every operation is sortOperations array to animate it later
     * at every operation it compares the current number with the last sorted number
     * if the current number is less than the last sorted number
     * loop through the sorted array to find the right position
     * Operation Object Parameters (firstIndex, SecondIndex, sortedIndex, swap, pseudoCode step)
     * @param {*} arr 
     */
    this.insertionSort = function (arr) {
        // clear any previous sorting operations
        sortOperations.empty();
        sortOperations.PseudoCode = this.PseudoCode.insertionSort;

        // consider the first element in the array is sorted
        var lastSortedIndex = 0;
        $("#n0").addClass("sorted").css("backgroundColor", view.sortedColor)

        // to highlight the first two lines in pseudo code
        sortOperations.push(new Operation(-1, -1, null, false, 0))
        sortOperations.push(new Operation(-1, -1, null, false, 1))

        for (var currentIndex = 1; currentIndex < arr.length; currentIndex++) {
            // highlight the third line in pseudo code
            sortOperations.push(new Operation(-1, -1, null, false, 2))

            // if the current element is bigger than the last sorted number
            // it means it's sorted
            // set the last sorted index with the current index
            if (arr[currentIndex] >= arr[lastSortedIndex]) {
                lastSortedIndex = currentIndex;
                // swap flag = false, there is no swapping
                sortOperations.push(new Operation(currentIndex, lastSortedIndex, currentIndex, false, 4))
            }
            // the current number in smaller than the last sorted number
            // loop through the sorted array to find the correct position
            // save every operation while doing so
            // terminate when it reach the right position
            else {
                var temp = currentIndex;
                var rightPosition = false;
                for (var prevIndex = lastSortedIndex; prevIndex >= 0 && !rightPosition; prevIndex--) {
                    sortOperations.push(new Operation(temp, prevIndex, prevIndex, false, 2))
                    // swap
                    if (arr[temp] < arr[prevIndex]) {
                        sortOperations.push(new Operation(temp, prevIndex, prevIndex, true, 3))
                        calc.swap(temp--, prevIndex)
                    }
                    // terminate the loop
                    else {
                        sortOperations.push(new Operation(temp, prevIndex, prevIndex, false, 4))
                        rightPosition = true;
                    }
                }
                // set the new last sorted index with the current index
                lastSortedIndex = currentIndex;
            }
        }
        // start animation after the sort is done
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
