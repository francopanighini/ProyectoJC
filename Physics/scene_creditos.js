// Scene. Updates and draws a single scene of the game.
function SceneCreditos() {
    // Store current time
    this.currentTime = 0;
    // Time since the last spacebar press (in milliseconds)
    this.lastSpacePressTime = 0;
    // Minimum delay between spacebar presses (in milliseconds)
    this.spacePressDelay = 1000;
}

SceneCreditos.prototype.update = function (deltaTime) {
    // Keep track of time
    this.currentTime += deltaTime;
}

SceneCreditos.prototype.draw = function () {
    // Get canvas object, then its context
    var canvas = document.getElementById("game-layer");
    var context = canvas.getContext("2d");

    // Clear background
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var text = "CREDITOS";
    context.font = "24px mario";
    context.fillStyle = "White";
    context.fillText(text, 140, 64);

    var maxWidth = 512; // Maximum width allowed
    var lineHeight = 14; // Line height
    var text = "Juego creado para la asignatura de \"Jocs per computadors\" en el máster de ingeniería informática de la Universidad Politécnica de Catalunya (UPC) en la Facultad de ingeniería informática de Barcelona (FIB).";
    context.font = "10px mario";
    context.fillStyle = "White";

    var words = text.split(' ');
    var line = '';
    var y = 128; // Initial vertical position

    for (var i = 0; i < words.length; i++) {
        var testLine = line + words[i] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
            context.fillText(line, 16, y);
            line = words[i] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }

    var text = "Creadores: Judit Cerdà y Franco Panighini";
    context.font = "10px mario";
    context.fillStyle = "White";
    context.fillText(text, 16, 214);

    text = "Pulsa espacio para volver";
    context.font = "10px mario";
    context.fillStyle = "White";
    context.fillText(text, 100, 400);

    // Check if spacebar is pressed
    if (keyboard[32]) {
        // Get the current time in milliseconds
        let currentTime = new Date().getTime();

        // Check if enough time has passed since the last spacebar press
        if (currentTime - this.lastSpacePressTime > this.spacePressDelay) {
            this.lastSpacePressTime = currentTime; // Update the time of the last space press

            // Only change the scene after the threshold is reached
                activa = 3; // Switch to the main menu (or appropriate state)
        }
    }
}
