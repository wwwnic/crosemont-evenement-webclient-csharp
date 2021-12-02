﻿"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/evenementsHub").build();

connection.on("actionRafraichir", function (message) {
    if (message != "") {
        var table = document.getElementById("tableEvenements");
        table.innerHTML = "";
        if (message == "Erreur de connexion") {
            table.innerHTML = message;
        } else {
            var listeEvenement = JSON.parse(message);
            for (var e of listeEvenement) {
                var rangeeTable = document.createElement("tr");
                var elementTable = document.createElement("td");
                rangeeTable.appendChild(elementTable);
                table.appendChild(rangeeTable);
                elementTable.textContent = `${e.nomEvenement}`;
            }
        }
    }
});

connection.start().then(window.setInterval(function () {
    connection.invoke("RafraichirEvenements").catch(function (err) {
        return console.error(err.toString());
    })
}, 1500)).catch(function (err) {
    return console.error(err.toString());
});