import { ServiceSchema } from 'moleculer';
import ApiGatewayService from 'moleculer-web';

export const GatewayServiceSchema: ServiceSchema = {
  name: 'api-gateway',
  mixins: [ApiGatewayService],
  settings: {
    port: process.env.GATEWAY_SERVICE_PORT ?? 3000,
    routes: [
      {
        aliases: {
          'GET companies': 'v1.companies.list',
          'GET companies/:id': 'v1.companies.get',
          'POST companies': 'v1.companies.create',
          'DELETE companies/:id': 'v1.companies.remove',
          'PUT companies/:id': 'v1.companies.update',
          'GET stations': 'v1.stations.list',
          'GET stations/:id': 'v1.stations.get',
          'POST stations': 'v1.stations.create',
          'DELETE stations/:id': 'v1.stations.remove',
          'PUT stations/:id': 'v1.stations.update',
          'GET stationTypes': 'v1.stationTypes.list',
          'GET stationTypes/:id': 'v1.stationTypes.get',
          'POST stationTypes': 'v1.stationTypes.create',
          'DELETE stationTypes/:id': 'v1.stationTypes.remove',
          'PUT stationTypes/:id': 'v1.stationTypes.update',
        },
        path: '/api',
        whitelist: [
          'companies.*',
          'v1.companies.*',
          'v1.stations.*',
          'v1.stationTypes.*',
          '$node'
        ],
      },
    ],
  },
};

export default GatewayServiceSchema;