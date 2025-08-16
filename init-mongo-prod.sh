#!/bin/bash
set -e

echo "Waiting for MongoDB to start..."
sleep 10

echo "Creating admin user..."
mongosh --eval "
  db = db.getSiblingDB('admin');
  db.createUser({
    user: 'admin_lead',
    pwd: 'LeadPass2024',
    roles: [
      { role: 'root', db: 'admin' },
      { role: 'readWrite', db: 'lead-db-prod' }
    ]
  });
"

echo "Creating production database and collections..."
mongosh --username admin_lead --password 'LeadPass2024' --authenticationDatabase admin --eval "
  db = db.getSiblingDB('lead-db-prod');
  db.createCollection('empleados');
  db.createCollection('users');
  db.createCollection('departamentos');
  db.createCollection('nominas');
  db.createCollection('captaciones');
  db.createCollection('casasInventario');
  db.createCollection('notes');
  db.createCollection('roles');
"

echo "MongoDB production initialization completed successfully!"
