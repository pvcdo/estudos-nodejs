const conn = require('../db/conn')
const {ObjectId} = require('mongodb')

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

  static async getStoryById(id){
    const story = await conn.db().collection('stories').findOne({_id:ObjectId(id)})
    return story
  }

  static async removeStoryById(id){
    await conn.db().collection('stories').deleteOne({_id:ObjectId(id)})
    return
  }
}

module.exports = Story;