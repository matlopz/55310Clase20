const express = require('express');
const cors = require('cors')
const handlebars = require('express-handlebars');
const connectMongo = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const router = require('./router')();

const app = express();
const hbs = handlebars.create({
 
    allowProtoPropertiesByDefault: true
});

app.use(cors());
// Middleware para procesar JSON 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(cookieParser())
app.use(
    session({
        store: MongoStore.create({
            mongoUrl:
            'mongodb+srv://matlopz:Dolo2018@product.n2gwuwa.mongodb.net/?retryWrites=true&w=majority',
            mongoOptions: { useNewUrlParser:true,useUnifiedTopology:true},
            ttl:3600,
        }),
        secret:'MiSecreto',
        resave: false,
        saveUninitialized:false,
    })
)



connectMongo()


app.use('/', router);

module.exports = app;
