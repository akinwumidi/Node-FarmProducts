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
    // Initial Server test script
    // res.writeHead(202, { 'content-type': "text/html" })
    // res.end('<h1>server is up and running!!!</h1>')

    // Overview Page
    if (pathName.toLowerCase() === '/' || pathName.toLowerCase() === '/overview') {
        res.writeHead(202, { 'content-type': 'text/html' })
        res.end(tempOverview)
    }

    // Product Page
    else if (pathName.toLowerCase() === '/product') {
        res.writeHead(202, { 'content-type': 'text/html' })
        res.end(tempProduct)
    }

    // API PAGE
    else if (pathName === '/api') {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(data)
    }

    // Error Page!!
    else {
        res.writeHead(404, {
            'content-type': 'text/html',
            'my-own-content': 'hello-word'
        })
        res.end("<h1>Opps!!! The url you entered deos not exist' </h1>")
    }
})


server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000')
})
