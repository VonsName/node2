const http=require('http');
const fs=require('fs');
const qs=require('querystring');
const urlLib=require('url');
var users=[];
const app=http.createServer(function (req,res) {
    var str='';
    var obj=urlLib.parse(req.url); //解析GET请求数据

    const url=obj.pathname;
    const GET=obj.query;
    var json=qs.parse(GET);

    console.log(json.u);
    if (url==='/user'){
        console.log("注册或者登录");
        console.log(users);
        if (users.indexOf(json.u)!==-1){
            res.write('{"ok":false,"msg":"账户已经存在"}');
        }else {
            users.push(json.u);
            console.log("success");
            res.write('{"ok":true,"msg":"成功"}');
        }
        res.end();
    } else {
        var file_name='./www'+url;
        console.log(file_name);
        fs.readFile(file_name,function (err,data) {
            if (err){
                res.write('404');
            } else {
                res.write(data);
            }
            res.end();
        });
    }


    req.on('data',function (data) {
        str+=data;
    });
    req.on('end',function () {

       console.log(url);
       //console.log(GET);
    });
    //const POST=qs.parse(str);//解析POST数据
    //console.log(POST);
});
app.listen(8080);