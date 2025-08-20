#!/bin/bash

# FitnessApp Deployment Script
# This script builds and deploys the FitnessApp to Firebase

set -e  # Exit on any error

echo "🚀 Starting FitnessApp deployment..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed. Please install it first."
    exit 1
fi

# Check if user is logged in
if ! firebase login:list &> /dev/null; then
    echo "❌ Not logged into Firebase. Please run 'firebase login' first."
    exit 1
fi

echo "📦 Building the application..."
pnpm build

echo "🔥 Deploying to Firebase..."
firebase deploy --only hosting,firestore

echo "✅ Deployment complete!"
echo "🌐 Your app is live at: https://fitness-app-bupe-staging.web.app"
echo "📊 Firebase Console: https://console.firebase.google.com/project/fitness-app-bupe-staging/overview"

# Optional: Deploy functions if Blaze plan is enabled
read -p "🤔 Would you like to deploy Cloud Functions? (requires Blaze plan) [y/N]: " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔥 Deploying Cloud Functions..."
    firebase deploy --only functions
    echo "✅ Functions deployed successfully!"
fi

echo "🎉 All done! Your FitnessApp is ready to use!"
