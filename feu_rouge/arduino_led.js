var five = require('johnny-five'); //importation du package johnny-five(permet la communication avec plusieurs objet connecté)
var firebase = require('firebase');
var board = new five.Board({port: "COM9"});
var ardxRef = firebase.initializeApp({
    databaseURL: "https://arduino-feu-default-rtdb.firebaseio.com/"
});
var led1, led2, led3, led4, led5, led6;
var led1State = 0, led2State = 0, led3State = 0, led4State = 0, led5State = 0, led6State = 0;

//Crear referencia
var dbRefObject = firebase.database().ref().child('LedTable');
var dbRefLed1 = dbRefObject.child('led1');
var dbRefLed2 = dbRefObject.child('led2');
var dbRefLed3 = dbRefObject.child('led3');
var dbRefLed4 = dbRefObject.child('led4');
var dbRefLed5 = dbRefObject.child('led5');
var dbRefLed6 = dbRefObject.child('led6');


// reset firebase data
ardxRef.database().ref('LedTable').set({
    'led1': led1State,
    'led2': led2State,
    'led3': led3State,
    'led4': led4State,
    'led5': led5State,
    'led6': led6State
});

/**
 * called on board is ready
 * 1. init leds
 * 2. reset led states to off
 * 3. register firebase event
 * */
board.on("ready", function () {
    led1 = new five.Led(13);
    led2 = new five.Led(12);
    led3 = new five.Led(11);

    led4 = new five.Led(7);
    led5 = new five.Led(5);
    led6 = new five.Led(3);
   

    led1.stop().off();
    led2.stop().off();
    led3.stop().off();

    led4.stop().off();
    led5.stop().off();
    led6.stop().off();

    listenEvent();
});

var listenEvent = function () {

    dbRefLed1.on('value', function (snapshot) {
        changeLed(led1,snapshot.val(),'led1');
    });

    dbRefLed2.on('value', function (snapshot) {
        changeLed(led2,snapshot.val(),'led2');
    });

    dbRefLed3.on('value', function (snapshot) {
        changeLed(led3,snapshot.val(),'led3');
    });

    dbRefLed4.on('value', function (snapshot) {
        changeLed(led4,snapshot.val(),'led4');
    });

    dbRefLed5.on('value', function (snapshot) {
        changeLed(led5,snapshot.val(),'led5');
    });

    dbRefLed6.on('value', function (snapshot) {
        changeLed(led6,snapshot.val(),'led6');
    });
};

/**
 * change led state
 * @param led: which led
 * @param value: 0: off, 1: on
 * @param tag: name of led
 * */
var changeLed = function(led, value, tag){
    switch (value){
        case 0:
            led.stop().off();
            console.log(tag + " off");
            break;
        default :
            led.on();
            console.log(tag + " on");
            break;
    }
};





