import pool from '../config/db'

const saveOrUpdateUser = async (
  googleId: string,
  email: string,
  displayName: string,
  avatarUrl: string
) => {
  const query = `
    INSERT INTO users (google_id, email, display_name, avatar_url)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (google_id) DO UPDATE SET
      email = EXCLUDED.email,
      display_name = EXCLUDED.display_name,
      avatar_url = EXCLUDED.avatar_url,
      last_login_at = NOW()
    RETURNING *
  `
  const values = [googleId, email, displayName, avatarUrl]
  const result = await pool.query(query, values)
  return result.rows[0]
}

export default saveOrUpdateUser