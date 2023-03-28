const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')
const https =require('https')


app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/sigup.html')
})

app.post('/', (req, res) => {
    const firstname=req.body.f_name;
    const lastname=req.body.l_name;
    const email=req.body.email;
  
    const data ={
      members:[
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME:firstname,
            LNAME :lastname
          }
        }
      ]
    }
    const jsondata = JSON.stringify(data);
   const url="https://us8.api.mailchimp.com/3.0/lists/2f94ee0317";
    
   const options={
    method: "POST",
    auth:"deepak:113a64983775c1ebee356aac2de6e7e8-us8"
   }
    const reques=https.request(url,options,function(response){

      if(response.statusCode === 200)
      {
        res.sendFile(__dirname+'/success.html')
      }
      else{
        res.sendFile(__dirname+'/failure.html')
      }


         response.on("data",function(data){
            console.log(JSON.parse(data));
         })
    })
    reques.write(jsondata)
    reques.end()
})

app.post('/failure' ,function(req,res){
  res.redirect('/')
})

app.listen(process.env.port || 3000, () => {
  console.log(`The app listening on port 3000`)
})




// api key  
// 113a64983775c1ebee356aac2de6e7e8-us8

// list Id       
// 2f94ee0317