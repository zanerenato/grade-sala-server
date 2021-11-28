// Import path module
// import path from 'path'

// import knex from 'knex'
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'database/database.sqlite')

// Create connection to SQLite database
const Knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath, 
  },
  useNullAsDefault: true
})

// Create a table in the database called "books"
Knex.schema
  // Make sure no "books" table exists
  // before trying to create new
  .hasTable('agendamentos')
    .then((exists) => {
      if (!exists) {
        // If no "books" table exists
        // create new, with "id", "author", "title",
        // "pubDate" and "rating" columns
        // and use "id" as a primary identification
        // and increment "id" with every new record (book)
        return Knex.schema.createTable('agendamentos', (table)  => {
          table.increments('id').primary()
          table.string('nome')
          table.string('especialidade')
          table.string('horario')
          table.integer('status')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Agendamentos\' created')
          for (let i = 0; i < 390; i++) {

            Knex('agendamentos')
            .insert({ // insert new record, a book
              'nome': '',
              'especialidade': '',
              'horario': '',
              'status': 1
            })
            .then(() => {
              // Send a success message in response
              console.log(`Agendamento ${i} criado`)
            })
            .catch(err => {
              // Send a error message in response
              console.error(`There was an error creating ${req.body.nome} book: ${err}`)
            })
            
          }
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })
    
Knex.schema
    .hasTable('users')
    .then((exists) => {
      if (!exists) {
        // If no "books" table exists
        // create new, with "id", "author", "title",
        // "pubDate" and "rating" columns
        // and use "id" as a primary identification
        // and increment "id" with every new record (book)
        return Knex.schema.createTable('users', (table)  => {
          table.increments('id').primary()
          table.string('usuario')
          table.string('senha')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Users\' created')

          Knex('users')
          .insert({ // insert new record, a book
            'usuario': 'admin',
            'senha': '1234'
          })
          .then(() => {
            // Send a success message in response
            console.log(`Usuario admin criado`)
          })
          .catch(err => {
            // Send a error message in response
            console.error(`There was an error creating ${req.body.usuario} book: ${err}`)
          })
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })
// Just for debugging purposes:
// Log all data in "books" table
Knex.select('*').from('agendamentos')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))



// Export the database
module.exports = Knex