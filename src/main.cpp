#include <Arduino.h>

// Pin definitions
const int JOY_X_PIN = A0;  // Joystick X-axis
const int JOY_Y_PIN = A1;  // Joystick Y-axis
const int POT_PIN = A2;    // Potentiometer
const int JOY_SW_PIN = 2;   // Joystick switch

// Smoothing settings
const int NUM_READINGS = 10;

// Helper function to get a smoothed analog reading
int getSmoothedReading(int pin) {
  long total = 0;
  for (int i = 0; i < NUM_READINGS; i++) {
    total += analogRead(pin);
    delay(1);
  }
  return total / NUM_READINGS;
}

void setup() {
  Serial.begin(9600);
  // Initialize the switch pin with an internal pull-up resistor
  // It will read HIGH when not pressed, and LOW when pressed.
  pinMode(JOY_SW_PIN, INPUT_PULLUP);
}

void loop() {
  // Get smoothed values for all analog inputs
  int joyX = getSmoothedReading(JOY_X_PIN);
  int joyY = getSmoothedReading(JOY_Y_PIN);
  int pot = getSmoothedReading(POT_PIN);

  // Read the switch state (0 when pressed, 1 when not pressed)
  int swState = digitalRead(JOY_SW_PIN);

  // Print the values as a comma-separated string
  Serial.print(joyX);
  Serial.print(",");
  Serial.print(joyY);
  Serial.print(",");
  Serial.print(pot);
  Serial.print(",");
  Serial.println(swState);

  // Wait before sending the next set of values
  delay(10);
}
