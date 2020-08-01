var express=require('express');
var app=new express();
var path=require('path');
const request=require('request');
app.set('view engine','ejs');
var movieName="",data;
app.use(express.static(path.join(__dirname,'/')));
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.render('omdb');
});
app.post('/submit',(req,res)=>{
    movieName=myTrim(req.body.movieName);
    var dataobj;
    request("https://www.omdbapi.com/?s="+movieName+"&apikey=574bd0b9",(err,resp,body)=>{
        if(err){
            console.log(err);
        }
        else{
            dataobj=JSON.parse(body);   
         }
         
    res.render('omdb2',{data:dataobj});
    });
});

app.listen(process.env.PORT||3000,()=>{
    console.log('Server running');
});
function myTrim(x) {
  return x.replace(/^\s+|\s+$/gm,'');
}