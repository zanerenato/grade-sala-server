// Import express
const express = require('express')

const agendamentosRoutes = require('../controllers/agendamento-controller.js')

// Create router
const router = express.Router()

router.get('/all', agendamentosRoutes.agendamentoAll)
router.get('/nomes', agendamentosRoutes.nomeAll)

router.post('/create', agendamentosRoutes.agendamentoCreate)

router.put('/clear', agendamentosRoutes.agendamentoClear)

router.put('/update', agendamentosRoutes.agendamentoUpdate)

router.get('/id', agendamentosRoutes.agendamentoById)

// Export router
module.exports = router