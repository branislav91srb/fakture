import type { CompanyDbEntity } from "../../../shared/types/companyDbTypes"
import { usePostgres } from "../../utils/postgres"

export default eventHandler(async (event) => {
    const sql = usePostgres()

    const companies = await sql`SELECT * FROM companies`
    
    const mappedCompanies: CompanyDbEntity[] = companies.map((company) => ({
        id: company.id,
        fullName: company.full_name,
        shortName: company.short_name,
        companyId: company.company_id,
        taxId: company.tax_id,
        address: company.address,
    }))

    // Ensure the database connection is closed after the request is processed
    event.waitUntil(sql.end())
    return mappedCompanies
})
