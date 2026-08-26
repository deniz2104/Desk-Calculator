<div align="center">

# Desktop Calculator

[![Made with](https://img.shields.io/badge/made%20with-HTML%20%7C%20CSS%20%7C%20JavaScript-blue)](#)

Calculator construit from scratch, cu evaluator de expresii propriu pentru o introducere in JavaScript

</div>

## 📚 Cuprins

- Funcționalități
- Cum îl rulezi
- Comenzi de la tastatură
- Arhitectură și implementare
- De ce nu am folosit eval
- Probleme întâlnite
- Roadmap

## ✨ Funcționalități

- Adunare (+), Scădere (-), Înmulțire (*) și Împărțire (/)
- Egal (=) pentru evaluarea expresiei curente
- Clear (C) pentru ștergere
- Afișare cu separatori pentru mii și zecimale
- Interacțiune din tastatură 

## ▶️ Cum îl rulezi

Metoda simplă, local:

1. Deschide fișierul `calculator_project.html` în browser (double-click sau drag & drop).

## ⌨️ Comenzi de la tastatură

- Tab / Shift+Tab: navigare între butoane
- Enter: activează butonul focalizat
- Tastele numerice și operatorii (+, -, *, /, =) se pot introduce de la tastatura pentru executarea operațiilor.

## 🧱 Arhitectură și implementare

Funcțiile cheie:

- `custom_eval_funct()` – înlocuiește funcția built-in `eval`; separă numerele și operatorii și evaluează expresia si respectiv precedența operatorilor
   - `tokenize()` – extrage token-urile (numere și operatori)
      - `formatWithThousandSeparator_used_for_eval()` – normalizează stringul (înlocuiește `,` cu `.` la zecimale și elimină `.` din partea întreagă)
   - `expression()` – calculează rezultatul cu:
      - `process_division_and_multiplication()`
      - `sum_and_difference()`
- `displayResult()` – formatează rezultatul final (pentru mii folosindu-se `.` si `,` pentru zecimale; folosește `toFixed()` pentru a evita erori de reprezentare si pentru ca rezultatul sa poate fi citit de pe display)
- `updateDisplay()` – formatează dinamic inputul curent; împarte după operatori, formatează partea numerică și re-compune stringul

Notă: Regulile de formatare sunt in concordanta cu stilul „european” (punct pentru mii, virgulă pentru zecimale).

### 🧩 Stare globală și elemente UI

- `display` – input-ul principal pe care se afișează expresia/rezultatul
- `history_numbers` – listă cu rezultatele din istoric
- Setări UI: `list_of_fontsizes`, `list_of_lenghts` și `index_of_lenghts` setări dinamice pentru redimensionarea fontului în funcție de lungimea expresiei; `initial_size` salvează mărimea de font inițială
- Variabile de context: `operatorRegex`, `prev_input`, `prev_display`, `operator`, `temp_operator`, `lastNumber`, `temp_lastNumber`, `count`

### 🔎 Fluxul de input și validări

1. Introducere (click/ tastatură) prin `add(input)`
2. Edge case-uri luate in considerare:
   - început cu operator (exceptând „-” pentru numere negative)
   - secvențe invalide de operatori sau zecimală dublă (`isInvalidOperatorSequence`, `isDuplicateDecimal`)
   - zerouri la început (`isLeadingZero`)
   - adăugare cifre după calculare (`isInvalidPostCalculationInput`)
   - limită de lungime (`too_long_input`)
3. Daca totul este in regula se executa `updateDisplay(input)` care:
   - formatează partea întreagă cu `formatWithThousandSeparator`
   - ajustează dimensiunea fontului (`modify_size`)

Erorile sunt comunicate prin `showAlert(message)` urmat de `reset_display()` pentru revenire la starea inițială.

### 🧮 Evaluarea expresiei

- `calculate()` realizeaza evaluarea și gestionează edge-case-uri: expresie goală, dividere la zero, operator la final + ce am scris mai sus
- `tokenize()` transformă stringul în vector de token-uri numeric/operator, cu suport pentru numere negative și separatori (prin `formatWithThousandSeparator_used_for_eval`)
- `expression()` aplică precedența operatorilor în doi pași:
  1. `process_division_and_multiplication()` – executa prima oara inmultirea si impartirea si pune rezultate într-un vector intermediar
  2. `sum_and_difference()` – calculează suma/diferența secvențial

### 🎯 Afișare și formatare

- `displayResult(result)`:
  - convertește numărul la string; păstrează întregul sau folosește `toFixed(4)` pentru zecimale predefinite
  - înlocuiește `.` cu `,` la zecimale, inserează `.` pentru mii
  - salvează în `prev_display` și ajustează fontul

### 🗂️ Istoric și utilități UI

- `updateHistory()` – afișează lista rezultatelor în containerul `#history` cu scroll.
- `toggleHistory()` – arată/ascunde containerul istoricul
- `clearHistory()` – golește istoricul și actualizează UI
- `deleteLastCharacter()` – șterge ultimul caracter, reformatează inputul și reaplică regula separatorilor

### ⌨️ Shortcut-uri folosinduse tastatura

Listener global `keydown` mapează:

- cifrele 0–9 și operatorii + - * / către `add`
- `.` sau `,` către `,` (zecimal)
- `Enter` sau `=` către `calculate`
- `Backspace` către `deleteLastCharacter`
- `C`, `c` sau `Escape` către `clear_display`
- `H` sau `h` către `toggleHistory`

## 🐞 Probleme întâlnite

1. Formatarea numerelor: folosesc `.` pentru mii și `,` pentru zecimale – `parseFloat()` ignoră partea după `,`. Soluție: `formatWithThousandSeparator_used_for_eval()` normalizează înainte de calcul.
2. `updateDisplay()` inițial rudimentar: împărțirea după `,` a generat erori. Soluție: împărțire după operatori și formatare pe segmente.

## 🗺️ Roadmap

- Mesaje de alertă user-friendly (fără a folosi dialogul afisat de browser)
