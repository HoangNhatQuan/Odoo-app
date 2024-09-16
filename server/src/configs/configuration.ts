const configuration = () => ({
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  youtubeApi: {
    key: process.env.YOUTUBE_API_KEY,
  },
})

export type EnvironmentVariables = ReturnType<typeof configuration>

export default configuration
