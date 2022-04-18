const conn = require('../db/conn')

class Story{
  constructor(title, caption, story){
    this.title = title
    this.caption = caption
    this.story = story
  }

  save(){
    const story = conn.db().collection('stories').insertOne({
      title: this.title,
      caption: this.caption,
      story: this.story
    })

    return story
  }

  static getStories(){
    const stories = conn.db().collection('stories').find().toArray()

    return stories
  }
}

module.exports = Story;