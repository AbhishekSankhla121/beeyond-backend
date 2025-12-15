import express from 'express'

import userRoutes from "./routes/userRoutes.js"
import deliveryRoutes from "./routes/deliveryRoutes.js"
import adminRoutes from './routes/adminRoutes.js'
import healthRoutes from './routes/healthRoutes.js'
export const app = express()

const urlPrefix=`/api/v1`

// to check the backend application health 
app.use("/health",healthRoutes)

// user related endpoints 
app.use(`${urlPrefix}/user`,userRoutes)

// delivery related endpointss 
app.use(`${urlPrefix}/delivery`,deliveryRoutes)

// admins related encpoints
app.use(`${urlPrefix}/admin`,adminRoutes)