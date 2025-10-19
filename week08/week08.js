// main.js
// DOM manipulation examples for the provided HTML.
// Drop this file in the same folder as the HTML and open the page in a browser.

//// Utilities
function log(title, value) {
  console.groupCollapsed(title);
  console.log(value);
  console.groupEnd();
}

// ===== Basic selectors =====
const appetizerList = document.getElementById('appetizer'); // by id
const soupLists = document.getElementsByTagName('ul');      // by tag name (HTMLCollection)
const veganItems = document.getElementsByClassName('vegan'); // live HTMLCollection
const meatItemsNodeList = document.querySelectorAll('#soup .meat'); // static NodeList

log('appetizerList', appetizerList);
log('all <ul> elements', soupLists);
log('veganItems (HTMLCollection)', veganItems);
log('meatItemsNodeList (NodeList)', meatItemsNodeList);

// ===== Traversal: children / parent / siblings =====
function showTraversalExamples() {
  const firstAppetizer = appetizerList.firstElementChild; // first li in appetizer
  const secondAppetizer = firstAppetizer.nextElementSibling; // next li
  const parentOfAppetizer = appetizerList.parentElement; // .menu div

  console.log('firstAppetizer:', firstAppetizer && firstAppetizer.textContent);
  console.log('secondAppetizer:', secondAppetizer && secondAppetizer.textContent);
  console.log('parentOfAppetizer tagName:', parentOfAppetizer && parentOfAppetizer.tagName);
}
showTraversalExamples();

// ===== Read and change textContent / innerHTML / innerText =====
function replaceTextExample() {
  // change the h3 title
  const title = document.querySelector('h3');
  title.textContent = 'SIT@KMUTT — Updated Menu'; // safe text-only
  // change a menu item using innerText
  const tuna = document.querySelector('#appetizer li.meat:nth-of-type(2)');
  if (tuna) tuna.innerText = 'Tuna Sandwich (grilled)';
  // innerHTML example (be careful with user input)
  const note = document.querySelector('p');
  note.innerHTML = '<strong>*** Enjoy Your Meal — Updated ***</strong>';
}
replaceTextExample();

// ===== classList: add / remove / toggle =====
function highlightVegans() {
  for (const el of veganItems) {
    // add a highlight class (we don't have CSS here but you can inspect class changes)
    el.classList.add('highlight-vegan');
  }
  console.log('Added .highlight-vegan to veganItems');
}
highlightVegans();

// ===== Creating and appending elements =====
function addAppetizerItem(text, className) {
  const li = document.createElement('li');
  li.textContent = text;
  if (className) li.className = className;
  appetizerList.appendChild(li);
  console.log('Appended:', li);
  return li;
}
addAppetizerItem('Spring Rolls (new)', 'vegan');

// ===== Removing elements =====
function removeOutOfStock() {
  // In the HTML there's a commented "out of stock". We'll demo removing by text.
  const items = Array.from(document.querySelectorAll('#appetizer li'));
  for (const li of items) {
    if (li.textContent.toLowerCase().includes('out of stock')) {
      li.parentElement.removeChild(li);
      console.log('Removed out-of-stock item:', li);
    }
  }
}
// nothing matches now but function exists:
removeOutOfStock();

// ===== Move items between lists =====
function moveFirstSoupToAppetizer() {
  const soupUl = document.querySelector('#soup');
  const firstSoup = soupUl && soupUl.firstElementChild;
  if (firstSoup) {
    appetizerList.appendChild(firstSoup); // moves element from soup -> appetizer
    console.log('Moved to appetizer:', firstSoup.textContent);
  } else {
    console.log('No soup item to move.');
  }
}
// Example call:
moveFirstSoupToAppetizer();

// ===== cloneNode example =====
function cloneFirstAppetizer() {
  const first = appetizerList.firstElementChild;
  if (first) {
    const clone = first.cloneNode(true); // deep clone
    clone.textContent += ' (copy)';
    appetizerList.appendChild(clone);
    console.log('Cloned node:', clone);
  }
}
cloneFirstAppetizer();

// ===== dataset example (useful for storing metadata) =====
function tagItemsWithPrice() {
  const items = document.querySelectorAll('ul li');
  let base = 45;
  items.forEach((li, i) => {
    li.dataset.price = (base + i * 10).toString(); // e.g., data-price="45"
  });
  console.log('Tagged items with data-price');
}
tagItemsWithPrice();

// ===== count & summary utility =====
function menuSummary() {
  const totalItems = document.querySelectorAll('ul li').length;
  const veganCount = document.querySelectorAll('li.vegan').length;
  const meatCount = document.querySelectorAll('li.meat').length;
  console.log(`Total: ${totalItems} | Vegan: ${veganCount} | Meat: ${meatCount}`);
}
menuSummary();

// ===== Event handling: addEventListener vs onclick =====
function setupClickHandlers() {
  // add a click listener to all list items to toggle "selected"
  document.querySelectorAll('ul li').forEach(li => {
    li.addEventListener('click', (ev) => {
      ev.currentTarget.classList.toggle('selected');
      console.log('Toggled selected for:', ev.currentTarget.textContent);
    });
  });

  // handle button-like input inside form (we'll leave formSubmit global)
  // the HTML uses onclick="formSubmit()" already — we'll also attach a safe listener:
  const formButton = document.querySelector('input[type="button"]');
  if (formButton) {
    formButton.addEventListener('click', () => {
      // call the global function (defined below)
      window.formSubmit && window.formSubmit();
    });
  }
}
setupClickHandlers();

// ===== Demonstrate innerHTML risks =====
function unsafeExample() {
  const el = document.createElement('div');
  // DON'T set innerHTML with user input without sanitizing:
  // el.innerHTML = '<img src=x onerror=alert(1) />'; // BAD if HTML from users
  // instead use textContent or createElement
  el.textContent = 'Safe example text';
  document.body.appendChild(el);
}
unsafeExample();

// ===== Form handling =====
// Provided HTML uses: <input type="button" onclick="formSubmit()" value="Send form data!" />
// We implement formSubmit as a global function.
window.formSubmit = function formSubmit() {
  const form = document.forms['myForm'];
  if (!form) {
    alert('Form not found!');
    return;
  }
  const fname = form.fname.value.trim();
  const lname = form.lname.value.trim();

  // Basic validation
  if (!fname || !lname) {
    alert('Please enter first and last name.');
    return;
  }

  // Create a summary and show it (instead of actually submitting)
  const summary = `Form data captured:\nFirst name: ${fname}\nLast name: ${lname}`;
  console.log(summary);

  // Example: display on the page without using innerHTML unsafely
  const out = document.createElement('div');
  out.textContent = `Hello ${fname} ${lname}! (form captured)`;
  out.className = 'form-output';
  document.querySelector('.menu').appendChild(out);

  // If you wanted to submit via GET to /action_page.php, you could:
  // form.submit();
};

// ===== Extras: useful helper functions to run in console =====
window.appHelpers = {
  listAllItems: () => Array.from(document.querySelectorAll('ul li')).map(li => li.textContent),
  findByText: (text) => Array.from(document.querySelectorAll('ul li')).filter(li => li.textContent.toLowerCase().includes(text.toLowerCase())),
  setPriceByText: (text, price) => {
    const match = window.appHelpers.findByText(text)[0];
    if (match) match.dataset.price = price;
  }
};

// ===== End of examples =====
console.log('main.js loaded — DOM manipulation examples ready. Use the functions or inspect in console.');
