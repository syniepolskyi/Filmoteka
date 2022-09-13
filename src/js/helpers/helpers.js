import Handlebars from 'handlebars';

//для окруклення індексу Popularity в modal-card.hbs
Handlebars.registerHelper('numberFixed', function (number) {
  return number?.toFixed(1);
});

// фіксять рік там рейтинг на картках фільмів
Handlebars.registerHelper('yearFixed', function (movieDate) {
  let today = new Date(movieDate);
  let year = today.getFullYear();
  return year;
});


