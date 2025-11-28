import { usePostgres } from "../../utils/postgres"

export default eventHandler(async (event) => {
    const companyId = event.context.params?.id

    if (!companyId) {
        throw new Error("Company ID is required.")
    }

    const sql = usePostgres()

    const result = await sql`SELECT count(*) AS number FROM invoices WHERE DATE_PART('year', date_created) = DATE_PART('year', NOW())`

    // Ensure the database connection is closed after the request is processed
    event.waitUntil(sql.end())
    return result[0].number as number
})