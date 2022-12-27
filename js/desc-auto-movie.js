const API_KEY = "e02bb07d813f5255844c6d19ab9395ab";

let baseURL = "https://api.themoviedb.org/3/";
let imageURL = "https://image.tmdb.org/t/p/w300";
let recommImageURL = "https://image.tmdb.org/t/p/w185";
$(document).ready(() => {
  sessionStorage.setItem("type", "all");
  sessionStorage.setItem("time", "day");
  showMovieByTypeTime(
    sessionStorage.getItem("type"),
    sessionStorage.getItem("time")
  );

  sessionStorage.removeItem("category");

  showMovieByCategory("upcoming");

  $("#searchForm").on("submit", (e) => {
    let searchText = $("#searchInput").val();

    getMovies(searchText);

    $("#searchInput").val("");
    e.preventDefault();
  });

  const navShow = () => {
    let burger = document.querySelector(".burger");
    let nav = document.querySelector(".nav-links");

    burger.addEventListener("click", (e) => {
      e.preventDefault();

      nav.classList.toggle("active");
      burger.classList.toggle("toggle");
      $("body").toggleClass("no-overflow");
    });
  };

  navShow();
});

function getMovies(searchText, page = 1) {
  let url = `${baseURL}search/movie?api_key=${API_KEY}&query=${searchText}&language=en-US&include_adult=false&page=${page}`;

  $.ajax({
    method: "GET",
    url: url,

    success: function (data) {
      let output = "";
      let pageinate = "";

      if (data["results"].length > 0) {
        for (let i = 0; i < data["results"].length; i++) {
          let posterPath = data["results"][i]["poster_path"];

          output += `
                        <div class="movie">
                            <img class="image" src=${
                              imageURL + String(posterPath)
                            } alt="No image found." loading="lazy">
                            <div class="ratingFlex">
                                <h4 class="title">${
                                  data["results"][i]["title"]
                                }</h4>
                                <div class="rating">${
                                  data["results"][i]["vote_average"]
                                }</div>
                            </div>
                            <button class="detailsButton" onclick="selectedMovie('${
                              data["results"][i]["id"]
                            }')">More Details</button>
                        
                        </div>
                        
                    `;
          $(".result").html(output);
          $("footer").show();
        }
        pageinate = `
                    <button class="prevBtn" onclick="prevBtn()">Prev</button>
                    Page <span class="currentPage"></span> of <span class="totalPages"></span>
                    <button class="nextBtn" onclick="nextBtn()">Next</button>
                `;
        $(".pagination").html(pageinate);
      } else {
        output += `
                    <p class="empty">
                        No such movie found. Try searching other keywords.
                    </p>
                `;
        $(".result").html(output);
      }

      sessionStorage.setItem("searchText", searchText);
      getPagination(data["page"], data["total_pages"]);
    },
  });
}

function getPagination(currentPage, totalPages) {
  if (totalPages == 0) {
    $(".pagination").hide();
  } else {
    if (totalPages == 1) {
      $(".prevBtn").hide();
      $(".nextBtn").hide();
    } else if (currentPage == 1) {
      $(".prevBtn").hide();
    } else if (currentPage == totalPages) {
      $(".nextBtn").hide();
    } else {
      $(".prevBtn").show();
      $(".nextBtn").show();
    }
  }
  $(".currentPage").html(currentPage);
  $(".totalPages").html(totalPages);
}

function prevBtn() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  let page = $(".currentPage").html();
  let prevPage;

  let searchText = sessionStorage.getItem("searchText");
  let category = sessionStorage.getItem("category");
  let genre = sessionStorage.getItem("genre");

  if (page != 1) {
    prevPage = parseInt(page) - 1;

    if (searchText) {
      getMovies(searchText, prevPage);
    } else if (category) {
      showMovieByCategory(category, prevPage);
    } else if (genre) {
      showMovieByGenre(genre, prevPage);
    }
  }
}

function nextBtn() {
  $("html, body").animate({ scrollTop: 0 }, "slow");

  let page = $(".currentPage").html();
  let total = $(".totalPages").html();
  let nextPage;

  let searchText = sessionStorage.getItem("searchText");
  let category = sessionStorage.getItem("category");
  let genre = sessionStorage.getItem("genre");

  if (page != total) {
    nextPage = parseInt(page) + 1;

    if (searchText) {
      getMovies(searchText, nextPage);
    } else if (category) {
      showMovieByCategory(category, nextPage);
    } else if (genre) {
      showMovieByGenre(genre, nextPage);
    }
  }
}

function selectedMovie(movie_id) {
  sessionStorage.setItem("movieId", movie_id);
  window.location = "https://youdescto.blogspot.com/p/moviedetails.html";
}

function selectedTV(tv_id) {
  sessionStorage.setItem("TVId", tv_id);
  window.location = "./tvdetails.html";
}

function getMovieDetails() {
  let movie_id = sessionStorage.getItem("movieId");

  let url = `${baseURL}movie/${movie_id}?api_key=${API_KEY}&language=en-US&append_to_response=alternative_titles,changes,credits,keywords,lists,releases,reviews,similar,translations,videos,images&include_image_language=en,null`;

  $.ajax({
    url: url,
    method: "GET",

    success: function (details) {
      let showDetails = "";
      let postPath = details["poster_path"];
      let genres = [];
      let prod_country = [];
      let prod_company = [];
      let language = [];
      let ori_language = [];
      let tagline = details["tagline"];
      let type = details["id"];
      let backDrops = details["backdrop_path"];
      // let mediaType = details["media_type"];

      for (let j = 0; j < details["genres"].length; j++) {
        genres.push(`${details["genres"][j]["name"]} `);
      }

      for (let j = 0; j < details["production_countries"].length; j++) {
        prod_country.push(`${details["production_countries"][j]["name"]}`);
      }

      for (let j = 0; j < details["production_companies"].length; j++) {
        prod_company.push(`${details["production_companies"][j]["name"]}`);
      }

      for (let j = 0; j < details["spoken_languages"].length; j++) {
        language.push(`${details["spoken_languages"][j]["name"]}`);
      }
      for (let j = 0; j < details["original_language"].length; j++) {
        ori_language.push(`${details["original_language"]}`);
      }
      // for (let j = 0; j < details["media_type"].length; j++) {
      //   type.push(`${details["media_type"][j]["name"]}`);
      // }

      showDetails += `
                <div class="movieTitle">
                    <p>${details["title"]} (${tagline})</p>
                    <button class="watchButton" 
                        onclick="addToWatch('${details["title"]}','${
        details["id"]
      }');"
                    >
                    Add to Watchlist</button>
                </div>
                <div class="movieWrapper">
                    <div class="movieFlex">
                        <div class="movieImage">
                            <img src="${
                              imageURL + String(postPath)
                            }" alt="No image found." loading="lazy">
                        </div>
                        <div class="movieText">
                            <div class="movieDetails">
                                <h2>Details: </h2>
                                <hr>
                                
                                <p><strong>Status: </strong>${type}</p>
                                <p><strong>Genre: </strong>${genres}</p>
                                <p><strong>Runtime: </strong>${
                                  details["runtime"]
                                } min</p>
                                <p><strong>Language: </strong>${language}</p>
                                <p><strong>Release Date: </strong>${
                                  details["release_date"]
                                }</p>
                                <p><strong>Average Rating: </strong>${
                                  details["vote_average"]
                                }</p>
                                <p><strong>Production Country: </strong>${prod_country}</li></p>
                                <p><strong>Production Company: </strong>${prod_company}</p>
                            </div>
                            
                        </div>
                        <div class="moviePeople">
                                <h2 class="castTitle"></h2>
                              
                                <p class="cast"></p>
                                <p><strong>Writer:</strong> <a class="writer"></a></p>
                                <p><strong>Director:</strong> <a class="director"></a></p>
                                <p><strong>Producer:</strong> <a class="producer"></a></p>
                                <p><strong>Composer:</strong> <a class="music"></a></p>  
                       <div class="moviePlot">
                        <h2>Plot:</h2>
                        <hr>
                        <p>${details["overview"]}</p>
                    </div>            
                    </div>
                     </div>
             
                <br>
<!-- Description -->
<div class="movieGenerate">
   <div class="movieDesc">
   <h2 class="descG">Description Generate :</h2>
   <button class="buttonx" onclick="copyTextById('text')">Click 2 Copy</button>
   <div id="translate"></div>
   <hr>
   <br/>
   <div class="translate" id="text">
   <span>Watch ${details["title"].replace(/[:;.]/g, " -")}™ Full Movie 𝐇𝐃</span>
  <p><li>${details["title"]} ${details["release_date"].slice(
        0,
        4
      )} is ${details["overview"].substring(127, length)}</p>
      <br />
    <li>✧ 𝙏𝙤 𝙒𝙖𝙩𝙘𝙝 𝘾𝙡𝙞𝙘𝙠 𝙝𝙚𝙧𝙚  ✧ 𝐇𝐃 𝐕𝐢𝐝𝐞𝐨 ▶ 👉 https://www.youtube.com/redirect?q=&nbsp;&nbsp; 🎞</li>
   <li> ✧ Alt Link 𝐅𝐮𝐥𝐥 𝐌𝐨𝐯𝐢𝐞 ✧ 𝐇𝐃 ▶ 👉 𝕃𝕀ℕ𝕂  </li>
   <li>⏬ check the comments section if the link can't be clicked ⏬</li>

<p>
-----------------------------------------------------------------------------</p>
<li>HD 1080P | 4K UHD | 1080P-HD | 720P HD | MKV | MP4 | FLV | DVD |</li>
<li>All Languages | Belgium | English | Spanish | Franch | German | Italiano |Dutch |Portuguese |</li>
<p>
Copyright Disclaimer Under Section 107 of the Copyright Act 1976, allowance is made for ""fair use"" for purposes such as criticism, comment, news reporting, teaching, scholarship, and research. Fair use is a use permitted by copyright statute that might otherwise be infringing. Non-profit, educational or personal use tips the balance in favor of fair use. No copyright infringement intended.</p>
<br>
<p>watch- ${details["title"]} Full'M.o.V.i.E-online-free, watch ${
        details["title"]
      } online-free, watch ${details["title"]} Full'M.o.V.i.E, watch ${
        details["title"]
      } online-123movies, ${details["title"]} -Full'M.o.V.i.E-online-free, ${
        details["title"]
      } -Full'M.o.V.i.E-online, ${details["title"]} -Full'M.o.V.i.E-download, ${
        details["title"]
      } -Full'M.o.V.i.E-free-download, ${
        details["title"]
      } -Full'M.o.V.i.E-123'M.o.V.i.e.S, ${
        details["title"]
      } -Full'M.o.V.i.E-download-in-hindi, ${
        details["title"]
      } -Full'M.o.V.i.E-watch-online-free, ${
        details["title"]
      } -Full'M.o.V.i.E-leaked, ${details["title"]} -Full'M.o.V.i.E, ${
        details["title"]
      } -Full'M.o.V.i.E-free, ${details["title"]} -Full'M.o.V.i.E-youtube,</p>
<br/>
<li>${details["title"].replace(/[:;.]/g, "")} ${details["tagline"].replace(
        /[.,]/g,
        ""
      )} Full Movie HD ${details["release_date"].slice(0, 4)},</li>
<li>${details["title"].replace(/[:;.]/g, "")} FuLL MOvie -${details[
        "release_date"
      ].slice(0, 4)} HD (quality),</li>
<li>${details["title"].replace(/[:;.]/g, "")} Full Movie blu-ray,</li>
<li>${details["title"].replace(/[:;.]/g, "")} (Full Movie) - 1080p,</li>
<li>${details["title"].replace(
        /[:;.]/g,
        ""
      )} [FULL MOVIE] - STREAMING HD'${details["release_date"].slice(
        0,
        4
      )},</li>
<li>Watch ${details["title"].replace(/[:;.]/g, "")} Full'Movie HD ${details[
        "release_date"
      ].slice(0, 4)} Streaming Online,</li>
<li>Watch Free ${details["title"].replace(/[:;.]/g, "")} Full'Movie ${details[
        "release_date"
      ].slice(0, 4)},</li>
<p><li>${details["title"].replace(/[:;.]/g, "")} Full Movie  ${language.join(
        ` Subtitles <li> ${details["title"].replace(/[:;.]/g, "")} Full Movie `
      )} Subtitles,</li></p>

  <p><li>${details["title"].replace(
    /[:;.]/g,
    ""
  )} Full Movie  ${ori_language.join(
        ` Sub, <li> ${details["title"].replace(/[:;.]/g, "")} Full Movie `
      )} Dub,</li></p>

   
   <p><li>${details["title"].replace(/[:;.]/g, "")} Full Movie  ${language.join(
        ` dubbed, <li> ${details["title"].replace(/[:;.]/g, "")} Full Movie `
      )} dubbed,</li></p>
   <p><li>${details["title"].replace(/[:;.]/g, "")} ${details[
        "release_date"
      ].slice(0, 4)} Full Movie ${genres.join(
        `,<li> ${details["title"].replace(/[:;.]/g, "")} ${details[
          "release_date"
        ].slice(0, 4)} Full Movie `
      )},</li></p>
   <p><li>${details["title"].replace(/[:;.]/g, "")} ${details[
        "release_date"
      ].slice(0, 4)} Full Movie duration ${details["runtime"]} min,</p>
  <li>${details["title"].replace(/[:;.]/g, "")} Full Movie in English USA,</li>
  <li>${details["title"].replace(/[:;.]/g, "")} Full Movie in English UK,</li>
   <p><li>${details["title"].replace(/[:;.]/g, "")} ${details[
        "release_date"
      ].slice(0, 4)} Full Movie in ${language.join(
        `,<li> ${details["title"].replace(/[:;.]/g, "")} ${details[
          "release_date"
        ].slice(0, 4)} Full Movie in `
      )}, </li></p>
   <span>${details["title"].replace(/[:;.]/g, "")} Movie Release Date: ${
        details["release_date"]
      },</span>
   <p><li>${details["title"].replace(
     /[:;.]/g,
     ""
   )} Full Movie form ${prod_country.join(
        `,<li>${details["title"].replace(/[:;.]/g, "")} Full Movie form `
      )},</li></p>
   <li>${details["title"].replace(/[:;.]/g, "")} Full Movie hollywood,</li>
   <li>${details["title"].replace(/[:;.]/g, "")} Full Movie united kingdom,</li>
    <li>${details["title"].replace(/[:;.]/g, "")} Full Movie united states,</li>
    <li>${details["title"].replace(/[:;.]/g, "")} Full Movie Australia,</li>
    <li>${details["title"].replace(/[:;.]/g, "")} Full Movie belgium,</li>
   <p><li>${details["title"].replace(
     /[:;.]/g,
     ""
   )} Full Movie by ${prod_company.join(
        `,<li> ${details["title"].replace(/[:;.]/g, "")} Full Movie by `
      )},</p>
   <li>watch ${details["title"].replace(
     /[:;.]/g,
     ""
   )} Full Movie free at youtube,</li>
   <li>watch ${details["title"].replace(
     /[:;.]/g,
     ""
   )} Full Movie free at bilibili,</li>
   <li>watch ${details["title"].replace(
     /[:;.]/g,
     ""
   )} Full Movie free at dailymotion,</li>
   <li>watch ${details["title"].replace(
     /[:;.]/g,
     ""
   )} Full Movie free at facebook,</li>
   <li>${details["title"].replace(/[:;.]/g, "")} Movie Trending ${details[
        "release_date"
      ].slice(0, 4)},</li>
   <li>${details["title"].replace(
     /[:;.]/g,
     ""
   )} Full Movie free watch online,</li>
   <li>${details["title"].replace(
     /[:;.]/g,
     ""
   )} Movie starring <a class="cast2"></a>,</li>
   <li>${details["title"].replace(
     /[:;.]/g,
     ""
   )} Movie starring <a class="cast3"></a>,</li>
   <li>${details["title"].replace(
     /[:;.]/g,
     ""
   )} Movie producer <a class="producer"></a>,</li>
   <li>${details["title"].replace(
     /[:;.]/g,
     ""
   )} Movie director <a class="director"></a>,</li>
    <li>${details["title"].replace(
      /[:;.]/g,
      ""
    )} Movie writer <a class="writer"></a>,</li>
    <li>${details["title"].replace(/[:;.]/g, "")} Full Movie download mp4,</li>
    <li>${details["title"].replace(/[:;.]/g, "")} Full Movie Rating ${
        details["vote_average"]
      },</li>
    <li>${details["title"].replace(/[:;.]/g, "")} Full Movie Popularity ${
        details["popularity"]
      },</li>
    <li>${details["title"].replace(/[:;.]/g, "")} full movie explained in ${
        language[0]
      },</li>
    <li>${details["title"].replace(/[:;.]/g, "")} film complet en francais,</li>
    <li>${details["title"].replace(
      /[:;.]/g,
      ""
    )} pelicula completa en español latino,</li>
    <li>${details["title"].replace(/[:;.]/g, "")} full movie in Hindi,</li>
    <li>${details["title"].replace(
      /[:;.]/g,
      ""
    )} Full Movie United Arab Emirates,</li>
    <li>Download ${details["title"].replace(/[:;.]/g, "")} Full Movie ${details[
        "release_date"
      ].slice(0, 4)} in HD Quality,</li>
      <li>Top Movie in ${details["release_date"].slice(0, 4)} is ${details[
        "title"
      ].replace(/[:;.]/g, "")},</li>
     <li>Download or watch ${details["title"].replace(
       /[:;.]/g,
       ""
     )} Full Movie from the Instagram link,</li>
     <li>Download or watch ${details["title"].replace(
       /[:;.]/g,
       ""
     )} Full Movie from the Twitter link,</li>
     <li>Download or watch ${details["title"].replace(
       /[:;.]/g,
       ""
     )} Full Movie from the Facebook link,</li>
     <li>Download or watch ${details["title"].replace(
       /[:;.]/g,
       ""
     )} Full Movie from the Youtube link,</li>
     <li>Official Website ${details["homepage"]}</li>
   <br/>
   <div class="movieTag">
   <li>#${details["original_title"].replace(
     /[ :.,*+?^${}()|[\]\\]/g,
     ""
   )}</span>
   <li>#${details["title"].replace(/[ :.,*+?^${}()|[\]\\]/g, "")}${details[
        "release_date"
      ].slice(0, 4)}</li>
   <li>#${prod_company[0].replace(/[ :.,*+?^${}()|[\]\\]/g, "")}</li>
   <li>#${genres[0].replace(/[ :.,*+?^${}()|[\]\\]/g, "")}</li>
   <li>#popularmovie${details["release_date"].slice(0, 4)}</li>
   <li>#NewMovies${details["release_date"].slice(0, 4)}</li>
   <li>#FullMovie​​​​</li>
   <li>#WatchMovieOnline</li>
   </div>
  </div>
</div>

<!-- Description End -->

<!-- Judul -->
 <div class="movieJudul">
 <h2>Title Generate :</h2>
  <hr>
  <br/>
  <div class="translate">
  <li>${details["title"].replace(/[:;.]/g, "")} ~ Full Movie</li>
  <li>${details["title"].replace(/[:;.]/g, "")} ${details["release_date"].slice(
        0,
        4
      )} ~ Full Movie US</li>
  <li>${details["title"].replace(/[:;.]/g, "")} ${details["release_date"].slice(
        0,
        4
      )} ~ Full Movie UK</li>
  <li>${details["title"].replace(/[:;.]/g, "")} ${details["release_date"].slice(
        0,
        4
      )} ~ Full Movie HD</li>
  <li>${details["title"].replace(/[:;.]/g, "")} ${details["tagline"].replace(
        /[:;.]/g,
        ""
      )} Full Movie HD ${details["release_date"].slice(0, 4)}</li>
  <li>${details["title"].replace(/[:;.]/g, "")} (Full Movie ${details[
        "release_date"
      ].slice(0, 4)})</li>
 <li>${details["title"].replace(
   /[:;.]/g,
   ""
 )} pelicula completa en español latino</li>
 <li>${details["title"].replace(/[:;.]/g, "")} FuLL MOvie -${details[
        "release_date"
      ].slice(0, 4)} HD (quality)</li>
 <li>${details["title"].replace(/[:;.]/g, "")} 🎬 Full Movie HD</li>
 <li>${details["title"].replace(/[:;.]/g, "")} (Full Movie) - 1080p</li>
 <li>${details["title"].replace(/[:;.]/g, "")} Full Movie [${details[
        "release_date"
      ].slice(0, 4)}] 𝐇𝐃 𝐐𝐮𝐚𝐥𝐢𝐭𝐲</li>
 <li>${details["title"].replace(/[:;.]/g, "")} full movie ${details[
        "release_date"
      ].slice(0, 4)}</li>
 <li>${details["title"].replace(/[:;.]/g, "")} FuLLMovie HD (QUALITY)</li>
 <li>${details["title"].replace(
   /[:;.]/g,
   ""
 )} pelicula completa en francais</li>
 <li>${details["title"].replace(
   /[:;.]/g,
   ""
 )} [FULL MOVIE] - STREAMING HD'${details["release_date"].slice(0, 4)}</li>
 <li>${details["title"].replace(/[:;.]/g, "")} Full Movie HD [Quality]</li>
 <li>${details["title"].replace(/[:;.]/g, "")} 🎬 Full Movie #${details[
        "release_date"
      ].slice(0, 4)} #${prod_company[0].replace(
        /[ :.,*+?^${}()|[\]\\]/g,
        ""
      )} #${genres[0].replace(/[ :.,*+?^${}()|[\]\\]/g, "")}</li>
  <div class="movieBackdrop">
 <h2>Image :</h2>
  <hr>
  <br/>
  <img style="max-width:100%;" src="https://image.tmdb.org/t/p/w1280/${backDrops}"/>
  
  </div>
  </div>
  </div>
<!-- Judul End -->                    
                  </div>
                </div>
            `;

      $(".movieContainer").html(showDetails);
      getCastCrew(movie_id);

      $("title").html(details["title"]);
    },
  });
}

function getTVdetails() {
  let tv_id = sessionStorage.getItem("TVId");

  url = `${baseURL}tv/${tv_id}?api_key=${API_KEY}&language=en-US`;

  $.ajax({
    url: url,
    method: "GET",

    success: function (tv) {
      let showDetails = "";
      let postPath = tv["poster_path"];
      let genres = [];
      let prod_country = [];
      let prod_company = [];
      let language = [];

      for (let j = 0; j < tv["genres"].length; j++) {
        genres.push(` ${tv["genres"][j]["name"]}`);
      }

      for (let j = 0; j < tv["production_countries"].length; j++) {
        prod_country.push(` ${tv["production_countries"][j]["name"]}`);
      }

      for (let j = 0; j < tv["production_companies"].length; j++) {
        prod_company.push(` ${tv["production_companies"][j]["name"]}`);
      }

      for (let j = 0; j < tv["spoken_languages"].length; j++) {
        language.push(` ${tv["spoken_languages"][j]["english_name"]}`);
      }

      showDetails += `
                <div class="movieTitle">
                    <p>${tv["name"]}</p>
                </div>
                <div class="movieWrapper">
                    <div class="movieFlex">
                        <div class="movieImage">
                            <img src="${
                              imageURL + String(postPath)
                            }" alt="No image found." loading="lazy">
                        </div>
                        <div class="movieText">
                            <div class="movieDetails">
                                <h2>Details: </h2>
                                <hr>
                                
                                <p><strong>Genre: </strong>${genres}</p>
                                <p><strong>Aired on: </strong>${
                                  tv["first_air_date"]
                                }</p>
                                <p><strong>Language: </strong>${language}</p>
                                <p><strong>No. of Seasons: </strong>${
                                  tv["number_of_seasons"]
                                }</p>
                                <p><strong>No. of Episodes: </strong>${
                                  tv["number_of_episodes"]
                                }</p>
                                <p><strong>Average Rating: </strong>${
                                  tv["vote_average"]
                                }</p>
                                <p><strong>Production Country: </strong><li>${prod_country.join(
                                  "<li>"
                                )}</li></p>
                                <p><strong>Production Company: </strong>${prod_company}</p>
                            </div>
                            <div class="moviePeople">
                                <h2 class="castTitle"></h2>
                              
                                <p class="cast"></p>
                                <p class="writer"></p>
                                <p class="director"></p>
                                <p class="producer"></p>
                                <p class="music"></p>
                            </div>
                        </div>
                    </div>
                    <div class="moviePlot">
                        <h2>Plot:</h2>
                        <hr>
                        <p>${tv["overview"]}</p>
                    </div>
                </div>
            `;

      $(".movieContainer").html(showDetails);
      getTVcast(tv_id);

      $("title").html(tv["name"]);
    },
  });
}

function addToWatch(movie_name, movie_id) {
  localStorage.setItem(movie_name, movie_id);

  watched = document.querySelector(".watchButton");
  watched.classList.add("watched");
  watched.innerText = "Added to Watchlist";
}

function showWatchlist() {
  for (let name of Object.keys(localStorage)) {
    let movie_id = localStorage.getItem(name);

    let url = `${baseURL}movie/${movie_id}?api_key=${API_KEY}&language=en-US`;

    watch = "";

    $.ajax({
      url: url,
      method: "GET",

      success: function (details) {
        if (details["id"] == movie_id) {
          w_id = details["id"];
          w_poster = details["poster_path"];
          w_title = details["title"];
          w_rating = details["vote_average"];

          watch += `
                        <div class="movie">
                            <img class="image" src=${
                              imageURL + String(w_poster)
                            } alt="No image found." loading="lazy">
                            <div class="ratingFlex">
                                <h4 class="title">${w_title}</h4>
                                <div class="rating">${w_rating}</div>
                            </div>
                            <button class="detailsButton" onclick="removeFromWatched('${w_title}')">Remove</button>
                        </div>
                    `;
          $(".watchlist").html(watch);
        }
      },
    });
  }
}

function removeFromWatched(title) {
  localStorage.removeItem(title);
  window.location.reload();
}

function getCastCrew(movie_id) {
  let url = `${baseURL}movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`;

  $.ajax({
    url: url,
    method: "GET",

    success: function (castNcrew) {
      if (castNcrew) {
        let cast = castNcrew["cast"];
        let crew = castNcrew["crew"];

        let showCast = "";
        let castName = [];

        if (cast.length > 0) {
          for (let i = 0; i < 6; i++) {
            castName.push(` ${cast[i]["name"]}`);
          }
          showCast = `
                        <p><strong>Cast: </strong>${castName}</p>
                    `;
          showCast2 = `
                        ${castName[0]}
                    `;
          showCast3 = `
                        ${castName[1]}
                    `;

          $(".cast").html(showCast);
          $(".cast2").html(showCast2);
          $(".cast3").html(showCast3);
          $(".castTitle").html('Cast & Crew: <hr class="castHR">');
        }

        if (crew.length > 0) {
          let producer,
            writer,
            director,
            music = "";

          for (let j = 0; j < crew.length; j++) {
            if (crew[j]["job"] == "Producer") {
              producer = crew[j]["name"];
            } else if (
              crew[j]["job"] == "Writer" ||
              crew[j]["job"] == "Story" ||
              crew[j]["job"] == "Screenstory"
            ) {
              writer = crew[j]["name"];
            } else if (crew[j]["job"] == "Director") {
              director = crew[j]["name"];
            } else if (
              crew[j]["job"] == "Music Composer" ||
              crew[j]["job"] == "Music" ||
              crew[j]["job"] == "Original Music Composer"
            ) {
              music = crew[j]["name"];
            }
          }

          if (producer) {
            showProd = ` ${producer}
                            `;

            $(".producer").html(showProd);
          }

          if (director) {
            showDir = `${director}
                        `;
            $(".director").html(showDir);
          }

          if (writer) {
            showWri = `${writer}
                        `;
            $(".writer").html(showWri);
          }

          if (music) {
            showMusic = `${music}
                        `;
            $(".music").html(showMusic);
          }

          $(".castTitle").html('Cast & Crew: <hr class="castHR">');
        }
      }
    },
  });
}

function getTVcast(tv_id) {
  let url = `${baseURL}tv/${tv_id}/credits?api_key=${API_KEY}&language=en-US`;

  $.ajax({
    url: url,
    method: "GET",

    success: function (tv_cast) {
      if (tv_cast) {
        let cast = tv_cast["cast"];
        let crew = tv_cast["crew"];

        let showCast = "";
        let castName = [];

        if (cast.length > 0) {
          for (let i = 0; i < 6; i++) {
            castName.push(` ${cast[i]["name"]}`);
          }
          showCast = `
                        <p><strong>Cast: </strong>${castName}</p>
                    `;

          $(".cast").html(showCast);
          $(".castTitle").html('Cast & Crew: <hr class="castHR">');
        }

        if (crew.length > 0) {
          let producer,
            writer,
            director,
            music = "";

          for (let j = 0; j < crew.length; j++) {
            if (crew[j]["job"] == "Producer") {
              producer = crew[j]["name"];
            } else if (
              crew[j]["job"] == "Writer" ||
              crew[j]["job"] == "Story" ||
              crew[j]["job"] == "Screenstory" ||
              crew[j]["job"] == "Writing"
            ) {
              writer = crew[j]["name"];
            } else if (crew[j]["job"] == "Director") {
              director = crew[j]["name"];
            } else if (
              crew[j]["job"] == "Music Composer" ||
              crew[j]["job"] == "Music" ||
              crew[j]["job"] == "Original Music Composer"
            ) {
              music = crew[j]["name"];
            }
          }

          if (producer) {
            showProd = `
                            <p><strong>Producer: </strong>${producer}</p>
                        `;
            $(".producer").html(showProd);
          }

          if (director) {
            showDir = `
                            <p><strong>Director: </strong>${director}</p>
                        `;
            $(".director").html(showDir);
          }

          if (writer) {
            showWri = `
                            <p><strong>Writer: </strong>${writer}</p>
                        `;
            $(".writer").html(showWri);
          }

          if (music) {
            showMusic = `
                            <p><strong>Music Composer: </strong>${music}</p>
                        `;
            $(".music").html(showMusic);
          }

          $(".castTitle").html('Cast & Crew: <hr class="castHR">');
        }
      }
    },
  });
}

function getMovieRecommendations() {
  let movie_id = sessionStorage.getItem("movieId");

  let url = `${baseURL}movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US&include_adult=false&page=1`;

  $.ajax({
    url: url,
    method: "GET",

    success: function (recomm) {
      let showRecomm = "";

      if (recomm["results"].length > 0) {
        for (let i = 0; i < recomm["results"].length; i++) {
          let posterPath = recomm["results"][i]["poster_path"];

          showRecomm += `
                        <div class="movie">
                            <img class="recommImage" src=${
                              recommImageURL + String(posterPath)
                            } alt="No image found." loading="lazy">
                            <h4 class="title">${
                              recomm["results"][i]["title"]
                            }</h4>
                            <button class="detailsButton" onclick="selectedMovie('${
                              recomm["results"][i]["id"]
                            }')">More Details</button>
                        </div>
                    `;
          $(".movieRecommendations").html(showRecomm);
        }
      } else {
        showRecomm += "No recommendations available.";
        $(".movieRecommendations").html(showRecomm);
      }
    },
  });
}

function getTVrecommendations() {
  let tv_id = sessionStorage.getItem("TVId");

  let url = `${baseURL}tv/${tv_id}/recommendations?api_key=${API_KEY}&language=en-US&include_adult=false&page=1`;

  $.ajax({
    url: url,
    method: "GET",

    success: function (recomm) {
      let showRecomm = "";

      if (recomm["results"].length > 0) {
        for (let i = 0; i < recomm["results"].length; i++) {
          let posterPath = recomm["results"][i]["poster_path"];

          showRecomm += `
                        <div class="movie">
                            <img class="recommImage" src=${
                              recommImageURL + String(posterPath)
                            } alt="No image found." loading="lazy">
                            <h4 class="title">${
                              recomm["results"][i]["name"]
                            }</h4>
                            <button class="detailsButton" onclick="selectedTV('${
                              recomm["results"][i]["id"]
                            }')">More Details</button>
                        </div>
                    `;
          $(".movieRecommendations").html(showRecomm);
        }
      } else {
        showRecomm += "No recommendations available.";
        $(".movieRecommendations").html(showRecomm);
      }
    },
  });
}

function getMovieReviews() {
  let movie_id = sessionStorage.getItem("movieId");

  let url = `${baseURL}movie/${movie_id}/reviews?api_key=${API_KEY}&language=en-US&page=1`;

  $.ajax({
    url: url,
    method: "GET",

    success: function (reviews) {
      let showReview = "";

      if (reviews["results"].length > 0) {
        for (let k = 0; k < reviews["results"].length; k++) {
          let name = reviews["results"][k]["author"];
          let content = reviews["results"][k]["content"];
          let date = reviews["results"][k]["created_at"];

          date = date.split("T");

          showReview += `
                        <div class="reviewDetails">
                            <div class="reviewFlex">
                                <div class="author">${name}</div>
                                <div class="date">${date[0]}</div>
                            </div>
                            <div class="content">"${content}"</div>
                            
                            <hr class="contentHR">
                        </div>
                    `;
        }
        $(".movieReviews").html(showReview);
      } else {
        showReview += "<center>No reviews available.</center>";
        $(".movieReviews").html(showReview);
      }
    },
  });
}

function getTVreviews() {
  let tv_id = sessionStorage.getItem("TVId");

  let url = `${baseURL}tv/${tv_id}/reviews?api_key=${API_KEY}&language=en-US&page=1`;

  $.ajax({
    url: url,
    method: "GET",

    success: function (reviews) {
      let showReview = "";

      if (reviews["results"].length > 0) {
        for (let k = 0; k < reviews["results"].length; k++) {
          let name = reviews["results"][k]["author"];
          let content = reviews["results"][k]["content"];
          let date = reviews["results"][k]["created_at"];

          date = date.split("T");

          showReview += `
                        <div class="reviewDetails">
                            <div class="reviewFlex">
                                <div class="author">${name}</div>
                                <div class="date">${date[0]}</div>
                            </div>
                            <div class="content">"${content}"</div>
                            
                            <hr class="contentHR">
                        </div>
                    `;
        }
        $(".movieReviews").html(showReview);
      } else {
        showReview += "<center>No reviews available.</center>";
        $(".movieReviews").html(showReview);
      }
    },
  });
}

function showHideRecomm() {
  //Show Recommendations first
  $(".reviews").insertAfter(".recommendations");

  recomm = document.querySelector(".recommendations");
  recomm.classList.toggle("hideRecomm");

  recommText = document.querySelector(".recommButton");
  if (recommText.innerHTML === "Show Recommendations") {
    recommText.innerHTML = "Hide Recommendations";
  } else {
    recommText.innerHTML = "Show Recommendations";
  }
}

function showHideReview() {
  // Show Reviews first
  $(".recommendations").insertAfter(".reviews");

  review = document.querySelector(".reviews");
  review.classList.toggle("hideReview");

  reviewText = document.querySelector(".reviewButton");
  if (reviewText.innerHTML === "Show Reviews") {
    reviewText.innerHTML = "Hide Reviews";
  } else {
    reviewText.innerHTML = "Show Reviews";
  }
}

function movieGenre(selectedGenre) {
  let url = `${baseURL}genre/movie/list?api_key=${API_KEY}&language=en-US`;

  $.ajax({
    url: url,
    method: "GET",

    success: function (genres) {
      for (let i in genres.genres) {
        if (genres.genres[i]["name"] === selectedGenre.value) {
          document.querySelector(".changeTitle").innerHTML =
            genres.genres[i]["name"];
          genre_id = genres.genres[i]["id"];
          showMovieByGenre(genre_id);
          break;
        }
      }
    },
  });
}

function showMovieByGenre(genre_id, page = 1) {
  let url = `${baseURL}discover/movie?api_key=${API_KEY}&with_genres=${genre_id}&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}`;

  $.ajax({
    url: url,
    method: "GET",

    success: function (discover) {
      let output = "";

      if (discover["results"].length > 0) {
        for (let i = 0; i < discover["results"].length; i++) {
          let posterPath = discover["results"][i]["poster_path"];

          output += `
                        <div class="movie">
                            <img class="image" src=${
                              imageURL + String(posterPath)
                            } alt="No image found." loading="lazy">
                            <div class="ratingFlex">
                                <h4 class="title">${
                                  discover["results"][i]["title"]
                                }</h4>
                                <div class="rating">${
                                  discover["results"][i]["vote_average"]
                                }</div>
                            </div>
                            <button class="detailsButton" onclick="selectedMovie('${
                              discover["results"][i]["id"]
                            }')">More Details</button>
                        </div>
                    `;
          $(".trending").html(output);
        }
      } else {
        output += `
                    <p class="empty">
                        No movie found.
                    </p>
                `;
        $(".trending").html(output);
      }

      $(".pagination").show();

      sessionStorage.setItem("genre", genre_id);
      sessionStorage.removeItem("category");
      getPagination(discover["page"], discover["total_pages"]);
    },
  });
}

function movieCategory(selectedCategory) {
  let appendToURL = "";

  switch (selectedCategory.value) {
    case "now_playing":
      appendToURL = "now_playing";
      break;
    case "popular":
      appendToURL = "popular";
      break;
    case "top_rated":
      appendToURL = "top_rated";
      break;
    case "upcoming":
      appendToURL = "upcoming";
      break;
  }

  showMovieByCategory(appendToURL);
  document.querySelector(".changeTitle").innerHTML =
    selectedCategory.options[selectedCategory.selectedIndex].text;
}

function showMovieByCategory(category, page = 1) {
  let url = `${baseURL}movie/${category}?api_key=${API_KEY}&language=en-US&include_adult=false&page=${page}`;

  $.ajax({
    url: url,
    method: "GET",

    success: function (cat) {
      let output = "";

      if (cat["results"].length > 0) {
        for (let i = 0; i < cat["results"].length; i++) {
          let posterPath = cat["results"][i]["poster_path"];

          output += `
                        <div class="movie">
                            <img class="image" src=${
                              imageURL + String(posterPath)
                            } alt="No image found." loading="lazy">
                            <div class="ratingFlex">
                                <h4 class="title">${
                                  cat["results"][i]["title"]
                                }</h4>
                                <div class="rating">${
                                  cat["results"][i]["vote_average"]
                                }</div>
                            </div>
                            <button class="detailsButton" onclick="selectedMovie('${
                              cat["results"][i]["id"]
                            }')">More Details</button>
                        </div>
                    `;
          $(".trending").html(output);
        }
      } else {
        output += `
                <p class="empty">
                    No movie found.
                </p>`;
        $(".trending").html(output);
      }
      $(".pagination").show();

      sessionStorage.setItem("category", category);
      sessionStorage.removeItem("genre");
      getPagination(cat["page"], cat["total_pages"]);
    },
  });
}

function movieType(selectedType) {
  let time = sessionStorage.getItem("time");
  let appendType = "";

  switch (selectedType.value) {
    case "all":
      appendType = "all";
      break;
    case "movie":
      appendType = "movie";
      break;
    case "tv":
      appendType = "tv";
      break;
    case "person":
      appendType = "person";
      break;
    default:
      appendType = "all";
      break;
  }
  sessionStorage.setItem("type", appendType);
  showMovieByTypeTime(appendType, time);
}

function movieTime(selectedTime) {
  let type = sessionStorage.getItem("type");
  let appendTime = "";

  switch (selectedTime.value) {
    case "day":
      appendTime = "day";
      break;
    case "week":
      appendTime = "week";
      break;
    default:
      appendTime = "day";
      break;
  }
  sessionStorage.setItem("time", appendTime);
  showMovieByTypeTime(type, appendTime);
}

function showMovieByTypeTime(appendType, appendTime, page = 1) {
  let url = `${baseURL}trending/${appendType}/${appendTime}?api_key=${API_KEY}&include_adult=false&page=${page}`;

  $.ajax({
    url: url,
    method: "GET",

    success: function (trend) {
      let output = "";

      for (let i = 0; i < trend["results"].length; i++) {
        if (trend["results"][i]["media_type"] == "movie") {
          let title = trend["results"][i]["title"];
          let posterPath = trend["results"][i]["poster_path"];

          output += `
                        <div class="movie">
                            <img class="image" src=${
                              imageURL + String(posterPath)
                            } alt="No image found." loading="lazy">
                            <div class="ratingFlex">
                                <h4 class="title">${title}</h4>
                                <div class="rating">${
                                  trend["results"][i]["vote_average"]
                                }</div>
                            </div>
                            <button class="detailsButton" onclick="selectedMovie('${
                              trend["results"][i]["id"]
                            }')">More Details</button>
                        </div>
                    `;
        } else if (trend["results"][i]["media_type"] == "tv") {
          let name = trend["results"][i]["name"];
          let posterPath = trend["results"][i]["poster_path"];

          output += `
                        <div class="movie">
                            <img class="image" src=${
                              imageURL + String(posterPath)
                            } alt="No image found." loading="lazy">
                            <div class="ratingFlex">
                                <h4 class="title">${name}</h4>
                                <div class="rating">${
                                  trend["results"][i]["vote_average"]
                                }</div>
                            </div>
                            <button class="detailsButton" onclick="selectedTV('${
                              trend["results"][i]["id"]
                            }')">More Details</button>
                        </div>
                    `;
        } else if (trend["results"][i]["media_type"] == "person") {
          let name = trend["results"][i]["name"];
          let profilePath = trend["results"][i]["profile_path"];

          output += `
                        <div class="movie">
                            <img class="image" src=${
                              imageURL + String(profilePath)
                            } alt="No image found." loading="lazy">
                            <div class="ratingFlex">
                                <h4 class="title">${name}</h4>
                            </div>
                        </div>
                    `;
        }
        $(".showTrending").html(output);
      }
    },
  });
}

window.load = function () {
  sessionStorage.removeItem("category");

  showMovieByCategory("upcoming");
};
