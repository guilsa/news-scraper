/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// TODO: change to aliased directory
const data = require('../../../libs/database/seed/articles.json')

// TODO: Should only run in dev

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('articles').del()
  const chunkSize = 100
  await knex.batchInsert('articles', data, chunkSize).catch(function (error) {
    console.log('error', error)
  })
}