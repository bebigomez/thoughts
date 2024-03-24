const express = require("express");
const app = express();
require("dotenv").config();

const Thought = require("./models/thoughts");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(requestLogger);

app.get("/api/thoughts", (request, response) => {
  Thought.find({}).then((thoughts) => {
    response.json(thoughts);
  });
});

app.get('/api/thoughts/:id', (request, response) => {
  Thought.findById(request.params.id).then(thought => {
    response.json(thought)
  })
})

app.post("/api/thoughts", (request, response) => {
  const body = request.body;

  const thought = new Thought({
    title: body.title,
    body: body.body,
    timestamp: new Date(),
    origin: {
      city: body.origin.city,
      country: body.origin.country,
    },
    likes: body.likes,
  });

  thought.save().then((savedThought) => {
    response.json(savedThought);
  });
});

app.patch("/api/thoughts/:id", (request, response) => {
  const body = request.body;

  const thought = {
    likes: body.likes,
  };

  Thought.findByIdAndUpdate(request.params.id, thought, { new: true }).then(
    (updatedThought) => {
      response.json(updatedThought);
    }
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
