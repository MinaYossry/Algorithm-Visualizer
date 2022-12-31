//Func Obj holding all the views of the animation
function View() {
    // Attributs for animation speed
    this.delta = parseFloat($("#myRange").val()) / 100;
    this.initialSpeed = 500;

    // flag to control the animation
    // it prevent starting a new animation while animation is running
    var swapping = false;

    // The fixed part in divs "id" properties
    var fixedCharacter = "n";

    // The width the every div takes (including the padding-left)
    this.elementWidth = 80;

    this.defaultColor = '#678983';
    this.focusedLeftColor = '#009900';
    this.focusedRightColor = '#0099cc';
    this.sortedColor = '#c85e15';
    this.finishedColor = "#181D31";

    /**
     * it gives the divs the finishedColor after animation
     */
    this.finishAnimation = function () {
        $("#graph div").animate({
            'background-color': this.finishedColor
        }, 100 * this.delta);
    }

    /**
     * 
     * Prop generatePseudoCode for each sort type
     */
    this.generatePseudoCode = function (arr) {
        $("#code").empty();

        for (var i in arr) {
            var sentence = arr[i];
            $("#code").append('<pre>' + sentence + '</pre>')
        }
    }


    /**
     * Highlight the current step in pseudo code
     * @param {*} id 
     */
    this.onCode = function (id) {
        $("#code").children().eq(id).css('background-color', '#0099cc')
    }

    /**
     * turn off all pseudo code
     */
    this.offCode = function () {
        $("#code").children().css('background-color', '#678983')
    }


    /**
     * function to open pseudo code window
     * inoked by clicking #openCodeArrow
     */
    this.openPseudoCode = function () {
        $(".over").animate({
            top: "66.5vh",
        }, this.initialSpeed * this.delta, "linear");

        $("#openCodeArrow").addClass("on");
        // turn the arrow
        $("#openCodeArrow").removeClass("fa-arrow-up").addClass("fa-arrow-down");

    }


    /**
     * function to close pseudo code window
     * inoked by clicking #openCodeArrow
     */
    this.closePseudoCode = function () {
        $(".over").animate({
            top: "100vh",
        }, this.initialSpeed * this.delta, "linear");

        $("#openCodeArrow").removeClass("on")
        // turn the arrow
        $("#openCodeArrow").removeClass("fa-arrow-down").addClass("fa-arrow-up");
    }

    /**
     * Prop for generateAllDivs
     * totalWidth variable for all generatedDivs
     * leftPos variable for the leftPos of the first div in the graph
     */
    this.generateDivs = function (arr, maxValue) {
        // clear the current graph
        $("#graph").empty();
        var totalWidth = this.elementWidth * arr.length;
        var leftPos = Math.trunc(totalWidth / -2);
        for (var i = 0; i < arr.length; i++) {
            $("#graph").append(generateDiv(i, arr[i], leftPos, maxValue));
            leftPos += this.elementWidth;
        }
    }

    /**
     *Prop for generate one div each time it'll be called
     *it takes 3 param
     *it giv each div the id by (fixedCharacter + index)params
     *append the text on div by (number)pararm
     */
    var generateDiv = function (index, number, position, maxValue) {
        return $("<div>")
            .attr("id", fixedCharacter + index).text(number)
            .css({
                left: position + "px",
                height: calcHeight(number, maxValue)
            });
    }

    // Prop to Calculate for each div according it's value=numebr
    var calcHeight = function (number, maxValue) {
        var minHeight = 50;
        var maxHeight = 150;
        return (((number / maxValue) * maxHeight) + minHeight) + "px";
    }

    // Prop to glow  each div according it's state
    this.glow = function (index, color) {
        $("#" + fixedCharacter + index).css({ 'background-color': color });
    }

    //Prop to swap two divs by animation
    this.swap = function (index1, index2) {
        // Get A strings of id of both elements
        var elem1 = $("#" + fixedCharacter + index1);
        var elem2 = $("#" + fixedCharacter + index2);

        if (!swapping) {
            // Indicated that a swap is happenning
            swapping = true;

            var pos1 = parseInt(elem1.css("left"));
            var pos2 = parseInt(elem2.css("left"));

            // swap the id of each div
            elem1.attr("id", fixedCharacter + index2)
            elem2.attr("id", fixedCharacter + index1)

            // swap left position of both elements
            elem1.animate({
                left: `${pos2}px`
            }, this.initialSpeed * this.delta, "easeOutQuart");
            elem2.animate({
                left: `${[pos1]}px`
            }, this.initialSpeed * this.delta, "easeOutQuart", function () {
                // swap end
                swapping = false;
            });
        }
    }
}