const hbs = require('hbs');
const express = require('express')
const cors = require('cors');
const bodyparser = require('body-parser')
const morgan = require('morgan')
const app = express();
const Api = require('./Router/routes')

app.set('port', process.env.PORT || 3000)

app.set('view engine', 'hbs')
app.set('views', __dirname + '/pages')

app.use(morgan())
app.use(cors())
app.use(bodyparser.urlencoded({ extended:false }))
app.use(bodyparser.json())
app.use(express.json())
app.use('/api', Api)

app.listen(app.get('port'), () => {
    console.log("The server is running in port", app.get('port'));
})