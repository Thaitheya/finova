import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  options: '-c search_path=finova_test',
  max: 10,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 2000,
})

pool.connect().then(async (client) => {
  const result = await client.query('SELECT current_database()')
  console.log('✅ Connected to DB:', result.rows[0].current_database)
  client.release()
}).catch((err) => console.error('❌ DB connection error:', err))

export default pool