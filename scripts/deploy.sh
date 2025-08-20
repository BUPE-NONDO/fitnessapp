#!/bin/bash

# 🚀 FitTrack Deployment Script
# This script builds and deploys the app to Firebase hosting

set -e

echo "🚀 FitTrack Deployment Script"
echo "============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to deploy to environment
deploy_to_environment() {
    local environment=$1
    local project_alias=$2
    
    echo -e "${BLUE}🚀 Deploying to $environment...${NC}"
    
    # Switch to the project
    firebase use $project_alias
    
    # Build the app
    echo -e "${YELLOW}📦 Building app...${NC}"
    pnpm build
    
    # Deploy to Firebase hosting
    echo -e "${YELLOW}📤 Deploying to Firebase hosting...${NC}"
    firebase deploy --only hosting
    
    echo -e "${GREEN}✅ $environment deployment complete!${NC}"
    echo ""
}

# Check if environment argument is provided
if [ $# -eq 0 ]; then
    echo -e "${YELLOW}📋 Usage: $0 [staging|production|both]${NC}"
    echo ""
    echo "Options:"
    echo "  staging    - Deploy to staging environment"
    echo "  production - Deploy to production environment"
    echo "  both       - Deploy to both environments"
    echo ""
    echo "Examples:"
    echo "  $0 staging"
    echo "  $0 production"
    echo "  $0 both"
    echo ""
    exit 1
fi

ENVIRONMENT=$1

case $ENVIRONMENT in
    "staging")
        deploy_to_environment "Staging" "staging"
        echo -e "${GREEN}🎉 Staging deployment complete!${NC}"
        echo "URL: https://fitness-app-bupe-staging.web.app"
        ;;
    "production")
        deploy_to_environment "Production" "production"
        echo -e "${GREEN}🎉 Production deployment complete!${NC}"
        echo "URL: https://fitness-app-bupe-production.web.app"
        ;;
    "both")
        deploy_to_environment "Staging" "staging"
        deploy_to_environment "Production" "production"
        echo -e "${GREEN}🎉 Both deployments complete!${NC}"
        echo "Staging URL: https://fitness-app-bupe-staging.web.app"
        echo "Production URL: https://fitness-app-bupe-production.web.app"
        ;;
    *)
        echo -e "${RED}❌ Invalid environment: $ENVIRONMENT${NC}"
        echo "Valid options: staging, production, both"
        exit 1
        ;;
esac

echo ""
echo -e "${BLUE}📊 Deployment Summary:${NC}"
echo "Staging Console: https://console.firebase.google.com/project/fitness-app-bupe-staging/hosting"
echo "Production Console: https://console.firebase.google.com/project/fitness-app-bupe-production/hosting"
echo ""
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
