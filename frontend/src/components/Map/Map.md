# Map Components Documentation

This document provides a detailed overview of the map components used in the project.

## 1. Map.js

The `Map.js` component is the main container for the entire map view. It includes the following sub-components:

- **Nav**: A navigation bar component that appears at the top of the page.
- **Header**: A header component that provides a brief introduction to the application.
- **Sidebar**: A sidebar component that displays a list of schools based on the user's search input.
- **GoogleMapReact**: A wrapper component for Google Maps that renders the map view.

### Key Features

- Fetches school data from the backend API and stores it as an array of pins.
- Displays pins on the map based on the user's search input.
- Handles click events for pins and displays an InfoWindow with school details.
- Provides a search input for filtering schools based on their names.

## 2. Sidebar.js

The `Sidebar.js` component displays a list of schools based on the user's search input. It provides the following functionality:

- Renders a search input for filtering schools.
- Maps through the filtered array of pins and renders a `Box` component for each school.
- Handles click events for each school `Box`, displaying the school's InfoWindow on the map.

## 3. InfoWindow.js

The `InfoWindow.js` component displays detailed information about a school when its corresponding pin or sidebar `Box` is clicked. It provides the following functionality:

- Renders the school name, image, and a button to navigate to the school's individual page.
- Provides a close button to hide the InfoWindow.

## 4. Header.js

The `Header.js` component provides a brief introduction to the application. It displays the application's title, a tagline, and instructions for using the map.
