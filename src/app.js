const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fetchInfo = require('../utils/fetchInfo')


//define paths
const app = express()
const viewsPath = path.join(__dirname, ('../templates/views'))
const partialsPath = path.join(__dirname, ('../templates/partials'))

// Setu hbs and view engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static 
app.use(express.static(path.join(__dirname, '../public/')))

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
    }
})


app.get('*', (req, res) => {
    res.render('error', {
        message: "404 Page Not Found"
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})