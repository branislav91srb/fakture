export type InvoiceDbEntity = {
    id?: string,
    invoiceNumber: string,
    companyId: string,
    clientId: string,
    dateCreated?: Date,
    turnoverDate: Date,
    paymentDeadline: Date,
    value: number
}

export type InvoiceItemDbEntity = {
    id?: number,
    invoiceId?: string
    order: number,
    description: string,
    unit: string
    quantity: number,
    price: number
    tax: number
}

export type InvoiceWithItems = {
    invoice: InvoiceDbEntity,
    items: InvoiceItemDbEntity[]
}