import { usePostgres } from "../../utils/postgres"

export default eventHandler(async (event) => {
    const sql = usePostgres()

    const companies = await sql`SELECT * FROM companies`

    // Ensure the database connection is closed after the request is processed
    event.waitUntil(sql.end())
    return companies
})
