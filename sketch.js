// Serial Port
let serial;

// Robot state variables
let robotX, robotY;
let robotSize = 50;
let robotHue = 0;
let fuzziness = 0;

// Jumping physics
let isJumping = false;
let jumpVelocity = 0;
const gravity = 0.6;
const jumpPower = -15;
let groundY;

// Variables to hold incoming sensor data
let joyX = 512, joyY = 512, potVal = 0, swState = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Set initial robot position
  robotX = width / 2;
  groundY = height - 150; // Keep the robot a bit above the bottom
  robotY = groundY;

  // Use HSB color mode for easy hue-shifting
  colorMode(HSB, 360, 100, 100);

  // --- Serial Setup ---
  serial = createSerial();
  let connectButton = createButton("Connect to Arduino");
  connectButton.position(10, 10);
  connectButton.mousePressed(() => serial.open(9600));
}

function draw() {
  background(20, 5, 95); // A light, off-white background

  handleSerial();
  updateRobotState();
  handleJumping();
  drawRobot();
}

function handleSerial() {
  if (serial.opened() && serial.available() > 0) {
    let inString = serial.readUntil('\n');
    if (inString.length > 0) {
      // Split the comma-separated string into an array
      let values = inString.trim().split(',');
      if (values.length >= 4) {
        joyX = parseInt(values[0]);
        joyY = parseInt(values[1]);
        potVal = parseInt(values[2]);
        swState = parseInt(values[3]);
      }
    }
  }
}

function updateRobotState() {
  // Map joystick Y to robot size (inverting it so up is bigger)
  robotSize = map(joyY, 0, 1023, 150, 20);
  // Map joystick X to robot color (hue)
  robotHue = map(joyX, 0, 1023, 0, 360);
  // Map potentiometer to fuzziness
  fuzziness = map(potVal, 0, 1023, 0, 10);
}

function handleJumping() {
  // Trigger a jump if the button is pressed (swState == 0) and we're on the ground
  if (swState === 0 && !isJumping) {
    isJumping = true;
    jumpVelocity = jumpPower;
  }

  // If we are jumping, apply physics
  if (isJumping) {
    robotY += jumpVelocity;
    jumpVelocity += gravity;

    // If the robot hits the ground, stop the jump
    if (robotY >= groundY) {
      robotY = groundY;
      isJumping = false;
    }
  }
}

function drawRobot() {
  // Use push/pop to isolate the robot's transformations and styles
  push();
  
  // Center the robot drawing coordinates
  translate(robotX, robotY);
  noStroke();

  // Apply fuzziness by drawing the robot multiple times with slight offsets
  let fuzzIterations = fuzziness > 1 ? 5 : 1;
  for (let i = 0; i < fuzzIterations; i++) {
    let offsetX = random(-fuzziness, fuzziness);
    let offsetY = random(-fuzziness, fuzziness);

    // Body
    fill(robotHue, 80, 90);
    rect(offsetX - robotSize / 2, offsetY - robotSize, robotSize, robotSize);

    // Head
    fill(robotHue, 70, 100);
    rect(offsetX - robotSize * 0.4, offsetY - robotSize * 1.5, robotSize * 0.8, robotSize * 0.6);

    // Eye
    fill(0, 0, 100); // White eye
    ellipse(offsetX, offsetY - robotSize * 1.2, robotSize * 0.2, robotSize * 0.2);
  }
  
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Recalculate ground position on resize
  groundY = height - 150;
  // If not jumping, reset robot to new ground position
  if (!isJumping) {
    robotY = groundY;
  }
}
