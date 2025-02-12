"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var config_1 = require("@nestjs/config");
var auth_module_1 = require("./auth/auth.module");
var users_module_1 = require("./users/users.module");
var products_module_1 = require("./products/products.module");
var payments_module_1 = require("./payments/payments.module");
var order_entity_1 = require("./orders/order.entity");
var orders_service_1 = require("./orders/orders.service");
var orders_controller_1 = require("./orders/orders.controller");
var payments_controller_1 = require("./payments/payments.controller");
var payments_service_1 = require("./payments/payments.service");
var invoices_service_1 = require("./invoices/invoices.service");
var invoices_controller_1 = require("./invoices/invoices.controller");
var cart_module_1 = require("./cart/cart.module");
var reviews_module_1 = require("./reviews/reviews.module");
var wishlist_module_1 = require("./wishlist/wishlist.module");
var notifications_module_1 = require("./notifications/notifications.module");
var notifications_entity_1 = require("./notifications/notifications.entity");
var reports_controller_1 = require("./reports/reports.controller");
var reports_service_1 = require("./reports/reports.service");
var user_entity_1 = require("./users/user.entity");
var product_entity_1 = require("./products/product.entity");
var review_entity_1 = require("./reviews/review.entity");
var wishlist_entity_1 = require("./wishlist/wishlist.entity");
var category_entity_1 = require("./products/category.entity");
var orders_module_1 = require("./orders/orders.module");
var cart_entity_1 = require("./cart/cart.entity");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot(),
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'mssql',
                    host: 'mytrinityserver.database.windows.net',
                    port: 1433,
                    username: 'trinity',
                    password: 'Epi-@tech242424@@epitech',
                    database: 'mytrinitysqldatabasedev',
                    entities: [
                        order_entity_1.Order,
                        order_entity_1.OrderItem,
                        notifications_entity_1.Notification,
                        user_entity_1.User,
                        product_entity_1.Product,
                        category_entity_1.Category,
                        review_entity_1.Review,
                        wishlist_entity_1.Wishlist,
                        cart_entity_1.Cart,
                        cart_entity_1.CartItem,
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
                typeorm_1.TypeOrmModule.forFeature([
                    order_entity_1.Order,
                    order_entity_1.OrderItem,
                    notifications_entity_1.Notification,
                    product_entity_1.Product,
                    category_entity_1.Category,
                    user_entity_1.User,
                    review_entity_1.Review,
                    wishlist_entity_1.Wishlist,
                    cart_entity_1.Cart,
                    cart_entity_1.CartItem,
                ]),
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
                products_module_1.ProductsModule,
                orders_module_1.OrdersModule,
                cart_module_1.CartModule,
                payments_module_1.PaymentsModule,
                reviews_module_1.ReviewsModule,
                wishlist_module_1.WishlistModule,
                notifications_module_1.NotificationsModule,
            ],
            providers: [orders_service_1.OrdersService, payments_service_1.PaymentsService, invoices_service_1.InvoicesService, reports_service_1.ReportsService],
            controllers: [
                orders_controller_1.OrdersController,
                payments_controller_1.PaymentsController,
                invoices_controller_1.InvoicesController,
                reports_controller_1.ReportsController,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
