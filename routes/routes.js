const express = require('express');
const actionsRouter = express.Router;
const CRUDcontroller = require('../Controller/CRUDcontroller');
const app = express();

app.get('/all', CRUDcontroller.getAllActions);
app.get('/find/:id', CRUDcontroller.findActionById);
app.post('/include', CRUDcontroller.includeAction);
app.put('/update', CRUDcontroller.editAction);
app.delete('/delete/:id', CRUDcontroller.deleteAction);

module.exports = app;