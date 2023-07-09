const express = require('express')
const app = express();
const path = require('path');
const {v4 : uuid} = require('uuid') // renaming v4 to uuid
const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

let comments = [
    {   id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {   id: uuid(),
        username: 'Skyler',
        comment: 'i like to go birdwatching with my dog'
    },
    {   id: uuid(),
        username: 'Sk8rboi',
        comment: 'Plz delete your account, Todd'
    },
    {   id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
];

app.get('/comments', (req, res) => {
    res.render('comments/index', {comments})
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    comments.push({username,comment,id : uuid()})
    res.redirect('/comments');
})

app.get('/comment/:id', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', {comment}) 
})

app.get('/comment/:id/edit', (req, res) => {
    const {id} = req.params
    const comment = comments.find(c => id === c.id);
    res.render('comments/edit', {c : comment});
})

app.patch('/comments/:id/edit', (req, res) => {
    const {id} = req.params
    // console.log(req.body.comment)
    const newComment = req.body.comment;
    const oldcomment = comments.find(c => c.id === id)
    oldcomment.comment = newComment
    res.redirect(`/comment/${id}`)
})

app.delete('/comment/:id', (req,res) => {
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect("/comments")
})

app.get('/tacos', (req,res) => {
    res.send('GET /tacos response')
})

app.post('/tacos', (req, res) => {
    // console.log(req.body);
    const {qty, meat} = req.body;
    res.send(`Here are your ${qty} ${meat} tacos`)
})

app.listen(3000, () => {
    console.log('Started server on port 3000');
});