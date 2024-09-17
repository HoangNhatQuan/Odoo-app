
---

# BSA Sales Order Management System

## Overview

The BSA Sales Order Management System helps BSA, a cosmetic distribution company, manage their B2B sales orders, pricing, and fulfillment. This system allows for efficient order creation, shipping management, and fulfillment from the main warehouse and BSA’s stores.

## Table of Contents

- [Features](#features)
- [Design System](#Design)
- [Installation](#installation)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Project Structure](#project-structure)
- [License](#license)

## Features
### Sales Order Management
- ** Create Sales Orders: BSA can create and manage sales orders for customers, factoring in customer-specific pricing (Starter, Professional, VIP).
- ** Shipping Options: When creating sales orders, BSA can select between Free Shipping (from the warehouse) or Pickup (from any store).
- ** Store Pickup: If the customer selects Pickup, they can choose from a list of BSA stores for order collection.
- ** Fulfillment Management: BSA can manage fulfillment, including notifying customers when an order is ready for pickup or has been shipped.

### Pricing Management
- **Dynamic Discounts: Customer categories (Starter, Professional, VIP) receive automated pricing discounts of 5%, 7%, and 10%, respectively.
- **Adjustable Discounts: BSA can adjust discount rates for each customer category in the system.

### Notification
- **Email Notifications: Send automated email notifications to customers when their orders are ready for pickup or when they are shipped.

## Installation Client

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HoangNhatQuan/youtube-video-sharing-app.git
   cd client
   ```

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run the application:**
   ```bash
   pnpm run dev
   ```
## Installation Server

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HoangNhatQuan/Odoo-app.git
   cd server
   ```

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run the application:**
   ```bash
   pnpm start:dev
   ```
## Design Module
- ** Link ERD Diagram : https://drive.google.com/file/d/1mfXm4xzBg_Ew9XDiozXZ2ufjRO06Qxk0/view?usp=sharing
## Usage

1. **Create Sales Orders:**
  - **Navigate to the Sales Order section of the system.
  - **Select a customer and create a sales order based on their category (Starter, Professional, VIP) for dynamic discounting.
  - **Choose either Free Shipping or Pickup from a store.
  
2. **Manage Fulfillment:**
  - **Free Shipping: Fulfilled from the main warehouse, and an email is sent notifying the customer that their order is on the way.
  - **Pickup: Fulfilled from the selected store, and an email is sent to notify the customer to pick up the order.
3. **Database:** Setup on NoSQL as MongoDb

### Note

- Ensure your local server is running before testing the endpoints.
- Some endpoints may require authentication.

## Troubleshooting
### Common Issues

1. **API Requests Fail:**
- Issue: Requests to the API endpoints fail or return errors.
- Solution: Check that the API server is running and that the correct endpoints are being used. Review API documentation and ensure correct request formatting.

2. **Orders not showing correct discounts:**
Issue: Discounts are not applied correctly to the order.
Solution: Verify that the customer is assigned to the correct category (Starter, Professional, VIP) and the discount rates are properly configured.
## Project Structure Serve

### Server
```plaintext
/server
|-- /public
|-- /src
|   |-- /configs
|   |-- /decorators
|   |-- /guards
|   |-- /modules
|   |-- /pipelines       
|   |-- app.controller.ts    
|   |-- app.module.ts  
|   |-- app.service.ts
|   |-- main.ts
|-- .env.dev
|-- .gitignore
|-- .prettierignore
|-- package.json
|-- package-lock.json
```

## License

This project is licensed under the MIT License.

---

