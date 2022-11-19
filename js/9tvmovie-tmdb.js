// TMDB TV VUEJS 1
Vue.component("card", {
  props: ["id"],
  data() {
    return {
      hover: false,
      tvData: {},
      castData: {},
    };
  },
  created: function () {
    // this.fetchOnlyMovieData();
    this.fetchAllData();
    // this.returnConsole();
  },
  computed: {
    //pull api data and use it for CSS
    pullBackground() {
      return {
        background: `#ffffff url(http://image.tmdb.org/t/p/w300${this.tvData.poster_path}) no-repeat center`,
      };
    },

    filteredCast() {
      // console.log(this.castData.cast.slice(0, 5));
      return this.castData.cast.slice(0, 5);
    },
  },
  methods: {
    returnConsole: function () {
      console.log("rating", this.id);
    },
    returnHeadshot: function (url) {
      return `http://image.tmdb.org/t/p/w300${url}`;
    },
    returnImage: function (url) {
      return `http://image.themoviedb.org/t/p/w1280${url}`;
    },
    yearGrab: function (date) {
      return date.substring(0, 4);
    },
    limitString: function (string, length) {
      return string.substring(0, length - 3) + "...";
    },
    minToHour: function (data) {
      let result = "";
      let hours = Math.floor(data / 60);
      let minutes = data % 60;
      if (hours > 0) result += hours + "h ";
      if (minutes > 0) result += minutes + "m";
      return result;
    },
    moment: function (data) {
      return moment(data).format("LL");
    },
    posterImg: function (data) {
      if (data) {
        return "https://image.tmdb.org/t/p/w500" + data;
      } else {
        return "/static/images/no-image.png";
      }
    },
    backdropImg: function (data) {
      if (data) {
        return "https://image.tmdb.org/t/p/original" + data;
      } else {
        return "/static/images/no-image-backdrop.png";
      }
    },
    fetchOnlyMovieData: async function () {
      const apikey = "2645540b01a63a0893fe4d3dd0db311e";
      const id = this.id;
      const query =
        "https://api.themoviedb.org/3/tv" +
        id +
        "?api_key=" +
        apikey +
        "&append_to_response=credits,person,keywords,images,videos&language=en-US";
      try {
        const res = await fetch(query);
        const tv = await res.json();
        console.log(tv);
        this.tvData = tv;
      } catch (e) {
        console.log(e);
      }
    },

    fetchAllData: async function () {
      const apikey = "2645540b01a63a0893fe4d3dd0db311e";
      const id = this.id;
      const queryMovie =
        "https://api.themoviedb.org/3/tv/" +
        id +
        "?api_key=" +
        apikey +
        "&append_to_response=credits,person,keywords,images,videos&language=en-US";
      const queryCast =
        "https://api.themoviedb.org/3/tv/" +
        id +
        "/credits?api_key=" +
        apikey +
        "&append_to_response=credits,person,keywords,images,videos&language=en-US";
      try {
        const [resMovie, resCast] = await Promise.all([
          fetch(queryMovie),
          fetch(queryCast),
        ]);
        const tv = await resMovie.json();
        const cast = await resCast.json();
        console.log(tv);
        console.log("cast");
        console.log(cast);
        // console.log("tv genre", tv.genres);
        this.tvData = tv;
        this.castData = cast;
      } catch (e) {
        console.log(e);
      }
    },
  },
  template: `
<div class="templat">
  <div class="col-md-3" style=" margin-bottom: 20px;"
    @mouseover="hover = true"
    @mouseleave="hover = false">
 <img :src="posterImg(tvData.poster_path)" width="100%" >
  </img>

  <div v-if="hover" style="padding-top:0px; transition: padding 0.2s;"></div>
  <div v-else style="transition: padding 0.2s;"></div>
  <div class="card-content">
    <h2>{{tvData.original_name}} </h2>
    <iconify-icon icon="dashicons:star-filled" style="color: yellow;" width="16" height="16"></iconify-icon> {{ tvData.vote_average }}/10 by {{tvData.vote_count}} users
    <div class="tags">
      
    </div>
    
</div>
  
</div>
 


  <div class="col-md-9">
    <h2 style="font-size: 1.6rem;font-weight: 600;">{{tvData.tagline}} {{tvData.name}}{{tvData.original_title}} ({{ yearGrab(tvData.first_air_date) }}) 
    </h2>
    <div class="description">
       <slot>{{ limitString(tvData.overview, 300) }}</slot>
    </div>
<br />
<table class="table table-condensed table-bordered table-hover">
<tbody><tr>
<th> <div class="tags" style="display:flex;color: #13a1e5;"> <iconify-icon icon="ant-design:field-time-outlined" style="
    font-size: 15px;"></iconify-icon>&nbsp;{{ minToHour(tvData.episode_run_time [0]) }}</div></th>
<td><div class="tagbox" v-for="genre in tvData.genres" :key="genre.id">{{genre.name}}</div></td>
</tr>
<tr>
<th>Subtitle Available</th>
<td>
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/usa.png" width="26" alt="United Stated.png" height="24">
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/espain.png" width="28" alt="espain.png" height="27">
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/korean.png" width="25" alt="south-korea.png" height="24">
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/france.png" width="27" alt="france.png" height="24">
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/Germany.png" width="29" alt="Germany.png" height="26">
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/italy.png" width="27" alt="italy.png" height="24">
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/belanda.png" width="25" alt="belanda.png" height="24">
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/portugal.png" width="26" alt="portugal.png" height="24">
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/hungaria.png" width="27" alt="hungaria.png" height="26">  etc.
</td>
</tr>

<tr>
<th>Number of Seasons</th>
<td>{{tvData.number_of_seasons}}</td>
</tr>
<tr>
<th>Number of Episodes</th>
<td>{{tvData.number_of_episodes}}</td>
</tr>
<tr>
<th>First Air Date</th>
<td>{{tvData.first_air_date}}</td>
</tr>
<tr>
<th>Last Air Date</th>
<td>{{tvData.last_air_date}}</td>
</tr>
<tr>
<th>Networks</th>
<td><div style="text-transform: capitalize;">{{tvData.networks.map(i => i.name).join(', ') }}. ({{ tvData.production_companies.map(i => i.name).join(', ') }})
            </div></td>
</tr>
<tr>
<th>Product Country</th>
<td><div> {{  tvData.production_countries.map(i => i.name).join(',') }} </div></td></td>
</tr>
<tr>
<th>Casts</th>
<td><div class="cast-list"><h4></h4><div class="cast-circle" v-for="cast in filteredCast" :key="cast.cast_id"><img :src="returnHeadshot(cast.profile_path) "></td>
</tr>
<tr>
<th></th>
<td>{{  limitString(castData.cast.map(i => i.original_name).join(', '), 150) }}</td>
</tr>
<tr>
<th>Home Page</th>
<td>{{tvData.homepage}}</td>
</tr>
</tbody></table>
              
       </div>
      </div>

</div>`,
});

Vue.component("rating", {
  props: ["value"],
  template: '<p class="rating">{{value}}</p>',
});

new Vue({
  el: "#tv",
});

// TMDB TV VUEJS 2

Vue.component("card", {
  props: ["id"],
  data() {
    return {
      hover: false,
      movieData: {},
      castData: {},
    };
  },
  created: function () {
    // this.fetchOnlyMovieData();
    this.fetchAllData();
    // this.returnConsole();
  },
  computed: {
    //pull api data and use it for CSS
    pullBackground() {
      return {
        background: `#ffffff url(http://image.tmdb.org/t/p/w300${this.movieData.poster_path}) no-repeat center`,
      };
    },

    filteredCast() {
      // console.log(this.castData.cast.slice(0, 5));
      return this.castData.cast.slice(0, 5);
    },
  },
  methods: {
    returnConsole: function () {
      console.log("rating", this.id);
    },
    returnHeadshot: function (url) {
      return `http://image.tmdb.org/t/p/w300${url}`;
    },
    returnImage: function (url) {
      return `http://image.themoviedb.org/t/p/w1280${url}`;
    },
    yearGrab: function (date) {
      return date.substring(0, 4);
    },
    limitString: function (string, length) {
      return string.substring(0, length - 3) + "...";
    },
    minToHour: function (data) {
      let result = "";
      let hours = Math.floor(data / 60);
      let minutes = data % 60;
      if (hours > 0) result += hours + "h ";
      if (minutes > 0) result += minutes + "m";
      return result;
    },
    moMent: function (data) {
      return moment(data).format("LL");
    },
    posterImg: function (data) {
      if (data) {
        return "https://image.tmdb.org/t/p/w500" + data;
      } else {
        return "/static/images/no-image.png";
      }
    },
    backdropImg: function (data) {
      if (data) {
        return "https://image.tmdb.org/t/p/original" + data;
      } else {
        return "/static/images/no-image-backdrop.png";
      }
    },
    fetchOnlyMovieData: async function () {
      const apikey = "2645540b01a63a0893fe4d3dd0db311e";
      const id = this.id;
      const query =
        "https://api.themoviedb.org/3/movie" +
        id +
        "?api_key=" +
        apikey +
        "&append_to_response=credits,person,keywords,images,videos&language=en-US";
      try {
        const res = await fetch(query);
        const movie = await res.json();
        console.log(movie);
        this.movieData = movie;
      } catch (e) {
        console.log(e);
      }
    },

    fetchAllData: async function () {
      const apikey = "2645540b01a63a0893fe4d3dd0db311e";
      const id = this.id;
      const queryMovie =
        "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=" +
        apikey +
        "&append_to_response=credits,person,keywords,director,images,videos&language=en-US";
      const queryCast =
        "https://api.themoviedb.org/3/movie/" +
        id +
        "/credits?api_key=" +
        apikey +
        "&append_to_response=credits,person,keywords,images,videos&language=en-US";
      try {
        const [resMovie, resCast] = await Promise.all([
          fetch(queryMovie),
          fetch(queryCast),
        ]);
        const movie = await resMovie.json();
        const cast = await resCast.json();
        console.log(movie);
        console.log("cast");
        console.log(cast);
        // console.log("tv genre", tv.genres);
        this.movieData = movie;
        this.castData = cast;
      } catch (e) {
        console.log(e);
      }
    },
  },
  template: `
<div class="templat">
  <div class="col-md-3" style=" margin-bottom: 20px;"
    @mouseover="hover = true"
    @mouseleave="hover = false">
 <img :src="posterImg(movieData.poster_path)" width="100%" >
  </img>

  <div v-if="hover" style="padding-top:0px; transition: padding 0.2s;"></div>
  <div v-else style="transition: padding 0.2s;"></div>
  <div class="card-content">
    <h2>{{movieData.original_title}}</h2>
    <iconify-icon icon="dashicons:star-filled" style="color: yellow;" width="16" height="16"></iconify-icon> {{ movieData.vote_average }}/10 by {{movieData.vote_count}} users
    <div class="tags">
      
    </div>
    
</div>
  
</div>
 


  <div class="col-md-9">
    <h2 style="font-size: 1.6rem;font-weight: 600;">{{movieData.tagline}} {{movieData.original_title}} ({{ yearGrab(movieData.release_date) }}) 
    </h2>
    <div class="description">
    <slot>{{ limitString(movieData.overview, 261) }}</slot>
    </div>
<br />
<table class="table table-condensed table-bordered table-hover">
<tbody><tr>
<th> <div class="tags" style="display:flex;color: #13a1e5;"> <iconify-icon icon="ant-design:field-time-outlined" style="
    font-size: 15px;"></iconify-icon>&nbsp;{{ minToHour(movieData.runtime) }}</div></th>
<td><div class="tagbox" v-for="genre in movieData.genres" :key="genre.id">{{genre.name}}</div></td>
</tr>
<tr>
<th>Subtitle Available</th>
<td>
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/usa.png" width="26" alt="United Stated.png" height="24">
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/espain.png" width="28" alt="espain.png" height="27">
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/korean.png" width="25" alt="south-korea.png" height="24">
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/france.png" width="27" alt="france.png" height="24">
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/Germany.png" width="29" alt="Germany.png" height="26">
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/italy.png" width="27" alt="italy.png" height="24">
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/belanda.png" width="25" alt="belanda.png" height="24">
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/portugal.png" width="26" alt="portugal.png" height="24">
  <img src="https://netmoviestvshows.github.io/link-alternatif.github.io/image/hungaria.png" width="27" alt="hungaria.png" height="26">  etc.
</td>
</tr>
<tr>
<th>Release Date</th>
<td>{{ movieData.release_date }}</td>
</tr>

<tr>
<th>Product Compan</th>
<td><div style="text-transform: capitalize;">{{ movieData.production_companies.map(i => i.name).join(', ') }} </div></td>
</tr>
<tr>
<th>Product Country</th>
<td><div> {{  movieData.production_countries.map(i => i.name).join(',') }} </div></td></td>
</tr>
<tr>
<th>Casts</th>
<td><div class="cast-list"><h4></h4><div class="cast-circle" v-for="cast in filteredCast" :key="cast.cast_id"><img :src="returnHeadshot(cast.profile_path) "></td>
</tr>
<tr>
<th></th>
<td>{{  limitString(castData.cast.map(i => i.original_name).join(', '), 150) }}</td>
</tr>
<tr>
<th>Home Page</th>
<td>{{movieData.homepage}}</td>
</tr>
</tbody></table>
              
       </div>
      </div>

</div>`,
});

Vue.component("rating", {
  props: ["value"],
  template: '<p class="rating">{{value}}</p>',
});

new Vue({
  el: "#movie",
});

//OMDB SCRIPT 2

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
${data.Actors}
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

//TMDB SCRIPT 3 ANGULAS VUESJS

angular
  .module("movieFinder", [])
  .controller("movieCtrl", function ($scope, $http) {
    $scope.$watch("search", function () {
      fetch(); //watches the search input which refreshes every 800ms
    });

    //function called every 800ms to perform AJAX call
    function fetch() {
      //the results only return a partial img path so this is added to provide the full url to display the poster... those tricksters!
      var apiKey = "2645540b01a63a0893fe4d3dd0db311e";
      var imgPath = "https://image.tmdb.org/t/p/w300";
      var imgPsmall = "https://image.tmdb.org/t/p/w185";
      var imgBackdrops = "https://image.tmdb.org/t/p/w1280";
      var imgBackmed = "https://image.tmdb.org/t/p/720";

      //defining the search value from the inputs
      var search = $("#movie-name").val();
      console.log();
      //this query allows users to search by title which is input by the user
      $http
        .get(
          "https://api.themoviedb.org/3/search/multi?api_key=" +
            apiKey +
            "&language=en-US&append_to_response=keywords,credits,person,images,videos&query=" +
            search
        )
        .then(function (response) {
          //title of first movie in results array
          $scope.title = response.data.results[0].title;
          console.log($scope.title);

          $scope.titleori = response.data.results[0].original_title;
          console.log($scope.titleori);

          //title tv
          $scope.name = response.data.results[0].name;
          console.log($scope.name);

          $scope.nameori = response.data.results[0].original_name;
          console.log($scope.nameori);
          //release date
          $scope.year = response.data.results[0].release_date;
          console.log($scope.year);
          //synopsis of the movie
          $scope.overview = response.data.results[0].overview;

          //img path for poster
          $scope.poster = imgPath + response.data.results[0].poster_path;
          console.log($scope.poster);
          //img path for poster small
          $scope.posmall = imgPsmall + response.data.results[0].poster_path;
          console.log($scope.posmall);

          //img path for Backdrops
          $scope.backdrops =
            imgBackdrops + response.data.results[0].backdrop_path;
          console.log($scope.backdrops);

          $scope.backmed = imgBackmed + response.data.results[0].backdrop_path;
          console.log($scope.backmed);

          //the voter average for the movie returned
          $scope.rating = response.data.results[0].vote_average;

          //the voter count for the movie returned
          $scope.vote = response.data.results[0].vote_count;
          //type tv or movie
          $scope.type = response.data.results[0].media_type;
          console.log($scope.type);

          //type tagline
          $scope.tagline = response.data.results[0].tagline;
          console.log($scope.tagline);

          //type genre
          $scope.genre = response.data.results[0].countries;
          console.log($scope.genre);

          //runtime....
          $scope.runtimetv = response.data.results[0].episode_run_time;
          console.log($scope.runtimetv);

          //Air Date episode....
          $scope.firstair = response.data.results[0].first_air_date;
          console.log($scope.firstair);

          $scope.lastair = response.data.results[0].last_air_date;
          console.log($scope.lastair);

          $scope.numbseason = response.data.results[0].episode_release_date;
          console.log($scope.numbseason);

          //the voter average for the movie returned
          $scope.network = response.data.results[0].production_companies;
          console.log($scope.network);
        });
    }
  });
