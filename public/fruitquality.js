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
        document.getElementById("gaslevel-text").innerHTML = gas
    }
}

async function getResult() {
    var dbName = document.getElementById("db").value;
    var collectionName = document.getElementById("collection").value;
    //var query = document.getElementById("query").value;


    var url = rootUrl + "/api/" + dbName + "/" + collectionName
    var response = await axios.get(url);
    
    var result = response.data;

    // update the html element
    document.getElementById("result").innerHTML = JSON.stringify(result);
}



       

