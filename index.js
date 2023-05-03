import { schemes } from "./Schemes.js";

const select = document.getElementById('scheme-select');
const selectOptions = document.getElementById('scheme-select-options');
const colorInput = document.getElementById('color-input');
const colors = document.getElementById('colors');
const schemeBtn = document.getElementById('get-scheme-btn');
const schemeType = document.getElementById('scheme-type');

// Event Listeners
select.addEventListener('click', () => {
  toggleHide();
})

selectOptions.addEventListener('click', (event) => {
  if (event.target.classList.contains('scheme-type')) {
    schemeType.innerHTML = `
      <div>${event.target.id}</div>
    `
    toggleHide();
    toggleDisabled();
    createOptionsList();
  }
});

schemeBtn.addEventListener('click', (event) => {
  event.preventDefault();
  setColorScheme(colorInput.value, schemeType.innerText);
})

colors.addEventListener('click', (event) => copyColorValue(event));

// Functions
function toggleHide() {
  if (selectOptions.classList.contains('hidden')) {
    selectOptions.classList.remove('hidden');
  } else {
    selectOptions.classList.add('hidden');
  }
}

function toggleDisabled() {
  if (schemeBtn.hasAttribute('disabled')) {
    schemeBtn.removeAttribute('disabled');
  }
}

// Takes a color in hex format, including the hash.
function setColorScheme(seedColor = "#000000", scheme = "Monochrome") {
  // Slice removes the hash from the value of the color input value because
  // the api cannot recognize it.
  fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor.slice(1)}&mode=${scheme.toLowerCase()}`, {
    "Content-Type": "application/json"
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      colors.innerHTML = data.colors.map((color, index) => {
        return `
        <div id="col=${index}" class="color-col">
          <div id="color-${index}" class="color" style="background-color: ${color.hex.value}">
            <div class="copy-color" data-color="${color.hex.value}">Click to Copy</div>
          </div>
          <div id="hex-${index}" class="color-hex">
            ${color.hex.value}
          </div> 
        </div>
      `
      }).join('');
    })
}

// Create/Update the Select-Options component.
function createOptionsList() {
  console.log(2, schemeType.innerText)
  selectOptions.innerHTML = schemes.map(scheme => {
    let html = `<span class="scheme-type select-text" id=${scheme}>${scheme}</span>`

    if (schemeType.innerText === scheme) {
      html += `<i class="fa-solid fa-check"></i>`
    }

    return `<div class="scheme-type-container">${html}</div>`;

  }).join('');
}

// Copy the color to the clipboard.
function copyColorValue(event) {

  // Get the color column.
  if (event.target.classList.contains('copy-color')) {
    console.log(event.target.dataset);
    navigator.clipboard.writeText(event.target.dataset.color);
    // Alert the copied text
    alert("Copied the text: " + event.target.dataset.color);
  }
}

// Set up the initial page.
createOptionsList();
// Set the initial color scheme.
setColorScheme(colorInput.value);

















function showOptions(hexColor, scheme = "monochrome") {
  fetch("")
}

