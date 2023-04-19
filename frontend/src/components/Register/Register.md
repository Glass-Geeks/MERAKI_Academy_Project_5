# Register Component Documentation

This document provides a detailed overview of the `Register` component used in the project.

## Register.js

The `Register` component is responsible for rendering the registration form for users. It includes the following key parts:

### Imports

- React and useState: To manage the state of the component.
- useNavigate: A hook from 'react-router-dom' to navigate between pages.
- Chakra UI components: Box, VStack, HStack, Heading, FormControl, FormLabel, Input, Radio, RadioGroup, Button, InputGroup, and InputRightAddon are used for styling and UI.
- axios: A library to make HTTP requests.
- Nav: A navigation component to be displayed at the top of the page.

### Component State

The component maintains the following state variables:

- userData: An object containing the user's email, first_name, last_name, role, password, user_image, and dob.
- isLoading: A boolean representing if the registration request is being processed.

### handleInputChange function

The `handleInputChange` function is called when any of the form input values change. It updates the corresponding value in the `userData` state object.

### processFile function

The `processFile` function is an asynchronous function called when a user uploads an image. It uploads the image to Cloudinary and updates the `user_image` property in the `userData` state object with the image URL.

### handleSubmit function

The `handleSubmit` function is called when the form is submitted. It sends a POST request to the API to register the user. If successful, it navigates to the login page.

### Component JSX

The component JSX consists of:

- A `Nav` component.
- A `Box` component wrapping the entire registration form.
- A `VStack` component containing multiple `FormControl` components for the user's first_name, last_name, dob, user_image, email, password, and role, as well as a `Button` component to submit the form.

The form inputs are controlled by the `userData` state object, and their values are updated using the `handleInputChange` function.
