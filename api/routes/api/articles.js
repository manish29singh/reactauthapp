const mongoose = require('mongoose');
const router = require('express').Router();
const Articles = mongoose.model('Articles');

router.post('/', (req,res, next) => {
    const {body} = req;

    if(!body.title) {
        return res.status(422).json({
            errors: {
                title: 'is required'
            }
        })
    }

    if(!body.author) {
        return res.status(422).json({
            errors: {
                author: 'is required'
            }
        })
    }

    if(!body.body) {
        return res.status(422).json({
            errors: {
                body: 'is required'
            }
        })
    }

    const finalArticle = new Articles(body);
    return finalArticle.save()
    .then(() => res.json({article: finalArticle.toJSON()}))
    .catch(next);
});

router.get('/', (req, res. next) => {
    return Articles.find()
    .sort({createdAt : 'descending'})
    .then((articles) => res.json({ articles: articles.map(article => article.toJSON())}))
    .catch(next);
});

