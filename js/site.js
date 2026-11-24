$(document).ready(function () {
                $(".innerPas").click(function () {
                    $(".innerPas").removeClass("innerPasActive");
                    $(this).addClass("innerPasActive");
                });
            });
            $(document).ready(function () {
                $("#nav-icon1").click(function () {
                    $("body").toggleClass("open");
                });
                $(".slideRight").click(function () {
                    $("body").toggleClass("open");
                });
            });
