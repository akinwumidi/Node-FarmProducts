const fs = require('fs');
const http = require('http')
const url = require('url')
const replaceTemplate = require('./modules/replaceTemplate')
////////////////////////////////////////////////////////////


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data); /// converting data to object
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')



const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
const overviewCompiled = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)

////////////////////////////////////////////////////////////
// SERVER

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true)
    // Initial Server test script
    // res.writeHead(202, { 'content-type': "text/html" })
    // res.end('<h1>server is up and running!!!</h1>')

    // Overview Page
    if (pathname.toLowerCase() === '/' || pathname.toLowerCase() === '/overview') {
        res.writeHead(202, { 'content-type': 'text/html' })
        res.end(overviewCompiled)
    }

    // Product Page
    else if (pathname.toLowerCase() === '/product') {
        // console.log(query)
        const specificProduct = dataObj[query.id]
        const compiledProducts = replaceTemplate(tempProduct, specificProduct)
        res.writeHead(202, { 'content-type': 'text/html' })
        res.end(compiledProducts)
    }

    // API PAGE
    else if (pathname === '/api') {
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

// Local server
// server.listen(8000, '127.0.0.1', () => {
//     console.log('please type 127.0.0.1:8000 in your local browser, to load Application!!!')
// })

// Online render server 
server.listen(3001)