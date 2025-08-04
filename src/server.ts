import {app} from './app';
import { config } from './core/config/config';
import { initializeTestEnvironment } from './core/utils/connectDb';

const startServer = async () => {

    try {

        // --- Verificación de Dependencias ---
        // logger.info('Verificando la resolución de dependencias clave...');
        // container.resolve(OAuthService); // Intenta resolver un servicio crítico.
        // logger.info('🚀 Verificación de dependencias exitosa. El contenedor está listo.');
        // ---------------------------------

        await initializeTestEnvironment();
        app.listen(config.PORT, () => {

            console.log(`Server running on port ${config.PORT}"`);

        })

    } catch (error) {
        // logger.error('❌ Fallo critico durante el arranque del servidor:', error);
        process.exit(1);
    }
}

startServer();
process.on('uncaughtException', (error) => {

    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
});