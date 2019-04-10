// 文件操作案例
const path = require('path');
const fs =require('fs');


let root = ' C:\\Users\\Administrator\\Desktop>'
let fileContent = ``

let initData = {
	projectName : 'mydemo',
	data : [{
		name : 'img',
		type : 'dir'
	},{
		name : 'css',
		type : 'dir'
	},{
		name : 'js',
		type : 'dir'
	},{
		name : 'index.html',
		type : 'file'
	}]
}
// 创建路径
fs.mkdir(path.join(root,initData.projectName),(err)=>{
	if (err) return;

	initData.data.forEach((item)=>{
		if (item.type == 'dir') {;
			fs.mkdirSync(path.join(root,initData.projectName,item.name));
		}else if (item.type == 'file') {
			fs.writeFileSync(path.join(root,initData.projectName,item.name),fileContent)
		};
	});
});
