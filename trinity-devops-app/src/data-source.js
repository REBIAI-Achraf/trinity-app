"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// src/data-source.ts
var typeorm_1 = require("typeorm");
var user_entity_1 = require("./users/user.entity");
var product_entity_1 = require("./products/product.entity");
var category_entity_1 = require("./products/category.entity");
var review_entity_1 = require("./reviews/review.entity");
var wishlist_entity_1 = require("./wishlist/wishlist.entity");
var cart_entity_1 = require("./cart/cart.entity");
var cart_entity_2 = require("./cart/cart.entity");
var order_entity_1 = require("./orders/order.entity");
var order_entity_2 = require("./orders/order.entity");
var notifications_entity_1 = require("./notifications/notifications.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mssql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        user_entity_1.User,
        product_entity_1.Product,
        category_entity_1.Category,
        review_entity_1.Review,
        wishlist_entity_1.Wishlist,
        cart_entity_1.Cart,
        cart_entity_2.CartItem,
        order_entity_1.Order,
        order_entity_2.OrderItem,
        notifications_entity_1.Notification,
    ],
    synchronize: false,
    extra: {
        encrypt: true,
        trustServerCertificate: false,
    },
});
