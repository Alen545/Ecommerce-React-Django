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
*Update settings.py with your MySQL database credentials:*
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
### Frontend

1.**Navigate to the Frontend Directory**:
```sh
cd FRONTEND/Ecommerce
```
2.**Install Dependencies**:
```sh
npm install
```
3.**Start the Development Server**:
```sh
npm start
```
# Usage
**Admin Side**

1.Company Management:
- Registration: Admin can register new companies.
- View/Edit/Delete: Admin can view, edit, and delete companies.

2.Category Management:
- Registration: Admin can register new categories linked to companies.
- View/Edit/Delete: Admin can view, edit, and delete categories based on company names.

3.Product Management:
- Registration: Admin can register new products linked to companies and categories. Products can have attributes like size, color, price, and images.
- View/Edit/Delete: Admin can view, edit, and delete products based on company names.

4.Sales Management:
- View Sold Products: Admin can view details of sold products.

5.Statistics:
- User Count: Admin can view the total number of registered users.
- Product Count: Admin can view the total number of products.
- Total Profit: Admin can view the total profit from sales.

**User Side**

1.Product Browsing:
- View Products: All products are viewable with details available on the guest page.
- Add to Cart: Only registered users can add products to the cart.

2.Product Search:
- Search: Users can search for products based on company name, product name, and price filters.

3.Product Reviews:
- Add Review and Star Rating: Registered users can add reviews and star ratings to products.
- Delete Review: Users can delete their own reviews.

4.Cart Management:
- View Cart: Users can view products added to the cart.
- Update Quantity/Delete Product: Users can update the quantity of products or delete them from the cart.

5.Checkout:
- Payment Options: Users can choose from available payment options.
- Shipping Address: Users can provide a shipping address for their orders.

# Conclusion
This e-commerce platform provides comprehensive functionality for both admins and users, making it a robust solution for online retail. The combination of React, Django, JWT, and MySQL ensures a scalable and secure application.
