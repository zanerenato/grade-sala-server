// Import database
const knex = require('../db')
const guid = require('uuid')
const manager = require('../manager/user-manager')

exports.userAll = async (req, res) => {
    knex
      .select('*') 
      .from('users')
      .then(userData => {
        res.json(userData)
      })
      .catch(err => {
        res.json({ message: `There was an error retrieving books: ${err}` })
      })
  }

  exports.userCreate = async (req, res) => {
    knex('users')
      .insert({ 
        'usuario': req.body.usuario,
        'senha': req.body.senha
      })
      .then(() => {
        res.json({ message: `Nome \'${req.body.usuario}\'` })
      })
      .catch(err => {
        res.json({ message: `There was an error creating ${req.body.usuario} book: ${err}` })
      })
  }

  exports.userDelete = async (req, res) => {
    knex('users')
      .where('usuario', req.body.usuario)
      .del() 
      .then(() => {
        res.json({ message: `users ${req.body.usuario} deleted.` })
      })
      .catch(err => {
        res.json({ message: `There was an error deleting ${req.body.usuario} users: ${err}` })
      })
  }

  exports.userByUsuario = async (req, res) => {
    knex
      .select('*')
      .from('users')
      .where('usuario', req.body.usuario)
      .then(userData => {
        res.json(userData)
      })
      .catch(err => {
        res.json({ message: `There was an error retrieving books: ${err}` })
      })
  }

  exports.userLogin = async (req, res) => {
    knex
      .select('*')
      .from('users')
      .where({
        'usuario': req.body.usuario,
        'senha' : req.body.senha
      })
      .then(userData => {
        res.json({
          statuscode: 1,
          message: "Usuario logado com sucesso",
          token: manager.addUser(userData.usuario)
        })
      })
      .catch(err => {
        res.json({ statuscode: 0, message: `There was an error retrieving books: ${err}` })
      })
  }

  exports.userChangePassword = async (req, res) => {
    knex('users')
      .select('*')
      .where({
        'usuario': req.body.usuario,
        'senha' : req.body.senha
      })
      .then(data => {
        knex('users')
          .where('usuario', req.body.usuario)
          .update({
            'senha': req.body.novasenha
          })
          .then(userData => {

            res.json(userData)
          })
          .catch(err => {
            res.json({ message: `There was an error retrieving user: ${err}` })
          })  
      })
      .catch(err => {
        res.json({ message: `There was an error creating ${req.body.usuario} book: ${err}` })
      })
  }

  exports.userResetPassword = async (req, res) => {
    knex('users')
      .select('*')
      .where({ 'usuario': req.body.usuario })
      .then(data => {
        knex('users')
          .where({ 'usuario': req.body.usuario })
          .update({
            'senha': '1234'
          })
          .then(userData => {
            res.json(userData)
          })
          .catch(err => {
            res.json({ message: `There was an error retrieving user: ${err}` })
          })  
      })
      .catch(err => {
        res.json({ message: `There was an error creating ${req.body.usuario} user: ${err}` })
      })
  }