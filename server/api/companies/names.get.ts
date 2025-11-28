import type { CompanyNames } from "../../../shared/types/companyDbTypes"
import { usePostgres } from "../../utils/postgres"

export default eventHandler(async (event) => {
    const sql = usePostgres()

    const companies = await sql`SELECT id, full_name, short_name FROM companies`
    
    const mappedCompanyNames: CompanyNames[] = companies.map((company) => ({
        id: company.id,
        fullName: company.full_name,
        shortName: company.short_name
    }))

    // Ensure the database connection is closed after the request is processed
    event.waitUntil(sql.end())
    return mappedCompanyNames
})
