const request = require("request");
const express=require("express")
const bodyParser=require("body-parser")

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname+"/public"));

app.get("/",function (req,res) {

    res.sendFile(__dirname+"/signup.html")

  })



  app.post("/",function(req,res){

    console.log(req.body.fname);
    console.log(req.body.lname);
    console.log(req.body.email);

    var data={
      members:[
        {
          email_address:req.body.email,  ///array yof objects ...each object denote one member signing in to email
          status:"subscribed",
          merge_fields:{
            FNAME:req.body.fname,
            LNAME:req.body.lname

          }
        }
        
      ]

    }

    var jsondata=JSON.stringify(data);
  


    var options={
      url: "https://us17.api.mailchimp.com/3.0//lists/14a91fb3d6",
      method: "POST",
      headers:{
        "Authorization": "exp eeda528262d03d848e4397b37af6bfaf-us17"
      },
      body:jsondata
  
    }

    request(options, function(error,response,body){

      if(error)
        console.log(error);
        else
        console.log(response.statusCode);
    })

  })



app.listen(3000,function(){
    console.log("Server started on port 3000");
})

//eeda528262d03d848e4397b37af6bfaf-us17

//14a91fb3d6