var Operations = function () {
    this.sortOperations = [];
    this.interval = null;
    this.isSorting = false;
    this.currentIndex = 0;
    this.moving = false;
    this.PseudoCode = [];
    this.push = function (operation) {
        this.sortOperations.push(operation);
    };

    this.empty = function () {
        this.sortOperations = [];
        this.op = [];
    }

    this.stopSorting = function () {
        this.currentIndex = 0;
        this.isSorting = false;
        clearInterval(this.interval);
        view.finishAnimation();
        view.offCode();
    };

    this.startSortingAnimations = function (view) {
        this.moving = true;
        this.isSorting = true;
        var that = this;
        this.interval = setInterval((function () {
            this.stepForward(view);
        }).bind(that), 600);

    }

    this.start = function (view) {
        if (!this.moving)
            this.startSortingAnimations(view);
    }
    this.pause = function () {
        clearInterval(this.interval);
        this.moving = false;
    }
    this.stepBack = function (view) {
        if (this.currentIndex > 0) {
            view.offCode();
            view.onCode(this.sortOperations[this.currentIndex].op_id)
            view.glow(this.sortOperations[this.currentIndex].firstIndex, view.defaultColor)
            view.glow(this.sortOperations[this.currentIndex].secondIndex, view.defaultColor)


            this.currentIndex--;
            if (this.sortOperations[this.currentIndex].lastSortedIndex !== null) {
                $("#n" + this.sortOperations[this.currentIndex].lastSortedIndex)
                    .removeClass("sorted");
            }
            view.glow(this.sortOperations[this.currentIndex].firstIndex, view.focusedColor1)
            view.glow(this.sortOperations[this.currentIndex].secondIndex, view.focusedColor)
            if (this.sortOperations[this.currentIndex].swap) {
                view.swap(this.sortOperations[this.currentIndex].firstIndex,
                    this.sortOperations[this.currentIndex].secondIndex);
            }

            if (this.currentIndex == 0) {
                view.glow(this.sortOperations[this.currentIndex].firstIndex, view.defaultColor)
                view.glow(this.sortOperations[this.currentIndex].secondIndex, view.defaultColor)
                $("#n" + this.sortOperations[this.currentIndex].lastSortedIndex)
                    .removeClass("sorted");
                view.offCode();

            }
        }
    }
    this.backward = function (view) {
        if (!this.moving) {
            this.stepBack(view);
            this.moving = true;
            setTimeout(() => {
                this.moving = false;
            }, 600);
        }
    }

    this.stepForward = function (view) {
        view.offCode();
        view.onCode(this.sortOperations[this.currentIndex].op_id)
        if (this.currentIndex >= 0) {


            if (this.currentIndex > 0) {
                view.glow(this.sortOperations[this.currentIndex - 1].firstIndex, view.defaultColor);
                view.glow(this.sortOperations[this.currentIndex - 1].secondIndex, view.defaultColor);
                $(".sorted").css("backgroundColor", view.sortedColor);
            }

            view.glow(this.sortOperations[this.currentIndex].firstIndex, view.focusedColor1);
            view.glow(this.sortOperations[this.currentIndex].secondIndex, view.focusedColor);

            if (this.sortOperations[this.currentIndex].swap)
                view.swap(this.sortOperations[this.currentIndex].firstIndex, this.sortOperations[this.currentIndex].secondIndex);

            // if (this.sortOperations[this.currentIndex].lastSortedIndex !== this.sortOperations[this.currentIndex].firstIndex)
            if (this.sortOperations[this.currentIndex].lastSortedIndex !== null) {
                $("#n" + this.sortOperations[this.currentIndex].lastSortedIndex)
                    .addClass("sorted");
            }

            this.currentIndex++;
            if (this.currentIndex == this.sortOperations.length) {
                this.stopSorting();
            }
        }
    }
    this.forward = function (view) {
        if (!this.moving) {
            this.stepForward(view);
            this.moving = true;
            setTimeout(() => {
                this.moving = false;
            }, 600);
        }
    }

    this.startMergeAnimation = function (view) {
        this.isSorting = true;
        var allDivs = $("#graph div");
        var that = this;
        var leftIndex = 0; var rightIndex = 0;
        var newLeft = parseInt(allDivs.eq(0).css("left"));

        this.interval = setInterval((function () {
            var leftArray = this.sortOperations[this.currentIndex].leftArray;
            var rightArray = this.sortOperations[this.currentIndex].rightArray;

            for (var i = 0; i < leftArray.length; i++)
                allDivs.eq(leftArray[i]).css("backgroundColor", view.focusedColor)

            for (var i = 0; i < rightArray.length; i++)
                allDivs.eq(rightArray[i]).css("backgroundColor", view.focusedColor1)

            var leftDiv = allDivs.eq(leftArray[leftIndex]);
            var rightDiv = allDivs.eq(rightArray[rightIndex]);

            var startIndex = leftArray[0];
            var endIndex = rightArray[rightArray.length - 1];

            if (leftIndex < leftArray.length && rightIndex < rightArray.length) {
                var leftNumber = parseInt(leftDiv.text());
                var rightNumber = parseInt(rightDiv.text());

                if (leftNumber <= rightNumber) {
                    leftDiv.css("left", newLeft + 'px');
                    newLeft += 80;
                    $("#mergeGraph").append(leftDiv);
                    leftIndex++;
                } else {
                    rightDiv.animate({ "left": newLeft + 'px' }, 500, "linear");
                    newLeft += 80;
                    $("#mergeGraph").append(rightDiv);
                    rightIndex++;

                }
            }

            else if (leftIndex == leftArray.length && rightIndex == rightArray.length) {
                leftIndex = 0;
                rightIndex = 0;
                this.currentIndex++;

                if (this.currentIndex == this.sortOperations.length) {
                    $("#graph").append($("#mergeGraph div"));
                    this.stopSorting();
                }

                else {

                    var currentMerge = $("#mergeGraph div");
                    var temp = startIndex;
                    $("#mergeGraph div").css("backgroundColor", view.sortedColor)

                    if (startIndex === 0)
                        $("#graph").prepend($("#mergeGraph div").hide().show("linear"))
                    else {
                        $("#mergeGraph div").insertAfter($("#n" + (startIndex - 1))).hide().show("linear");
                    }
                    console.log(allDivs);
                    for (var i = 0; i < $("#graph div").length; i++) {
                        $("#graph div").eq(i).attr("id", "n" + i);
                    }
                    allDivs = $("#graph div");
                    console.log(allDivs);


                    var minIndex = this.sortOperations[this.currentIndex].leftArray[0];
                    newLeft = parseInt($("#graph div").eq(minIndex).css("left"));
                }
            }


            else if (leftIndex == leftArray.length) {
                rightDiv.animate({ "left": newLeft + 'px' }, 500, "linear");
                newLeft += 80;
                $("#mergeGraph").append(rightDiv);
                rightIndex++;
            }

            else if (rightIndex == rightArray.length) {
                leftDiv.css("left", newLeft + 'px');
                newLeft += 80;
                $("#mergeGraph").append(leftDiv);
                leftIndex++;
            }




        }).bind(that), 600);
    }
}

/*
0
: 
mergeOperation {leftArray: Array(1), rightArray: Array(1)}
1
: 
mergeOperation {leftArray: Array(2), rightArray: Array(1)}
2
: 
mergeOperation {leftArray: Array(1), rightArray: Array(1)}
3
: 
mergeOperation {leftArray: Array(3), rightArray: Array(2)}
4
: 
mergeOperation {leftArray: Array(1), rightArray: Array(1)}
5
: 
mergeOperation {leftArray: Array(2), rightArray: Array(1)}
6
: 
mergeOperation {leftArray: Array(1), rightArray: Array(1)}
7
: 
mergeOperation {leftArray: Array(3), rightArray: Array(2)}
8
: 
mergeOperation {leftArray: Array(5), rightArray: Array(5)}
*/

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