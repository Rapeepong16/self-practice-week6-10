let body = document.body
//เขียนฟังก์ชัน createParagraph(id, text) ให้สร้าง <p> พร้อม id และข้อความ แล้ว append เข้า body
function createParagraph(id , text){
  let p = document.createElement('p')
  p.setAttribute('id' , id)
  p.textContent = text
  body.appendChild(p)
}

createParagraph("intro", "This is a dynamic paragraph.")


