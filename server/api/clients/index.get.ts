import { usePostgres } from "../../utils/postgres"

export default eventHandler(async (event) => {
    const sql = usePostgres()

    const clients = await sql`SELECT * FROM clients`

    // Ensure the database connection is closed after the request is processed
    event.waitUntil(sql.end())
    return clients
})
