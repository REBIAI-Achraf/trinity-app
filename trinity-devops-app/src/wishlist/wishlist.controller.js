"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistController = void 0;
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("./../auth/jwt/jwt.guard");
var WishlistController = function () {
    var _classDecorators = [(0, common_1.Controller)('wishlist'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _addToWishlist_decorators;
    var _removeFromWishlist_decorators;
    var _viewWishlist_decorators;
    var WishlistController = _classThis = /** @class */ (function () {
        function WishlistController_1(wishlistService) {
            this.wishlistService = (__runInitializers(this, _instanceExtraInitializers), wishlistService);
        }
        WishlistController_1.prototype.addToWishlist = function (req, productId) {
            var userId = req.user.id;
            return this.wishlistService.addToWishlist(userId, productId);
        };
        WishlistController_1.prototype.removeFromWishlist = function (req, productId) {
            var userId = req.user.id;
            return this.wishlistService.removeFromWishlist(userId, productId);
        };
        WishlistController_1.prototype.viewWishlist = function (req) {
            var userId = req.user.id;
            return this.wishlistService.viewWishlist(userId);
        };
        return WishlistController_1;
    }());
    __setFunctionName(_classThis, "WishlistController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _addToWishlist_decorators = [(0, common_1.Post)(':productId')];
        _removeFromWishlist_decorators = [(0, common_1.Delete)(':productId')];
        _viewWishlist_decorators = [(0, common_1.Get)()];
        __esDecorate(_classThis, null, _addToWishlist_decorators, { kind: "method", name: "addToWishlist", static: false, private: false, access: { has: function (obj) { return "addToWishlist" in obj; }, get: function (obj) { return obj.addToWishlist; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeFromWishlist_decorators, { kind: "method", name: "removeFromWishlist", static: false, private: false, access: { has: function (obj) { return "removeFromWishlist" in obj; }, get: function (obj) { return obj.removeFromWishlist; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _viewWishlist_decorators, { kind: "method", name: "viewWishlist", static: false, private: false, access: { has: function (obj) { return "viewWishlist" in obj; }, get: function (obj) { return obj.viewWishlist; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WishlistController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WishlistController = _classThis;
}();
exports.WishlistController = WishlistController;
