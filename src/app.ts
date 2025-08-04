import express from 'express';
import { errorHandler } from './api/middleware/error.middleware';
import cors from 'cors';
import helmet from 'helmet';

const app = express();


// --- Middlewares de Seguridad y CORS ---

// 1. Helmet: Ayuda a proteger tu aplicación de algunas vulnerabilidades web conocidas
// estableciendo varias cabeceras HTTP de seguridad. Es una buena práctica usarlo siempre.
app.use(helmet());

// 2. CORS: Cross-Origin Resource Sharing. Esencial para permitir que tu frontend
// (ej. en http://localhost:4205) se comunique con tu backend (ej. en http://localhost:3001).
const allowedOrigins = [
    'http://localhost:4205',
];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        // Permite solicitudes sin 'origin' (como las de Postman, apps móviles o cURL)
        // y las que vienen de los orígenes en nuestra lista blanca.
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por la política de CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP que permites
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras que permites en las peticiones
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({extended : true}));



app.use(errorHandler);


export {app}