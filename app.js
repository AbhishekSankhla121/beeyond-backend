import express from 'express'
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import deliveryRoutes from "./routes/deliveryRoutes.js"
import adminRoutes from './routes/adminRoutes.js'
import healthRoutes from './routes/healthRoutes.js'
import authRoutes from './routes/authRoutes.js'

export const app = express()
config({
    path:".env"
})

export const FrontendUrl=process.env.FRONTEND_URL || "http://localhost:3000"
const urlPrefix=`/api/v1`
app.use(express.urlencoded(
    {
        extended:true
    }
))
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:FrontendUrl, 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true
}));

// to check the backend application health 
app.use("/health",healthRoutes)

// user related endpoints 
app.use(`${urlPrefix}/user`,userRoutes)

// delivery related endpointss 
app.use(`${urlPrefix}/delivery`,deliveryRoutes)

// admins related encpoints
app.use(`${urlPrefix}/admin`,adminRoutes)

// authentication 
app.use(urlPrefix, authRoutes)