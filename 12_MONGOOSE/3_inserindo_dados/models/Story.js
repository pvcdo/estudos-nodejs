const mongoose = require('mongoose')
const {Schema} = mongoose
const Story = mongoose.model(
  'Story', 
  new Schema({
    title: {type: String, required: true},
    caption: {type: String, required: true},
    story: {type: String, required: true}
  })
)

module.exports = Story