var Operations = function () {
    this.sortOperations = [];
    this.interval = null;
    this.isSorting = false;
    this.currentIndex = 0;
    this.moving = false;
    this.op = []
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
                console.log("Step Backward index =", this.sortOperations[this.currentIndex].lastSortedIndex);
            }
            view.glow(this.sortOperations[this.currentIndex].firstIndex, view.focusedColor)
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
        if (this.currentIndex > 0) {
            view.glow(this.sortOperations[this.currentIndex - 1].firstIndex, view.defaultColor);
            view.glow(this.sortOperations[this.currentIndex - 1].secondIndex, view.defaultColor);
            $(".sorted").css("backgroundColor", view.sortedColor);
        }
        view.offCode();
        view.onCode(this.sortOperations[this.currentIndex].op_id)
        view.glow(this.sortOperations[this.currentIndex].firstIndex, view.focusedColor);
        view.glow(this.sortOperations[this.currentIndex].secondIndex, view.focusedColor);

        if (this.sortOperations[this.currentIndex].swap)
            view.swap(this.sortOperations[this.currentIndex].firstIndex, this.sortOperations[this.currentIndex].secondIndex);

        // if (this.sortOperations[this.currentIndex].lastSortedIndex !== this.sortOperations[this.currentIndex].firstIndex)
        if (this.sortOperations[this.currentIndex].lastSortedIndex !== null) {
            $("#n" + this.sortOperations[this.currentIndex].lastSortedIndex)
                .addClass("sorted");
            console.log("Step Forward index =", this.sortOperations[this.currentIndex].lastSortedIndex);

        }

        this.currentIndex++;
        if (this.currentIndex == this.sortOperations.length) {
            this.stopSorting();
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
}

var Operation = function (_firstIndex, _secondIndex, _lastSortedIndex, _swap, _op_id) {
    this.firstIndex = _firstIndex;
    this.secondIndex = _secondIndex;
    this.lastSortedIndex = _lastSortedIndex
    this.swap = _swap;
    this.op_id = _op_id
}