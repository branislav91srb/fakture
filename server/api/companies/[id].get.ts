import type { CompanyDbEntity } from "../../../shared/types/companyDbTypes"
import { usePostgres } from "../../utils/postgres"

export default eventHandler(async (event) => {
    const itemId = event.context.params?.id

    if (!itemId) {
        throw new Error('Company ID is required')
    }

    const sql = usePostgres()
    const result = await sql`SELECT * FROM companies WHERE id = ${itemId}`
    const company = result[0]
    const mappedCompany: CompanyDbEntity | null = company
        ? {
            id: company.id,
            fullName: company.full_name,
            shortName: company.short_name,
            companyId: company.company_id,
            taxId: company.tax_id,
            address: company.address,
        }
        : null
    
    // Ensure the database connection is closed after the request is processed
    event.waitUntil(sql.end())
    return mappedCompany
})