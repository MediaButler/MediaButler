module.exports = (movie) =>
{
    let d = new Date(movie.inCinemas);
    let i = {};
    i.Title = movie.title;
    i.Plot = movie.overview;
    i.Year = movie.year;
    i.Poster = movie.remotePoster;
    i.Rated = "N/A";
    i.Released = d.toDateString();
    i.Genre = movie.genres.join(", ");
    if (i.Genre == "") i.Genre = "N/A";
    i.Runtime = movie.runtime;
    i.imdbRating = movie.ratings.value;
    i.imdbVotes = movie.ratings.votes;
    i.imdbID = `N/A (TMDb ${movie.tmdbId})`;
    return i;
}