/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('bias', (table) => {
    table.increments('id').notNullable().primary()
    table.string('name')
    table.string('bias_rating')
    table.string('factual_reporting')
    table.string('country')
    table.string('media_type')
    table.string('popularity')
    table.string('mbfc_credibility_rating')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('bias')
}
