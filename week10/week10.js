import { CookieUtil } from "./myLib/cookieUtil.js"
CookieUtil.set("cartId", "abc123", new Date(2025, 9, 20))
console.log(document.cookie)
console.log(CookieUtil.get("cartId"))
CookieUtil.unset("cartId")
// console.log(document.cookie)
// document.cookie = "theme=dark"
// document.cookie = `theme=light;expires=${new Date(2025, 9, 16)}`
// document.cookie = "username=umaporn;max-age=60"

document.cookie = "username=Bank; expires=Fri, 25 Oct 2025 12:00:00 UTC; path=/"
console.log(document.cookie)

//sessionStorage


let like = sessionStorage.getItem("like");
if (like === null || isNaN(Number(like))) {
  like = 0;
} else {
  like = Number(like);
}
like++;
sessionStorage.setItem("like", like);
alert(sessionStorage.getItem("like"));
