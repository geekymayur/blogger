const express = require('express');
const { findById } = require('../models/articles');
const Articles = require('../models/articles');
const router = express.Router();

router.get('/new', async (req, res) => {
    res.render('articles/new', { data: new Articles() });
});


router.get('/:slug', async (req, res) => {
    const article = await Articles.findOne({ slug: req.params.slug });
    if (article == null) {
        res.redirect('/');
    }
    res.render('articles/show', { data: article })
});


router.post('/', async (req, res, next) => {

    req.article = new Articles()
    next()

}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {

    req.article = await Articles.findById(req.params.id)
    next()

}, saveArticleAndRedirect('edit'))




router.delete('/:id', async (req, res) => {
    await Articles.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    const article = await Articles.findById(req.params.id);
    res.render('articles/edit', { data: article });
});



function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article;
        article.title = req.body.title
        article.description = req.body.desc
        article.markdown = req.body.markdown
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (error) {
            console.log(error);
            res.render(`articles/${path}`, { data: article })
        }
    }

}


module.exports = router;