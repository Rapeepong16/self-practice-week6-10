console.log(window.document); //root node
console.log(document); //root node
console.log(typeof document); //object


console.log(document.getElementById('123')); //query ID that will found 1 ID or null because the ID is unique


const htmlElement = document.documentElement //this variable keep reference because that is object 
console.log(htmlElement);

console.log(htmlElement.parentElement); //null
console.log(htmlElement.parentNode); //root node
if (htmlElement.parentNode === document){
  console.log('parent of html is root node');
  
}

console.log(document.firstChild);// focus first node
console.log(document.firstChild.nextSibling);
console.log(document.firstChild.previousSibling);// null 
console.log(document.firstElementChild); //find only first element type
console.log(document.firstElementChild.previousSibling);
console.log(document.lastChild);
console.log(document.lastElementChild);

//1.get all child element node under <div id='123></div>
console.log('-------------------');
const divElement = document.getElementById('123')
const divChildNodes = divElement.childNodes //2.get all node type(return (static)NodeList can use forEach)
console.log(divChildNodes.length);
divChildNodes.forEach((child)=> console.log(child));
console.log('-------------------');
//3. get only Element node type (return (dynamic) HTMLCollection, cannot use forEach)
const divChildren = divElement.children
console.log(divChildren.length);
for (let i = 0; i < divChildren.length; i++){
  console.log((divChildren[i]));
  
}
console.log('-------------------');
//change to array and use forEach
Array.from(divChildren).forEach((child) => console.log(child));

//อยากเข้าถึง attribute ของ node นั้นต้องเข้าถึง node นั้นก่อนเเล้วก็เข้า attribute นั้นต่อ
const divAtrrs = divElement.attributes
console.log(divAtrrs.length);

for (let index = 0; index < divAtrrs.length; index++) {
  const attrName = divAtrrs[index].name
  const attrValue = divAtrrs[index].value
  console.log(`attribute name: ${attrName}, attribute value: ${attrValue}`);
  console.log(divAtrrs[index].ownerElement);
  
}

//find value attribute
console.log(divElement.getAttribute('id'));
console.log(divElement.getAttribute('style'));
console.log(document.firstChild.nodeType);//value 10 = DOCUMENT_TYPE_NODE

//create element(tag , attribute) after render file
//1.สร้าง element or attribute(option) รวมถึงสิ่งที่อยู่ใน element นั้น
//2.ผูก element นั้นเข้ากับ tree
const pElement = document.createElement('p')
const idAtrr = document.createAttribute('id')
idAtrr.value = 'p5'
pElement.setAttributeNode(idAtrr)
// pElement.setAttribute('id','p5') -- other solution
const pText = document.createTextNode('#5')
pElement.appendChild(pText) //binding '#5' to <p></p>
// pElement.textContent = '#5' -- other solution
const body = document.body
body.appendChild(pElement)


//innerHTML, textContent, และ innerText
let el = document.getElementById('demo')
console.log(el.innerHTML);
console.log(el.innerText); //ตีความ css ได้ด้วย
console.log(el.textContent);

let p = document.createElement('p')
el.appendChild(p)
p.setAttribute('format' , 'italic')
p.append('Sample italic');

// 2.1 innerHTML result
const htmlResult = document.createElement("div");
htmlResult.innerHTML = "<i>Sample Italic Text</i>";
el.appendChild(htmlResult);

// 2.2 innerText result
const textResult = document.createElement("div");
textResult.innerText = "<i>Sample Italic Text</i>";
el.appendChild(textResult);

// 2.3 textContent result
const contentResult = document.createElement("div");
contentResult.textContent = "<i>Sample Italic Text</i>";
el.appendChild(contentResult);

