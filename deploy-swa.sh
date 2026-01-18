#!/bin/bash

# Deploy to Azure Static Web Apps
# This script deploys to your existing Static Web App

set -e

echo "🚀 Deploying to Azure Static Web Apps..."
echo ""

# Check for SWA CLI
if ! command -v swa &> /dev/null; then
    echo "📦 Installing Azure Static Web Apps CLI..."
    npm install -g @azure/static-web-apps-cli
fi

# Build the app
echo "🔨 Building application..."
npm run build

# Deploy using SWA CLI
echo "☁️  Deploying to Azure..."
echo ""
echo "⚠️  You'll need your deployment token from:"
echo "   Azure Portal → Static Web App → Deployment Token"
echo ""

# Option 1: Deploy with token in environment variable
if [ -n "$AZURE_STATIC_WEB_APPS_API_TOKEN" ]; then
    swa deploy \
        --app-location . \
        --output-location dist \
        --api-location server \
        --deployment-token "$AZURE_STATIC_WEB_APPS_API_TOKEN"
else
    echo "Set AZURE_STATIC_WEB_APPS_API_TOKEN environment variable or"
    echo "use the GitHub Actions workflow for automated deployment."
    echo ""
    echo "Get your deployment token:"
    echo "  az staticwebapp secrets list --name <app-name> --query properties.apiKey -o tsv"
fi

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your app: https://victorious-flower-0321b1b1e.1.azurestaticapps.net"
