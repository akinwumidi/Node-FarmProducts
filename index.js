const fs = require('fs');
const http = require('http')
////////////////////////////////////////////////////////////

const replaceTemplate = (temp, product) => {

}

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data); /// makes and object
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el))
////////////////////////////////////////////////////////////
// SERVER

const server = http.createServer((req, res) => {
    const pathName = req.url
    res.writeHead(202, { 'content-type': "text/html" })
    res.end('<h1>server is up and running!!!</h1>')
})


server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000')
})
