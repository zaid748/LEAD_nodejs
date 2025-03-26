#!/bin/bash
set -e

echo "Starting MongoDB..."
mongod --bind_ip_all &

echo "Waiting for MongoDB to start..."
sleep 10

echo "Creating admin user..."
mongosh --eval "
  db = db.getSiblingDB('admin');
  db.createUser({
    user: 'admin_lead',
    pwd: 'L3@d2024#SecureDB!',
    roles: [
      { role: 'root', db: 'admin' },
      { role: 'readWrite', db: 'lead-db-prueba' }
    ]
  });
"

echo "Creating database and collection..."
mongosh --username admin_lead --password 'L3@d2024#SecureDB!' --authenticationDatabase admin --eval "
  db = db.getSiblingDB('lead-db-prueba');
  db.createCollection('empleados');
"

echo "Importing data..."
cd /dump
mongoimport --username admin_lead --password 'L3@d2024#SecureDB!' --authenticationDatabase admin --db lead-db-prueba --collection empleados --file myFirstDatabase.empleados.json --jsonArray

echo "Shutting down MongoDB..."
mongod --shutdown

echo "Starting MongoDB with authentication..."
exec mongod --auth --bind_ip_all 