import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '..', '..', 'proto', 'ai-service.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {} as any);
const proto = grpc.loadPackageDefinition(packageDefinition) as any;

export function startGrpcServer(bindAddr = '0.0.0.0:50051') {
  const server = new grpc.Server();
  // Implement service methods here (Health example)
  const serviceImpl = {
    Health: (call: any, callback: any) => {
      callback(null, { status: 'ok' });
    },
  };
  // Register service - name resolution depends on proto; using first exported package
  const pkgName = Object.keys(proto)[0];
  const serviceName = Object.keys(proto[pkgName])[0];
  server.addService(proto[pkgName][serviceName].service, serviceImpl);
  server.bindAsync(bindAddr, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) throw err;
    server.start();
    console.log();
  });
  return server;
}
