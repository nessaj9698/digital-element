// Отклчение скролла при открытии меню на мобильном
const menuIcon = document.querySelector('.menu-button');

if (window.matchMedia('(max-width: 500px)').matches) {
  menuIcon.addEventListener('click', () => {
    document.body.classList.toggle('modal-open');
  });
}
