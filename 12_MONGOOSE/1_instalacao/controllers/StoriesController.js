const Story = require('../models/Story')

module.exports = class StoriesController{
  static async home(req,res){
    Story.getStories()
      .then((stories) => {
        if(stories.length === 0){
          stories = false
        }
        res.render('stories/home', {stories})
      })
      .catch(e => console.error('Erro em StoriesController.home!!!!!!!!!!!!!!!!!11'))
  }

  static createStory(req,res){
    res.render('stories/new')
  }

  static createStoryPost(req,res){
    const {title, caption, storyArea} = req.body

    if(title && storyArea){
      if(!caption){
        caption = "Sem subtítulo"
      }
      const story = new Story(title, caption, storyArea)

      story.save()

      res.redirect('/stories')
    }else{
      res.redirect('/stories/error')
    }

  }

  static async getStory(req,res){
    const id = req.params.id

    const story = await Story.getStoryById(id)

    res.render('stories/story', {story})
  }

  static async removeStory(req,res){
    const id = req.params.id

    await Story.removeStoryById(id)

    res.redirect('/stories')
  }

  static async updateStory(req,res){
    const id = req.params.id

    const story = await Story.getStoryById(id)

    res.render('stories/update',{story})
  }

  static pageError(req,res){
    res.render('stories/error')
  }
}