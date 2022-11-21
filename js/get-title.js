var url = window.location.toString();
//ambil bagian parameternya
url.match(/\?(.+)$/);
var params = RegExp.$1;
// pisahkan parameter URL ke associative array
var params = params.split("&");
var queryStringList = {};
for(var i=0;i<params.length;i++)
{   var tmp = params[i].split("=");
    queryStringList[tmp[0]] = unescape(tmp[1]);
}

// tampilkan isi associative array
for(var i in queryStringList)
{   var res = queryStringList[i].replace(/[-]/g, " ");
    document.write(i+"  "+res+"<br/><br/>");
}
