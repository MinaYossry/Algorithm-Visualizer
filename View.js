//Func Obj holding all the views of the animation
function View() {
    this.delta = parseFloat($("#myRange").val()) / 100;
    this.initialSpeed = 500;
    var swapping = false;
    var fixedCharacter = "n";
    var elementWidth = 80;

    this.defaultColor = '#678983';

    //focusedLeftColor
    this.focusedColor1 = '#009900';
    //focusedRigthColor
    this.focusedColor = '#0099cc';
    this.sortedColor = '#c85e15';
    //finishedColor
    this.finishColor = "#181D31";
    /**
     * animationFiished =>name
     * it gives the divs the finishedColor after animation
     */
    this.finishAnimation = function () {
        $("#graph div").animate({
            'background-color': this.finishColor
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


    // Prop gives color for the reading line in PseudoCode
    this.onCode = function (id) {
        $("#code").children().eq(id).css('background-color', 'red')
    }
    this.offCode = function () {
        $("#code").children().css('background-color', 'rgb(18, 95, 95)')
    }


    // Prop for open the PsdeudoCode div
    this.openPseudoCode = function () {
        $("#openCodeArrow").addClass("on");
        $(".over").animate({
            top: "66.5vh",
        }, 500 * this.speed, "linear");
        $("#openCodeArrow").removeClass("fa-arrow-up").addClass("fa-arrow-down");

    }


    //Prop for close the PsdeudoCode div
    this.closePseudoCode = function () {
        $(".over").animate({
            top: "100vh",
        }, this.initialSpeed * this.delta, "linear");

        $("#openCodeArrow").removeClass("on")
        $("#openCodeArrow").removeClass("fa-arrow-down").addClass("fa-arrow-up");
    }

    this.openPseudoCode = function () {
        $("#openCodeArrow").addClass("on");
        $(".over").animate({
            top: "66.5vh",
        }, this.initialSpeed * this.delta, "linear");
        $("#openCodeArrow").removeClass("fa-arrow-up").addClass("fa-arrow-down");

    }
    /**
     * Prop for generateAllDivs
     * totalWidth variable for all generatedDivs
     * leftPos variable for the leftPos of the first div in the graph
     */
    this.generateDivs = function (arr, maxValue) {
        $("#graph").empty();
        var totalWidth = elementWidth * arr.length;
        var leftPos = Math.trunc(totalWidth / -2);
        for (var i = 0; i < arr.length; i++) {
            $("#graph").append(generateDiv(i, arr[i], leftPos, maxValue));
            leftPos += elementWidth;
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



    // Prop to glow  each div according it's satate
    this.glow = function (index, color) {
        $("#" + fixedCharacter + index).css({ 'background-color': color });
    }


    //Prop to swap two divs by animation
    this.swap = function (index1, index2) {
        // Get A strings of id of both elements
        var elem1 = $("#" + fixedCharacter + index1);
        var elem2 = $("#" + fixedCharacter + index2);
        if (!swapping) {
            swapping = true;

            var pos1 = parseInt(elem1.css("left"));
            var pos2 = parseInt(elem2.css("left"));

            elem1.attr("id", fixedCharacter + index2)
            elem2.attr("id", fixedCharacter + index1)

            // swap left position of both elements
            elem1.animate({
                left: `${pos2}px`
            }, this.initialSpeed * this.delta, "easeOutQuart");
            elem2.animate({
                left: `${[pos1]}px`
            }, this.initialSpeed * this.delta, "easeOutQuart", function () {
                swapping = false;
            });
        }
    }
}