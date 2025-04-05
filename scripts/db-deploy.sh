#!/usr/bin/env bash
# Before execute, run: chmod +x scripts/*

DIR="$(cd "$(dirname "$0")" && pwd)"
source "$DIR/setenv.sh"

echo '🟡 - Starting services...'
docker compose up -d

echo '🟡 - Waiting for database to be ready...'
"$DIR/wait-for-it.sh" "${POSTGRES_PRISMA_URL}" -- echo '🟢 - Database is ready!' || {
    echo '🔴 - Database is not ready or timeout occurred'
    exit 1
}

echo '🟢 - Database is ready, running migrations...'
npx prisma migrate dev