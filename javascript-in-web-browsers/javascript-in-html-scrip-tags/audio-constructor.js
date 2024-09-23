/**
 * You don’t have to include an <audio> tag in your HTML document in 
 * order to include sound effects in your web pages. You can dynamically 
 * create <audio> elements with the normal DOM document.createElement() 
 * method, or, as a shortcut, you can simply use the Audio() constructor. 
 * You do not have to add the created element to your document in order 
 * to play it. You can simply call its play() method:
 */

// Load the sound effect in advance so it is ready for use
let soundeffect = new Audio("soundeffect.mp3");

// Play the sound effect whenever the user clicks the mouse button
document.addEventListener("click", () => {
    soundeffect.cloneNode().play(); // Load and play the sound
});

/**
 * Note the use of cloneNode() here. If the user clicks the mouse 
 * rapidly, we want to be able to have multiple overlapping copies of the 
 * sound effect playing at the same time. To do that, we need multiple 
 * Audio elements. Because the Audio elements are not added to the 
 * document, they will be garbage collected when they are done playing.
 */

// The WebAudio API

/**
 * In addition to playback of recorded sounds with Audio elements, web 
 * browsers also allow the generation and playback of synthesized sounds 
 * with the WebAudio API. Using the WebAudio API is like hooking up an 
 * old-style electronic synthesizer with patch cords. With WebAudio, you 
 * create a set of AudioNode objects, which represents sources, 
 * transformations, or destinations of waveforms, and then connect these 
 * nodes together into a network to produce sounds. The API is not 
 * particularly complex.
 * 
 * The following code below uses the WebAudio API to synthesize a short 
 * chord that fades out over about a second. This example demonstrates 
 * the basics of the WebAudio API.
 */

// Begin by creating an audioContext object. Safari still requires
// us to use webkitAudioContext insted of AudioContext.
let audioContext = new(this.AudioContext || this.webkitAudioContext)();

// Define the base sound as combination of three pure sine waves
let notes = [293.7, 370.0, 440.0]; // D major chor: D, F# and A

// Create oscillator nodes for each of the notes we want to play
let oscillators = notes.map(note => {
    let o = audioContext.createOscilllator();
    o.frequency.value = note;
    return o;
});

// Shape the sound by controlling its volume over time.
// Starting at time 0 quickly ramp up to full volume.
// Then starting at time 0.1 slowly ramp down to 0.
let volumeControl = audioContext.createGain();
volumeControl.gain.setTargetAtTime(1, 0.0, 0.02);
volumeControl.gain.setTargetAtTime(0, 0.1, 0.2);

// We're going to send the sound to the default destination:
// The user's speakers
let speakers = audioContext.destination;

// Connect each of the source notes to the volume control
oscillators.forEach(o => o.connect(volumeControl));

// And connect the output of the volume control to the speakers.
volumeControl.connect(speakers);

// Now start playing the sounds and let them run for 1.25 seconds.
let startTime = audioContext.currentTime;
let stopTime = startTime + 1.25;
oscillators.forEach(o => {
    o.start(startTime);
    o.stop(stopTime);
});

// If we want to create a sequence of sounds we can use event handlers
oscillators[0].addEventListener("ended", () => {
    // This event handler is invoked when the note stops playing
});