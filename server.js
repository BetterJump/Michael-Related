const express = require('express');
const morgan = require('morgan');
const path = require('path');
//const bodyParser = require('body-parser');
const app = express();
const axios = require('axios')
const port = process.env.PORT || 3000;
const config = require('./config');

//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
//app.use(bodyParser.json())

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

const [commentsRoute, projectsRoute, pledgesRoute, relatedRoute] = [
  `http://${config.COMMENTS_HOST}:${config.COMMENTS_PORT}`,
  `http://${config.PROJECTS_HOST}:${config.PROJECTS_PORT}`,
  `http://${config.PLEDGES_HOST}:${config.PLEDGES_PORT}`,
  `http://${config.RELATED_HOST}:${config.RELATED_PORT}`
];

// Comments

app.get('/comments/:id', (req, res) => {
  axios.get(`${commentsRoute}/comments/${req.params.id}`, { params: req.query })
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(error => {
      console.log('error getting comments from proxy server');
      res.sendStatus(500);
    })
})

app.post('/comments', (req, res) => {
  axios.post(`${commentsRoute}/comments`, req.body)
    .then(response => {
      res.status(201).send(response.data)
    })
    .catch(error => {
      console.log('error posting to comments from proxy server');
      res.sendStatus(500)
    })
})

// Projects

app.get('/projects:id', (req, res) => {
  axios.get(`${projectsRoute}/projects/${req.params.id}`, { params: req.query })
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(error => {
      console.log('error getting projects from proxy server');
      res.sendStatus(500)
    })
})

<<<<<<< HEAD
// Pledges

app.get('/pledges', (req, res) => {
  axios.get(`${pledgesRoute}/pledges/${req.params.id}`, { params: req.query })
=======
app.get('/pledges/:id', (req, res) => {
  axios.get('http://localhost:3003/pledges/' + req.params.id)
>>>>>>> 36a5add29600d34f6b64673ac1ab36a99c3ace0c
    .then(response => {
      res.status(200).send(response.data);

    })
    .catch(error => {
      console.log('error getting pledges from proxy server')
      res.sendStatus(500);
    })
})

app.post('/pledges', (req, res) => {
  axios.post(`${pledgesRoute}/pledges`, req.body)
    .then(response => {
      res.status(201).send(response.data);
    })
    .catch(error => {
      console.log('error posting to pledges from proxy server')
      res.sendStatus(500)
    })
})

// Related

app.get('/related', (req, res) => {
<<<<<<< HEAD
  axios.get(`${relatedRoute}/related/${req.params.id}`, { params: req.query })
=======
  //console.log('req.params.id', req.params.id)
  axios.get('http://localhost:3004/related/2') // + req.params.id)

    //axios.get('http://localhost:3004/related', { params: req.query })
>>>>>>> 36a5add29600d34f6b64673ac1ab36a99c3ace0c
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(error => {
      console.log('error getting related from proxy server');
      res.sendStatus(500);
    })
})

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
