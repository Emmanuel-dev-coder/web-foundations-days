let noteText = document.getElementById("note-text");
let charCount = document.getElementById("char-count");
let wordCount = document.getElementById("word-count");
let clearBtn = document.getElementById("clear-btn");
let themeToggle = document.getElementById("theme-toggle");

function updateCounts() {
    let text = noteText.value;
    let characters = text.length;

    let words = 0;

    if (text.trim() !== "") {
        words = text.trim().split(" ").length;
    }

    charCount.textContent = characters + " / 200 characters";
    wordCount.textContent = words + " words";

    charCount.classList.remove("warning");
    charCount.classList.remove("over");

    if (characters > 200) {
        charCount.classList.add("over");
    } else if (characters > 180) {
        charCount.classList.add("warning");
    }
}

noteText.addEventListener("input", function () {
    updateCounts();
    localStorage.setItem("noteDraft", noteText.value);
});

clearBtn.addEventListener("click", function () {
    noteText.value = "";
    updateCounts();
    localStorage.removeItem("noteDraft");
});

noteText.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        noteText.value = "";
        updateCounts();
        localStorage.removeItem("noteDraft");
    }
});

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "Light mode";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "Dark mode";
        localStorage.setItem("theme", "light");
    }
});

let savedDraft = localStorage.getItem("noteDraft");

if (savedDraft !== null) {
    noteText.value = savedDraft;
}

let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "Light mode";
}

updateCounts();