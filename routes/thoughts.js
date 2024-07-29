const express = require('express')
const Thought = require('../models/thought')
const router = express.Router()

router.get('/', (request, response) => {
  Thought.find({}).then((thoughts) => {
    response.json(thoughts)
  })
})

router.get('/:id', (request, response) => {
  Thought.findById(request.params.id).then((thought) => {
    response.json(thought)
  })
})

router.post('/', (request, response) => {
  const body = request.body

  if (body.title.trim().length === 0 || body.body.trim().length === 0) {
    return response
      .status(400)
      .json({ error: 'Title and body are need to post.' })
  }

  const thought = new Thought({
    title: body.title,
    body: body.body,
    timestamp: new Date(),
    origin: {
      city: body.origin.city,
      country: body.origin.country,
      countryCode: body.origin.countryCode,
    },
    likes: 0,
  })

  thought
    .save()
    .then((savedThought) => {
      response.json(savedThought)
    })
    .catch((error) => {
      response.status(500).json({ error: 'There was an error saving post.' })
    })
})

router.patch('/:id', (request, response) => {
  const body = request.body

  const thought = {
    likes: body.likes,
  }

  Thought.findByIdAndUpdate(request.params.id, thought, { new: true }).then(
    (updatedThought) => {
      response.json(updatedThought)
    }
  )
})

module.exports = router
