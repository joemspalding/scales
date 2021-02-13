# About

An example for a student in Code Louisville to see the power of JS objects + JS array functions.

## Explanation

The code updates the `notes` array via the `updateNotesArray(...)` function. Then the code calls `updateDOM()` where several JS array methods check the state of the `notes` array and `.map(...)` them to HTML elements and `.reduce()` that array of strings to a single string.

### .map

A `.map(...)` will do whatever work you want in the function and transform what you pass in into what you return. In `scales.js` I pass in a `Note` object and transform it into an `HTML Element` in the form of a `string` so it goes from :

    {
        name: "C",
        isKey: false,
        isSelected: false
    }

into

    "<div class="note selected">C</div>"

and so on for the rest of the members of the array.

### .reduce

A `.reduce(...)` is intended to reduce your array into a single thing, which is stored in the accumulator, or `acc` as it is named in the code. In this case, I am transforming the array of strings into a single string. This type of explanation is very simplified and I highly recommend researching `.reduce(...)` deeper to understand it further because it is a powerful tool in your array arsenal.
