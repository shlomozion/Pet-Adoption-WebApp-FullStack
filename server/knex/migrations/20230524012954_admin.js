/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("admin", (table) => {
    table.increments("adminId").primary();
    table.string("firstName").notNull();
    table.string("email").notNull();
    table.string("password").notNull();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("admin");
};
