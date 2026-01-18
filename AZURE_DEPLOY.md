# Azure Deployment Guide

This guide explains how to deploy the Swipe Quiz app to Azure.

## Prerequisites

1. **Azure CLI** - Install from [docs.microsoft.com/cli/azure/install-azure-cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
2. **Node.js 18+** - Required for building the app
3. **Azure Account** - Free tier available at [azure.microsoft.com/free](https://azure.microsoft.com/free/)

## Quick Deploy

Run the deployment script:

```bash
npm run deploy:azure
```

Or directly:

```bash
./deploy-azure.sh
```

The script will:
1. ✅ Check Azure CLI installation
2. 🔐 Log you in if needed
3. 🔨 Build the React app
4. 📦 Compile the Express server
5. ☁️  Create Azure resources (if they don't exist)
6. 🚀 Deploy the application
7. 🌐 Provide your live URL

## Configuration

Customize deployment with environment variables:

```bash
# Custom app name (default: ellies-game-$USER)
export AZURE_APP_NAME="my-swipe-quiz"

# Custom resource group (default: rg-ellies-game)
export AZURE_RESOURCE_GROUP="my-resource-group"

# Azure region (default: eastus)
export AZURE_LOCATION="westus2"

# App Service SKU (default: B1 - Basic)
# Options: F1 (Free), B1 (Basic), S1 (Standard), P1V2 (Premium)
export AZURE_SKU="B1"

# Then deploy
npm run deploy:azure
```

## Deployment Steps (Manual)

If you prefer manual control:

### 1. Build the application

```bash
npm ci
npm run build
```

### 2. Login to Azure

```bash
az login
```

### 3. Create resources

```bash
# Set variables
APP_NAME="ellies-game"
RESOURCE_GROUP="rg-ellies-game"
LOCATION="eastus"

# Create resource group
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create App Service Plan
az appservice plan create \
  --name "$APP_NAME-plan" \
  --resource-group $RESOURCE_GROUP \
  --sku B1 \
  --is-linux

# Create Web App
az webapp create \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --plan "$APP_NAME-plan" \
  --runtime "NODE:18-lts"
```

### 4. Configure the app

```bash
# Set startup command
az webapp config set \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --startup-file "node server/index.js" \
  --always-on true

# Configure Node version and build settings
az webapp config appsettings set \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --settings \
    WEBSITE_NODE_DEFAULT_VERSION="~18" \
    SCM_DO_BUILD_DURING_DEPLOYMENT=true
```

### 5. Deploy

```bash
# Create deployment package
cd dist
zip -r ../deploy.zip .
cd ..

# Deploy to Azure
az webapp deployment source config-zip \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --src deploy.zip
```

## Monitoring

### View live logs

```bash
az webapp log tail --name ellies-game --resource-group rg-ellies-game
```

### Stream logs

```bash
az webapp log tail --name ellies-game --resource-group rg-ellies-game
```

### Access the portal

```bash
az webapp browse --name ellies-game --resource-group rg-ellies-game
```

## Troubleshooting

### Check application logs

```bash
az webapp log download \
  --name ellies-game \
  --resource-group rg-ellies-game \
  --log-file logs.zip
```

### Restart the app

```bash
az webapp restart \
  --name ellies-game \
  --resource-group rg-ellies-game
```

### Check deployment status

```bash
az webapp deployment list-publishing-credentials \
  --name ellies-game \
  --resource-group rg-ellies-game
```

## Updating the App

To deploy updates:

```bash
npm run deploy:azure
```

The script automatically handles incremental updates.

## Cost Management

### Free Tier (F1)
- Good for testing
- Limited compute resources
- Deploy with: `export AZURE_SKU="F1"`

### Basic Tier (B1) - Default
- ~$13/month
- Better performance
- Suitable for production

### Stop the app when not in use

```bash
az webapp stop --name ellies-game --resource-group rg-ellies-game
```

### Delete all resources

```bash
az group delete --name rg-ellies-game
```

## CI/CD with GitHub Actions

To set up automated deployments from GitHub:

1. Get publish profile:
```bash
az webapp deployment list-publishing-profiles \
  --name ellies-game \
  --resource-group rg-ellies-game \
  --xml
```

2. Add as GitHub secret named `AZURE_WEBAPP_PUBLISH_PROFILE`

3. Create `.github/workflows/azure-deploy.yml`:
```yaml
name: Deploy to Azure

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: azure/webapps-deploy@v2
        with:
          app-name: ellies-game
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: ./dist
```

## Support

- [Azure App Service Documentation](https://docs.microsoft.com/azure/app-service/)
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/)
- [Node.js on Azure](https://docs.microsoft.com/azure/app-service/quickstart-nodejs)
