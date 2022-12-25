function View() {
    var swapping = false;
    var FIXED = "n";
    var ELEMENTWIDTH = 50;
    var calc = new Calcualtion();
    this.generateDivs = function (arr) {

        $("#graph").empty();
        var totalWidth = ELEMENTWIDTH * arr.length;
        var startItem = Math.trunc(totalWidth / -2);
        var maxValue = calc.getMax(arr);
        for (var i = 0; i < arr.length; i++) {
            $("#graph").append(generateDiv(i, arr[i], startItem, maxValue));
            startItem += ELEMENTWIDTH;
        }
    }

    var generateDiv = function (index, number, position, maxValue) {
        return $("<div>")
            .attr("id", FIXED + index).text(number)
            .css({
                left: position + "px",
                height: calcHeight(number, maxValue)
            });
    }

    var calcHeight = function (number, maxValue) {
        var minHeight = 50;
        var maxHeight = 150;
        return (((number / maxValue) * maxHeight) + minHeight) + "px";
    }

    this.glowView = function (index, color) {
        $("#" + FIXED + index).css({ 'background-color': color });
    }

    this.swapView = function (inedx1, index2) {
        // Get A strings of id of both elements
        var elem1 = $("#" + FIXED + inedx1);
        var elem2 = $("#" + FIXED + index2);
        console.log(inedx1, elem1, index2, elem2);
        if (!swapping) {
            swapping = true;

            var pos1 = parseInt(elem1.css("left"));
            var pos2 = parseInt(elem2.css("left"));

            elem1.attr("id", FIXED + index2)
            elem2.attr("id", FIXED + inedx1)

            // swap left position of both elements
            elem1.animate({
                left: `${pos2}px`
            }, 500, "linear");
            elem2.animate({
                left: `${[pos1]}px`
            }, 500, "linear", function () {
                swapping = false;
            });
        }
    }
}