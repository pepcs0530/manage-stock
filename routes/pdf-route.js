const express = require('express');
const path = require('path')
const phantom = require('phantom');
const moment = require('moment')
const app = express();

app.get('/', function (req, res) {
  res.render('index', {
    page: 'Home',
    menuId: 'home'
  });
})
app.get('/logo', function (req, res, next) {
  res.sendfile('./public/images/logo.jpg')
})
app.post('/order-receipt', function (req, res, next) {

  // let model = req.body['date']
  let model = req.body
  model.totalPrice = totalPrice(model.itemList)
  model.date = moment(model.date).format('DD/MM/YYYY')
  res.render('receipt', model);
});

filePath = './file/receipt.pdf'
app.get('/get-receipt-pdf/', async (req, res) => {

  await res.sendfile(path.join(filePath));
  console.log("Get file success")

})
app.post('/get-receipt-pdf', async (req, res) => {
  var port = process.env.PORT || 4501;
  const props = [{
    propName: 'paperSize',
    propConf: {
      format: 'A4',
      orientation: 'portrait'
    }
  }, {
    propName: 'viewportSize',
    propConf: {
      width: 1920,
      height: 1080
    }
  }];
  await genPhantomPdf('http://localhost:' + port + '/api/pdf/order-receipt', props, req.body);
  //await res.send(new File(path.resolve(filePath)));

  await res.end()


})


const genPhantomPdf = async (url, props, data) => {
  const instance = await phantom.create()
  const page = await instance.createPage()
  await props.forEach(prop => {
    page.property(prop.propName, prop.propConf)
  });

  var settings = {
    operation: "POST",
    encoding: "utf8",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(data)
  };
  const status = await page.open(url, settings)
  console.log('doc status', status)

  await page.render(filePath)

  await instance.exit()
}

const pricelist = function (itemList) {
  var pricelist = itemList.map(function (curr) {
    return curr.price * curr.quantity
  })
  console.log('pricelist-->', pricelist);
  return pricelist
}
const totalPrice = function (itemList) {
  var totalPrice = pricelist(itemList).reduce(function (prev, curr) {
    return prev + curr;
  });
  console.log('totalPrice-->', totalPrice);
  return totalPrice;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
module.exports = app;
