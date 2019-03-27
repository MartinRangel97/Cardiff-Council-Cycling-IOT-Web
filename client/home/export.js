import 'babel-polyfill';
import lodash from 'lodash';
const config = require('./config.json') as { mssql: any };

import Sequelize from 'sequelize';
const sequelize = new Sequelize(config.mssql.schema, config.mssql.user, config.mssql.password, {
  host: config.mssql.host,
  dialect: 'mssql'
});

(async () => {
  // a query for SELECT from SQLServer.
  const sql = `
    SELECT *
    FROM yourTable
  `;
  const records = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT
  });

  let columnNames: string[] = []; // array for collecting column names.
  let lines: (string | number)[][] = []; // array for collecting values as line.
  
  records.forEach((record, i) => { // looping per records.
    let values: (string | number)[] = [];
    lodash.forEach(record, (value: string | number, fieldName: string) => { // looping per columns.      
      if (i === 0) { // create header line.
        columnNames.push(`"${fieldName.replace(/"/g, '""')}"`); // escaping " for csv format.
      }
      values.push(typeof value === 'number' ? value : `"${value.replace(/"/g, '""')}"`); // if value is string then surrounding by ", and escaping.
    });
    lines.push(values);
  });

  // checking retreived data.
  console.log(columnNames.join(','));
  lines.forEach(values => {
    console.log(values.join(','));
  });
  
})();