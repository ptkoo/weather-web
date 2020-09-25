const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fetchInfo = require('../utils/fetchInfo')

const app = express()
const port = process.env.PORT || 3000
    //define paths
const viewsPath = path.join(__dirname, ('../templates/views'))
console.log(viewsPath)
const partialsPath = path.join(__dirname, ('../templates/partials'))

// Setup static 
app.use(express.static(path.join(__dirname, '../public/')))

// Setu hbs and view engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
debugger
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {

    res.render('index')

})



app.get('/weather', (req, res) => {
    if (req.query.address) {
        fetchInfo(req.query.address).then(result => {
            res.send({
                data: result
            })
        }).catch(e => console.log(e))
    } else {
        res.send({
            error: "error"
        })
    }
})
app.get('*', (req, res) => {
    res.render({
        error: "404 Not Found"
    })
})



app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})