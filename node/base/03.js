// 动态网站 ---成绩查询
 

const http = require('http');
const path = require('path');
const fs = require('fs');
http.createServer((req,res)=>{

	// 查询成绩入口地址
	if(req.url.startsWith('/query')){
		fs.readFile(path.join(__dirname,'index.html'),'utf8',(err,content)=>{
			if (err) {
				res.writeHead(500,{
					'content-Type':'text/plain;charset=utf8'
				});
				res.end('服务器错误')；
			}
			res.end(content);
		});

	}else if(req.url.startsWith('/score')){

	}
	// 获取成绩的结果
}).listen(3000,()=>{
	console.log('runing.....');
})