#!/bin/bash

# Swipe Quiz - Azure Deployment Script
# This script deploys the app to Azure App Service

set -e  # Exit on any error

echo "🚀 Starting Azure Deployment for Swipe Quiz..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo -e "${RED}❌ Azure CLI not found!${NC}"
    echo "Install it from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

echo -e "${GREEN}✓${NC} Azure CLI found"

# Check if logged in
if ! az account show &> /dev/null; then
    echo -e "${YELLOW}⚠ Not logged in to Azure${NC}"
    echo "Running: az login"
    az login
fi

echo -e "${GREEN}✓${NC} Azure authentication verified"
echo ""

# Configuration
APP_NAME="${AZURE_APP_NAME:-ellies-game-$USER}"
RESOURCE_GROUP="${AZURE_RESOURCE_GROUP:-rg-ellies-game}"
LOCATION="${AZURE_LOCATION:-eastus}"
SKU="${AZURE_SKU:-B1}"  # Basic tier

echo -e "${BLUE}📋 Deployment Configuration:${NC}"
echo "   App Name:        $APP_NAME"
echo "   Resource Group:  $RESOURCE_GROUP"
echo "   Location:        $LOCATION"
echo "   SKU:             $SKU"
echo ""

# Step 1: Build the application
echo -e "${BLUE}🔨 Step 1: Building application...${NC}"
npm ci
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed - dist folder not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Build completed successfully"
echo ""

# Step 2: Compile server TypeScript
echo -e "${BLUE}📦 Step 2: Compiling server...${NC}"
npx tsc server/index.ts --outDir dist/server --module NodeNext --moduleResolution NodeNext --esModuleInterop --target ES2022

if [ ! -f "dist/server/index.js" ]; then
    echo -e "${RED}❌ Server compilation failed${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Server compiled successfully"
echo ""

# Step 3: Create deployment package
echo -e "${BLUE}📦 Step 3: Creating deployment package...${NC}"

# Copy server files
mkdir -p dist/server
cp -r server/*.js dist/server/ 2>/dev/null || true
cp -r server/*.d.ts dist/server/ 2>/dev/null || true

# Copy necessary files
cp package.json dist/
cp package-lock.json dist/ 2>/dev/null || true

# Create a production package.json (only dependencies, no devDependencies)
node -e "
const pkg = require('./package.json');
const prodPkg = {
  name: pkg.name,
  version: pkg.version,
  type: pkg.type,
  scripts: {
    start: 'node server/index.js'
  },
  dependencies: pkg.dependencies
};
require('fs').writeFileSync('dist/package.json', JSON.stringify(prodPkg, null, 2));
"

# Copy public assets
cp -r public dist/ 2>/dev/null || true

# Create web.config for Azure App Service
cat > dist/web.config << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="server/index.js" verb="*" modules="iisnode"/>
    </handlers>
    <rewrite>
      <rules>
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^server/index.js\/debug[\/]?" />
        </rule>
        <rule name="StaticContent">
          <action type="Rewrite" url="public{REQUEST_URI}"/>
        </rule>
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="server/index.js"/>
        </rule>
      </rules>
    </rewrite>
    <security>
      <requestFiltering>
        <hiddenSegments>
          <remove segment="bin"/>
        </hiddenSegments>
      </requestFiltering>
    </security>
    <httpErrors existingResponse="PassThrough" />
  </system.webServer>
</configuration>
EOF

echo -e "${GREEN}✓${NC} Deployment package ready"
echo ""

# Step 4: Create or update Azure resources
echo -e "${BLUE}☁️  Step 4: Setting up Azure resources...${NC}"

# Create resource group if it doesn't exist
if ! az group show --name "$RESOURCE_GROUP" &> /dev/null; then
    echo "Creating resource group: $RESOURCE_GROUP"
    az group create --name "$RESOURCE_GROUP" --location "$LOCATION"
    echo -e "${GREEN}✓${NC} Resource group created"
else
    echo -e "${GREEN}✓${NC} Resource group exists"
fi

# Create App Service Plan if it doesn't exist
PLAN_NAME="$APP_NAME-plan"
if ! az appservice plan show --name "$PLAN_NAME" --resource-group "$RESOURCE_GROUP" &> /dev/null; then
    echo "Creating App Service Plan: $PLAN_NAME"
    az appservice plan create \
        --name "$PLAN_NAME" \
        --resource-group "$RESOURCE_GROUP" \
        --sku "$SKU" \
        --is-linux
    echo -e "${GREEN}✓${NC} App Service Plan created"
else
    echo -e "${GREEN}✓${NC} App Service Plan exists"
fi

# Create Web App if it doesn't exist
if ! az webapp show --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" &> /dev/null; then
    echo "Creating Web App: $APP_NAME"
    az webapp create \
        --name "$APP_NAME" \
        --resource-group "$RESOURCE_GROUP" \
        --plan "$PLAN_NAME" \
        --runtime "NODE:18-lts"
    echo -e "${GREEN}✓${NC} Web App created"
else
    echo -e "${GREEN}✓${NC} Web App exists"
fi

# Configure Web App settings
echo "Configuring Web App settings..."
az webapp config set \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --startup-file "node server/index.js" \
    --always-on true

# Set Node version
az webapp config appsettings set \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --settings WEBSITE_NODE_DEFAULT_VERSION="~18" \
               SCM_DO_BUILD_DURING_DEPLOYMENT=true

echo -e "${GREEN}✓${NC} Web App configured"
echo ""

# Step 5: Deploy to Azure
echo -e "${BLUE}🚀 Step 5: Deploying to Azure...${NC}"
echo "This may take a few minutes..."
echo ""

cd dist
zip -r ../deploy.zip . > /dev/null
cd ..

az webapp deployment source config-zip \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --src deploy.zip

# Clean up zip file
rm deploy.zip

echo -e "${GREEN}✓${NC} Deployment completed!"
echo ""

# Get the URL
APP_URL=$(az webapp show --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" --query "defaultHostName" -o tsv)

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✨ Deployment Successful! ✨${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "🌐 Your app is live at: ${BLUE}https://$APP_URL${NC}"
echo ""
echo "📊 View logs:"
echo "   az webapp log tail --name $APP_NAME --resource-group $RESOURCE_GROUP"
echo ""
echo "🔄 Redeploy:"
echo "   ./deploy-azure.sh"
echo ""
echo "🗑️  Delete resources:"
echo "   az group delete --name $RESOURCE_GROUP"
echo ""
