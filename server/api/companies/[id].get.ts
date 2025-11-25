import { usePostgres } from "../../utils/postgres"

export default eventHandler(async (event) => {
    const itemId = event.context.params?.id

    if (!itemId) {
        throw new Error('Company ID is required')
    }

    const sql = usePostgres()

    const company = await sql`SELECT * FROM companies WHERE id = ${itemId}`

    // Ensure the database connection is closed after the request is processed
    event.waitUntil(sql.end())
    return company[0] as Company
})