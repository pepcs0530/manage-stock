const express = require('express');
const path = require('path')
var phantom = require('phantom');
const app = express();

app.get('/',function (req,res) {
    res.end('PDF OK');
} )



app.get('/getpdftest' ,async(req,res) =>{
  const props = [{propName :'paperSize',propConf: {format: 'A4', orientation: 'portrait'}},{propName :'viewportSize',propConf: {width: 1920, height: 1080}}];
  let filePath = await genPhantomPdf('http://proford.net',props);
  await res.sendfile(path.join(filePath));

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