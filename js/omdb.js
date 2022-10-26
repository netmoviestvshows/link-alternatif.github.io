//Initial References
let key = "698ae0e";
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//Function to fetch data from API
let getMovie = () => {
   let movieName = movieNameRef.value;
   let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
   //If input field is empty
   if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
  }
  //If input field is NOT empty
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        //If movie exists in database
        if (data.Response == "True") {
          result.innerHTML = `
          <div class="row">
<div class="col-md-3 text-center">
<div class="separator" style="clear: both;"><a href="${data.Poster}" style="display: block; padding: 0.5em 0; text-align: center; "><img alt="" border="0" height="320" data-original-height="450" data-original-width="300" src="${data.Poster}"/></a></div> 
</div>
<div class="col-md-9 text-center">
<div style="text-align: start;">${data.Title} ${data.Year}  ${data.Plot}</div>
<div role="tabpanel" class="tab-pane fade active in" id="details">
<table class="table table-condensed table-bordered table-hover">
<tbody>
<tr><th>Subtitle</th>
<td>: ${data.Language}</td></tr>
<tr>
<th>Rating</th>
<td>: ${data.imdbRating} ${data.Rated} [${data.Type}]</td></tr>
<tr>
  <th>Release Date</th>
<td>: ${data.Released}</td></tr>
<tr>
<th>Genres</th>
<td>: ${data.Genre.split(",").join(",")}</td></tr>
<tr>
<th>Runtime</th>
<td>: ${data.Runtime}</td></tr>
<tr>
<th>Country</th>
<td>: ${data.Country}</td></tr>
<tr>
<th>Casts</th>
<td>: ${data.Actors}</td></tr>

</tbody>
</table>
</div>
  
</div>
</div>
<style>
#videoPlayer {
  background-size: 35% !important;
    background: url(${data.Poster});}
#player-modal .modal-body .offerlay {
background: url(${data.Poster});}
</style>
          `;
        }
        //If movie does NOT exists in database
        else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      //If error occurs
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occured!</h3>`;
      });
  }
};
//Call the getMovie() on button click and window load
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
