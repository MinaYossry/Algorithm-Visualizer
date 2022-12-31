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
        this.sortOperations = [];
    }

    /**
     * Func used to terminate sorting or when the sorting ends
     */
    this.stopSorting = function () {
        this.operationCurrentIndex = 0;
        this.isSorting = false;
        clearInterval(this.interval);
        view.finishAnimation();
        view.offCode();
        $(".footer").hide(500);
        view.closePseudoCode();
    };

    /**
     * Func used for starting 'Bubble', 'Selection', 'Insertion' sort
     * it will make one step at every interval
     */
    this.startSortingAnimations = function () {
        this.moving = true;
        this.isSorting = true;
        // used to bind the callback function of the interval to the current operations object instead of Window object
        var that = this;
        this.interval = setInterval((function () {
            this.stepForward();
        }).bind(that), (view.initialSpeed *this.delta)+100);

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
        view.glow(operationObj.firstIndex, view.focusedColor1)
        view.glow(operationObj.secondIndex, view.focusedColor)
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
            this.stepBack();
            this.moving = true;
            // reset the flag after animation ends
            setTimeout(() => {
                this.moving = false;
            }, 600);
        }
    }

    /**
     * Func to take a step forward while paused
     * it will advance the current operation
     * increment the operationCurrentIndex by 1
     * 
     */
    this.stepForward = function () {
        var currentOperation = this.sortOperations[this.operationCurrentIndex];
        view.offCode();
        view.onCode(currentOperation.op_id)
        if (this.operationCurrentIndex >= 0) {
            if (this.operationCurrentIndex > 0) {
                var previosOperation = this.sortOperations[this.operationCurrentIndex - 1];
                glowDefaultColors(previosOperation)
                $(".sorted").css("backgroundColor", view.sortedColor);
            }

            glowFocusedColors(currentOperation);

            if (currentOperation.swap)
                view.swap(currentOperation.firstIndex, currentOperation.secondIndex);

            if (currentOperation.lastSortedIndex !== null) {
                $("#n" + currentOperation.lastSortedIndex).addClass("sorted");
            }

            currentOperation = this.sortOperations[++this.operationCurrentIndex];
            if (this.operationCurrentIndex == this.sortOperations.length) {
                this.stopSorting();
            }
        }
    }
    /**
     * 
     */
    this.forward = function () {
        if (!this.moving) {
            if ($(".selected").attr("id") == "mergeSort")
                this.stepForwardMerge();
            else
                this.stepForward();
            this.moving = true;
            setTimeout(() => {
                this.moving = false;
            }, (view.initialSpeed * this.delta) + 100);
        }
    }


    var allDivs = $("#graph div");
    var leftIndex = 0; var rightIndex = 0;
    var newLeft = -400;
    this.stepForwardMerge = function () {

        view.offCode();
        var leftArray = this.sortOperations[this.operationCurrentIndex].leftArray;
        var rightArray = this.sortOperations[this.operationCurrentIndex].rightArray;
        // loop over the left array indexes and color them
        for (var i = 0; i < leftArray.length; i++)
            allDivs.eq(leftArray[i]).css("backgroundColor", view.focusedColor)

        // loop over the right array indexes and color them
        for (var i = 0; i < rightArray.length; i++)
            allDivs.eq(rightArray[i]).css("backgroundColor", view.focusedColor1)

        var leftDiv = allDivs.eq(leftArray[leftIndex]);
        var rightDiv = allDivs.eq(rightArray[rightIndex]);

        var startIndex = leftArray[0];

        if (leftIndex < leftArray.length && rightIndex < rightArray.length) {
            var leftNumber = parseInt(leftDiv.text());
            var rightNumber = parseInt(rightDiv.text());

            if (leftNumber <= rightNumber) {
                leftDiv.css("left", newLeft + 'px');
                newLeft += 80;
                $("#mergeGraph").append(leftDiv);
                leftIndex++;
                view.onCode(2);
                view.onCode(3);
                view.onCode(4);
            } else {
                rightDiv.animate({ "left": newLeft + 'px' }, 500, "linear");
                newLeft += 80;
                $("#mergeGraph").append(rightDiv);
                rightIndex++;
                view.onCode(2);
                view.onCode(5);

            }
        }

        else if (leftIndex == leftArray.length && rightIndex == rightArray.length) {
            leftIndex = 0;
            rightIndex = 0;
            this.operationCurrentIndex++;
            view.onCode(6);

            if (this.operationCurrentIndex == this.sortOperations.length) {
                $("#graph").append($("#mergeGraph div"));
                this.stopSorting();
            }

            else {
                $("#mergeGraph div").css("backgroundColor", view.sortedColor)

                if (startIndex === 0)
                    $("#graph").prepend($("#mergeGraph div").hide().show("linear"))
                else {
                    $("#mergeGraph div").insertAfter($("#n" + (startIndex - 1))).hide().show("linear");
                }
                // put the correct ids
                for (var i = 0; i < $("#graph div").length; i++) {
                    $("#graph div").eq(i).attr("id", "n" + i);
                }
                allDivs = $("#graph div");


                var minIndex = this.sortOperations[this.operationCurrentIndex].leftArray[0];
                newLeft = parseInt($("#graph div").eq(minIndex).css("left"));
            }
        }


        else if (leftIndex == leftArray.length) {
            rightDiv.animate({ "left": newLeft + 'px' }, 500, "linear");;
            newLeft += 80;
            $("#mergeGraph").append(rightDiv);
            rightIndex++;
            view.onCode(2);
            view.onCode(3);
            view.onCode(4);
        }

        else if (rightIndex == rightArray.length) {
            leftDiv.css("left", newLeft + 'px');
            newLeft += 80;
            $("#mergeGraph").append(leftDiv);
            leftIndex++;
            view.onCode(2);
            view.onCode(5);
        }
    }

    this.startMergeAnimation = function () {
        this.isSorting = true;
        var that = this;
        allDivs = $("#graph div");
        leftIndex = 0; rightIndex = 0;
        newLeft = -400;
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