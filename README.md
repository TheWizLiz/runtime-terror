# runtime-terror

## Project Setup
Firstly, download node.js at https://nodejs.org/en/

Create a new folder and open your git terminal. Travel to the newly created directory and run
### git clone https://github.com/liamkyoung/runtime-terror.git
to create a copy of the git repository onto your computer.

### Installing Dependencies & Environment Setup
Enter the repository by typing `cd runtime-terror` into the terminal.
  Then, `cd` into both the /client and /server directories **seperately** and type `npm install` to install all dependencies for the project.
  Note: the only files inside of /runtime-terror should be /client, /server, .gitignore, and the README.
  If you installed node_modules in the wrong place, you may need to restart the setup.
  
  Create a file called .env inside of /server. (This file is used to hide sensitive login information).
  Inside of the .env, copy and paste `CONNECTION_URL = "mongodb+srv://<username>:<password>@cluster0.dw5eb.mongodb.net/<dbname>?retryWrites=true&w=majority"`
    Where instead of `<username>`, `<password>`, and `<dbname>`, insert your MongoDB login credentials and the Database name is Cluster0 (DB Name will likely be changed soon).
  


### Running a local server using node

#### As you see, there is a client folder and a server folder.
##### For testing your React app, travel to the `runtime-terror/client` folder.
##### For testing MongoDB/Express (the back-end), travel to the `runtime-terror/server` folder.

### Type `npm start` to launch a local server (Depending on what you are attempting to do.)

For testing React, the server should launch automatically in the browser.

For testing the back-end,
Check the terminal to see where the server is running. By default it should be port 5000.
Open up a web browser and type `localhost:5000` and view the application.

#### Press `Ctrl-C` in VSCode to stop the server.

## To create this template, I watched this youtube video until 28:50: 
https://www.youtube.com/watch?v=ngc9gnGgUdA&t=428s&ab_channel=JavaScriptMastery 
### I highly reccomend watching this video, it will help you understand why the repo is set up the way it is.
#### DM me on Discord if you have any trouble!
