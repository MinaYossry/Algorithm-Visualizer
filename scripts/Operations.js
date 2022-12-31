var Operations = function (view) {
    this.delta = parseFloat($("#myRange").val()) / 100;

    this.sortOperations = [];
    this.interval = null;
    this.isSorting = false;
    this.operationCurrentIndex = 0;
    this.isMoving = false;
    this.PseudoCode = [];


    /**
     * Func takes operation object and push it sortOperations array
     * @param operationObj 
     */
    this.push = function (operationObj) {
        this.sortOperations.push(operationObj);
    };

    /**
     * Func to empty sortOperations array
     */
    this.empty = function () {
        this.saveBackOperations = [];
        this.sortOperations = [];
        this.operationCurrentIndex = 0;
    }

    /**
     * Func used to terminate sorting or when the sorting ends
     */
    this.stopSorting = function () {
        this.saveBackOperations = [];
        this.sortOperations = [];
        this.operationCurrentIndex = 0;
        this.isSorting = false;
        clearInterval(this.interval);
        view.finishAnimation();
        view.offCode();
        $(".footer").hide(500);
        view.closePseudoCode();
        $("#disk_c").val(0);
    };

    /**
     * Func used for starting 'Bubble', 'Selection', 'Insertion' sort
     * it will make one step at every interval
     */
    this.startSortingAnimations = function () {
        $("#disk_c").attr("max", this.sortOperations.length);
        this.moving = true;
        this.isSorting = true;
        // used to bind the callback function of the interval to the current operations object instead of Window object
        var that = this;
        this.interval = setInterval((function () {
            this.stepForward();
        }).bind(that), (view.initialSpeed * this.delta) + 100);

    }

    /**
     * 
     * Func for the start button to resume sorting animation
     */
    this.start = function () {
        if (!this.isMoving) {
            if ($(".selected").attr("id") == "mergeSort")
                this.startMergeAnimation();
            else
                this.startSortingAnimations();
        }
    }

    /**
     * Func for the pause button to stop animation
     */
    this.pause = function () {
        clearInterval(this.interval);
        this.moving = false;
    }

    /**
     * private Func to reset operationsObj to default colors
     * used in stepBack and stepForward
     * @param {*} operationObj 
     */
    var glowDefaultColors = function (operationObj) {
        view.glow(operationObj.firstIndex, view.defaultColor)
        view.glow(operationObj.secondIndex, view.defaultColor)
    }

    /**
     * private Func to highlight the current operation with correct colors
     * used in stepBack and stepForward
     * @param {*} operationObj 
     */
    var glowFocusedColors = function (operationObj) {
        view.glow(operationObj.firstIndex, view.focusedLeftColor)
        view.glow(operationObj.secondIndex, view.focusedRightColor)
    }

    /**
     * Func to take a step back while paused
     * it will reverse the current operation
     * decrement the operationCurrentIndex by 1
     * and reset the colors to nomral
     */
    this.stepBack = function () {
        if (this.operationCurrentIndex > 0) {
            var currentOperation = this.sortOperations[this.operationCurrentIndex];

            // turn off pseudo code
            view.offCode();
            // turn on current step in pseudo code
            view.onCode(currentOperation.op_id)
            // reset the current operation to default colors
            glowDefaultColors(currentOperation);

            // Get the previous operations
            currentOperation = this.sortOperations[--this.operationCurrentIndex];
            $("#disk_c").val(this.operationCurrentIndex);

            // if the current number is sorted, make it unsorted to remove the "sortedColor" and reset to corrent color
            if (currentOperation.lastSortedIndex !== null) {
                $("#n" + currentOperation.lastSortedIndex).removeClass("sorted");
            }

            // highlight the current two numbers in focuesColor 
            glowFocusedColors(currentOperation);

            // reverse the swap of the current numberts
            if (currentOperation.swap) {
                view.swap(currentOperation.firstIndex, currentOperation.secondIndex);
            }

            // if it's the first operation turn off pseudo code and remove class sorted
            if (this.operationCurrentIndex == 0) {
                glowDefaultColors(currentOperation);
                $("#n" + currentOperation.lastSortedIndex).removeClass("sorted");
                view.offCode();
            }
        }
    }

    /**
     * Func used in backward button to take a step back in the sorting animation
     * "this.moving" is flag used to prevent the user from double clicking on the back button while an animation is happening
     */
    this.backward = function () {
        if (!this.moving) {
            if ($(".selected").attr("id") == "mergeSort")
                this.stepBackMerge();
            else
                this.stepBack();
            this.moving = true;
            // reset the flag after animation ends
            setTimeout(() => {
                this.moving = false;
            }, 600);
        }
    }.bind(this)

    /**
     * Func to take a step forward while paused
     * it will advance the current operation
     * increment the operationCurrentIndex by 1
     * 
     */
    this.stepForward = function () {
        // Save the current operation
        var currentOperation = this.sortOperations[this.operationCurrentIndex];
        view.offCode();
        view.onCode(currentOperation.op_id)
        if (this.operationCurrentIndex >= 0) {
            // Reset the previous operations to default colors
            // and highlight the sorted divs with correct colors
            if (this.operationCurrentIndex > 0) {
                var previosOperation = this.sortOperations[this.operationCurrentIndex - 1];
                glowDefaultColors(previosOperation)
                $(".sorted").css("backgroundColor", view.sortedColor);
            }


            // Highlight the current colors with focuesd colors
            glowFocusedColors(currentOperation);

            // swap the numbers of firstIndex > secondsIndex
            if (currentOperation.swap)
                view.swap(currentOperation.firstIndex, currentOperation.secondIndex);

            // mark the sorted divs as sorted to highlight with sortedColors
            if (currentOperation.lastSortedIndex !== null) {
                $("#n" + currentOperation.lastSortedIndex).addClass("sorted");
            }

            // advance the index to the next operations
            currentOperation = this.sortOperations[++this.operationCurrentIndex];
            $("#disk_c").val(this.operationCurrentIndex);


            // at the end of operations
            if (this.operationCurrentIndex == this.sortOperations.length) {
                this.stopSorting();
            }
        }
    }

    /**
     * Func used in forward button to take a step forward in the sorting animation
     * "this.moving" is flag used to prevent the user from double clicking on the forward button while an animation is happening
     */
    this.forward = function () {
        if (!this.moving) {
            if ($(".selected").attr("id") == "mergeSort")
                this.stepForwardMerge();
            else
                this.stepForward();
            this.moving = true;
            // reset the flag after animation ends
            setTimeout(() => {
                this.moving = false;
            }, (view.initialSpeed * this.delta) + 100);
        }
    }.bind(this)

    /**
    * The following code is for the merge sort
    */
    // all number generated in the graph
    var allDivs = $("#graph div");

    // leftIndex and right Index for the left and right sub-array of each merge
    var leftIndex = 0; var rightIndex = 0;

    // the starting position(left) to be put in order in #mergeGraph
    var newLeft = parseInt($("#graph div").eq(0).css("left"));

    // to hold the position of each sub array
    var startIndex = 0;

    this.saveBackOperations = [];
    /**
     * used to step forward in animation
     * compares the numbers in divs and order them in mergeGraph
     * then insert them back in correct order in original #graph
     * each full operation consist of left and right sub arraies to be merged in order
     * the function enter the next operation when both left and right sub-arries is empty 
     */
    this.stepForwardMerge = function () {
        var currentOperation = this.sortOperations[this.operationCurrentIndex];
        // turn off pseudo code
        view.offCode();

        // sub-arries of each operation
        var leftArray = currentOperation.leftArray;
        var rightArray = currentOperation.rightArray;

        // loop over the left array indexes and color them
        for (var i = 0; i < leftArray.length; i++)
            view.glow(leftArray[i], view.focusedLeftColor);

        // loop over the right array indexes and color them
        for (var i = 0; i < rightArray.length; i++)
            view.glow(rightArray[i], view.focusedRightColor);

        // the divs that will be compared based on the merge operation
        var leftDiv = allDivs.eq(leftArray[leftIndex]);
        var rightDiv = allDivs.eq(rightArray[rightIndex]);

        // the position that they will be inserted into
        startIndex = leftArray[0];

        // If there are number in both left and right arries
        if (leftIndex < leftArray.length && rightIndex < rightArray.length) {
            // The number in each div
            var leftNumber = parseInt(leftDiv.text());
            var rightNumber = parseInt(rightDiv.text());

            // leftNumber is in right position relative to right number
            // insert it into merge graph
            if (leftNumber <= rightNumber) {
                this.saveBackOperations.push([$("#graph").clone(), $("#mergeGraph").clone(), this.operationCurrentIndex, leftIndex, rightIndex, startIndex, newLeft]);
                newLeft = view.leftToMergeGraph(leftDiv, newLeft);

                leftIndex++;
            }
            // insert rightNumber left to leftNumber
            else {
                this.saveBackOperations.push([$("#graph").clone(), $("#mergeGraph").clone(), this.operationCurrentIndex, leftIndex, rightIndex, startIndex, newLeft]);
                newLeft = view.rightToMergeGraph(rightDiv, newLeft);

                rightIndex++;
            }
        }
        // If left and right arries are empty
        // it means the current operation has ended, advance to next operations
        else if (leftIndex == leftArray.length && rightIndex == rightArray.length) {
            // reset indeces
            leftIndex = 0;
            rightIndex = 0;

            // advance to next operations
            currentOperation = this.sortOperations[++this.operationCurrentIndex];
            $("#disk_c").val(this.operationCurrentIndex);
            view.onCode(6);

            // this means all operations have finished and tha graph is sorted
            if (this.operationCurrentIndex == this.sortOperations.length) {
                // move from bottom to top
                this.saveBackOperations.push([$("#graph").clone(), $("#mergeGraph").clone(), this.operationCurrentIndex, leftIndex, rightIndex, startIndex, newLeft]);
                $("#graph").append($("#mergeGraph div"));
                this.saveBackOperations.push([$("#graph").clone(), $("#mergeGraph").clone(), this.operationCurrentIndex, leftIndex, rightIndex, startIndex, newLeft]);
                // terminate
                this.stopSorting();
            }

            else {
                // change sorted part in correct color
                $("#mergeGraph div").css("backgroundColor", view.sortedColor)
                this.saveBackOperations.push([$("#graph").clone(), $("#mergeGraph").clone(), this.operationCurrentIndex, leftIndex, rightIndex, startIndex, newLeft]);
                // Insert the sorted part(#mergeGraph) into the right position it #graph
                if (startIndex === 0)
                    // put it at the begining
                    $("#graph").prepend($("#mergeGraph div").hide(0).show(view.initialSpeed * this.delta, "linear"))
                else {
                    // put it after another div
                    $("#mergeGraph div").insertAfter($("#n" + (startIndex - 1))).hide(0).show(view.initialSpeed * this.delta, "linear");
                }

                // put the correct ids
                for (var i = 0; i < $("#graph div").length; i++) {
                    $("#graph div").eq(i).attr("id", "n" + i);
                }
                // update allDivs to the new graph
                allDivs = $("#graph div");

                // get the new left position of the new operation
                var minIndex = currentOperation.leftArray[0];
                newLeft = parseInt($("#graph div").eq(minIndex).css("left"));
            }
        }

        // If the left array in empty put the rest of the right array in merge graph
        else if (leftIndex == leftArray.length) {
            this.saveBackOperations.push([$("#graph").clone(), $("#mergeGraph").clone(), this.operationCurrentIndex, leftIndex, rightIndex, startIndex, newLeft]);
            newLeft = view.rightToMergeGraph(rightDiv, newLeft);

            rightIndex++;
        }

        // If the right array in empty put the rest of the left array in merge graph
        else if (rightIndex == rightArray.length) {
            this.saveBackOperations.push([$("#graph").clone(), $("#mergeGraph").clone(), this.operationCurrentIndex, leftIndex, rightIndex, startIndex, newLeft]);
            newLeft = view.leftToMergeGraph(leftDiv, newLeft);

            leftIndex++;
        }
    }


    /**
     * get the last operation setting from saveBackOperations array
     * then pop the last operation
     */
    this.stepBackMerge = function () {
        if (this.saveBackOperations.length > 0) {
            var currentOperation = this.saveBackOperations[this.saveBackOperations.length - 1];
            $("#graph").empty();
            $("#graph").append(currentOperation[0].children())
            allDivs = $("#graph div")
            $("#mergeGraph").empty();
            $("#mergeGraph").append(currentOperation[1].children())
            this.operationCurrentIndex = currentOperation[2];
            $("#disk_c").val(this.operationCurrentIndex);
            leftIndex = currentOperation[3];
            rightIndex = currentOperation[4];
            startIndex = currentOperation[5];
            newLeft = currentOperation[6]
            this.saveBackOperations.pop();
            console.log(this.saveBackOperations[this.saveBackOperations.length - 1]);
        }
    }

    this.resetMergeVariables = function () {
        allDivs = $("#graph div");
        // leftIndex and right Index for the left and right sub-array of each merge
        leftIndex = 0; rightIndex = 0;

        // the starting position(left) to be put in order in #mergeGraph
        newLeft = parseInt($("#graph div").eq(0).css("left"));

        // to hold the position of each sub array
        startIndex = 0;

        this.saveBackOperations = [];
    }

    /**
     * 
     */
    this.startMergeAnimation = function () {
        $("#disk_c").attr("max", this.sortOperations.length);
        this.isSorting = true;
        var that = this;
        allDivs = $("#graph div");
        newLeft = parseInt($("#graph div").eq(startIndex).css("left"));
        this.saveBackOperations.push([$("#graph").clone(), $("#mergeGraph").clone(), this.operationCurrentIndex, leftIndex, rightIndex, startIndex, newLeft]);
        view.onCode(1);

        this.interval = setInterval((function () {
            this.stepForwardMerge();
        }).bind(that), (view.initialSpeed * this.delta) + 100);
    }
}

var Operation = function (_firstIndex, _secondIndex, _lastSortedIndex, _swap, _op_id) {
    this.firstIndex = _firstIndex;
    this.secondIndex = _secondIndex;
    this.lastSortedIndex = _lastSortedIndex
    this.swap = _swap;
    this.op_id = _op_id
}

var mergeOperation = function (_leftArray, _rightArray) {
    this.leftArray = _leftArray;
    this.rightArray = _rightArray;
}