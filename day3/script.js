let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];



function searchNotes(word) {
    return notes.filter(note =>
        note.text.toLowerCase().includes(word.toLowerCase())
    );
}

console.log(searchNotes("milk")); // Expected: [{ id: 1, text: "Buy milk and bread", category: "personal" }]
console.log(searchNotes("pizza")); // Expected: []
console.log(searchNotes("STUDY")); // Expected: []
console.log(searchNotes("DAY 3")); // Expected: [{ id: 2, text: "Finish the Day 3 assignment", category: "study" }]


function longestNote() {
    if (notes.length === 0) {
        return null;
    }

    let longest = notes[0];

    for (let i = 1; i < notes.length; i++) {
        if (notes[i].text.length > longest.text.length) {
            longest = notes[i];
        }
    }

    return longest;
}
console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

console.log(longestNote() === null);
// Expected: false


function countByCategory() {
    let counts = {
        personal: 0,
        work: 0,
        study: 0
    };

    for (let note of notes) {
        counts[note.category]++;
    }

    return counts;
}
console.log(countByCategory());
// Expected: { personal: 2, work: 1, study: 2 }

console.log(countByCategory().personal);
// Expected: 2


function getSummary() {
    let counts = countByCategory();
    let word;

    if (notes.length === 1) {
        word = "note";
    } else {
        word = "notes";
    }

    return `${notes.length} ${word}: ${counts.personal} personal, ${counts.work} work, ${counts.study} study.`;
}
console.log(getSummary());
// Expected: 5 notes: 2 personal, 1 work, 2 study.

console.log(getSummary().startsWith("5 notes"));
// Expected: true


function isDuplicate(text) {
    return notes.some(note =>
        note.text.trim().toLowerCase() === text.trim().toLowerCase()
    );
}
console.log(isDuplicate("Buy milk and bread"));
// Expected: true

console.log(isDuplicate("  BUY MILK AND BREAD  "));
// Expected: true

console.log(isDuplicate("Buy eggs"));
// Expected: false


function addNote(text, category) {
    if (text.length < 1 || text.length > 200) {
        console.log("Note must be between 1 and 200 characters.");
        return false;
    }

    if (isDuplicate(text)) {
        console.log("Note is a duplicate.");
        return false;
    }

    if (!["personal", "work", "study"].includes(category)) {
        console.log("Invalid category.");
        return false;
    }

    let newNote = {
        id: notes.length + 1,
        text: text,
        category: category
    };

    notes.push(newNote);
    return true;
}
console.log(addNote("Learn JavaScript functions", "study"));
// Expected: true

console.log(addNote("Buy milk and bread", "personal"));
// Expected: false

console.log(addNote("Go to the gym", "health"));
// Expected: false