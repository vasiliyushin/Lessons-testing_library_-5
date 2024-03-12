//урок 4
//запускать node  otus_lesson/src/tale.js

//первое задание
function Kolobok(character) {
    switch (character) {
      case 'дедушка':
        console.log('Я от дедушки ушёл');
        break;
      case 'заяц':
        console.log('Я от зайца ушёл');
        break;
      case 'лиса':
        console.log('Меня съели');
        break;
      default:
        console.log('Я встретил незнакомца');
        break;
    }  
  }

//тесты по первому заданию  
Kolobok('дедушка'); //Я от дедушки ушёл
Kolobok('заяц'); //Я от зайца ушёл
Kolobok('лиса'); //Меня съели
Kolobok('Дед мороз'); //Я встретил незнакомца


//второе задание 
function newYear(character) {
  switch(character) {
    case 'Дед мороз':
    case 'Снегурочка':
      console.log(`${character}! ${character}! ${character}!`)
      break;
    default:
      console.log('Указан неизвестный персонаж');
      break;
  }
}

//тесты по второму заданию
newYear('Дед мороз')
newYear('Снегурочка')
newYear('Колобок')

