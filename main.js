let classifier; // Initialize a variable for the image classifier
let canvas; // Initialize a variable for the canvas element
let synth; // Initialize a variable for text-to-speech functionality

function preload() {
  classifier = ml5.imageClassifier('DoodleNet'); // Load the DoodleNet model
}

function setup() {
  canvas = createCanvas(280, 280); // Create a canvas with specified dimensions
  canvas.center(); // Center the canvas on the webpage
  background("white"); // Set the canvas background to white
  canvas.mouseReleased(classifyCanvas); // Call classifyCanvas() when mouse is released
  synth = window.speechSynthesis; // Initialize text-to-speech functionality
}

function clearCanvas() {
  background("white"); // Clear the canvas by setting the background to white
}

function draw() {
  strokeWeight(10); // Set the line thickness
  stroke(0); // Set the line color to black

  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY); // Draw lines when the mouse is pressed
  }
}

function classifyCanvas() {
  classifier.classify(canvas, gotResult); // Classify the content of the canvas and get the result
}

function gotResult(error, results) {
  if (error) {
    console.error(error); // Log any classification errors to the console
  }
  
  console.log(results); // Log the classification results
  var result = results[0].label; // Get the top result's label
  document.getElementById('label').innerHTML = 'Name: ' + result.replace('_', ' '); // Display the result as the name

  document.getElementById('confidence').innerHTML = 'Accuracy: ' + Math.round(results[0].confidence * 100) + '%'; // Display the confidence percentage

  utterThis = new SpeechSynthesisUtterance(result.replace('_', ' ')); // Create a speech synthesis utterance
  synth.speak(utterThis); // Speak the result using text-to-speech
}
