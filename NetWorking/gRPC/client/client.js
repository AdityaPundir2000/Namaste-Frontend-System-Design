const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

// server wali proto file ka path (customer.proto server folder me hai)
const PROTO_PATH = path.join(__dirname, "../server/customer.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keep_case: true,
  longs: String,
  enums: String,
  arrays: true,
});

const customerProto = grpc.loadPackageDefinition(packageDefinition).customer;

// server 0.0.0.0:50051 pe chal raha hai, client wahi connect karega
const client = new customerProto.CustomerService(
  "127.0.0.1:30034",
  grpc.credentials.createInsecure()
);

module.exports = client;