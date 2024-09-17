const configuration = () => ({
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
  },
  jwt: { secret: process.env.JWT_SECRET },
  mailer: { host: process.env.MAIL_TRANSPORT },
})

export type EnvironmentVariables = ReturnType<typeof configuration>

export default configuration
