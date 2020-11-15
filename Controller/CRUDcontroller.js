const routes = require('../routes/routes.js');
const ToDoActionModel = require('../models/todoModel');

async function getAllActions(req, res) {
  try {
    const actions = await ToDoActionModel.find();
    if (actions.length < 1) {
      res.status(404).send({ message: 'Nenhuma ToDo Action encontrada' });
      return;
    }
    res.send(actions);
  } catch (err) {
    res
      .status(500)
      .send(err.message);
  }
}

async function findActionById(req, res) {
  try {
    const id = Object.entries(req.params);
    const _id = id[0][1];
    const action = await ToDoActionModel.findOne({ _id });
    if (!action) res.status(404).send({ Sorry: `No action was found in ${_id}` });
    res.status(200).send(action);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function includeAction(req, res) {
  try {
    const { action, done, created } = req.body;
    const actions = await ToDoActionModel({ action, done, created });
    if (actions != null)
      await actions.save();
    res.status(201).send(actions);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function editAction(req, res) {
  try {
    const { _id, action, done, created } = req.body;
    const oldAction = await ToDoActionModel.findOne({ _id });
    if (oldAction != null) {
      await oldAction.updateOne({ oldAction, action, done, created });
    } else {
      res.status(500).send({ message: "Can't updated an null content, may be the action no longer exists" });
      return;
    }
    const newAction = await ToDoActionModel.findOne({ _id });
    res.status(200).send(newAction);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function deleteAction(req, res) {
  try {
    const id = Object.entries(req.params);
    const _id = id[0][1];

    const action = await ToDoActionModel.findOne({ _id });
    if (!action) {
      res.status(500).send("No such _id was found");
    } else {
      await action.deleteOne();
      res.status(200).send('action deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { getAllActions, findActionById, includeAction, deleteAction, editAction };