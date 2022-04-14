const conn = require('../db/conn')

class Story{
  constructor(title, story){
    this.title = title
    this.story = story
  }

  save(){
    const story = conn.db().collection('stories').insertOne({
      title: this.title,
      story: this.story
    })

    return story
  }
}

module.exports = Story;