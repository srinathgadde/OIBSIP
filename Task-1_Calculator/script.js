const keys = document.querySelectorAll(".key");
const displayInput = document.querySelector(".display .input");
const displayOutput = document.querySelector(".display .output");

let input = "";
for (let x of keys) {
  const value = x.dataset.key;
  let count = 0;
  x.addEventListener("click", () => {
    if (value == "clear") {
      count = 0;
      input = "";
      displayInput.innerHTML = "";
      displayOutput.innerHTML = "";
    } else if (value == "backspace") {
      count = 0;
      input = input.slice(0, -1);
      displayInput.innerHTML = CleanInput(input);
    } else if (value == "=") {
      if (input.includes("%")) {
        let temp = modFun(input);

        let result = eval(temp);
        displayOutput.innerHTML = CleanOutput(result);
      } else {
        let result = eval(input);
        displayOutput.innerHTML = CleanOutput(result);
      }
    } else if (value == "brackets") {
      if (
        input.indexOf("(") == -1 ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }

      displayInput.innerHTML = CleanInput(input);
    } else if (value == "sqrt") {
      let temp = squareRootFun(input);
      input = temp;
      displayInput.innerHTML = CleanInput(input);
    } else if (value == "square") {
      let temp = squareFun(input);
      input = temp;
      displayInput.innerHTML = CleanInput(input);
    } else if (value == "!") {
      let temp = factFun(input);
      input = temp;
      displayInput.innerHTML = CleanInput(input);
    } else if (value == "plusMinus") {
      if (input.includes("(")) {
        if (count == 0) {
          input += "-";
          count = 1;
          displayInput.innerHTML = input;
        } else if (count == 1) {
          input = input.slice(0, -1);

          input += "+";
          count++;
          displayInput.innerHTML = input;
        } else if (count > 1 && count % 2 == 0) {
          input = input.slice(0, -1);

          input += "-";
          count++;

          displayInput.innerHTML = input;
        } else if (count > 1 && count % 2 == 1) {
          input = input.slice(0, -1);

          input += "+";
          count++;
          displayInput.innerHTML = input;
        }
      } else if (input == "" || input == "+" || input == "-") {
        if (count == 0) {
          input = "";
          input += "-";
          count = 1;
          displayInput.innerHTML = input;
        } else if (count == 1) {
          input = "";
          input += "+";
          count = 0;
          displayInput.innerHTML = input;
        }
      } else {
      }
    } else {
      if (ValidateInput(value)) {
        input += value;
        displayInput.innerHTML = CleanInput(input);
      }
    }
  });
}
function factFun(input) {
  let index;
  let a = input.lastIndexOf("+");
  let s = input.lastIndexOf("-");
  let m = input.lastIndexOf("*");
  let d = input.lastIndexOf("/");
  index = Math.max(a, s, m, d);

  let el0 = input.slice(0, index + 1);
  let el1 = input.slice(index + 1);

  let val = 1;
  for (let i = el1; i > 0; i--) {
    val *= i;
  }

  let res = val.toString();

  return el0 + res;
}
function modFun(input) {
  let index;
  let a = input.lastIndexOf("+");
  let s = input.lastIndexOf("-");
  let m = input.lastIndexOf("*");
  let d = input.lastIndexOf("/");
  index = Math.max(a, s, m, d);

  let el0 = input.slice(0, index + 1);
  let el1 = input.slice(index + 1);

  let val = String(eval(el1));

  return el0 + val;
}
function squareRootFun(input) {
  let index;
  let a = input.lastIndexOf("+");
  let s = input.lastIndexOf("-");
  let m = input.lastIndexOf("*");
  let d = input.lastIndexOf("/");
  index = Math.max(a, s, m, d);

  let el0 = input.slice(0, index + 1);
  let el1 = input.slice(index + 1);

  let val = String(Math.sqrt(el1));
  return el0 + val;
}
function squareFun(input) {
  let index;
  let a = input.lastIndexOf("+");
  let s = input.lastIndexOf("-");
  let m = input.lastIndexOf("*");
  let d = input.lastIndexOf("/");
  index = Math.max(a, s, m, d);

  let el0 = input.slice(0, index + 1);
  let el1 = input.slice(index + 1);

  let val = String(Math.pow(el1, 2));
  return el0 + val;
}
function CleanInput(input) {
  let inputArray = String(input).split("");
  let inputArray_length = inputArray.length;

  for (let i = 0; i < inputArray_length; i++) {
    if (inputArray[i] == "*") {
      inputArray[i] = ` <span class="operator">x</span> `;
    } else if (inputArray[i] == "/") {
      inputArray[i] = ` <span class="operator">÷</span> `;
    } else if (inputArray[i] == "+") {
      inputArray[i] = ` <span class="operator">+</span> `;
    } else if (inputArray[i] == "-") {
      inputArray[i] = ` <span class="operator">-</span> `;
    } else if (inputArray[i] == "(") {
      inputArray[i] = `<span class="brackets">(</span>`;
    } else if (inputArray[i] == ")") {
      inputArray[i] = `<span class="brackets">)</span>`;
    } else if (inputArray[i] == "%") {
      inputArray[i] = `<span class="percent">%</span>`;
    } else if (inputArray[i] == "%") {
      inputArray[i] = `<span class="percent">%</span>`;
    }
  }

  return inputArray.join("");
}
function CleanOutput(output) {
  let output_string = output.toString();
  let decimal = output_string.split(".")[1];
  output_string = output_string.split(".")[0];
  let output_array = output_string.split("");

  if (output_array.length > 3) {
    output_array.splice(output_array.length - 3, 0, ",");
  }
  if (output_array.length > 6) {
    for (let i = output_array.length - 6; i > 0; i -= 2) {
      output_array.splice(i, 0, ",");
    }
  }

  if (decimal) {
    output_array.push(".");
    output_array.push(decimal);
  }

  return output_array.join("");
}

function ValidateInput(value) {
  let last_input = String(input).slice(-1);
  let operators = ["+", "-", "*", "/", "%"];

  if (value == "." && last_input == ".") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}
