#!/bin/bash

# Navigate to the project root directory (coinMatrix)
# Assuming you're already inside the coinMatrix directory

# Create client directory structure
mkdir -p client/{public,src/{assets,components,pages,services,styles}}

# Create client files
touch client/README.md client/.env client/package.json
touch client/src/App.js client/src/index.js client/src/routes.js

# Create server directory structure
mkdir -p server/{config,controllers,models,routes,middleware,utils}

# Create server files
touch server/README.md server/.env server/package.json server/server.js

# Create root-level files
touch .gitignore README.md package.json

echo "Inner folder structure for 'coinMatrix' created successfully!"

