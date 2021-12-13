const logger = require('./db/logger.js');

exports.sendEvent = null;

exports.registerEventHandlers = function (source) {
    source.addEventListener('Gasdurch', handleGas);
    source.addEventListener('Temperaturdurch', handleTemp);
    // Register more event handlers here
    }
    
    function handleGas(event) {
        // read variables from the event
        var data = {
            eventName: event.type,
            eventData: JSON.parse(event.data).data, // the value of the event
            deviceId: JSON.parse(event.data).coreid,
            timestamp: JSON.parse(event.data).published_at
        };
    
        try {        
            // Log the event in the database
            logger.logOne("MyDB", "Gasdurchschnitt", data);
    
            // send data to all connected clients
            exports.sendEvent(data);
        } catch (error) {
            console.log("Could not handle event: " + JSON.stringify(event) + "\n");
            console.log(error)
        }
    }
    function handleTemp(event) {
        // read variables from the event
        var data = {
            eventName: event.type,
            eventData: JSON.parse(event.data).data, // the value of the event
            deviceId: JSON.parse(event.data).coreid,
            timestamp: JSON.parse(event.data).published_at
        };
    
        try {        
            // Log the event in the database
            logger.logOne("MyDB", "Temperaturdurchschnitt", data);
    
            // send data to all connected clients
            exports.sendEvent(data);
        } catch (error) {
            console.log("Could not handle event: " + JSON.stringify(event) + "\n");
            console.log(error)
        }
    }
