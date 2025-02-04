const display = document.getElementById("display");
let list_of_fontsizes = ["2.5rem", "2.4rem", "2.3rem", "2.2rem", "2.1rem"];
let list_of_lenghts = [10, 14, 18, 22, 26];
let index_of_lenghts = 0;
let prev_input = "";
let prev_display = "";
let count = 0;

//TODO: alert message user-friendly
//TODO: schimbare operator in caz ca vreau sa l schimb
//TODO: implementare modulo
//TODO: timer de o secunda intre click-uri si sa sterg spam-ul
//TODO: variabila in care retin ultimul operator introdus,sa se inlocuiasca daca nu se introduce alt numar si continui sa dau egal
//TODO: sa pot incepe cu plus sau minus si sa le pot schimba iar intre ele daca introduce iar alt operator
//TODO: sa micsorez textul pe masura ce adaug caractere

function adauga(input) {
  if (display.value.length >= 1) {
    prev_input = display.value[display.value.length - 1];
  }
  //edge case - nu pot pune operator prima oara
  if (isOperatorOrDot(input) && input !== "-" && display.value === "") {
    return showAlert("Try to put a number first.");
  }
  //edge case - nu pot pune operator dupa alt operator
  if (isInvalidOperatorSequence(prev_input, input)) {
    return showAlert("Error: You cannot add an operator after one of them.");
  }

  //edge case - nu pot avea mai multe virgule
  if (isDuplicateDecimal(input)) {
    return showAlert("Error: Multiple decimal points in one number.");
  }

  //edge case - nu pot avea ceva ce contine 00xx..
  if (isLeadingZero(input)) {
    return showAlert("Error: Leading zeros are not allowed.");
  }

  //edge case - daca e acelasi numar nu pot adauga zecimala sau cifra
  if (isInvalidPostCalculationInput(input)) {
    return showAlert("Error: Cannot add digits/decimal to the result.");
  }

  //edge case - inputul este prea lung
  if (too_long_input(display.value)) {
    return showAlert("Error: Input is too long.");
  }

  updateDisplay(input);
}

function calculate() {
  try {
    count++;

    //edge case - nu pot egala un camp gol
    if (display.value === "") {
      return showAlert("Try to put a number.");
    }

    //edge case - nu pot imparti la zero
    if (display.value.includes("/0") && !display.value.includes(",")) {
      return showAlert("Error: Division by zero is not allowed.");
    }

    //edge case - nu pot avea operator la sfarsit
    if (isOperator(display.value.slice(-1))) {
      return showAlert("Error: Expression cannot end with an operator.");
    }

    //edge case - click-uri multiple nu sunt permise
    if (too_many_clicks() && prev_display === display.value) {
      return showAlert("Error: Too many clicks.");
    }
    const result = custom_eval_funct(display.value);
    displayResult(result);
    if (isInvalidResult(result)) {
      return showAlert("Error: Invalid expression.");
    }
  } catch (error) {
    display.value = "Error";
  }
}

function clear_display() {
  if (display.value == "") {
    showAlert("Error:You cannot clear an empty display");
  }
  reset_display();
}

function reset_display() {
  display.value = "";
  prev_display = "";
  prev_input = "";
  count = 0;
}

function updateDisplay(input) {
  prev_display = display.value;
  display.value += input;
  if (display.value.length >= 4) {
    const operatorRegex = /[+\-*/]/g;

    const parts = display.value.split(operatorRegex);
    const operators = display.value.match(operatorRegex) || [];

    let formattedValue = "";

    parts.forEach((part, index) => {
      if (part.includes(",")) {
        const [integerPart, decimalPart] = part.split(",");

        formattedValue +=
          formatWithThousandSeparator(integerPart) + "," + decimalPart;
      } else {
        formattedValue += formatWithThousandSeparator(part);
      }

      if (index < operators.length) {
        formattedValue += operators[index];
      }
    });
    display.value = formattedValue;
  }
  for (let i = 0; i < list_of_lenghts.length; i++) {
    if (list_of_lenghts[i] === display.value.length) {
      display.style.fontSize = list_of_fontsizes[i];
      break;
    }
  }
}

function adjustCursorPosition(before, after, pos) {
  const before_length = before.length;
  const after_length = after.length;
  if (after_length > before_length) {
    const diff = after_length - before_length;
    if (pos + diff <= after_length) {
      pos += diff;
    }
  }
  return pos;
}

function formatWithThousandSeparator(value) {
  let parts = value.split(",");

  let integerPart = parts[0].replace(/\./g, "");
  let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return formattedInteger;
}

function formatWithThousandSeparator_used_for_eval(value) {
  let parts = value.split(",");

  let integerPart = parts[0].replace(/\./g, "");

  if (parts.length > 1) {
    return integerPart + "." + parts[1];
  } else {
    return integerPart;
  }
}

function showAlert(message) {
  alert(message);
  reset_display();
  return;
}

function displayResult(result) {
  Number.isInteger(result) == true
    ? (resultString = result.toString())
    : (resultString = result.toFixed(4).toString());

  resultString = resultString.replace(".", ",");

  let parts = resultString.split(",");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  display.value = parts.join(",");
  prev_display = display.value;
}

function isOperatorOrDot(input) {
  return isOperator(input) || input === ",";
}

function isInvalidOperatorSequence(prev_input, input) {
  return (
    (isOperator(prev_input) && isOperator(input) && input != "-") ||
    (isOperator(prev_input) && input === "," && prev_input != "-") ||
    (input === "," && prev_input === ",") ||
    (prev_input == "," && isOperator(input) && input != "-") ||
    (prev_input == "," && input == "-") ||
    (prev_input == "-" && input == ",")
  );
}

function isDuplicateDecimal(input) {
  let parts = display.value.split(/[\+\-\*\/]/);
  let currentNumber = parts[parts.length - 1];
  return input === "," && currentNumber.includes(",");
}

function isLeadingZero(input) {
  let parts = display.value.split(/[\+\-\*\/]/);
  let currentNumber = parts[parts.length - 1];
  return (
    currentNumber === "0" && input !== "," && count == 0 && !isOperator(input)
  );
}

function isInvalidPostCalculationInput(input) {
  return (
    prev_display === display.value && isDigitOrDecimal(input) && count >= 1
  );
}

function isInvalidResult(result) {
  return (
    result === "undefined" ||
    result === "Infinity" ||
    display.value === "undefined" ||
    display.value == "Infinity"
  );
}

function isDigitOrDecimal(char) {
  return isDigit(char) || char === ",";
}

function isDigit(char) {
  return /\d/.test(char);
}

function isOperator(char) {
  return ["/", "+", "-", "*"].includes(char);
}

function too_long_input(input) {
  return input.length > 30;
}

function too_many_clicks() {
  return count > 1;
}

function custom_eval_funct(expresion) {
  const vec = tokenize(expresion);
  return expresie(vec);
}

function tokenize(expr) {
  const vec = [];
  let numberbuff = "";

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];

    if (isDigit(char) || char == ",") {
      numberbuff += char;
    } else if (char == "-" && (i == 0 || isOperator(expr[i - 1]))) {
      numberbuff = "-";
    } else if (isOperator(char)) {
      if (numberbuff) {
        numberbuff = formatWithThousandSeparator_used_for_eval(numberbuff);
        vec.push(parseFloat(numberbuff));
        numberbuff = "";
      }
      vec.push(char);
    }
  }

  if (numberbuff) {
    numberbuff = formatWithThousandSeparator_used_for_eval(numberbuff);
    vec.push(parseFloat(numberbuff));
  }

  return vec;
}
function expresie(vec) {
  const first_operation = procesare_dividere_si_multiplicare(vec);
  return adunare_si_scadere(first_operation);
}

function procesare_dividere_si_multiplicare(vec) {
  const res = [];
  let curr = vec[0];

  for (let i = 1; i < vec.length; i += 2) {
    const operator = vec[i];
    const next_numb = vec[i + 1];

    if (operator == "*") {
      curr *= next_numb;
    } else if (operator == "/") {
      curr /= next_numb;
    } else {
      res.push(curr);
      res.push(operator);
      curr = next_numb;
    }
  }
  res.push(curr);
  return res;
}

function adunare_si_scadere(vec) {
  let current = vec[0];
  for (let i = 1; i < vec.length; i += 2) {
    const operator = vec[i];
    const next = vec[i + 1];

    if (operator == "+") {
      current += next;
    } else if (operator == "-") {
      current -= next;
    }
  }
  return current;
}
