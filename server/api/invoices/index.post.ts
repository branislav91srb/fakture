import { usePostgres } from "../../utils/postgres"
import type { InvoiceDbEntity, InvoiceItemDbEntity, InvoiceWithItems } from "../../../shared/types/invoiceDbTypes"

export default eventHandler(async (event) => {
    const sql = usePostgres()

    const body = await readBody(event);
    const invoiceWithItems = body as InvoiceWithItems;
    const { invoice, items } = invoiceWithItems;

    console.log(invoiceWithItems)

    if (items.length == 0) {
        throw new Error("Invoice items are required.")
    }

    // Wrap both inserts in a transaction
    await sql.begin(async sql => {

        // Insert into invoices table
        const idResult = await sql
            `INSERT INTO invoices (
            invoice_number,
            company_id,
            client_id,
            turnover_date,
            payment_deadline,
            value
        ) VALUES (
            ${invoice.invoiceNumber},
            ${invoice.companyId},
            ${invoice.clientId},
            ${new Date(invoice.turnoverDate).toISOString()},
            ${new Date(invoice.paymentDeadline).toISOString()},
            ${invoice.value}
        )
        
        RETURNING id
    `;

        console.log(idResult)

        const values = items.map(item => [
            item.id,
            item.invoiceId,
            item.order,
            item.description,
            item.unit,
            item.quantity,
            item.price,
            item.tax
        ]);

        await sql
            `INSERT INTO invoice_items (
                    id,
                    invoice_id,
                    order,
                    description,
                    unit,
                    quantity,
                    price,
                    tax
                ) VALUES ${sql(values)}
            `;
    });

    // Ensure the database connection is closed after the request is processed
    event.waitUntil(sql.end());
    return { success: true };
})