const express = require('express');
const exphbs = require('express-handlebars');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public/files'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[1]);
    }
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index'));

app.post(
    '/uploads',
    upload.single('upload-file'),
    (req, res) => res.render('index')
);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`app is listening to port ${ PORT }`);
});
