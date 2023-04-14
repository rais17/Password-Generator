// Selecting the copy message button, password display, and copy failed display from the DOM
const copyMsgEl = document.querySelector("[copyMsgBtn]");
const passwordDisplayEl = document.querySelector("[passwordDisplay]");
const copyFailedDisplayEl = document.querySelector("[copyFailedDisplay]");

// An async function that copies the password displayed on the page to the user's clipboard when the copy message button is clicked
async function copyMsgfunc() {

  if (passwordDisplayEl.value === "PASSWORD")
    return;
    try {
      await navigator.clipboard.writeText(passwordDisplayEl.value);
      copyFailedDisplayEl.textContent = "copied";
    } catch {
      copyFailedDisplayEl.textContent = "failed";
    }


  // Activate the copy failed display for 1 second
  copyFailedDisplayEl.classList.add("active");
  setTimeout(function () {
    copyFailedDisplayEl.classList.remove("active");
    // copyFailedDisplayEl.textContent = "";
  }, 1000);
}

// Add an event listener to the copy message button to run the copyMsgfunc function when it is clicked
copyMsgEl.addEventListener("click", copyMsgfunc);

// Selecting the slider element and the slider display element from the DOM
const sliderEl = document.querySelector("[slider]");
const sliderDisplayEl = document.querySelector("[sliderDisplay]");

// Setting the default value for the slider and slider display elements
sliderEl.value = 10;
sliderDisplayEl.textContent = sliderEl.value;

// A function that updates the value of the slider display element whenever the value of the slider element changes
function handleSlider() {
  sliderDisplayEl.textContent = sliderEl.value;
      const min = sliderEl.min;
      const max = sliderEl.max;
      sliderEl.style.backgroundSize =
        ((sliderEl.value - min) * 100) / (max - min) + "% 100%";
}

// Add an event listener to the slider element to run the handleSlider function whenever its value changes
sliderEl.addEventListener("input", handleSlider);

// Selecting all of the checkboxes on the page
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// A function that sets the default values for the checkboxes and the password display element when the page loads
function ByDefaultFunc() {
  checkboxes[0].checked = true;
  for (let i = 1; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
  passwordDisplayEl.value = "PASSWORD";
  handleSlider();
}

// Add an event listener to the window to run the ByDefaultFunc function when the page loads
window.addEventListener("load", ByDefaultFunc);

// A variable to keep track of how many checkboxes are checked by the user
let numChecked = 1;

// Add an event listener to each checkbox to update the numChecked variable whenever a checkbox is checked or unchecked
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    numChecked = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    ).length;
  });
});

// A function that generates a random number within a given range
function getRndNumberInRange(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

// Functions that return a random uppercase letter, lowercase letter, number, or symbol
function getRndUpper() {
  return String.fromCharCode(getRndNumberInRange(65, 90));
}
function getRndLower() {
  return String.fromCharCode(getRndNumberInRange(97, 122));
}
function getRndNumber() {
  return getRndNumberInRange(0, 9);
}

// A string containing all of the possible symbols that can be included in a password
let symbols = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

// A function that returns a random symbol from the symbols string
function getRndSymbol() {
  let index = getRndNumberInRange(0, symbols.length - 1);
  return symbols.charAt(index);
}

// A function that shuffles the characters in an array
// Function to shuffle an array randomly
function shufflePassword(array) {
  //Fisher Yates Method
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

const indicator = document.querySelector("[data-indicator]");
setIndicator("#ccc");

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// Function to calculate the password strength based on selected checkboxes and length
function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (checkboxes[0].checked) hasUpper = true;
  if (checkboxes[1].checked) hasLower = true;
  if (checkboxes[2].checked) hasNum = true;
  if (checkboxes[3].checked) hasSym = true;

  // Check conditions for strong, medium and weak password
  if (hasUpper && hasLower && (hasNum || hasSym) && sliderEl.value >= 8) {
    setIndicator("#0f0"); // Set password strength indicator to strong
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    sliderEl.value >= 6
  ) {
    setIndicator("#ff0"); // Set password strength indicator to medium
  } else {
    setIndicator("#f00"); // Set password strength indicator to weak
  }
}

// Button to generate password
const generatePasswordEl = document.querySelector("[generatePasswordBtn]");

// Function to generate password based on selected checkboxes, length and slider
function generatePassword() {
  if (sliderEl.value < numChecked) {
    sliderEl.value = numChecked;
    handleSlider();
  }

  // Select password character set based on selected checkboxes
  let passSelector = [];
  if (checkboxes[0].checked) passSelector.push(getRndUpper);
  if (checkboxes[1].checked) passSelector.push(getRndLower);
  if (checkboxes[2].checked) passSelector.push(getRndNumber);
  if (checkboxes[3].checked) passSelector.push(getRndSymbol);

  let password = [];
  // Generate password with at least one character from each selected character set
  passSelector.forEach((currValue) => {
    password.push(currValue());
  });

  // Generate remaining characters randomly from selected character sets
  for (let i = 1; i <= sliderEl.value - passSelector.length; ++i) {
    let index = getRndNumberInRange(0, passSelector.length - 1);
    let func = passSelector[index];
    let val = func();
    password.push(val);
  }

  // Shuffle the generated password randomly
  let str = shufflePassword(password);
  passwordDisplayEl.value = str;
  calcStrength();
}

// Add event listener for generate password button
generatePasswordEl.addEventListener("click", generatePassword);


