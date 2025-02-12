import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PaymentsModule } from './payments/payments.module';
import { Order, OrderItem } from './orders/order.entity';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsService } from './payments/payments.service';
import { InvoicesService } from './invoices/invoices.service';
import { InvoicesController } from './invoices/invoices.controller';
import { CartModule } from './cart/cart.module';
import { ReviewsModule } from './reviews/reviews.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { NotificationsModule } from './notifications/notifications.module';
import { Notification } from './notifications/notifications.entity';
import { ReportsController } from './reports/reports.controller';
import { ReportsService } from './reports/reports.service';
import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { Review } from './reviews/review.entity';
import { Wishlist } from './wishlist/wishlist.entity';
import { Category } from './products/category.entity';
import { OrdersModule } from './orders/orders.module';
import { Cart, CartItem } from './cart/cart.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tdev700_db',
      entities: [
        Order,
        OrderItem,
        Notification,
        User,
        Product,
        Category,
        Review,
        Wishlist,
        Cart,
        CartItem,
      ],
      synchronize: true,
      extra: {
        encrypt: true,
        trustServerCertificate: false,
      },
      retryAttempts: 3,
      retryDelay: 3000,
      autoLoadEntities: true,
      keepConnectionAlive: true,
      verboseRetryLog: true,
      manualInitialization: false,
    }),
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      Notification,
      Product,
      Category,
      User,
      Review,
      Wishlist,
      Cart,
      CartItem,
    ]),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    CartModule,
    PaymentsModule,
    ReviewsModule,
    WishlistModule,
    NotificationsModule,
  ],
  providers: [OrdersService, PaymentsService, InvoicesService, ReportsService],
  controllers: [
    OrdersController,
    PaymentsController,
    InvoicesController,
    ReportsController,
  ],
})
export class AppModule {}
