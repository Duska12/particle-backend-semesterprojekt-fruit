var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com or http://localhost:3001

// initialise server-sent events
function initSSE() {
    if (typeof (EventSource) !== "undefined") {
        var url = rootUrl + "/api/events";
        var source = new EventSource(url);
        source.onmessage = (event) => {
            updateVariables(JSON.parse(event.data));
        };
    } else {
        alert("Your browser does not support server-sent events.");
    }
}
initSSE();


// Array, in dem alle empfangenen Gas-Werte gespeichert werden.
var allMeasurements = [];

// Maximaler Gas Level für die Berechnung des Prozentwerts
var maxLevel = 500;

// Diese Funktion wird immer dann ausgeführt, wenn ein neues Event empfangen wird.
function updateVariables(data) {

    if (data.eventName === "Gasdurch") {
        // Erhaltenen Wert in der Variable 'lux' speichern
        var gas = Number(data.eventData);
        //console.log(lux);

        // Wert am Ende des Arrays 'allMeasurements' hinzufügen
        allMeasurements.push(gas);

        // Wert in Prozent umrechnen und in 'level' speichern
        var level = gas * (100 / maxLevel);

        // Farbe des Balkens abhängig von Level festlegen
        // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
        if (level < 50) {
            color = "Aqua";
        } else {
            color = "Coral";
        }

        // CSS Style für die Hintergrundfarbe des Balkens
        var colorStyle = "background-color: " + color + " !important;";

        // CSS Style für die Breite des Balkens in Prozent
        var widthStyle = "width: " + level + "%;"

        // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
        // den Progressbar im HTML-Dokument zu aktualisieren
        document.getElementById("gaslevel-bar").style = colorStyle + widthStyle;

        // Text unterhalb des Balkens aktualisieren
        document.getElementById("gaslevel-text").innerHTML = gas + "Gasdurchschnitt"

        // Durchschnittlicher Temperaturwert
        // sobald ein Temperaturevent gesendet wird, soll er in einer Array gespeichert werden
        var allTemperature = [];

        // maximaler Temperaturwert
        var maxTemperatur = 30; 

        if (data.eventName === "Temperaturdurch") {
                // Erhaltenen Wert in der Variable 'lux' speichern
                var temp = Number(data.eventData);
                //console.log(lux);
        
                // Wert am Ende des Arrays 'allMeasurements' hinzufügen
                allMeasurements.push(temp);
        
                // Wert in Prozent umrechnen und in 'level' speichern
                var level = temp * (100 / maxLevel);

           // Farbe des Balkens abhängig von Level festlegen
        // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
        if (level < 50) {
            color = "DarkCyan";
        } else {
            color = "DarkMagneta";
        }

        // CSS Style für die Hintergrundfarbe des Balkens
        var colorStyle = "background-color: " + color + " !important;";

        // CSS Style für die Breite des Balkens in Prozent
        var widthStyle = "width: " + level + "%;"

        // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
        // den Progressbar im HTML-Dokument zu aktualisieren
        document.getElementById("templevel-bar").style = colorStyle + widthStyle;

        // Text unterhalb des Balkens aktualisieren
        document.getElementById("templevel-text").innerHTML = temp + "Temperaturdurchschnitt"



        // Durchschnitt aller bisherigen Messungen berechnen und in 'luxAverage' speichern
        //var gasSum = 0;
        //for (var measurement of allMeasurements) {
            //gasSum = gasSum + measurement;
        //}
        //var gasAverage = gasSum / allMeasurements.length;
        //console.log(luxAverage);

        // Durchschnittlichen Lux-Wert in Prozent umrechnen und als Balken und Text anzeigen
        //var levelAverage = gasAverage * (100 / maxLevel);
        //var widthStyleAverage = "width: " + levelAverage + "%;"
        //document.getElementById("gaslevel-average-bar").style = widthStyleAverage;
        //document.getElementById("gaslevel-average-text").innerHTML = gasAverage.toFixed(2) + "Gasdurch"; // Auf 2 Nachkommastellen reduzieren

        // Wert im Chart hinzufügen
        //addData(gas);
    }
}

//////////////////////////////////
/////   Code für das Chart   /////
//////////////////////////////////

// Chart und Variablen 
//var chartData, chartOptions, chart;
//google.charts.load('current', { packages: ['corechart'] });
//google.charts.setOnLoadCallback(drawChart);

// Chart initialisieren. Diese Funktion wird einmalig aufgerufen, wenn die Page geladen wurde.
//function drawChart() {
    // Daten mit dem Dummy-Wert ["", 0] initialisieren. 
    // (Dieser Dummy-Wert ist nötig, damit wir das Chart schon anzeigen können, bevor 
    // wir Daten erhalten. Es können keine Charts ohne Daten gezeichnet werden.)
    //chartData = google.visualization.arrayToDataTable([['Time', 'Gasdurch'], ["", 0]]);
    // Chart Options festlegen
    //chartOptions = {
        //title: 'Gas Level',
        //hAxis: { title: 'Time' },
        //vAxis: { title: 'Gas' },
        //animation: {
            //duration: 300, // Dauer der Animation in Millisekunden
            //easing: 'out',
        //},
        //curveType: 'function', // Werte als Kurve darstellen (statt mit Strichen verbundene Punkte)
        //legend: 'none',
        //vAxis: {
            // Range der vertikalen Achse
            //viewWindow: {
                //min: 0,
                //max: maxLevel
            //},
        //}
    //};
    // LineChart initialisieren
    //chart = new google.visualization.LineChart(document.getElementById('gaslevel-chart'));
    //chartData.removeRow(0); // Workaround: ersten (Dummy-)Wert löschen, bevor das Chart zum ersten mal gezeichnet wird.
    //chart.draw(chartData, chartOptions); // Chart zeichnen
//}

// Eine neuen Wert ins Chart hinzufügen
//function addData(gas) {

    //if (allMeasurements.length > 10) {
        // Älteste Messung in den Chartdaten entfernen 
        //chartData.removeRow(0);
    //}

    // aktuelles Datum/Zeit
    //var date = new Date();
    // aktuelle Zeit in der Variable 'localTime' speichern
    //var localTime = date.toLocaleTimeString();

    // neuen Wert zu den Chartdaten hinzufügen
    //chartData.addRow([localTime, gas]);

    // Chart neu rendern
    //chart.draw(chartData, chartOptions);
//}
}
