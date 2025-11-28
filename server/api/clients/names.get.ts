import type { CompanyNames } from "../../../shared/types/companyDbTypes"
import { usePostgres } from "../../utils/postgres"

export default eventHandler(async (event) => {
    const sql = usePostgres()

    const clients = await sql`SELECT c.id, c.full_name, c.short_name FROM companies c INNER JOIN clients cl on c.id = cl.client_id`
    const mappedClients: CompanyNames[] = clients.map((client) => ({
        id: client.id,
        fullName: client.full_name,
        shortName: client.short_name,
    }))

    // Ensure the database connection is closed after the request is processed
    event.waitUntil(sql.end())
    return mappedClients
})
