/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('articles', (table) => {
    table.increments('id').notNullable().primary()
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.string('date').notNullable()
    table.string('citations')
    table.string('url').unique().notNullable()
    table.string('source').notNullable()
    table.string('createdAt').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('articles')
}
