(function(e){function t(t){for(var n,a,r=t[0],c=t[1],l=t[2],d=0,f=[];d<r.length;d++)a=r[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);u&&u(t);while(f.length)f.shift()();return s.push.apply(s,l||[]),i()}function i(){for(var e,t=0;t<s.length;t++){for(var i=s[t],n=!0,r=1;r<i.length;r++){var c=i[r];0!==o[c]&&(n=!1)}n&&(s.splice(t--,1),e=a(a.s=i[0]))}return e}var n={},o={app:0},s=[];function a(t){if(n[t])return n[t].exports;var i=n[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=n,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(i,n,function(t){return e[t]}.bind(null,n));return i},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var u=c;s.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},"09a7":function(e,t,i){},"240f":function(e,t,i){},"3ba7":function(e,t,i){},5599:function(e,t,i){"use strict";var n=i("9291"),o=i.n(n);o.a},"56d7":function(e,t,i){"use strict";i.r(t);i("e260"),i("e6cf"),i("cca6"),i("a79d");var n=i("2b0e"),o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("main",{attrs:{id:"app mainCon"}},[i("h1",{staticClass:"hidden"},[e._v("VUE SPA App with Trakt API")]),e._m(0),i("router-view",{attrs:{movies:e.theMovies,"the-title":"box office"}}),e._m(1)],1)},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",[n("h2",{staticClass:"hidden"},[e._v("Navigation")]),n("img",{attrs:{id:"logo",alt:"OTST logo",src:i("9d42")}})])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("footer",[i("h4",[e._v(" OTST is powered by Trakt API. "),i("br"),e._v(" Images are fetched by OMDB ")])])}],a=i("bc3a"),r=i.n(a),c={"Content-Type":"application/json","Trakt-Api-Version":"2","Trakt-Api-Key":"0424499b3bbaf949c7fbd2c493612e8248b789a0f64361264d5d931dd00673ec"},l={limit:120},u={data:function(){return{theMovies:[]}},created:function(){var e=this;r.a.get("https://api.trakt.tv/movies/recommended/weekly",{params:l,headers:c}).then((function(t){e.theMovies=t.data,console.log(e.theMovies)})).catch((function(e){console.log(e)}))}},d=u,f=(i("779e"),i("2877")),p=Object(f["a"])(d,o,s,!1,null,null,null),v=p.exports,h=i("8c4f"),m=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"movie-list"},[i("h5",{staticClass:"nav-heading"},[e._v(e._s(e.theTitle))]),i("div",{staticClass:"list-container"},[i("ul",{staticClass:"layout"},e._l(e.movies,(function(e){return i("movie-list-item",{key:e.title,attrs:{movieSingle:e}})})),1)])])},b=[],g=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"row"},[i("div",{staticClass:"col"},[i("h2",{staticClass:"hidden"},[e._v("Movie List")]),i("li",{staticClass:"movieBox"},[i("img",{attrs:{src:e.finishedURL,onerror:"if (this.src != 'error.jpg') this.src = 'https://popcornusa.s3.amazonaws.com/gallery/1576022750-nobody.png';",alt:"movie-poster"}}),i("h5",[e._v(e._s(e.movieSingle.movie.title)+" ("+e._s(e.movieSingle.movie.year)+")")]),i("p",[i("router-link",{attrs:{to:"/movies/"+e.movieSingle.movie.ids.slug}},[e._v("Details")])],1),i("h3",{ref:"value",staticClass:"hidden"},[e._v(e._s(e.movieSingle.movie.ids.imdb))])])])])},_=[],y={props:["movieSingle"],data:function(){return{baseURL:"http://img.omdbapi.com/?apikey=a4041903&i=",apiKey:"?api_key=7694c061ed8da9f133ccea4323e7ce26",imdbID:"",finishedURL:"",fanArt:"",fallBack:"https://popcornusa.s3.amazonaws.com/gallery/1576022750-nobody.png"}},mounted:function(){this.imdbID=this.$refs.value.innerText,""==this.posterURL||(this.finishedURL=this.baseURL+this.imdbID)},created:function(){var e=this;r.a.get(this.finishedURL).then((function(t){e.fanArt=t,console.log(e.fanArt)})).catch((function(e){console.log(e)}))}},w=y,k=(i("d136"),Object(f["a"])(w,g,_,!1,null,"2c892d00",null)),j=k.exports,C={props:["theTitle","movies"],components:{"movie-list-item":j}},O=C,T=(i("5599"),Object(f["a"])(O,m,b,!1,null,"7d47c4ab",null)),x=T.exports,S=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"movieDetail"}},[i("h2",{staticClass:"hidden"},[e._v("Movie Details")]),i("p",[i("router-link",{staticClass:"back-button",attrs:{to:"/movies"}},[e._v(" Back to Movies ")])],1),i("pre"),i("img",{staticClass:"fallbackImg",attrs:{src:e.prcsdURL,onerror:"if (this.src != 'error.jpg') this.src = 'https://popcornusa.s3.amazonaws.com/gallery/1576022750-nobody.png';",alt:"movie-poster"}}),i("h2",[e._v(e._s(e.moviedetails.title))]),i("h3",[e._v("Movie Year: "+e._s(e.moviedetails.year))]),i("p",[e._v("Description:")]),i("p",[e._v(e._s(e.moviedetails.overview))]),i("h3",[e._v("Ratings: "+e._s(e.moviedetails.rating))]),i("h4",[e._v("Genres: "+e._s(e.moviedetails.genres))]),i("h4",[e._v("Release Date: "+e._s(e.moviedetails.released))]),i("h4",[e._v("Website: "+e._s(e.moviedetails.homepage))]),i("p",{ref:"value",staticClass:"hidden"},[e._v(e._s(e.moviedetails.ids.imdb))])])},A=[],R={"Content-Type":"application/json","Trakt-Api-Version":"2","Trakt-Api-Key":"0424499b3bbaf949c7fbd2c493612e8248b789a0f64361264d5d931dd00673ec"},L={data:function(){return{baseURL:"http://img.omdbapi.com/?apikey=a4041903&i=",imdbID:"",prcsdURL:"",moviedetails:{}}},created:function(){var e=this,t=this.$route.params.id;r.a.get("https://api.trakt.tv/movies/".concat(t,"?extended=full"),{headers:R}).then((function(t){e.moviedetails=t.data})).catch((function(e){console.log(e)}))},updated:function(){this.imdbID=this.baseURL+this.$refs.value.innerText,this.prcsdURL=this.imdbID}},M=L,U=(i("fc86"),Object(f["a"])(M,S,A,!1,null,"15e78cac",null)),D=U.exports;n["a"].use(h["a"]);var I=[{path:"*",redirect:"/movies"},{path:"/movies",component:x},{path:"/movies/:id",component:D}],P=new h["a"]({routes:I}),$=P,E=(i("5aea"),i("9483"));Object(E["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),n["a"].config.productionTip=!1,new n["a"]({router:$,render:function(e){return e(v)}}).$mount("#app")},"5aea":function(e,t,i){},"779e":function(e,t,i){"use strict";var n=i("240f"),o=i.n(n);o.a},9291:function(e,t,i){},"9d42":function(e,t,i){e.exports=i.p+"img/otst-logo.8201433b.png"},d136:function(e,t,i){"use strict";var n=i("09a7"),o=i.n(n);o.a},fc86:function(e,t,i){"use strict";var n=i("3ba7"),o=i.n(n);o.a}});
//# sourceMappingURL=app.7f25d780.js.map