# Presence: Face Recognition-Based Attendance App

## About

Presence is a web-based attendance app with face recognition, designed to make attendance quicker and more efficient.

## Contributors

* [Muhammad Luqman Aristio](https://github.com/LuqmanAristio)
* [Anak Agung Ngurah Andhika Satrya Nugraha](https://github.com/DimensionalDragon)
* [Andre Yulius Sinambela](https://github.com/ucoktebas00)
* [Eulogius Zemario Mali](https://www.linkedin.com/in/eulogius-zemario-mali-349938200/)

## Features
### Login
In login page, admin can log into the app, employees won't need to login since employee informations will be provided by admin.
![login page](https://raw.githubusercontent.com/DimensionalDragon/college-files-provider/master/stored_files/presence-login.jpg)
The login page requires username and password. Register menu is not available yet and will be added soon.
### Dashboard
In dashboard page, admins that have logged in can see the overview of attendance information and the visualization of attendance data.
![dashboard page](https://raw.githubusercontent.com/DimensionalDragon/college-files-provider/master/stored_files/presence-dashboard.jpg)
### View and filter employees
In employees page, admins can view all employees, admins can also filter employees using the filter bar, add new employees, and delete employees.
![employees page](https://raw.githubusercontent.com/DimensionalDragon/college-files-provider/master/stored_files/presence-employees.jpg)
#### Add new employees
![add employee form](https://raw.githubusercontent.com/DimensionalDragon/college-files-provider/master/stored_files/presence-employees-add.jpg)
#### Edit and delete employees
![edit employee form](https://raw.githubusercontent.com/DimensionalDragon/college-files-provider/master/stored_files/presence-employees-edit.jpg)
![delete employee form](https://raw.githubusercontent.com/DimensionalDragon/college-files-provider/master/stored_files/presence-employees-delete.jpg)
### Add new attendance
In attendance page, employees can show their face to the camera, and this app will identify the employee and save attendance data. One employee will only be able to record attendance once per day.
![attendance page](https://raw.githubusercontent.com/DimensionalDragon/college-files-provider/master/stored_files/presence-attendance.jpg)
Employee's attendance status (on time or late) is determined by the time set in the attendance page. Admin can edit this time to determine the time limit, if an employee adds attendance after the time specified, their status would be "late", otherwise, their status would be "on time"
![attendance set time](https://raw.githubusercontent.com/DimensionalDragon/college-files-provider/master/stored_files/presence-attendance-time.jpg)
![attendance page (on time)](https://raw.githubusercontent.com/DimensionalDragon/college-files-provider/master/stored_files/presence-attendance-ontime.jpg)
![attendance page (late)](https://raw.githubusercontent.com/DimensionalDragon/college-files-provider/master/stored_files/presence-attendance-late.jpg)
### Get attendance report
In report page, admins can get daily, weekly, and monthly report of employee attendances. Reports will be downloaded as Excel file.
![report page](https://raw.githubusercontent.com/DimensionalDragon/college-files-provider/master/stored_files/presence-report.jpg)

## Technologies
* React.JS
* Express.JS
* Tensorflow
* Tensorflow.JS

## Dataset
The dataset for this app is collected manually by searching images of avenger members and taking faces images of ourselves. You can access the dataset [here](https://drive.google.com/file/d/1KXZiGpPNOq3spWzjc_-vNOAvwHn5V1DQ/view?usp=share_link)

## Deployment
Presence is currently deployed and running, visit the website [here](https://presence-web.netlify.app) with these credentials
**Username**: geats
**Password**: kitsune123
