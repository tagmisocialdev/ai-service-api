import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '..', '..', 'proto', 'ai-service.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition) as any;

export function createGrpcClient<T = any>(address: string = 'localhost:50051', ServiceName?: string): T {
  const svc = ServiceName || Object.keys(proto)[0];
  const Client = proto[svc][];
  return new Client(address, grpc.credentials.createInsecure());
}

// Example usage:
// const client = createGrpcClient('localhost:50051', 'core_api');
