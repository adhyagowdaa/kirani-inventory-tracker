# 🏪 Kirana Inventory Tracker

A complete, production-pattern Full-Stack (MERN) web application built to help local store owners manage their stock levels in real-time. This project demonstrates a decoupled client-server architecture with persistent cloud database integration.

---

## 🚀 Key Features

* **Dynamic CRUD Operations:** Add new stock entries, view current metrics, and delete items cleanly from a single screen.
* **Inline Stock Adjustments:** Quick-action `+` and `−` controls to immediately modify inventory counts as stock moves.
* **Smart Threshold Warnings:** Automatic status flagging (`⚠️ LOW STOCK` vs `✅ Healthy`) based on user-defined minimum boundaries.
* **Clean SaaS Layout:** A fully responsive, row-organized grid structure optimized for high readability.

---

## 🏗️ Architecture & Tech Stack

This application is split into two fully decoupled environments:

* **Frontend (Client):** Built using **React.js** and scaffolded via **Vite**. Handles asynchronous state updates and coordinates network requests using **Axios**.
* **Backend (Server):** Powered by **Node.js** and **Express.js**. Implements a secure REST API engine with global **CORS** middleware enablement.
* **Database (Storage):** Hosted remotely via a distributed **MongoDB Atlas** cloud cluster, managed through strict schema-modelling via **Mongoose**.

---

## 🛠️ Local Installation & Setup

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Clone the Repository
```bash
git clone [https://github.com/adhyagowdaa/kirani-inventory-tracker.git](https://github.com/adhyagowdaa/kirani-inventory-tracker.git)
cd kirani-inventory-tracker
