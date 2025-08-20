#!/bin/bash

# 🧪 Test CI/CD Pipeline
# This script helps you test the CI/CD pipeline after setup

echo "🧪 FitTrack CI/CD Pipeline Test"
echo "==============================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 Current Status:${NC}"
echo "Branch: $(git branch --show-current)"
echo "Repository: $(git remote get-url origin)"
echo ""

echo -e "${YELLOW}⚠️  Before testing, make sure you have:${NC}"
echo "1. ✅ Added GitHub secrets for Firebase service accounts"
echo "2. ✅ Set up production environment protection"
echo "3. ✅ Both Firebase projects are ready"
echo ""

read -p "Are you ready to test the CI/CD pipeline? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}🚀 Starting CI/CD test...${NC}"
    echo ""
    
    # Make sure we're on dev branch
    if [[ $(git branch --show-current) != "dev" ]]; then
        echo -e "${YELLOW}📝 Switching to dev branch...${NC}"
        git checkout dev
    fi
    
    # Create a test change
    echo -e "${BLUE}📝 Creating test change...${NC}"
    echo "# CI/CD Test - $(date)" >> README.md
    
    # Commit and push
    echo -e "${BLUE}📤 Committing and pushing...${NC}"
    git add README.md
    git commit -m "🧪 Test CI/CD pipeline - $(date)"
    git push origin dev
    
    echo ""
    echo -e "${GREEN}✅ Test change pushed to dev branch!${NC}"
    echo ""
    echo -e "${BLUE}📊 Monitor the deployment:${NC}"
    echo "GitHub Actions: https://github.com/BUPE-NONDO/fitnessapp/actions"
    echo "Staging URL: https://fitness-app-bupe-staging.web.app"
    echo ""
    echo -e "${YELLOW}⏳ The CI/CD pipeline should now be running...${NC}"
    echo "Check the GitHub Actions tab to see the progress!"
    echo ""
    echo -e "${GREEN}🎯 Expected Results:${NC}"
    echo "✅ Quality Checks job passes"
    echo "✅ Deploy to Staging job passes"
    echo "✅ Security Checks job passes"
    echo "✅ Bundle Analysis job passes"
    echo "✅ App deployed to staging Firebase project"
    
else
    echo -e "${YELLOW}⏸️  Test cancelled.${NC}"
    echo ""
    echo "To test later, run: ./scripts/test-cicd.sh"
fi

echo ""
echo -e "${BLUE}📚 Additional Commands:${NC}"
echo "Check GitHub Actions: open https://github.com/BUPE-NONDO/fitnessapp/actions"
echo "Check staging app: open https://fitness-app-bupe-staging.web.app"
echo "Check production app: open https://fitness-app-bupe-production.web.app"
echo ""
