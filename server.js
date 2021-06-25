const express = require('express');
const articlesRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();
const mongoose = require('mongoose');
const Article = require('./models/articles');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
mongoose.connect('mongodb://localhost/blogger', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndexes: true }).then(() => {
    console.log("connected to db")

})



app.get('/', async (req, res) => {
    const article = await Article.find().sort({
        createdAt: 'desc'
    });
    res.render('articles/index', {
        data: article
    })
})

app.use('/articles', articlesRouter);



app.listen(5000, () => {
    console.log("App is running on port : 5000");
})