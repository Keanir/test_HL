// Скрипт для открытия и закрытия меню на маленьких экранах
const selectElement = element => document.querySelector(element);

const menuToggle = selectElement('.menu__toggle');
const body = selectElement('body');

menuToggle.addEventListener('click', () => body.classList.toggle('open'));