const Post = require('../models/Post.model');
const { emitToAll } = require('../utils/socket');

exports.createPost = async (req, res) => {
  try {
    const postData = { ...req.body, author: req.user.id };
    
    // Handle image uploads
    if (req.files && req.files.length > 0) {
      postData.images = req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        publicId: file.filename
      }));
    }
    
    const post = new Post(postData);
    await post.save();
    
    // Populate author info for response
    await post.populate('author', 'name email');
    
    // Emit real-time update
    emitToAll('newPost', post);
    
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const posts = await Post.find(filter)
      .populate('author', 'name email')
      .sort('-createdAt');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
      .populate('comments.user', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    const index = post.likes.indexOf(req.user.id);
    if (index > -1) {
      post.likes.splice(index, 1);
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();
    
    // Emit real-time update
    emitToAll('postLiked', { postId: post._id, likes: post.likes });
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    post.comments.push({ 
      user: req.user.id, 
      text: text,
      createdAt: new Date()
    });
    await post.save();
    
    // Populate the new comment's user info
    await post.populate('comments.user', 'name email');
    
    // Emit real-time update
    emitToAll('postCommented', { postId: post._id, comments: post.comments });
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
