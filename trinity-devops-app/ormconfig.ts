// ormconfig.ts
import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';
import { Product } from './src/products/product.entity';
import { Category } from './src/products/category.entity';
import { Review } from './src/reviews/review.entity';
import { Wishlist } from './src/wishlist/wishlist.entity';
import { Cart } from './src/cart/cart.entity';
import { CartItem } from './src/cart/cart.entity';
import { Order } from './src/orders/order.entity';
import { OrderItem } from './src/orders/order.entity';
import { Notification } from './src/notifications/notifications.entity';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: 'mytrinityserver.database.windows.net',
  port: 1433,
  username: 'trinity',
  password: 'Epi-@tech242424@@epitech',
  database: 'mytrinitysqldatabasedev',
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
  options: {
    enableArithAbort: true,
    trustServerCertificate: true,
    encrypt: true,
  },
});

export default AppDataSource;
