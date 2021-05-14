# NoveList
  NoveList is a website designed for readers to keep track of the novels they have read, log start- and finish-dates, make notes on their reading, and connect with friends.

## Table of Contents
  * [Project Requirements and Features List](#project-requirements-and-features-list)
  * [Technologies Used](#technologies-used)
  * [Installing and Launching NoveList](#instructions-for-installing-NoveList)
  * [Appendix 1: Planning Documentation](#appendix-1-planning-documentation)
    * [Entity Relationship Diagrams](#entity-relationship-diagram)
    * [Wireframes](#wireframes)
  * [Appendix 2: Set Up Instructions](#appendix-2-set-up-instructions)

## Project Requirements and Features List
### Get Started
When a user first registers an account with NoveList they will be directed to a welcome page.  Will go to the Search option in the NavBar and search for their first novel to begin their library.
![Searching for a new Read](./client/src/images/SearchResults.png)
![Adding a Book](./client/src/images/AddingBook.png)

### NoveList
Once a user has added one or more books to their library they can navigate to Novels to see a list of their added titles. From here they can click the novel's title to see a detail view of that book, including notes they have added and a list of friends who have also sheved the book. 
![Book List](./client/src/images/NoveListListView.png)
![Book ListDetails](./client/src/images/BookDetailView.png)

## Technologies Used
  ### Development Languages and Libraries
  <img src="./client/src/images/react.png" width="10%"></img> <img src="./client/src/images/PngItem_3450034.png" width="10%"></img> <img src="./client/src/images/456px-NET_Logo.png" width="10%"></img> <img src="./client/src/images/ASP.NET-Web-API-Logo.png" width="50%"></img> <img src="./client/src/images/Google_Books_logo_2015.png" width="30%"></img> <img src="./client/src/images/logo-standard.png" width="30%"></img> <img src="./client/src/images/sql-server-icon-png-11352.png" width="10%"></img> 
  <img src="./client/src/images/bootstrap.png" width="10%"></img> <img src="./client/src/images/fontawesome.png" width="10%"></img>

  ### Development Tools
 
  <img src="./client/src/images/github.png" width="10%"></img>  <img src="./client/src/images/Daco_5237557.png" width="10%"></img>
  <img src="./client/src/images/vsCode .png" width="10%"></img> <img src="./client/src/images/sketchboard.jpeg" width="10%"></img> <img src="./client/src/images/dbdiagram.png" width="20%"></img> 
  

## Instructions for Installing NoveList
  To launch the KaBloom app, you will need to have access to command line tools, node package manager, JSON Server. If you do not have access to any of these tools, you can find instructions for installing them in the [Appendix.](#appendix-2-set-up-instructions)

  Clone this repo on you personal machine using the following command
  ```sh
    git clone git@github.com:xine75/NoveList.git
  ```

  Install the NPM dependencies for this project using the following commands
  ```sh
    cd NoveList
    npm install
  ```

  From your terminal window, type
  ```sh
    npm start
  ```

  Now that the server is up and running, you can open an internet browser and access the application
  ```sh
    http://localhost:8080/
  ```

 ### Congratulations you are now experiencing NoveList!

  ## Appendix 1: Planning Documentation

  ### Entity Relationship Diagram
  ![NoveList ERD](./client/src/images/ERD-NoveList.png)

  ### Wireframes/ Mockups
  <img src="./client/src/images/Wireframe.png" width="75%"></img> 


  ## Appendix 2: Set Up Instructions

  You will need to have command line tools installed for your computer to use terminal commands.

  Linux/ Windows users, please visit the [Git page](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and follow the instructions for set up

  Mac users follow the instructions below

  Open your terminal and type
  ```sh
    git --version
  ```

  You will now need to configure your git account. In the terminal window, type:
  ```sh
    git config -global user.name "Your Name"
    git config -global user.email "Your Email"
  ```

  If you do not have Node.js installed on your machine, visit the [Node.js Download Page](https://nodejs.org/en/download/) and  follow the instructions. To ensure that it is installed correctly, in your terminal window, type
  ```sh
    echo $PATH
  ```
  Ensure that the result has the following in the $PATH
  ```sh
    /usr/local/bin
    or
    /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
  ```

  Now you can follow the [installation instructions](#instructions-for-installing-NoveList) to get NoveList up and running on your machine.

  This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
  
### Getting Started

1. Pull down this repo

1. Run the two scripts that are in the SQL folder. These will create the Tabloid database and add some test data. The database it creates is identitical to the prototype from the last MVC sprint, except now we're capturing the `FirebaseUserId` in the UserProfile table

1. Everyone on the team should create their own Firebase project. **Each team member** should do the follow steps in the firebase console:

   - Go to [Firebase](https://console.firebase.google.com/u/0/) and add a new project. You can name it whatever you want (Tabloid is a good name)
   - Go to the Authentication tab, click "Set up sign in method", and enable the Username and Password option.
   - Add at least two new users in firebase. Use email addresses that you find in the UserProfile table of your SQL Server database
   - Once firebase creates a UID for these users, copy the UID from firebase and update the `FirebaseUserId` column for the same users in your SQL Server database.
   - Click the Gear icon in the sidebar to go to Project Settings. You'll need the information on this page for the next few steps

1. Go to the `appSettings.Local.json.example` file. Replace the value for FirebaseProjectId with your own

1. Rename the `appSettings.Local.json.example` file to remove the `.example` extension. This file should now just be called `appSettings.Local.json`

1. Open your `client` directory in VsCode. Open the `.env.local.example` file and replace `__YOUR_API_KEY_HERE__` with your own firebase Web API Key

1. Rename the `.env.local.example` file to remove the `.example` extension. This file should now just be called `.env.local`

1. Install your dependencies by running `npm install` from the same directory as your `package.json` file
