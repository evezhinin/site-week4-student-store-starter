# Student Store Starter Code

## Unit Assignment: Student Store

Submitted by: **Evelyn Zhinin**



### Application Features

#### CORE FEATURES


- [x] **Database Creation**: Set up a Postgres database to store information about products and orders.
  - [x] Use the provided schema to create tables for `products`, `orders`, and `order_items`.
- [ ] **Products Model**: Develop a model to represent individual items available in the store. 
  - [x] This model should include attributes such as `id`, `name`, `description`, `price`, `image_url`, and `category`.
  - [x] Implement methods for CRUD operations on products.
  - [x] Ensure transaction handling for the deletion of products to also delete related `order_items`
- [x]**Orders Model**: Develop a model to manage orders. 
  - [x] This model should include attributes such as `order_id`, `customer_id`, `total_price`, `status`, and `created_at`.
  - [x] Implement methods for creating, fetching, updating, and deleting orders.
  - [x] Ensure transaction handling for the deletion of orders to also delete related `order_items`
- [x] **Order Items Model**: Develop a model to represent the items within an order. 
  - [x] This model should include attributes such as `order_item_id`, `order_id`, `product_id`, `quantity`, and `price`.
  - [x] Implement methods for fetching and creating order items.
- [x] **API Endpoints**
  -  [x] **Product Endpoints**:
    - [x ] `GET /products`: Fetch a list of all products.
    - [ x] `GET /products/:id`: Fetch details of a specific product by its ID.
    - [ x] `POST /products`: Add a new product to the database.
    - [ x] `PUT /products/:id`: Update the details of an existing product.
    - [ x] `DELETE /products/:id`: Remove a product from the database.
  - [ ] **Order Endpoints**:
    - [ x] `GET /orders`: Fetch a list of all orders.
    - [ x] `GET /orders/:order_id`: Fetch details of a specific order by its ID, including the order items.
    - [ x] `POST /orders`: Create a new order with order items.
    - [ x] `PUT /orders/:order_id`: Update the details of an existing order (e.g., change status).
    - [ x] `DELETE /orders/:order_id`: Remove an order from the database.
- [ ] **Frontend Integration**
  - [ x] Connect the backend API to the provided frontend interface, ensuring dynamic interaction for product browsing, cart management, and order placement. Adjust the frontend as necessary to work with your API.


#### STRETCH FEATURES

- [ ] **Added Endpoints**
  - [x] Create an endpoint for fetching all orders in the database.
  - [x] Create an endpoint for serving an individual order based on its ID.
- [ ] **Filter Orders**
  - [ ] Allow users to use an input to filter orders by the email of the person who placed the order.
- [x] **Implement Your Own Frontend**
  - [x] Build your own user interface for browsing products, managing the shopping cart, and placing orders. This will involve integrating the frontend you create with the backend API you developed during the project.
- [ ] **Past Orders Page**
  - [ ] Build a page in the UI that displays the list of all past orders. The user should be able to click on any individual order to take them to a more detailed page of the transaction.


### Walkthrough Video


<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/4cc358a5b3634d8588c497f4eafbb846?sid=33c9cf6c-a42c-49f1-9046-1dafb82583a6" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
 part 1 of backend:
 https://drive.google.com/file/d/1sVzlFLtHww6cv0ee182qMDtiTYeehPDG/view?usp=sharing 

 part 2 backend:
 https://drive.google.com/file/d/1FBSKbESuxGZJJEyTzfpzQ23diVPa8Ath/view?usp=sharing 





### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

The adop-a-pet lab helped with the initials of the project, but it only helped with the backend. 

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If i had more time i would implemented the Order items and the order differently, so that it responds differently when a user adds items to the shopping cart and an order is created  

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

The project demo went well, I feel like I could have explained the CRUDE operations better. 

### Open-source libraries used



### Shout out

Shout out to the instructors. 



