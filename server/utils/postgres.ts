import postgres from 'postgres'

export function usePostgres() {
    if (!process.env.NUXT_POSTGRES_URL) {
        throw createError('Missing `NUXT_POSTGRES_URL` environment variable')
    }

    const ssl = process.env.NUXT_POSTGRES_SSL === 'require' ? 'require' : false

    return postgres(process.env.NUXT_POSTGRES_URL as string, { ssl })
}
