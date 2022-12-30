var Operations = function () {
    this.sortOperations = [];
    this.interval = null;
    this.isSorting = false;
    this.currentIndex = 0;
    this.moving = false;

    this.push = function (operation) {
        this.sortOperations.push(operation);
    };

    this.empty = function () {
        this.sortOperations = [];
    }

    this.stopSorting = function () {
        this.currentIndex = 0;
        this.isSorting = false;
        clearInterval(this.interval);
        view.finishAnimation();
        view.offCode();
        $(".footer").hide(500);
        view.closePseudoCode();
    };

    this.stepForward = function (view) {
        if (this.currentIndex > 0) {
            view.glow(this.sortOperations[this.currentIndex - 1].firstIndex, view.defaultColor);
            view.glow(this.sortOperations[this.currentIndex - 1].secondIndex, view.defaultColor);
            $(".sorted").css("backgroundColor", view.sortedColor);
        }

        view.glow(this.sortOperations[this.currentIndex].firstIndex, view.focusedColor);
        view.glow(this.sortOperations[this.currentIndex].secondIndex, view.focusedColor);

        if (this.sortOperations[this.currentIndex].swap)
            view.swap(this.sortOperations[this.currentIndex].firstIndex, this.sortOperations[this.currentIndex].secondIndex);

        if (this.sortOperations[this.currentIndex].lastSortedIndex)
            $("#n" + this.sortOperations[this.currentIndex].lastSortedIndex).addClass("sorted");



        this.currentIndex++;
        if (this.currentIndex == this.sortOperations.length) {
            this.stopSorting();
        }
    }

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

    this.backward = function (view) {
        if (!this.moving && this.currentIndex > 0) {
            this.currentIndex--;
            this.forward(view)

            view.glow(this.sortOperations[this.currentIndex + 1].firstIndex, view.defaultColor);
            view.glow(this.sortOperations[this.currentIndex + 1].secondIndex, view.defaultColor);

            this.currentIndex--;
        } else if (!this.moving && this.currentIndex == 0) {
            view.glow(this.sortOperations[this.currentIndex].firstIndex, view.defaultColor);
            view.glow(this.sortOperations[this.currentIndex].secondIndex, view.defaultColor);
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


    var allDivs = $("#graph div");
    var leftIndex = 0; var rightIndex = 0;
    console.log(allDivs);
    var newLeft = -400;
    this.stepForwardMerge = function (view) {

        view.offCode();
        var leftArray = this.sortOperations[this.currentIndex].leftArray;
        var rightArray = this.sortOperations[this.currentIndex].rightArray;

        for (var i = 0; i < leftArray.length; i++)
            allDivs.eq(leftArray[i]).css("backgroundColor", view.focusedColor)

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
            this.currentIndex++;
            view.onCode(6);

            if (this.currentIndex == this.sortOperations.length) {
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
                for (var i = 0; i < $("#graph div").length; i++) {
                    $("#graph div").eq(i).attr("id", "n" + i);
                }
                allDivs = $("#graph div");


                var minIndex = this.sortOperations[this.currentIndex].leftArray[0];
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

    this.startMergeAnimation = function (view) {
        this.isSorting = true;
        var that = this;
        allDivs = $("#graph div");
        leftIndex = 0; rightIndex = 0;
        newLeft = -400;
        view.onCode(1);


        this.interval = setInterval((function () {
            this.stepForwardMerge(view);
        }).bind(that), 600);
    }
}

var Operation = function (_firstIndex, _secondIndex, _lastSortedIndex, _swap) {
    this.firstIndex = _firstIndex;
    this.secondIndex = _secondIndex;
    this.lastSortedIndex = _lastSortedIndex
    this.swap = _swap;
}