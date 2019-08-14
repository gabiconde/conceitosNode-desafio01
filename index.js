const express = require('express')

const server = express();
server.use(express.json())

const projects = [{
  id: "1",
  title: "Gabi",
  tasks: []
}];

let numberOfRequests = 0;

//Middlewares
server.use((req, res, next) => {
  numberOfRequests++;
  console.log(`Request number: ${numberOfRequests}`)
  return next();
})

function idValidation(req, res, next) {
  const {
    id
  } = req.params;

  //const project = projects.find(p => p.id == id);
  const index = projects.map(p => {
    return p['id']
  }).indexOf(id)

  if (index != -1) {
    req.index = index;
    return next()
  } else {
    return res.status(400).json({
      error: 'ID Project not found'
    })
  }
}


//Routes
server.post('/projects', (req, res) => {
  const {
    id,
    title
  } = req.body
  projects.push({
    id,
    title,
    tasks: []
  })
  return res.json(projects)
})

server.get('/projects', (req, res) => {
  return res.json({
    projects
  })
})

server.put('/projects/:id', idValidation, (req, res) => {
  const {
    title
  } = req.body
  projects[req.index].title = title;
  return res.json({
    "message": `Title has been altered to ${title}`
  })

})

server.delete('/projects/:id', idValidation, (req, res) => {
  projects.splice(req.index, 1)
  return res.json({
    "message": `Project deleted`
  })
})

server.post('/projects/:id/tasks', idValidation, (req, res) => {
  const {
    title
  } = req.body;

  projects[req.index].tasks.push(title)
  return res.json({
    message: projects
  })

})

server.listen(3000)