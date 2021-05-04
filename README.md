# Math-Learning  


## Steps for Setting Up Development Server on Mac
[Helpful Resource](https://websitebeaver.com/set-up-localhost-on-macos-high-sierra-apache-mysql-and-php-7-with-sslhttps)  
### Connect to the Server Database  
#### Choose DB Management Interface  
I used [Sequel Pro](https://www.sequelpro.com/) (Mac-exclusive) for my manager, but feel free to use whatever you like  
#### Connect to DB  
* Connection Type: **SSH**
* MySQL Host: **159.89.159.138**
* Username: **Dylan**
* Password: *[Please See Credentials Document For Password](https://docs.google.com/document/d/19IaPQLSc3adlAgujz0a45TBEpVmiXMr2Xvcd_3E-_AQ/edit?usp=sharing)*
* Database: **mathLearningDB**
* SSH Host: **159.89.159.138**
* SSH User: **Derek**
* SSH Password: *[Please See Credentials Document For Password](https://docs.google.com/document/d/19IaPQLSc3adlAgujz0a45TBEpVmiXMr2Xvcd_3E-_AQ/edit?usp=sharing)*  
### Export all current tables and data to a .sql file  
In Seqel Pro, this is done by going to **File** --> **Export**, then selecting .sql as the export type and exporting all of the data from all of the tables
### Turn on Apache using a terminal window **(Apache comes pre-installed on Macs)**  
```sudo apachectl start```  
### Turn on PHP
#### Nano to the ```httpd.conf``` file  
```sudo nano /etc/apache2/httpd.conf```  
Then, find the line with the ```#LoadModule php7_module``` comment and remove the ```#``` to turn it into an executable statement  
### Restart Apache  
```sudo apachectl restart```  
### Install MySQL  
[MySQL](https://dev.mysql.com/downloads/mysql/)  
### Start MySQL Server  
Go to **System Preferences** --> **MySQL**  
Click on the *Active Instance* and click *Initialize Database*  
Select *Use Legacy Password Encryption* and make a password *(i.e., newpassword, etc.)*  
*NOTE: This password will need to be added later to the ```db.js``` file*  
### Open MySQL in a terminal window  
```sudo /usr/local/mysql/bin/mysql -u root -p```  
### Run query to define password for localhost  
```ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';```  
*NOTE: Use whatever password you defined when initializing the database (in my example, I used **newpassword**)*  
### Connect to local DB in Sequel Pro (or whatever DB Manager Interface you chose)  
* Connection Type: **Standard**  
* Host: **127.0.0.1**  
* Username: **root**  
* Password: **newpassword**  
*NOTE: Use whatever password you defined when initializing the database (in my example, I used **newpassword**)*  
### Navigate to *'test'* database
*NOTE: If the 'test' DB doesn't already exist, create it*  
### Import .sql file into 'test' database  
In Sequel Pro, navigate to import, then select the .sql file exported earlier  
### Change ```db.js``` file credentials  
Navigate to db.js in whichever IDE you please  
Change the following line to match your password created when initializing the DB  
```const sequelize = new Sequelize("test", "root", "newpassword", {```  
Where 'test' is the name of the local DB you created (in our case, we called it 'test')  
Where 'root' is root  
Where 'newpassword' is whichever password you assigned when initializing the DB  
### Voilà  
You should now be able to run a development server  
Run ```npm start```, first, in the **Ampd** directory  
Run ```npm start```, second, in the **react-ui** directory  

#### **NOTE:**  
I have noticed that whenever I shut off my computer (or even log off), I have to reinitialize the MySQL Server before running ```npm start``` in the respective directories. Just be sure to use the legacy password and keep it consistent with what you used before. You shouldn't have to re-import any data into the local DB.

## Steps for Setting Up Development Server on Windows
### MySQL Setup
1. Go to https://dev.mysql.com/downloads/windows/installer/8.0.html
2. Click on the download button for the version with the larger file size.
3. It will ask you to sign in. Just click on the small blue text stating ```"No thanks, just start my download."```
4. Run the installer.
5. Select ```Custom``` in the "Setup Type" tab.
6. In the "Select Products" tab, make sure ```MySQL Server```, ```MySQL Workbench```, ```MySQL Shell```, and ```MySQL Router``` are in the "Products To Be Installed" box.
7. In the "Installation" tab, press ```Execute``` to begin installation.
8. After installation, configuration will come up for the MySQL server.
9. Press ```Next``` until you reach the "Accounts and Roles" tab and enter a root password for your MySQL server.
10. Click ```Next``` and eventually ```Execute``` and ```Finish```.
11. Just click ```Finish``` on the Router Configuration.
12. Finish the installer.
### Creating Database
After installation, the MySQL Workbench should already have connected to your new MySQL server.
1. Double click on the created ```Local Instance MySQL80``` to open the administration screen.
2. Open and run the database creation SQL script.
### Initial Server Setup
1. Download or fork and pull the Math-Learning repository from https://github.com/Schallenballa/Math-Learning/tree/master
2. Place the ```.env``` file into the ```\Math-Learning\Ampd``` folder. (This contains the secret credentials for the Twilio API) Take care not to push this file to GitHub.
3. You will need to alter ```db.js``` to match your MySQL server credentials. (\Math-Learning\Ampd\database\)
4. If your IDE has terminal functionality, open 3 terminal windows. (You will need these everytime you want to start the server)
5. Ensure that the current directory of the first terminal window is the base project folder (\Math-Learning\Ampd)
6. Run ```npm install```. When it is finished run ```npm audit fix``` to patch some vulnerabilities.
7. Ensure that the current directory of the seccond terminal window is the react-ui folder (\Math-Learning\Ampd\react-ui)
8. Run ```npm install``` (this will take upto 10 mins). When it is finished run ```npm audit fix``` to patch some vulnerabilities.
9. Ensure that the current directory of the third terminal window is the folder containing mysql.exe (C:\Program Files\MySQL\MySQL Server 8.0\bin)
### Start the Web Server
1. Enter ```mysql -u root -p``` into the third terminal window.
2. It will ask for a password. Enter the password you created when setting up the MySQL server.
3. Your should see the directory change to ```mysql>```
4. In the first terminal window (base folder) run ```npm start``` and wait for the 'listening on port 5000' message.
5. In the second terminal window (react-ui) run ```npm start``` and wait for the website to automatically open in a new browser tab.

## The Site Should Now Be Running
