# 🅰️ Angular Homework Showcase: Advanced Business Web Development

> **Vietnam National University Ho Chi Minh City**  
> **University of Economics and Law (UEL)**  
> **Faculty of Information Systems**  
> *Course: Advanced Business Web Development*

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Implemented Exercises](#-implemented-exercises)
  - [Exercise 13: Product Event & Parameterized Routing](#exercise-13-json-array-model--product-event-)
  - [Exercise 14: Hierarchical Product Catalog](#exercise-14-json-array-model--product---catalog)
  - [Exercise 18: Group Customers via HTTP Service](#exercise-18-json-array-model--group-customers-)
- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [Technology Stack](#-technology-stack)
- [Installation & Getting Started](#-installation--getting-started)
- [Routing Table](#-routing-table)

---

## 🌟 Overview

This project is a modern Single Page Application (SPA) built with **Angular 18+**, **TypeScript**, and **Vanilla CSS3**. It presents a suite of practical exercises focusing on core enterprise web patterns:

- **JSON Array Data Models** and typed interfaces.
- **Service-Oriented Architecture** & Dependency Injection.
- **SPA Routing** with route parameters (`:id`) and programmatic navigation.
- **Nested `*ngFor` Directives** for hierarchical data structures.
- **Asynchronous HTTP Data Retrieval** with `HttpClient` and RxJS `Observable` streams.

---

## 🚀 Implemented Exercises

### Exercise 13: JSON Array Model – Product Event (*)
- **Objective**: Display an interactive product list from `ProductService`, dynamically render product images, and navigate to a detail view with state restoration.
- **Key Files**:
  - `src/app/services/product.service.ts`: Supplies product items with IDs, names, prices, descriptions, and asset image paths.
  - `src/app/exercise-13-product-event/service-product-image-event.component.ts|html|css`: Renders the table with `#` action link, search bar, sort options, and table/grid view toggle.
  - `src/app/exercise-13-product-event/service-product-image-event-detail.component.ts|html|css`: Subscribes to `ActivatedRoute.paramMap`, loads the selected product, and provides a **"Go Back"** button to return to the product list.
- **Routes**: `/service-product-image-event` & `/service-product-image-event/:id`

---

### Exercise 14: JSON Array Model – Product - Catalog
- **Objective**: Render hierarchical nested collections (Categories &rarr; Products) using nested `*ngFor` structural directives.
- **Key Files**:
  - `src/app/services/catalog.service.ts`: Defines categories (`Soft Drinks`, `Beer`) each containing an array of product items.
  - `src/app/exercise-14-catalog/service-product-catalog.component.ts|html|css`: Renders the outer category tables and nested product subtables matching the course handout specifications, with quick category filters and dual view modes (Nested Tables vs. Catalog Cards).
- **Route**: `/service-product-catalog`

---

### Exercise 18: JSON Array Model – Group Customers (*)
- **Objective**: Store structured customer records in `assets/data/customers.json` and retrieve them asynchronously via Angular's `HttpClient` service.
- **Key Files**:
  - `src/assets/data/customers.json`: JSON file with customer tier grouping (`1 - VIP`, `2 - Normal`).
  - `src/app/services/customer.service.ts`: Uses `HttpClient.get<CustomerTypeGroup[]>()` with RxJS `Observable`, `catchError`, and fallback support.
  - `src/app/exercise-18-group-customers/service-group-customer.component.ts|html|css`: Renders grouped customer rows with avatar image rendering (`assets/avatars/...`), age statistics, tier filtering, and interactive customer profile inspect modals.
- **Route**: `/service-group-customer`

---

## 📂 Project Architecture & Directory Structure

```text
AngularHomework/
├── public/
│   ├── assets/
│   │   ├── h1.png ... h6.png            # Beverage product images
│   │   ├── avatars/                     # Customer profile avatar pictures
│   │   └── data/
│   │       └── customers.json           # JSON data source for Exercise 18
├── src/
│   ├── app/
│   │   ├── exercise-13-product-event/   # Exercise 13 Components (List & Detail)
│   │   ├── exercise-14-catalog/         # Exercise 14 Component (Nested ngFor)
│   │   ├── exercise-18-group-customers/ # Exercise 18 Component (HttpClient)
│   │   ├── home/                        # Interactive Dashboard Landing Page
│   │   ├── navbar/                      # Navigation Bar Header
│   │   ├── footer/                      # Footer Component
│   │   ├── services/                    # Angular Services (Product, Catalog, Customer)
│   │   ├── app-module.ts                # Root NgModule declarations & providers
│   │   └── app-routing-module.ts        # Application Route definitions & aliases
│   ├── assets/                          # Static assets mirror
│   ├── index.html                       # HTML5 Shell
│   ├── styles.css                       # Global Design System & CSS Variables
│   └── main.ts                          # App bootstrap entry
├── angular.json                         # Angular CLI configuration
└── package.json                         # Project dependencies & scripts
```

---

## 🛠️ Technology Stack

- **Framework**: Angular 18 / 19+
- **Language**: TypeScript 5+
- **Styling**: Vanilla CSS3 (Custom Design System, Glassmorphism, CSS Grid & Flexbox)
- **HTTP & State**: Angular `HttpClient`, RxJS `Observable`
- **Routing**: Angular `RouterModule` (SPA parameter binding)

---

## 💻 Installation & Getting Started

### Prerequisites
- Node.js (version 18.x or higher)
- npm (version 9.x or higher)
- Angular CLI (`npm install -g @angular/cli`)

### Setup Steps
```bash
# 1. Clone the repository
git clone <your-repository-url>
cd AngularHomework

# 2. Install dependencies
npm install

# 3. Start local development server
npm start
# or
ng serve -o
```

Open your browser and navigate to **`http://localhost:4200/`**.

---

## 🗺️ Routing Table

| Route Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `HomeComponent` | Interactive Homework Showcase Dashboard |
| `/service-product-image-event` | `ServiceProductImageEventComponent` | **Exercise 13**: Product List with Event Details |
| `/service-product-image-event/:id` | `ServiceProductImageEventDetailComponent` | **Exercise 13**: Product Specification Detail View |
| `/service-product-catalog` | `ServiceProductCatalogComponent` | **Exercise 14**: Hierarchical Catalog (Nested `*ngFor`) |
| `/service-group-customer` | `ServiceGroupCustomerComponent` | **Exercise 18**: Group Customers via HTTP Service |

---

## 👨‍💻 Author & Submission

- **Faculty**: Faculty of Information Systems (Khoa Hệ thống Thông tin)
- **University**: University of Economics and Law (UEL) – Vietnam National University Ho Chi Minh City
- **Repository**: [GitHub Angular Homework](https://github.com/)
