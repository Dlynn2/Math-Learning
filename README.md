# Math-Learning  


## Steps for Setting Up Development Server (on Mac)  
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
