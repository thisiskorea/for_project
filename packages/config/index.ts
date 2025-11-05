export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    timeout: 30000,
  },
  auth: {
    tokenKey: 'ai_research_token',
    refreshTokenKey: 'ai_research_refresh_token',
  },
  features: {
    enableGPU: process.env.NEXT_PUBLIC_ENABLE_GPU === 'true',
    enableCommunity: process.env.NEXT_PUBLIC_ENABLE_COMMUNITY === 'true',
  },
  limits: {
    maxFileSize: 100 * 1024 * 1024, // 100MB
    maxProjectsPerUser: 100,
    maxTeamMembers: 50,
  },
}
