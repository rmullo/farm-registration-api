const { Client } = require('pg');
require('dotenv').config();

// PostgreSQL Connection
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Function to initialize database
async function initDB() {
    try {
        await client.connect();
        const result = await client.query(`
            SELECT 1 FROM pg_type WHERE typname = 'planted_crops_enum';
        `);
        if (result.rows.length === 0) {
            await client.query(`
                CREATE TYPE planted_crops_enum AS ENUM ('Soja', 'Milho', 'Algodão', 'Café', 'Cana-de-Açucar');
            `);
        }
        await client.query(`
            CREATE TABLE IF NOT EXISTS farms (
              id SERIAL PRIMARY KEY,
              cpf_or_cnpj VARCHAR(14) UNIQUE NOT NULL,
              producer_name VARCHAR(50) NOT NULL,
              farm_name VARCHAR(50) NOT NULL,
              city VARCHAR(50) NOT NULL,
              state VARCHAR(2) NOT NULL,
              total_area DECIMAL(10,2) NOT NULL,
              agricultural_area DECIMAL(10,2) NOT NULL,
              vegetation_area DECIMAL(10,2) NOT NULL,
              planted_crops planted_crops_enum[] NOT NULL
            );
        `);

          //Populate the table with some initial data with valids CPFs and CNPJs
        const farmTableCheck = await client.query(`SELECT COUNT(*) FROM farms`);
        if (parseInt(farmTableCheck.rows[0].count, 10) === 0) {
            await client.query(`
                INSERT INTO farms (cpf_or_cnpj, producer_name, farm_name, city, state, total_area, agricultural_area, vegetation_area, planted_crops)
                VALUES
                    ('12345678901', 'Producer 1', 'Farm 1', 'City 1', 'SP', 100.0, 80.0, 20.0, '{Soja, Milho}'),
                    ('98765432100', 'Producer 2', 'Farm 2', 'City 2', 'RJ', 200.0, 150.0, 50.0, '{Algodão, Cana-de-Açucar}'),
                    ('45678901234', 'Producer 3', 'Farm 3', 'City 3', 'MG', 300.0, 250.0, 50.0, '{Café, Milho}'),
                    ('78901234567', 'Producer 4', 'Farm 4', 'City 4', 'PR', 400.0, 300.0, 100.0, '{Milho, Cana-de-Açucar}'),
                    ('34567890123', 'Producer 5', 'Farm 5', 'City 5', 'SC', 500.0, 400.0, 100.0, '{Café, Algodão}'),
                    ('67890123456', 'Producer 6', 'Farm 6', 'City 6', 'RS', 600.0, 500.0, 100.0, '{Soja, Algodão}'),
                    ('90123456789', 'Producer 7', 'Farm 7', 'City 7', 'SP', 700.0, 600.0, 100.0, '{Milho, Cana-de-Açucar}'),
                    ('23456789012', 'Producer 8', 'Farm 8', 'City 8', 'RJ', 800.0, 700.0, 100.0, '{Café, Algodão}'),
                    ('56789012345', 'Producer 9', 'Farm 9', 'City 9', 'MG', 900.0, 800.0, 100.0, '{Soja, Milho}'),                
                    ('89012345678', 'Producer 10', 'Farm 10', 'City 10', 'PR', 1000.0, 900.0, 100.0, '{Café, Cana-de-Açucar}');
            `);
        }

        console.log('Database initialized successfully');
        
    } catch (err) {
        console.error('Database initialization error:', err);
    }
}

module.exports = { client, initDB };




/*
const client = new Client({
  connectionString: process.env.DATABASE_URL, 
});

client.connect()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  });

module.exports = client;
*/

