const Story = require('../models/Story')

module.exports = class StoriesController{
  static async home(req,res){
    Story.find().lean()
      .then((stories) => {
        if(stories.length === 0){
          stories = false
        }
        res.render('stories/home', {stories})
      })
  }

  static createStory(req,res){
    res.render('stories/new')
  }

  static async createStoryPost(req,res){
    const {title, caption, storyArea} = req.body

    if(title && storyArea){
      if(!caption){
        caption = "Sem subtítulo"
      }
      const story = new Story({title, caption, story:storyArea})

      await story.save()

      res.redirect('/stories')
    }else{
      res.redirect('/stories/error')
    }

  }

  static async getStory(req,res){
    const id = req.params.id

    Story.findById(id).lean()
      .then(story => {
        res.render('stories/story', {story})
      })
  }

  static async removeStory(req,res){
    const id = req.params.id

    await Story.deleteOne({_id:id})

    res.redirect('/stories')
  }

  static async updateStory(req,res){
    const id = req.params.id

    Story.findById(id).lean()
      .then(story => {
        res.render('stories/update',{story})
      })
  }

  static async updateStoryPost(req,res){
    const {id, title, caption, storyArea} = req.body

    const story = {id,title,caption,story:storyArea}

    await Story.updateOne({_id:id},story)

    res.redirect('/stories/'+id)
  }

  static pageError(req,res){
    res.render('stories/error')
  }
}