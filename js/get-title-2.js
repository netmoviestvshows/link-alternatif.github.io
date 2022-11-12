 function getQueryStringParam(param) {
  var url = window.location.toString();
  url.match(/\?(.+)$/);
  var params = RegExp.$1;
  params = params.split("&");
  var queryStringList = {};
  for(var i = 0; i < params.length; i++) {
    var tmp = params[i].split("=");
    queryStringList[tmp[0]] = unescape(tmp[1]);
  }
  return queryStringList[param];
}



if (getQueryStringParam("episode")) {
  var episode = getQueryStringParam("episode");
  document.getElementById("episode-title").innerHTML = " episode " + episode + "";
} else {
  document.getElementById("episode-title").innerHTML = "";
}
