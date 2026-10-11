#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=== Pulling latest changes ==="
git pull origin main

echo "=== Installing dependencies ==="
npm install

echo "=== Building application ==="
npm run build

echo "=== Ensuring permissions ==="
chown -R www-data:www-data "$SCRIPT_DIR"

echo "=== Restarting service ==="
systemctl restart khanabook

echo "=== Verifying status ==="
systemctl is-active --quiet khanabook && echo "khanabook.service is running successfully!" || { echo "Service failed to start"; exit 1; }
echo "=== Deployment complete ==="
