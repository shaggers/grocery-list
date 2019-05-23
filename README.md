# Grocery List Take Home Assignment

###### By Cameron Lenartowich

### Start server

1. start - 'npm start'
2. view - visit the url 'http://localhost:3000'
3. close - control + 'c'

### Run Tests

Currently all tests are passing.

1. run tests - 'npm test'

If you see the cli for npm test but no tests are running, press 'a' to run all tests.

Press 'w' to view more options

If tests are failing, press 'u' to update snapshots

Close the testing cli by pressing 'q'

### Project Requirements

1. Save, Update, and Delete items to/from a database of your choosing.

Solution: Use the firebase database to manage application data. CRUD operations in a 
component have two main steps. First push data to firebase. Second update component state.

2. Authenticate users - allowing the same user to be signed in from multiple devices.

Solution: Use google authentication provided by google firebase.

3. Allow add, edit, delete, “mark as purchased”, and “unmark as purchased” on each item.

Solution: Use the firebase database to manage application data. CRUD operations in a 
component have two main steps. First push data to firebase. Second update state.

4. Keep the list synced in real time from each device.

Solution: Use the state of a component to be constantly be pulling realtime data from our database.

5. Accompany your code with a full test suite.

Solution: Use jest to keep track of snapshots. Use enzyme to select and render components and enzyme's methods
to work with components data.

6. Deploy your site to a web host (e.g., on Amazon EC2, Heroku, Netlify, Google AppEngine, etc.).

Solution: Deploy with firebase hosting that way all of our data (authentication, database, hosting) is being 
managed from the same resource and will be better organized that way.

### Technical Choices:

1. React.js

We used react here because the app is pretty much just a single page functionality composed of a couple components that contain dynamic content. Of which, each components data depends on one another. When the state changes we need to update the view and react automatically does that for us. For example when the state of the current room changes from 1 to 2, we need the application to recognize the change and upload all the items in the todo list for room 2. Other bonuses include easy 
routing, a quick user interface, and the elegance of working with state and props in unidirectional data-binding.

2. Google Firebase

We chose firebase becuase it is ideal for a small project being built by a solo developer who doesnt have the time to build
his/her own back end. Also firebase is packed with all the back end tools required for this project. That includes a 
realtime database, authentication, and hosting. Managing all these with a single resource requires learning only 1 technology,
versus 3. Firebase is also a great option for back end development when your front end is being built by tools such as react
and angular.

3. Jest and Enzyme

Jest and enzyme appear to be the go-to option when testing react applications. They both have a solid base of learning 
resources and documentation which is important becuase I had learned them for the first time when starting this project.
Jest provides a very useful and easy to use method called toMatchSnapshot(). Enzyme allows us to target and render components
by using methods such as shallow and mount. Enzyme also allows us to perform built in methods on components to read and work with their data.

4. Bootstrap

Bootstrap seems to be my go to css library when styling my projects. The main benefits that I recieve from Bootstrap are 
first the grid system. This allows you to easily control the size and space that an element is taking up on the page. This
also makes your website responsive. Second, input areas and forms are controlled nicely. Other things that are easily 
implemented and styled nicely are buttons and list groups. One more thing that I enjoy using in Bootstrap, however did not 
need it in this project is the navigation bar.

### Current issues to fix / What to do next: 

1. The page will not allow you to scroll down the list.

Potential Fix: Go to a previous branch before styling and see if the bug still exists. If it doesn't,
find exactly where in the css is causing this issue. If that is not the issue then try fixing divs that
surround the list and adding the css property overflow : 'scroll' or 'auto'.

2. The edit and add todo input areas overlap the page when adjusting the screen size to mobile.

Potential Fix: Adjust the bootstrap column size property on these html elements. Also try playing around with
css properties such as width, min-width, max-width, margin, padding, etc...

3. The time format displayed for todos's is too long and irrelevant.

Potential fix: The following code will take a date such as Wed May 22 2019 01:58:04 GMT-0500 (Central Daylight Time)
and make it Wed May 22 2019
```
function formatDate(firebaseTime) {
    let timeArray = firebaseTime.split(' ');
    let returnArray = [];
    for(let i = 0 ; i <= 3){
        returnArray.push(timeArray[i]);
    }
    let returnString = returnArray.join(' ');
    return returnString;
}
```

4. Issues when testing props and events with enzyme and jest. The current attempts to solve these problems are commented out in /tests/ItemList.test.js

Potential fix: Keep finding new resources for testing with these tools and develop a better syntax when rendering components and initializing their props. Also see if there is a way to get the state of the current component. Ideally find clean syntax and enzyme methods to communicate with the component.

5. Repeating code

Potential fix: Take out repeating code and create a single variable or function that can be modularized and imported and exported out of the places where it is used. In some places such as tests, the initialization and configuration for each module is very repetitive and long. Fix this by creating a module that imports all required tools and will be exported to the test files.

6. Make items more dynamic

Potential fix: Use icons for buttons and on click create dropdown component similar to how the edit button works. Also on initial page render, center the display to select a room and then on click move the room list to left of the page where it is now.

---------------------------------

## Defaul create-react-app README

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
