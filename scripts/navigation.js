const mainnav = document.querySelector('.navigation');
const navToggle = document.querySelector('.#menu');

navToggle.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    navToggle.classList.toggle('show');
});

