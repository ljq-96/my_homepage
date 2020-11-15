const path = require('path');
const Service = require('node-windows').Service;
 
const svc = new Service({
  name: 'blog_serve',    //服务名称
  description: '浏览器主页', //描述
  script:  path.resolve(__dirname, 'index.js') //nodejs项目要启动的文件路径
});
 
svc.on('uninstall', () => {
  console.log('Uninstall complete.');
});
 
svc.uninstall();