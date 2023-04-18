# Welcome to the Admin Panel

## States

### Basic

1. **numbers**: state for storing a list of numbers.
2. **setNumbers**: function to update the numbers state.
3. **isLoading**: state for controlling a loading spinner.
4. **setIsLoading**: function to update the isLoading state.

### Schools

1. **schools**: state for storing a list of schools.
2. **setSchools**: function to update the schools state.
3. **loading**: state for controlling a loading spinner.
4. **setLoading**: function to update the loading state.
5. **editPopup**: state for controlling a popup for editing a school.
6. **setEditPopup**: function to update the editPopup state.
7. **school**: state for storing the input data for creating a new school.
8. **setSchool**: function to update the school state.

### Users

1. **users**: state for storing a list of users.
2. **setUsers**: function to update the users state.
3. **loading**: state for controlling a loading spinner.
4. **setLoading**: function to update the loading state.

## Functions

### Basic

1. **getData()**: this function retrieves data from the backend server and returns all the necessary information to display on the admin panel, including admins, rooms, schools, students, teachers, and users.

### Schools

1. **getSchools()**: this function retrieves all the information about schools from the backend server for display on the admin panel, including school ID, school name, date, and type.

2. **saveSchool()**: this function creates a new school by sending the new school data from the frontend to the backend.

### Users

1. **calculate_age()**: this function processes the date of birth of a user from the database and converts it to the user's age in years.

2. **getUsers()**: this function retrieves all the information about users from the backend server for display on the admin panel, including username, age, active status, creation date, role, and a button for editing the user information.


----------------------------
*Mousa Ibrahim*
