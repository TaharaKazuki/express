import dotenv from 'dotenv'
import app from './app'
dotenv.config({ path: './config.env' })

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.info(`app running PORT:${PORT}`)
})
