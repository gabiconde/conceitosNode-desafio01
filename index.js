const express = require('express')

const server = express();
server.use(express.json())

const projects = [{
  id: "1",
  title: "Gabi",
  tasks:[]
}];
//Middlewares

//Rotas
server.post('/projects',(req, res) => {
  const {id, title} = req.body
  projects.push({ 
  id,
  title,
  tasks:[]
  })
  return res.json(projects)
})

server.get('/projects', (req, res) => {
  return res.json({projects})
})

server.put('/projects/:id', (req, res) => {
  const { id } = req.params
  const {title} = req.body
  const index = projects.map(p => {
    return p['id'] }).indexOf(id)
  if (index != -1){
    projects[index].title =title;
    return res.json({"message":`Título alterado para ${title}`})
  }
  else{
    return res.status(400).json({
      error: 'ID Project not found'
    })
  }
  
})

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params
  const index = projects.map(p => {
    return p['id'] 
  }).indexOf(id)

  if (index != -1){
    projects.splice(index,1)
    return res.json({"message":`Projeto deletado`})
  }
  else{
    return res.status(400).json({
      error: 'ID Project not found'
    })
  }
})

server.post('/projects/:id/tasks', (req, res) => {
  const {id} = req.params;
  const {title} = req.body;

  const index = projects.map(p =>{
    return p['id']
  }).indexOf(id)

  if (index != -1){
    projects[index].tasks.push(title)
    return res.json({
      message:projects
    })
  } else {
    return res.status(400).json({error : 'Project not found'})
  }
})

server.listen(3000)