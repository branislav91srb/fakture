// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/scripts', '@nuxt/ui', 'nuxt-surrealdb'],
  css: ['~/assets/css/main.css'],
  surrealdb: {
    databases: {
      default: {
        host: 'https://xp-dev-069pegjjh9v4jebcd868d12cl0.aws-euw1.surreal.cloud',
        ws: 'wss://xp-dev-069pegjjh9v4jebcd868d12cl0.aws-euw1.surreal.cloud',
        NS: 'client',
        DB: 'fakture'
      }
    }
  },
  server: { // the following add auth only server side
    databases: {
      default: {
        auth: {
          auth: 'eyJhbGciOiJQUzI1NiIsImtpZCI6IjFkNmViYjAyLWM5ZjEtNDg4Zi1iNjhjLWNlMzMzMzU4YzgyOCIsInR5cCI6IkpXVCJ9.eyJhYyI6ImNsb3VkIiwiYXVkIjoiMDY5cGVnampoOXY0amViY2Q4NjhkMTJjbDAiLCJleHAiOjE3NjQwMTk4NDgsImlhdCI6MTc2NDAxOTI0OCwicmwiOlsiT3duZXIiXX0.PVnwE7ZXig7YsdGgHnaLDftGTKm2IqGj4Vi6Jlxru-60wS3hsIqroCXSBPybhbY-Phuj-uS3kSSt4z9eFde4oxqCqEo3gRdaFE8OHDZOU3b8hz-9jLHzg1GAcizvlRZtX5Oqrbz7DNNu_KcVRkGO02g_vmOTXh0Off42Tsaqf5ylfnyEz3Zgdd-ijVkfTc3LOmdBE7YHlQ_UpsSLK1mnFA8L41rUeX5nRCY8acAIJo3rwaOY1nNWM7Fs54Y3kT-xq3aHdZdoPEigXd5pNAjiP7gBvAo89d_FgHn21JSdu9ZNKK-kN0loCWk1H7mkPvlR__dIvcdN_zKSr5aCdoyZjg'
        }
      }
    }
  }
})