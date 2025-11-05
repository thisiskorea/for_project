-- Create databases
CREATE DATABASE mlflow;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE airesearch TO airesearch;
GRANT ALL PRIVILEGES ON DATABASE mlflow TO airesearch;
