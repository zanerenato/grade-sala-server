const knex = require('../db')

exports.agendamentoAll = async (req, res) => {
    knex
      .select('*')
      .from('agendamentos')
      .then(userData => {
        res.json(userData)
      })
      .catch(err => {
        res.json({ message: `There was an error retrieving books: ${err}` })
      })
  }

  exports.nomeAll = async (req, res) => {
    knex
      .select('nome')
      .from('agendamentos')
      .then(userData => {
        res.json(userData)
      })
      .catch(err => {
        res.json({ message: `There was an error retrieving books: ${err}` })
      })
  }

  exports.agendamentoCreate = async (req, res) => {
    knex('agendamentos')
      .insert({
        'nome': req.body.nome,
        'especialidade': req.body.especialidade,
        'horario': req.body.horario,
        'status': req.body.status
      })
      .then(() => {
        res.json({ message: `Nome \'${req.body.nome}\'` })
      })
      .catch(err => {
        res.json({ message: `There was an error creating ${req.body.nome} book: ${err}` })
      })
  }

  exports.agendamentoClear = async (req, res) => {
    knex('agendamentos')
      .where('id', req.body.id)
      .update({
        'nome': '',
        'especialidade': '',
        'horario': '',
        'status': 1
      }) 
      .then(() => {
        res.json({ message: `Agendamento ${req.body.id} clean.` })
      })
      .catch(err => {
        res.json({ message: `There was an error cleaning ${req.body.id} Agendamento: ${err}` })
      })
  }

  exports.agendamentoUpdate = async (req, res) => {
    knex('agendamentos')
      .where('id', req.body.id)
      .select('*')
      .then(data => {
        let nome = (req.body.nome == null || req.body.nome == undefined) ? data.nome : req.body.nome;
        let especialidade = (req.body.especialidade == null || req.body.especialidade == undefined) ? data.especialidade : req.body.especialidade;
        let horario = (req.body.horario == null || req.body.horario == undefined) ? data.horario : req.body.horario;
        let status = (req.body.status == null || req.body.status == undefined) ? data.status : req.body.status;
        knex('agendamentos')
          .where('id', req.body.id)
          .update({
            'nome': nome,
            'especialidade': especialidade,
            'horario': horario,
            'status': status
          })
          .then(userData => {
            res.json(userData)
          })
          .catch(err => {
            res.json({ message: `There was an error retrieving agendamento: ${err}` })
          }) 
      })
      .catch(err => {
        res.json({ message: `There was an error creating ${req.body.nome} agendamento: ${err}` })
      })
  }

  exports.agendamentoById = async (req, res) => {
    knex
      .select('*')
      .from('agendamentos')
      .where('id', req.body.id)
      .then(userData => {
        res.json(userData[0])
      })
      .catch(err => {
        res.json({ message: `There was an error retrieving books: ${err}` })
      })
  }