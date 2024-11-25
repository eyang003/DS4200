const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar_menu')

menu.addEventListener('click',function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

<div class="button-container">
    <button onclick="window.location.href='https://github.com/eyang003/DS4200';">
        Click the Link to star our project in github!
    </button>
</div>
