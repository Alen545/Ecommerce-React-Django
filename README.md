# E-commerce Platform

This project is an e-commerce platform built using React for the frontend and Django for the backend, with JWT for authentication and MySQL as the database. The platform includes an admin side for managing companies, categories, products, and sales, as well as a user side for browsing and purchasing products.

## Technologies Used

- **Frontend**: React
- **Backend**: Django
- **Authentication**: JWT (JSON Web Token)
- **Database**: MySQL

## Project Structure

- **Backend**: Located in `BACKEND/Ecommerce`
- **Frontend**: Located in `FRONTEND/Ecommerce`

## Setup Instructions

### Backend

1. **Navigate to the Backend Directory**:
   ```sh
   cd BACKEND/Ecommerce
2. **Install Dependencies**:
   ```sh
   pip install -r requirements.txt
3. **Database Configuration**:
Update settings.py with your MySQL database credentials:
```sh
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'your_database_name',
        'USER': 'your_database_user',
        'PASSWORD': 'your_database_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```
4.**Apply Migrations**:
```sh
python manage.py makemigrations
python manage.py migrate
```
5.**Run the Server**:
```sh
python manage.py runserver
```

