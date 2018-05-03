const TABLE_NAME = 'posts'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments() //id serial primary keywords
    table.string('title').notNullable() //string limit 255. Could be table.string(title, [length])
    table.text('body').notNullable()
    table.timestamps(true, true)//timestampS the s is very important, true= create, true = update
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
