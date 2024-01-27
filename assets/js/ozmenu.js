/*
 * JavaScript - CSS Responsive Dropdown Menu
 * Author : Oğuzhan Avcı
 * https://github.com/oziavci
*/

const openMenu = document.querySelector(".menu-open");
const closeMenu = document.querySelector(".menu-close");
const menuDiv = document.querySelector(".ozmenu");
const menu = document.querySelector(".ozmenu-nav");
const dropDowns = menu.getElementsByClassName("nav-dropdown");
const dropDownsChild = menu.querySelectorAll('.dropdown .nav-dropdown');
var speed = document.getElementById('speed');

openMenu.addEventListener("click", menuToggle);
closeMenu.addEventListener("click", menuToggle);

document.body.insertAdjacentHTML("beforeend", "<div id='menu-overlay'></div>");
document.querySelector("#menu-overlay").addEventListener("click", menuToggle);

function menuToggle() {
    menuDiv.classList.toggle("active");
    document.body.classList.toggle("hide-scrolling");
    document.body.classList.toggle("mobile-menu-active");
    document.getElementById("menu-overlay").classList.toggle("show");
    if (speed.classList.contains('speedWrapper')) {
        speed.classList.remove('speedWrapper');
    } else {
        speed.classList.add('speedWrapper');
    }
}

for (var i = 0; i < dropDownsChild.length; i++) {
    dropDownsChild[i].classList.add('child');
    dropDownsChild[i].addEventListener("click", function() {
        this.classList.toggle('opened');
    });
}
for (var i = 0; i < dropDowns.length; i++) {
    if(!dropDowns[i].classList.contains("child")){
        dropDowns[i].classList.add('parent');
        dropDowns[i].addEventListener("click", function() {
            this.classList.toggle('opened');
        });
    }
}

var menuItems = document.querySelectorAll('.ozmenu-nav .item');
var mobileMenu = document.getElementById('menu-mobile');

menuItems.forEach(function (item) {
    item.addEventListener('click', function () {
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.classList.toggle("hide-scrolling");
            document.body.classList.toggle("mobile-menu-active");
            speed.classList.add('speedWrapper');
        }
    });
});