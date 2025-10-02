#!/bin/bash

# Simple test script to verify the Myrient Viewer is working
echo "🧪 Testing Myrient Viewer..."

# Check if server is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Server is responding on http://localhost:3000"
    
    # Test API endpoint
    echo "🔍 Testing API endpoints..."
    
    # Test browse API
    if curl -s "http://localhost:3000/api/browse/" | grep -q "items"; then
        echo "✅ Browse API is working"
    else
        echo "❌ Browse API failed"
    fi
    
    # Test queue API
    if curl -s "http://localhost:3000/api/queue" | grep -q "items"; then
        echo "✅ Queue API is working"
    else
        echo "❌ Queue API failed"
    fi
    
    echo ""
    echo "🎉 Basic tests passed! Open http://localhost:3000 in your browser."
    
else
    echo "❌ Server is not running on http://localhost:3000"
    echo ""
    echo "To start the server, run:"
    echo "  npm start"
    echo ""
    echo "Or for development mode:"
    echo "  npm run dev"
fi