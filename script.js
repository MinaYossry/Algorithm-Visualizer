var swapping = false;

$(function () {
    $(".graph div").each(function (idx, elem) {
        elem.style.height = (((parseInt(elem.innerText) / 50) * 150) + 50) + "px";
    });


    $("#test").click(function () {
        if (!swapping) {
            swapping = true;

            var two = parseInt($(".two").css("left"));
            var five = parseInt($(".five").css("left"));
            $(".two").animate({
                left: `${five}px`
            }, 500, "linear");
            $(".five").animate({
                left: `${two}px`
            }, 500, "linear", () => (swapping = false));
        }
    })
})