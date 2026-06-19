Protos & Events

- Proto files are in proto/*.proto. Run protoc or use ts-proto / grpc-tools to generate TypeScript definitions.
- gRPC skeletons provided in src/grpc/*.ts (client.ts, server.ts). They are lightweight and work with @grpc/grpc-js + @grpc/proto-loader.
- Kafka client skeleton in src/events/kafka.client.ts using kafkajs. Use publish/subscribe helpers.

Suggested generation commands (example):
  # Install plugin e.g. ts-proto and protoc
  protoc --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto     --ts_proto_out=./src/grpc --ts_proto_opt=outputServices=grpc-js,esModuleInterop=true     -I proto proto/*.proto

