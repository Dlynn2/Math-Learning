# create-react-app with a Node server

## Design Points

A combo of two npm projects, the backend server and the frontend UI. So there are two `package.json` configs

  * build the app with
    * `sudo npm install` for the Node server
    * `sudo npm run build` for create-react-app

## Database Points

To access the database server from the terminal 

	go to the home directory with command ` cd `
	to connect to the database use: mysql -u Dylan -p
	when prompted for password it is : mysql
	then either use the command: USE mathLearningDB;
	or: connect mathLearningDB;
	then use whatever sql commands that are usable with mysql server.
	ie: SHOW TABLES;	

## Local Development

Because this app is made of two npm projects, there are two places to run `npm` commands:

1. **Node API server** at the root `./`
1. **React UI** in `react-ui/` directory.

### Run the API server

In a terminal:

```bash
# Initial setup
sudo npm install

# Start the server
sudo npm start
```

#### Install new npm packages for Node


sudo npm install package-name --save


### Run the React UI

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](react-ui/package.json))

In a separate terminal from the API server, start the UI:
```NPM and server config
# Always change directory, first
cd react-ui/

# Initial setup
npm install

# Start the server
npm start
```
# Server is being run by PM2
look up details on this package online.

# Always change directory, first
cd react-ui/
# Installing packages
npm install package-name --save
```NPM and server config

```R Shiny Server config and how to

The R shiny server is mapped out across the swap storage space so that it could be fully downloaded to the server
without taking up all the memory.

#Installing R packages

Be aware to not install huge packages or compiled packages. there is NOT unlimited storage space.

use this as a template change what is inside the single quotes  '' : 
sudo su - -c "R -e \"install.packages('shiny', repos='http://cran.rstudio.com/')\""
Here is a second example using a github repo :
sudo su - -c "R -e \"devtools::install_github('exampleGithubName/repoName')\"" 

#Finding the R files being run

from Dereks home Dir use go back a dir or 2 until you see the srv dir
enter that and then go through shiny/sample-apps/mathLearningShiny you should find it there. Derek has a video of how to get here.
```R Shiny Server config and how to


