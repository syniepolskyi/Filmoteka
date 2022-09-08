export function changeGenresIdtoName(movies, genres) {
  movies.forEach(element => {
    const array = element.genre_ids;
    const newArr = array.map(elem => {
      if (genres.find(x => x.id === elem)) {
        return genres.find(x => x.id === elem).name;
      } else {
        return 'Other';
      }
    });
    element.genre_ids = newArr;
  });
}
