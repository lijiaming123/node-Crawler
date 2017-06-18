var http = require("http")
var querystring = require("querystring")

var postData = querystring.stringify({
	"content":"最后一次测试",
	"cid":348
})

var options = {
	hostname:"www.imooc.com",
	port:80,
	path:"/course/docomment",
	method:"post",
	headers:{
		"Accept": "application/json, text/javascript, */*; q=0.01",
"Accept-Encoding" : "gzip, deflate",
"Accept-Language":"zh-CN,zh;q=0.8",
"Connection":"keep-alive",
"Content-Length":postData.length,
"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
"Cookie":"imooc_uuid=5e776b2c-b615-4bfa-86ff-0b3092221a17; imooc_isnew_ct=1472386612; bdshare_firstime=1472832250385; CNZZDATA1261110065=224750687-1484122535-http%253A%252F%252Fwww.imooc.com%252F%7C1484122535; loginstate=1; apsid=YyZDI4ZTJiNmZkNDE1NzgxYTFmMWE5NWRkN2U1NDkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzY3OTY2MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4NTI5MzAzNDJAcXEuY29tAAAAAAAAAAAAAAAAAAAAAGU2NDllOTU0NDUzMTkyODE1ZDIyYjFmMWFhNjZmZTY0MoYEWTKGBFk%3DY2; last_login_username=852930342%40qq.com; PHPSESSID=tpnn646gpnj43mloleiikug9m5; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1494155902,1494232574,1494235420,1494242694; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1494245249; imooc_isnew=2; cvde=59105570a7238-34",
"Host":"www.imooc.com",
"Origin":"http://www.imooc.com",
"Referer":"http://www.imooc.com/comment/348",
"User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36",
"X-Requested-With":"XMLHttpRequest"
	}
}

var req = http.request(options,function(res){
	console.log("status:"+res.statusCode);
	console.log("headers:"+JSON.stringify(res.headers))
    res.on("data",function(chunk){
    	console.log(Buffer.isBuffer(chunk))
    })
    res.on("end",function(){
    	console.log("评论完毕")
    })
})
    req.on("error",function(e){
    	console.log("Error:"+e.message)
    })
    req.write(postData)
    req.end()
