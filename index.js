const fs = require('fs');
const http = require('http')
////////////////////////////////////////////////////////////


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data); /// converting data to object
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%ID%}/g, product.id)
    output = output.replace(/{%DESCRIPTION%}/g, product.description)
    output = output.replace(/{%FROM%}/g, product.from)
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
    }
    return output
}

const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
const overviewCompiled = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)

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
        res.end(overviewCompiled)
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
