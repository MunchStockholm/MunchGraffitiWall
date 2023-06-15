# Graffiti Wall Application for Munch

Welcome to GraffitiWall, an interactive platform where users can create their unique artworks and exhibit them on a digital graffiti wall. This project is built using React and TypeScript.

In its current version, GraffitiWall enables users to design their artwork and send it to a database where it's displayed on the graffiti wall. Future versions will allow users to receive their artwork as a souvenir!

## Table of contents

- Application Modes
- Installation and Setup Instructions
- Environment Setup
- Application Structure
- Reporting Bugs

## Application Modes

The app provides two modes of interaction:

1. Admin Mode: This mode grants access to the admin control board. To enter, you must provide a valid password.
2. Guest Mode: This mode allows users to navigate between various pages such as Home, Draw, Souvenir, and Paintings.

## Installation and Setup Instructions

Clone down this repository. You will need Node.js and npm installed globally on your machine.

Installation:

`npm install`

To Start Server:

`npm start`

**Note**: It is important to run the server on port 3000 due to CORS restrictions. The backend server only allows origin from this address.

To Visit App:

`localhost:3000`

## Environment Setup

For security reasons, the admin password isn't hard-coded into the project. Instead, it's stored in a `.env` file which isn't committed to the repository.

To setup your environment, create a `.env` file in the root directory of the project, with the following content:

`REACT_APP_ADMIN_PASSWORD=<your_admin_password_here>`

## Application Structure

- `index.tsx`: This is the entry point of our app. It wraps our app with the provided context providers, ArtworkProvider and ArtworkIdProvider.
- `App.tsx`: This is our main component which currently renders the Login component.
- `Login.tsx`: This component is responsible for handling both admin and guest login. Depending on the username, it either renders the AdminControlBoard component or a Router component that handles navigation between HomePage, DrawPage and Souvenir.
- `HomePage.tsx` and `Home.tsx`: These components present the homepage of the app. It displays a set of instructions for users to follow in both English and Norwegian, and a start button that leads to the drawing page.
- `DrawPage.tsx`: This component renders the DrawingBoard component where users can create their unique artworks.
- `DrawingBoard.jsx`: A component that forms the heart of the art application. It uses a canvas for drawing, allows color and brush size selection, implements undo functionality, handles user interactions and sends requests to a server to save artwork. The state and properties of the canvas are managed through various React hooks.
- `AdminControlBoard.tsx`: This component is responsible for fetching images from the API and managing them in a grid. It contains functionalities for loading, displaying, and removing images. It fetches image data using the ArtworkContext and updates its local state accordingly.
- `IArtworkContext.ts`: This interface defines the shape of the context object used by ArtworkProvider. It contains artworks array and two methods: getArtworksFromService and getArtworkByIdFromService.
- `ArtworkProvider.tsx`: This component provides ArtworkContext to its children. It communicates with the ArtworkService to fetch artworks and holds this data in its state.
- `ArtworkIdProvider.tsx`: This component provides ArtworkIdContext to its children. It keeps track of the current artwork ID.
- `ArtworkService.ts`: This module provides an interface to communicate with the server. It exports two methods: getArtworks and getArtworkById.

Additionally, there are three important configuration files:

- `tsconfig.json`: This configuration file provides directions to the compiler to generate JavaScript code suitable for es5 environments. It also includes some strict type-checking options.
- `package.json`: It contains the list of project dependencies and devDependencies, scripts, version, license information, etc.
- `webpack.config.js`: The Webpack configuration is set up to fallback certain environment features to their browser alternatives.

## Reporting Bugs

Known issues include lengthy load times when there are many drawings in the admin control board, lines continuing to draw when entering the canvas again after drawing outside it, and lines changing their pixels when the undo button is pressed on the drawing board.