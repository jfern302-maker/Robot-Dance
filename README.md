# P5.js & Web Serial Interactive Robot

```
      //,___,
     [O.o]
     /)__)
--"--"-"--
```

A simple and fun project demonstrating the power of the Web Serial API to connect a p5.js sketch with physical hardware like an Arduino, a joystick, and a potentiometer. Control a friendly robot character in your browser!

---

## `//-` Hardware Components

> BEEP BOOP... COMPONENT LIST INCOMING...

*   1 x Arduino Uno R3 (or a compatible clone)
*   1 x 5-pin Joystick Module (KY-023 style)
*   1 x 10k Potentiometer
*   1 x Breadboard
*   A handful of Jumper Wires

---

## `//-` Circuit Assembly

> PROCESSING... WIRING DIRECTIVES...

### Joystick Module
*   `GND` → `GND` on Arduino
*   `+5V` → `5V` on Arduino
*   `VRx` (X-axis) → `A0` on Arduino
*   `VRy` (Y-axis) → `A1` on Arduino
*   `SW` (Switch) → `D2` on Arduino

### Potentiometer
*   **Pin 1** (Left) → `GND` on Arduino
*   **Pin 2** (Middle) → `A2` on Arduino
*   **Pin 3** (Right) → `5V` on Arduino

---

## `//-` Software Setup

> COMPILING INSTRUCTIONS...

### 1. Arduino
This project uses **PlatformIO** to manage the Arduino code.
1.  Open the project folder in VS Code with the PlatformIO IDE extension installed.
2.  Connect your Arduino via USB.
3.  Upload the code using the PlatformIO "Upload" command (often a right-arrow icon `→` in the status bar).

### 2. P5.js Web Sketch
The p5.js sketch must be run from a local web server because the Web Serial API requires a secure context (`localhost` or `https`).
1.  The easiest way is to use the **Live Server** extension in VS Code.
2.  Right-click on the `index.html` file and choose "Open with Live Server".
3.  Your browser will open to the correct address.

---

## `//-` Robot Controls

> INITIATING USER INTERFACE...

```
   [@@]
  /|__|
  d -- b
```

*   **Connect:** Click the "Connect to Arduino" button in the p5.js sketch to start the connection.
*   **Color:** Move the joystick **left and right** to change the robot's color.
*   **Size:** Move the joystick **up and down** to change the robot's size.
*   **Fuzziness:** Turn the **potentiometer** to make the robot's outline fuzzy or smooth.
*   **Jump:** **Press** the joystick button to make the robot jump.
