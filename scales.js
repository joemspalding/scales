"use strict";
// TODO: Add triad functionality

// Elements
let notesDiv = document.getElementById("notes");

/// Intervals array guide:
///   1: H
///   2: W
const SCALES = [
    {name: "chromatic", noteIntervals: [1,1,1,1,1,1,1,1,1,1,1]},
    {name: "major", noteIntervals: [2,2,1,2,2,2,1]},
    {name: "minor", noteIntervals: [2,1,2,2,1,2,2]},
];

let notes = [
    { name: "A", isKey: false, isSelected: false },
    { name: "A#/Bb", isKey: false, isSelected: false },
    { name: "B", isKey: false, isSelected: false },
    { name: "C", isKey: false, isSelected: false },
    { name: "C#/Db", isKey: false, isSelected: false },
    { name: "D", isKey: false, isSelected: false },
    { name: "D#/Eb", isKey: false, isSelected: false },
    { name: "E", isKey: false, isSelected: false },
    { name: "F", isKey: false, isSelected: false },
    { name: "F#/Gb", isKey: false, isSelected: false },
    { name: "G", isKey: false, isSelected: false },
    { name: "G#/Ab", isKey: false, isSelected: false },
];

let selectedScale = undefined;

/**
 * Should be called whenever the scale changes.
 * @param {string} key - Given note to start on.
 * @param {string} scaleType - Scale to use for the rest of the app.
 */
function selectScale(key, scaleType) {
    // Clean up first!
    reset();

    // Update the selectedScale object to reflect user choice and prepare object for work
    // Side Note: match the selected scale to the chosen scaleType
    selectedScale = SCALES.filter(x => x.name === scaleType)[0];
    selectedScale.key = key;

    updateNotesArray(key, selectedScale.noteIntervals)
    updateDOM();
}


/**
 * Updates the notes array to the key/scale.
 * @param {string} key - given note to start on.
 * @param {number[]} intervals - the intervals between notes.
 */
function updateNotesArray (key, intervals) { // <- maybe pass in the selected scale instead of just the intervals?
    
    // Rearrange notes arrays to be in order based on key
    let noteIndex = notes.map(note => note.name).indexOf(key);
    notes.unshift(...notes.splice(noteIndex));
    notes.push(notes[0]);


    // Update objects in notes array based on different properites
    let intervalPosition = 0;
    let intervalIndex = 0;
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].name === key) {
            // Update key notes here
            notes[i].isKey = true;
        }

        if (i === intervalIndex) {
            // Update the notes in the scale here
            notes[i].isSelected = true;

            intervalIndex += intervals[intervalPosition];
            intervalPosition++;
        }
    }
}

/**
 * Update the DOM according to the notes array.
 */
function updateDOM() {
    // Looping through the array and transforming them into HTML elements
    let elements = notes.map(note => { 
        // Determining the class...
        let classString = "note ";
        if (note.isKey) {
            classString += "key";
        } else if (note.isSelected) {
            classString += "selected";
        } else {
            classString += "fade";
        }

        // Do the actual transformation
        return `<div class="${classString}">${note.name}</div>`;
    }).reduce((acc, current) => {
        // Turn an array of strings into a single string
        return acc += current;
    });

    notesDiv.innerHTML = elements;
}

/**
 * Resets the application state.
 */
function reset() {
    notes.map(note => {
        note.isKey = false;
        note.isSelected = false;
    });
    if (notes.length > 12) {
        notes.splice(12);
    }
}


selectScale("C", "chromatic");
