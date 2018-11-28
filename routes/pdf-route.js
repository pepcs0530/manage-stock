const express = require('express');
const path = require('path')
var phantom = require('phantom');
const app = express();

app.get('/',function (req,res) {
    res.end('PDF OK');
} )
app.get('/order-receipt', function(req, res, next) {
  res.render('receipt', {page:'Home', menuId:'home',receiptNo:req.params.receiptNo});
});


app.get('/get-receipt-pdf/:receiptNo' ,async(req,res) =>{
  var port = process.env.PORT || 4501;
  const props = [{propName :'paperSize',propConf: {format: 'A4', orientation: 'portrait'}},{propName :'viewportSize',propConf: {width: 1920, height: 1080}}];
  let filePath = await genPhantomPdf('http://localhost:'+port+'/api/pdf/order-receipt/'+req.params.receiptNo,props);
  await res.sendfile(path.join(filePath));

})
app.post('/get-receipt-pdf' ,async(req,res) =>{
  var port = process.env.PORT || 4501;
  const props = [{propName :'paperSize',propConf: {format: 'A4', orientation: 'portrait'}},{propName :'viewportSize',propConf: {width: 1920, height: 1080}}];
  let filePath = await genPhantomPdf('http://localhost:'+port+'/api/pdf/order-receipt',props);
  //await res.send(new File(path.resolve(filePath)));

     var fs = require('fs');
   await fs.readFile(path.resolve(filePath), function(err, data) {
      //res.writeHead(200, {'Content-Type': 'text/html'});
     // res.write(data);
      res.send(new ArrayBuffer(data) )
      console.log(data);
     // res.end();
    });
  

})
const genPhantomPdf = async(url,props) => {
  const instance = await phantom.create()
  const page = await instance.createPage()
  await  props.forEach(prop => {
     page.property(prop.propName,prop.propConf)    
  });
  const status = await page.open(url)
  console.log('doc status',status)

  await page.render('./scr.pdf')

  await instance.exit()

  return await './scr.pdf'
}
module.exports = app;