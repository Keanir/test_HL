// Получам все ссылки по id
const anchors = document.querySelectorAll('a[id*="slider_link-"]');
// В пустой массив будут записываться координаты ссылок
let linksRect = [];
// Цвета
let white = '#FFF';
let black = '#000';
let gold ='#FFD17E';
// Получаем координаты секций страницы
let section1 = document.getElementById('section1');
let section2 = document.getElementById('section2');
let section3 = document.getElementById('section3');
let rect1 = section1.getBoundingClientRect();
let rect2 = section2.getBoundingClientRect();
let rect3 = section3.getBoundingClientRect();

// Записываем в пустой массив координаты ссылок и на ссылки
// вешаем обработчик по клику для перехода к секции по id
anchors.forEach(anchor => {
  linksRect.push(anchor.getBoundingClientRect());

  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const blockID = anchor.getAttribute('href').substr(1);        

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  })
});

// Сначала идет простой вызов функции для проверки координат и изменения цвета
// ссылки в соответствии с ними. Далее за этим уже следит addEventListener по
// скроллу и изменению размеров
checkCoords();
window.addEventListener('scroll', checkCoords, false);
window.addEventListener('resize', checkCoords, false);


function checkCoords() {
  // Обновляем координаты секции с учетом полной высоты страницы,
  // а не только видимой части и берем координаты нижней границы
  rect1 = section1.getBoundingClientRect().bottom + pageYOffset;
  rect2 = section2.getBoundingClientRect().bottom + pageYOffset;
  rect3 = section3.getBoundingClientRect().bottom + pageYOffset;
  linksRect.forEach((el, ind) => {
    // Сохраняем текузий цвет в переменную
    let prevColor = anchors[ind].style.color;
    // Из-за постоянного слежения за координатами задать css свойство не выходит,
    // т.к. цвет динамически меняется. Смотри за состоянием и если курсор мышки
    // над элементом - задаем соответсвующий цвет, а потом возвразаем предыдущий,
    // как только курсор уйдет с элемента
    anchors[ind].onmouseover = function() {
      anchors[ind].style.color = gold;
    }
    anchors[ind].onmouseout = function() {
      anchors[ind].style.color = prevColor;
    }
    // Обновляем координаты каждой ссылки и сравниваем с координатами секций
    // В зависимости от значений устанавливается нужный цвет
    // Хочу потом его доработать, чтобы можно было передавать любое количество секций
    el = anchors[ind].getBoundingClientRect().bottom + pageYOffset;
    if (el > rect1 && el < rect2) {
      anchors[ind].style.color = black;
    } else if ((el > rect2 && el <rect3) || el < rect1) {
      anchors[ind].style.color = white;
    } else if (el > rect3) {
      anchors[ind].style.color = black;
    }
  });
}
