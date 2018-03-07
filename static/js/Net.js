/*
    obsługa komunikację Ajax - serwer
*/

function Net() {

    var czekaj;
    var stan;
    var mojlogin;
    this.test = "test";

    $("#loginbutton").on("click", function () {
        var login = $("#loginname").val()
        $.ajax({
            url: "http://localhost:3000/",
            data: { action: "add", name: login },
            type: "POST",
            success: function (data) {
                switch (data) {

                    case "player1":
                        $("#info").html(data + ": " + login + "</br>Czekanie na gracza 2")
                        game.setPoz("front");

                        game.dajPionki()
                        czekaj = setInterval(function () { check() }, 500);
                        zniknij()
                        porownywanie = setInterval(function () { porownywanie_tablic_klient() }, 1000);

                        stan = data;
                        mojlogin = login;
                        break;

                    case "player2":
                        $("#info").text(data + ": " + login)
                        game.setPoz("back");

                        game.dajPionki()
                        zniknij()
                        porownywanie = setInterval(function () { porownywanie_tablic_klient() }, 1000);

                        stan = data;
                        mojlogin = login;
                        break;

                    case "login zajęty":
                        $("#info").text(data)
                        break;

                    case "brak miejsc":
                        $("#info").text(data)
                        break;
                }
            },
            error: function (xhr, status, error) {
                console.log("error")
            },
        });
    });

    $("#resetbutton").on("click", function () {
        $.ajax({
            url: "http://localhost:3000/",
            data: { action: "reset" },
            type: "POST",
            success: function (data) {
            },
            error: function (xhr, status, error) {
                console.log("error")
            },
        });
    });

    function zniknij() {
        $("#form").css("display", "none");
    }

    function check() {
        $.ajax({
            url: "http://localhost:3000/",
            data: { action: "check" },
            type: "POST",
            success: function (data) {
                if (data == "true") {
                    stop();
                    $("#info").html(stan + ": " + mojlogin + "</br>Gracz 2 dołączył")
                }
            },
            error: function (xhr, status, error) {
                console.log("error")
            },
        });

    }

    this.get_stan = function () {
        return stan;
    }

    function stop() {
        clearInterval(czekaj);
    }

    this.aktualizacja_tablicy_klient(){

    }
}