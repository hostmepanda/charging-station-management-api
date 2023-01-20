import { ServiceSchema } from 'moleculer';
import ApiGatewayService from 'moleculer-web';

export const GatewayServiceSchema: ServiceSchema = {
  name: 'api-gateway',
  mixins: [ApiGatewayService],
  settings: {
    port: process.env.GATEWAY_SERVICE_PORT ?? 3000,
    routes: [
      {
        path: '/api',
        whitelist: [
          'v1.companies.*',
          'v1.stations.*',
        ],
        autoAliases: true,
      },
    ],
  },
};

export default GatewayServiceSchema;