var http = require('https'),
express = require('express'),
app = express(),
port = 3000,
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


  var sendRequest = function(endpoint,workflow, version, sp, sv, sig,message){
      
    const body = JSON.stringify({
        message:message
      })

    var postRequest = {
        host: endpoint,
        path: "/workflows/"+workflow+"/triggers/manual/paths/invoke?api-version="+version+"&sp="+sp+"&sv="+sv+"&sig="+sig,
        port: 443,
        method: "POST",
        body:body,
        headers: {
          'Content-Length': body.length,
          'Content-Type': 'application/json'
        }
      };

        var req = http.request(postRequest, (resp) =>{
            console.log(resp.statusCode+' - '+resp.statusMessage);
        })

          req.on('error', (error) => {
            console.error(error)
          })
          
          req.write(body)
          req.end()
        }
        
    app.post('/api',function(myreq,res){
        sendRequest(myreq.body.endpoint,myreq.body.workflow,myreq.body.version,myreq.body.sp,myreq.body.sv,myreq.body.sig,myreq.body.message)
        res.end('Accepted -'+ res.statusCode);
        });

  app.listen(port);
   
  console.log('Microsoft Flow API server started on: ' + port);