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

<div class="col-md-9 text-center">
<div style="text-align: start;">${data.Title} ${data.Year}  ${data.Plot}</div>
 <div class="genre">
 <div class="rating"><img src="https://api.iconify.design/ep/star-filled.svg?color=yellow&width=10&height=10"><a>${data.imdbRating}</a></div> 
<div>${data.Genre.split(",").join("</div><div>")}</div>
</div>   
<div role="tabpanel" class="tab-pane fade active in" id="details">
<table class="table table-condensed table-bordered table-hover">
<tbody>
<tr><th>Subtitle</th>
<td>: ${data.Language}</td></tr>
<tr>
<th>Type</th>
<td>: ${data.Rated} [${data.Type}] ${data.Runtime}</td></tr>
<tr>
  <th>Release Date</th>
<td>: ${data.Released}</td></tr>
<tr>
<tr>
<th>Company/Net</th>
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



//TMDB SCRIPT


angular.module('movieFinder', [])
.controller('movieCtrl', function($scope, $http){
  $scope.$watch('search', function() {
    fetch(); //watches the search input which refreshes every 800ms
  });

//function called every 800ms to perform AJAX call
function fetch(){

//the results only return a partial img path so this is added to provide the full url to display the poster... those tricksters!
var apiKey = '0ceedd539b0a1efa834d0c7318eb6355';
  var imgPath = "https://image.tmdb.org/t/p/w300/"    
  var imgback = "https://image.tmdb.org/t/p/w1280/"
  
  //defining the search value from the input
  var search = $("#movie-name").val();
  console.log()
  //this query allows users to search by title which is input by the user
  $http.get('https://api.themoviedb.org/3/search/multi?api_key=' + apiKey + '&query=' + search)
    .then(function(response){ 
          

      //title of first movie in results array
      $scope.title = response.data.results[0].original_title; 
      console.log($scope.title)

      //synopsis of the movie
      $scope.overview = response.data.results[0].overview;

      //img path for poster
      $scope.poster = imgPath + response.data.results[0].poster_path;
      console.log($scope.poster);

      //the voter average for the movie returned
      $scope.rating = 'Rating: '+ response.data.results[0].vote_average;
      //the voter average for the movie returned
      $scope.backdrops = imgback + response.data.results[0].backdrop_path;
      console.log($scope.backdrops);
      $scope.release = 'Release: '+ response.data.results[0].release_date;
      $scope.genres = 'Type: '+ response.data.results[0].media_type;
      // $scope.name = 'Type: '+ response.data.results[0].origin_country;
        $scope.runtime = 'runtime: ' + response.data.results[0].runtime;

    });
}
})

