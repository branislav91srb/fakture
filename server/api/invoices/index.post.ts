import { usePostgres } from "../../utils/postgres"
import type { InvoiceDbEntity, InvoiceItemDbEntity, InvoiceWithItems } from "../../../shared/types/invoiceDbTypes"
import { format } from "date-fns"

export default eventHandler(async (event) => {
    const sql = usePostgres()

    const body = await readBody(event);
    const invoiceWithItems = body as InvoiceWithItems;
    const { invoice, items } = invoiceWithItems;

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
            ${invoice.turnoverDate ? format(new Date(invoice.turnoverDate), "yyyy-MM-dd HH:mm:ss.SSSSSS XXX") : null},
            ${invoice.paymentDeadline ? format(new Date(invoice.paymentDeadline), "yyyy-MM-dd HH:mm:ss.SSSSSS XXX") : null},
            ${invoice.value}
        )
        
        RETURNING id
    `;

        const insertedInvoiceId = idResult[0].id;

        const values = items.map(item => [
            insertedInvoiceId,
            item.order,
            item.description,
            item.unit,
            item.quantity,
            item.price,
            item.tax
        ]);

        await sql
            `INSERT INTO invoice_items (
                    invoice_id,
                    "order",
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