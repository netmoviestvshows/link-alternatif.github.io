var download = document.querySelector('.btn-download');
var domain = "https://str16.besttvmovie.com";
download.onclick = function (e) {
    e.preventDefault();
    var downloadWindow = window.open(domain + url2);
    if (downloadWindow.focus) { downloadWindow.focus(); }
    return false;
}

var download = document.querySelector('.btn-watch');
download.onclick = function (e) {
    e.preventDefault();
    var downloadWindow = window.open(domain + url2);
    if (downloadWindow.focus) { downloadWindow.focus(); }
    return false;
}