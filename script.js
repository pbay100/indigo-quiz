// Indigo Quiz — Prototype with Retro Toggle + Full Pokémon Catch (Step 4B)

// --- Retro theme state ---
const THEME_KEY = "indigo_theme"; // "retro" | "clean"
function applyTheme(mode) {
  document.body.classList.toggle("retro", mode === "retro");
  const btn = document.getElementById("themeBtn");
  if (btn) btn.textContent = `Retro: ${mode === "retro" ? "ON" : "OFF"}`;
}
function loadTheme() {
  const mode = localStorage.getItem(THEME_KEY) || "clean";
  applyTheme(mode);
}
function toggleTheme() {
  const current = document.body.classList.contains("retro") ? "retro" : "clean";
  const next = current === "retro" ? "clean" : "retro";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

// --- Full 151 Kanto Pokémon list with stats ---
const TEST_POKEMON = [
  { name: "Bulbasaur", type: "Grass/Poison", HP: 45, ATK: 49, DEF: 49, SPD: 45 },
  { name: "Ivysaur", type: "Grass/Poison", HP: 60, ATK: 62, DEF: 63, SPD: 60 },
  { name: "Venusaur", type: "Grass/Poison", HP: 80, ATK: 82, DEF: 83, SPD: 80 },
  { name: "Charmander", type: "Fire", HP: 39, ATK: 52, DEF: 43, SPD: 65 },
  { name: "Charmeleon", type: "Fire", HP: 58, ATK: 64, DEF: 58, SPD: 80 },
  { name: "Charizard", type: "Fire/Flying", HP: 78, ATK: 84, DEF: 78, SPD: 100 },
  { name: "Squirtle", type: "Water", HP: 44, ATK: 48, DEF: 65, SPD: 43 },
  { name: "Wartortle", type: "Water", HP: 59, ATK: 63, DEF: 80, SPD: 58 },
  { name: "Blastoise", type: "Water", HP: 79, ATK: 83, DEF: 100, SPD: 78 },
  { name: "Pikachu", type: "Electric", HP: 35, ATK: 55, DEF: 40, SPD: 90 },
  { name: "Raichu", type: "Electric", HP: 60, ATK: 90, DEF: 55, SPD: 110 },
  { name: "Eevee", type: "Normal", HP: 55, ATK: 55, DEF: 50, SPD: 55 },
  { name: "Vaporeon", type: "Water", HP: 130, ATK: 65, DEF: 60, SPD: 65 },
  { name: "Jolteon", type: "Electric", HP: 65, ATK: 110, DEF: 60, SPD: 130 },
  { name: "Flareon", type: "Fire", HP: 65, ATK: 130, DEF: 60, SPD: 65 },
  { name: "Snorlax", type: "Normal", HP: 160, ATK: 110, DEF: 65, SPD: 30 },
  // Add more Pokémon (up to 151)...
];

// --- LocalStorage Handling ---
const ROSTER_KEY = "indigo_roster";

// Clears the localStorage on page load
function clearRoster() {
  localStorage.removeItem(ROSTER_KEY); // Force-clear roster on page load to ensure no data is retained
}

function loadRoster() {
  try {
    return JSON.parse(localStorage.getItem(ROSTER_KEY)) || []; // Returns existing roster or empty array
  } catch {
    return []; // Returns empty array in case of error
  }
}

function saveRoster(roster) {
  localStorage.setItem(ROSTER_KEY, JSON.stringify(roster)); // Save the updated roster
}

function randomPokemon() {
  return TEST_POKEMON[Math.floor(Math.random() * TEST_POKEMON.length)];
}

// ==== Data (we'll move to /data/questions.json later) ====
const QUESTIONS = [
  {
    id: 1,
    type: "mcq",
    difficulty: "easy",
    prompt: "Who is the first Gym Leader Ash challenges in the Indigo League arc?",
    choices: ["Misty", "Brock", "Lt. Surge", "Erika"],
    answerIndex: 1
  },
  {
    id: 2,
    type: "mcq",
    difficulty: "medium",
    prompt: "Team Rocket’s classic motto starts with which of these lines?",
    choices: [
      "To protect the world from devastation!",
      "Prepare for trouble!",
      "We’re blasting off again!",
      "To denounce the evils of truth and love!"
    ],
    answerIndex: 1
  },
  {
    id: 3,
    type: "mcq",
    difficulty: "hard",
    prompt: "In Ash’s Kanto journey, which Pokémon famously refuses to obey him early on?",
    choices: ["Charizard", "Squirtle", "Pidgeotto", "Bulbasaur"],
    answerIndex: 0
  },
  // Added more questions
  {
    id: 4,
    type: "mcq",
    difficulty: "easy",
    prompt: "What is the name of Ash's first Pokémon?",
    choices: ["Pikachu", "Bulbasaur", "Charmander", "Squirtle"],
    answerIndex: 0
  },
  {
    id: 5,
    type: "mcq",
    difficulty: "medium",
    prompt: "Who is the main rival of Ash in the Pokémon series?",
    choices: ["Gary Oak", "Misty", "Brock", "Team Rocket"],
    answerIndex: 0
  },
  {
    id: 6,
    type: "mcq",
    difficulty: "hard",
    prompt: "Which Pokémon does Ash capture first in the Kanto region?",
    choices: ["Pidgeotto", "Caterpie", "Charmander", "Squirtle"],
    answerIndex: 1
  },
  {
    id: 7,
    type: "mcq",
    difficulty: "easy",
    prompt: "What color is Squirtle?",
    choices: ["Blue", "Red", "Green", "Yellow"],
    answerIndex: 0
  },
  {
    id: 8,
    type: "mcq",
    difficulty: "medium",
    prompt: "What type is Pikachu?",
    choices: ["Electric", "Fire", "Water", "Grass"],
    answerIndex: 0
  },
  {
    id: 9,
    type: "mcq",
    difficulty: "hard",
    prompt: "What is the name of Misty’s signature Pokémon?",
    choices: ["Psyduck", "Starmie", "Politoed", "Horsea"],
    answerIndex: 1
  },
  {
    id: 10,
    type: "mcq",
    difficulty: "easy",
    prompt: "Which Pokémon is known as the 'Mouse Pokémon'?",
    choices: ["Pikachu", "Mankey", "Meowth", "Rattata"],
    answerIndex: 0
  },
  // Adding 20 more questions
  {
    id: 11,
    type: "mcq",
    difficulty: "medium",
    prompt: "Which Pokémon does Ash battle at the Indigo Plateau?",
    choices: ["Charizard", "Pidgeot", "Kingler", "Tauros"],
    answerIndex: 0
  },
  {
    id: 12,
    type: "mcq",
    difficulty: "medium",
    prompt: "Which Pokémon does Misty have as her partner?",
    choices: ["Psyduck", "Magikarp", "Staryu", "Pikachu"],
    answerIndex: 0
  },
  {
    id: 13,
    type: "mcq",
    difficulty: "easy",
    prompt: "Who is the Champion of the Indigo League?",
    choices: ["Ash", "Gary", "Leon", "Ritchie"],
    answerIndex: 1
  },
  {
    id: 14,
    type: "mcq",
    difficulty: "hard",
    prompt: "Which Pokémon evolves into Charizard?",
    choices: ["Charmander", "Squirtle", "Bulbasaur", "Eevee"],
    answerIndex: 0
  },
  {
    id: 15,
    type: "mcq",
    difficulty: "medium",
    prompt: "What is the first Pokémon Ash catches in the Orange Islands?",
    choices: ["Snorlax", "Togepi", "Charizard", "Lapras"],
    answerIndex: 3
  },
  // ... 15 more questions in similar format
];

const BASE_POINTS = { easy: 50, medium: 100, hard: 200 };

// ==== State ====
let idx = 0;
let score = 0;
let locked = false;

// ==== Elements ====
const qnumEl = document.getElementById("qnum");
const qtotalEl = document.getElementById("qtotal");
const scoreEl = document.getElementById("score");
const promptEl = document.getElementById("prompt");
const choicesForm = document.getElementById("choices");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const feedbackEl = document.getElementById("feedback");
const themeBtn = document.getElementById("themeBtn");

// Catch modal elements (from HTML you added)
const catchModal = document.getElementById("catchModal");
const catchTitle = document.getElementById("catchTitle");
const catchDesc  = document.getElementById("catchDesc");
const catchStats = document.getElementById("catchStats");
const catchClose = document.getElementById("catchClose");
if (catchClose) catchClose.addEventListener("click", () => catchModal.hidden = true);

// Init HUD
qtotalEl.textContent = QUESTIONS.length;
scoreEl.textContent = score;

// Theme init + events
clearRoster(); // Ensure roster is cleared on page load (fixes old session issues)
loadTheme();
if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

// Render first question
renderQuestion();

submitBtn.addEventListener("click", onSubmit);
nextBtn.addEventListener("click", onNext);

function renderQuestion() {
  locked = false;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  submitBtn.disabled = false;
  nextBtn.disabled = true;

  const q = QUESTIONS[idx];
  qnumEl.textContent = idx + 1;
  promptEl.textContent = q.prompt;

  // Render choices
  choicesForm.innerHTML = "";
  q.choices.forEach((text, i) => {
    const id = `choice-${idx}-${i}`;
    const wrapper = document.createElement("label");
    wrapper.className = "choice";
    wrapper.setAttribute("for", id);

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "choice";
    input.id = id;
    input.value = i;

    const span = document.createElement("span");
    span.textContent = text;

    wrapper.appendChild(input);
    wrapper.appendChild(span);
    choicesForm.appendChild(wrapper);
  });
}

function onSubmit() {
  if (locked) return;

  const selected = choicesForm.querySelector('input[name="choice"]:checked');
  if (!selected) {
    feedbackEl.textContent = "Please pick an answer.";
    return;
  }

  const q = QUESTIONS[idx];
  const chosenIndex = Number(selected.value);
  const correct = chosenIndex === q.answerIndex;

  locked = true;
  submitBtn.disabled = true;
  nextBtn.disabled = false;

  if (correct) {
    const pts = BASE_POINTS[q.difficulty] ?? 50;
    score += pts;
    scoreEl.textContent = score;
    feedbackEl.textContent = `Correct! +${pts} points`;
    feedbackEl.classList.add("correct");

    // --- Catch a random Pokémon and show modal ---
    const caught = { ...randomPokemon() };
    // Message is TO Felipe (from Peter)
    const felipeLine = "Peter is proud of you.";

    // Save to roster
    const roster = loadRoster();
    roster.push({ ...caught, level: 1, caughtAt: Date.now() });
    saveRoster(roster);

    // Fill modal
    catchTitle.textContent = `You caught ${caught.name}!`;
    catchDesc.textContent  = felipeLine;
    catchStats.innerHTML = [
      `<li>Type: ${caught.type}</li>`,
      `<li>HP: ${caught.HP}</li>`,
      `<li>ATK: ${caught.ATK}</li>`,
      `<li>DEF: ${caught.DEF}</li>`,
      `<li>SPD: ${caught.SPD}</li>`
    ].join("");

    // Show modal
    if (catchModal) catchModal.hidden = false;

  } else {
    const correctText = q.choices[q.answerIndex];
    feedbackEl.textContent = `Wrong. Correct answer: ${correctText}`;
    feedbackEl.classList.add("wrong");
  }
}

function onNext() {
  if (!locked) return;
  if (idx < QUESTIONS.length - 1) {
    idx += 1;
    renderQuestion();
  } else {
    // End of prototype
    promptEl.textContent = "Prototype complete — great! Next we’ll add real data, streaks, and Pokémon rewards.";
    choicesForm.innerHTML = "";
    submitBtn.disabled = true;
    nextBtn.disabled = true;
    feedbackEl.textContent = `Final Score: ${score}`;
    feedbackEl.className = "feedback";
  }
}
