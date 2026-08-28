const PROTO_PATH = "./customers.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keep_case: true,
  longs: String,
  enums: String,
  arrays: true,
});
const customerProto = grpc.loadPackageDefinition(packageDefinition).customer;

// ---- Fake in-memory DB (Map = fast lookup by id) ----
const customers = new Map();

// ---- Customer model — ek jagah se structure decide hota hai ----
class Customer {
  constructor({ id, name, email }) {
    this.id = id;
    this.name = name || "John Doe";
    this.email = email || "john.doe@example.com";
  }
}

// ---- Helper error builders ----
function notFound(id) {
  return { code: grpc.status.NOT_FOUND, message: `Customer "${id}" not found` };
}
function invalidArgument(message) {
  return { code: grpc.status.INVALID_ARGUMENT, message };
}

// ---- getCustomer aur get dono same kaam karte the, isliye ek hi function ----
function fetchCustomer(call, callback) {
  const { id } = call.request;
  if (!id) return callback(invalidArgument("Customer id is required"));

  const customer = customers.get(id);
  if (!customer) return callback(notFound(id));

  callback(null, customer);
}

function insert(call, callback) {
  const { id, name, email } = call.request;
  if (!id) return callback(invalidArgument("Customer id is required"));

  if (customers.has(id)) {
    return callback({
      code: grpc.status.ALREADY_EXISTS,
      message: `Customer "${id}" already exists`,
    });
  }

  const customer = new Customer({ id, name, email });
  customers.set(id, customer);
  callback(null, customer);
}

function update(call, callback) {
  const { id, data = {} } = call.request;
  if (!id) return callback(invalidArgument("Customer id is required"));

  const existing = customers.get(id);
  if (!existing) return callback(notFound(id));

  const updated = new Customer({
    id,
    name: data.name || existing.name,
    email: data.email || existing.email,
  });
  customers.set(id, updated);
  callback(null, updated);
}

function remove(call, callback) {
  const { id } = call.request;
  if (!id) return callback(invalidArgument("Customer id is required"));
  if (!customers.has(id)) return callback(notFound(id));

  customers.delete(id);
  callback(null, { id });
}

// ---- Server setup ----
const server = new grpc.Server();
server.addService(customerProto.CustomerService.service, {
  getCustomer: fetchCustomer,
  get: fetchCustomer,
  insert,
  update,
  remove,
});

server.bindAsync(
  "127.0.0.1:30034",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Failed to bind server:", err);
      return;
    }
    console.log(`Server running at http://127.0.0.1:${port}`);
    server.start();
  },
);