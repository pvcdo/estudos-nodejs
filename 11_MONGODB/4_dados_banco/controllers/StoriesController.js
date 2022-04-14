const Story = require('../models/Story')

module.exports = class StoriesController{
  static home(req,res){
    res.render('stories/home')
  }

  static createStory(req,res){
    res.render('stories/new')
  }

  static createStoryPost(req,res){
    const {title, storyArea} = req.body

    const story = new Story(title, storyArea)

    story.save()

    res.redirect('/stories')
  }
}