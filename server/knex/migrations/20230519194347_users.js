/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Users", (table) => {
    table.increments("userId").primary();
    table.string("firstName").notNull();
    table.string("lastName").notNull();
    table.string("email").notNull();
    table.string("password").notNull();
    table.string("phoneNumber").notNull();
    table.text("bio");
    table.boolean("isAdmin");
    table.boolean("weeklyEmail");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("Users");
};
