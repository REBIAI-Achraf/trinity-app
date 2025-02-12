// src/data-source.ts
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { Category } from './products/category.entity';
import { Review } from './reviews/review.entity';
import { Wishlist } from './wishlist/wishlist.entity';
import { Cart } from './cart/cart.entity';
import { CartItem } from './cart/cart.entity';
import { Order } from './orders/order.entity';
import { OrderItem } from './orders/order.entity';
import { Notification } from './notifications/notifications.entity';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    User,
    Product,
    Category,
    Review,
    Wishlist,
    Cart,
    CartItem,
    Order,
    OrderItem,
    Notification,
  ],
  synchronize: false,
  extra: {
    encrypt: true,
    trustServerCertificate: false,
  },
});
