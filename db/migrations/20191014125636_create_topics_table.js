
exports.up = function(connection) {
  console.log('creating topics table...');
  return connection.schema.createTable('topics', (topicsTable) => {
    topicsTable.unique('slug').primary();
    topicsTable.string('description');
  })
};

exports.down = function(connection) {
  console.log('dropping topics table')
  return connection.schema.dropTable('topicsTable');
};
