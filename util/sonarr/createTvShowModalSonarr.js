module.exports = (tvShow) =>
{
  const d = new Date(tvShow.firstAired);
  const i = {};
  i.Title = tvShow.title;
  i.Plot = tvShow.overview;
  i.Poster = tvShow.images.find(o => o.coverType === 'poster').url;
  i.Year = d.getFullYear();
  i.Rated = tvShow.certification;
  i.Released = d.toDateString();
  i.Genre = tvShow.genres.join(', ');
  i.Runtime = `${tvShow.runtime} mins`;
  i.imdbRating = tvShow.ratings.value;
  i.imdbVotes = tvShow.ratings.votes;
  i.imdbID = tvShow.imdbId;
  return i;
};