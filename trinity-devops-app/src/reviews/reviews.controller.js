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
exports.ReviewsController = void 0;
var common_1 = require("@nestjs/common");
var ReviewsController = function () {
    var _classDecorators = [(0, common_1.Controller)('reviews')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _addReview_decorators;
    var _updateReview_decorators;
    var _deleteReview_decorators;
    var _getProductReviews_decorators;
    var ReviewsController = _classThis = /** @class */ (function () {
        function ReviewsController_1(reviewsService) {
            this.reviewsService = (__runInitializers(this, _instanceExtraInitializers), reviewsService);
        }
        ReviewsController_1.prototype.addReview = function (req, productId, createReviewDto) {
            var userId = req.user.id;
            return this.reviewsService.addReview(userId, productId, createReviewDto);
        };
        ReviewsController_1.prototype.updateReview = function (req, reviewId, updateReviewDto) {
            var userId = req.user.id;
            return this.reviewsService.updateReview(userId, reviewId, updateReviewDto);
        };
        ReviewsController_1.prototype.deleteReview = function (req, reviewId) {
            var userId = req.user.id;
            return this.reviewsService.deleteReview(userId, reviewId);
        };
        ReviewsController_1.prototype.getProductReviews = function (productId) {
            return this.reviewsService.getProductReviews(productId);
        };
        return ReviewsController_1;
    }());
    __setFunctionName(_classThis, "ReviewsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _addReview_decorators = [(0, common_1.Post)(':productId')];
        _updateReview_decorators = [(0, common_1.Patch)(':reviewId')];
        _deleteReview_decorators = [(0, common_1.Delete)(':reviewId')];
        _getProductReviews_decorators = [(0, common_1.Get)('product/:productId')];
        __esDecorate(_classThis, null, _addReview_decorators, { kind: "method", name: "addReview", static: false, private: false, access: { has: function (obj) { return "addReview" in obj; }, get: function (obj) { return obj.addReview; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateReview_decorators, { kind: "method", name: "updateReview", static: false, private: false, access: { has: function (obj) { return "updateReview" in obj; }, get: function (obj) { return obj.updateReview; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteReview_decorators, { kind: "method", name: "deleteReview", static: false, private: false, access: { has: function (obj) { return "deleteReview" in obj; }, get: function (obj) { return obj.deleteReview; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProductReviews_decorators, { kind: "method", name: "getProductReviews", static: false, private: false, access: { has: function (obj) { return "getProductReviews" in obj; }, get: function (obj) { return obj.getProductReviews; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReviewsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReviewsController = _classThis;
}();
exports.ReviewsController = ReviewsController;
