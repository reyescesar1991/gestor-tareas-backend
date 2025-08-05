// --- Manejadores de errores globales ---
// Deben estar al principio para capturar cualquier error síncrono durante la inicialización.
process.on('uncaughtException', (error) => {
    // Usamos console.error aquí porque el logger podría no estar inicializado.
    console.error('FATAL: Excepción no capturada:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('FATAL: Promesa rechazada no manejada en:', promise, 'razón:', reason);
    process.exit(1);
});

import "reflect-metadata"; // Debe ser la primera importación para que tsyringe funcione.
import dotenv from 'dotenv-safe'; // Usar dotenv-safe para validación
import { resolve } from 'path';

// Cargar y validar variables de entorno ANTES que cualquier otra cosa.
// Este es ahora el único lugar donde se cargan las variables.
dotenv.config({
    allowEmptyValues: false,
    example: resolve(process.cwd(), ".env.example"),
    path: resolve(process.cwd(), ".env")
});

import { config } from './core/config/config';
import { runAllDependencies } from './core/dependencies/dependencies';
import { initializeTestEnvironment } from './core/utils/connectDb';
import { logger } from "./core/logger/logger";

const startServer = async () => {
    try {
        // 1. Registrar todas las dependencias ANTES de cualquier otra cosa.
        await runAllDependencies();
        logger.info('🚀 Verificación de dependencias exitosa. El contenedor está listo.');

        // 2. Importar la app de Express DESPUÉS de registrar las dependencias.
        // Esto asegura que cuando las rutas intenten resolver los controladores,
        // sus dependencias ya estarán disponibles en el contenedor.
        const { app } = await import('./app');

        // 3. Conectar a la base de datos.
        await initializeTestEnvironment();

        // 4. Iniciar el servidor.
        app.listen(config.PORT, () => {
            logger.info(`✅ Servidor corriendo en el puerto ${config.PORT}`);
        })
    } catch (error) {
        logger.error('❌ Fallo crítico durante el arranque del servidor:', error);
        process.exit(1);
    }
}

startServer();