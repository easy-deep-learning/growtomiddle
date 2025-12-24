#!/bin/bash

# Script to generate SSL certificates for local development using mkcert

set -e

echo "🔐 Setting up SSL certificates for growtomiddle.lol"

# Check if mkcert is installed
if ! command -v mkcert &> /dev/null; then
    echo "❌ mkcert is not installed."
    echo "Please install mkcert first:"
    echo "  macOS: brew install mkcert"
    echo "  Linux: https://github.com/FiloSottile/mkcert#linux"
    echo "  Windows: https://github.com/FiloSottile/mkcert#windows"
    exit 1
fi

# Create SSL directory if it doesn't exist
mkdir -p nginx/ssl

# Install local CA if not already installed
if [ ! -f "$(mkcert -CAROOT)/rootCA.pem" ]; then
    echo "📜 Installing local CA..."
    mkcert -install
fi

# Generate certificates
echo "📝 Generating SSL certificates..."
cd nginx/ssl
mkcert growtomiddle.lol "*.growtomiddle.lol" localhost 127.0.0.1 ::1

echo "✅ SSL certificates generated successfully!"
echo "📁 Certificates are located in: nginx/ssl/"
echo ""
echo "Next steps:"
echo "1. Add '127.0.0.1 growtomiddle.lol' to your /etc/hosts file"
echo "2. Run 'docker-compose up -d' to start the services"
echo "3. Visit https://growtomiddle.lol in your browser"

