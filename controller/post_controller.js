const Post = require('../models/Post')
const Comment = require('../models/Comment')

module.exports.create = function(req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post) {
        if(err) {
            console.log('Error in creating a post');
            return;
        }
        return res.redirect('back')
    })
}

module.exports.destroy =  function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        // .id converting the object id into the string
        if(post.user == req.user.id) {
            post.remove();
            Comment.deleteMany({post: req.params.id}, function(err) {
                return res.redirect('back')    
            })
        } else {
            return res.redirect('back')    
        }
    })
}