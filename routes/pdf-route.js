const express = require('express')
const pdfkit = require('pdfkit')
const app = express();

app.get('/',function (req,res) {
    res.end('PDF OK');
} )

app.get('/getPdf',function (req ,res) {
    var fs = require('fs');
    var PDFDocument = require('pdfkit');
    
    var pdf = new PDFDocument({
      size: 'LEGAL', // See other page sizes here: https://github.com/devongovett/pdfkit/blob/d95b826475dd325fb29ef007a9c1bf7a527e9808/lib/page.coffee#L69
      info: {
        Title: 'Tile of File Here',
        Author: 'Some Author',
      }
    });

    pdf.registerFont('THSarabunNew', './fonts/THSarabunNew.TTF');
    pdf.font('THSarabunNew')
    // Write stuff into PDF
    pdf.text('Hello ต้อม');
    
    // Stream contents to a file
    pdf.pipe(
      fs.createWriteStream('./output.pdf')
    )
      .on('finish', function () {
        console.log('PDF closed');
      });
    
    // Close PDF and write file.
    pdf.end();

})

module.exports = app;