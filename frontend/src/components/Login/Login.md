# Login Component Documentation

This document provides a detailed overview of the `Login` component used in the project.

## Login.js

The `Login` component is responsible for rendering the login form for users. It includes the following key parts:

### Imports

- React and useState: To manage the state of the component.
- useNavigate: A hook from 'react-router-dom' to navigate between pages.
- Chakra UI components: Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text, and useToast are used for styling and UI.
- useDispatch: A hook from 'react-redux' to dispatch actions to the Redux store.
- setLogin, setUserId, setLogout, setUserName, and setRole: Redux action creators to update the user's authentication state.
- axios: A library to make HTTP requests.
- Nav: A navigation component to be displayed at the top of the page.

### Component State

The component maintains the following state variables:

- userData: An object containing the user's email and password.
- isLoading: A boolean representing if the login request is being processed.
- error: A string representing any error messages during the login process.

### login function

The `login` function is an asynchronous function that is called when the form is submitted. It sends a POST request to the API to log in the user. If successful, it dispatches actions to update the Redux store with the user's information and token, and then navigates to the home page. If there's an error, the error message is displayed to the user.

### Component JSX

The component JSX consists of:

- A `Nav` component.
- A `Box` component wrapping the entire login form.
- A `Heading` component displaying "Login".
- A `form` element containing two `FormControl` components for the user's email and password, and a `Button` component to submit the form.

The form inputs are controlled by the `userData` state object, and their values are updated using the `setUserData` function.

If there's an error during login, the error message is displayed using a `Text` component with a red color.
