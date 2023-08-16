"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../../common/response");
const products_service_1 = __importDefault(require("../products/products.service"));
class productController {
    listAllProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listAllProduct = yield products_service_1.default.listAllProduct();
                console.log("list:", listAllProduct);
                if (listAllProduct === null) {
                    res.send((0, response_1.responseBadRequest)("don't value!"));
                }
                return res.send((0, response_1.responseSuccess)("success"));
            }
            catch (error) {
                return res.send((0, response_1.responseErrorInternal)(error.message));
            }
        });
    }
    listFindProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name_product, name_color, name_Size, unitPrice, categories } = req.query;
                if (!name_product && !name_color && !name_Size && !unitPrice && !categories) {
                    res.send((0, response_1.responseBadRequest)("not found param!"));
                }
                const listFindProduct = yield products_service_1.default.listFindProduct({
                    productName: String(name_product),
                    colorName: String(name_color),
                    sizeName: String(name_Size),
                    product_price: String(unitPrice),
                    product_categories: String(categories)
                });
                console.log("lisF:", listFindProduct);
                if (listFindProduct === null) {
                    return res.send((0, response_1.responseBadRequest)("don't value!"));
                }
                return res.send((0, response_1.responseSuccess)("success"));
            }
            catch (error) {
                return res.send((0, response_1.responseErrorInternal)(error.message));
            }
        });
    }
    detailProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.query;
                if (!id) {
                    res.send((0, response_1.responseBadRequest)("not found param!"));
                }
                const detailProduct = yield products_service_1.default.detailProduct({
                    id: Number(id),
                });
                console.log("list:", detailProduct);
                if (detailProduct === null) {
                    res.send((0, response_1.responseBadRequest)("don't value!"));
                }
                return res.send((0, response_1.responseSuccess)("success", Object(detailProduct)));
            }
            catch (error) {
                return res.send((0, response_1.responseErrorInternal)(error.message));
            }
        });
    }
    productCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, size, color, quantity } = req.body;
                if (!id || !color || !size || !quantity) {
                    if (quantity <= 0) {
                        res.send((0, response_1.responseBadRequest)("Quantity <=0 ! "));
                    }
                    res.send((0, response_1.responseBadRequest)("not found param!"));
                }
                const producCart = yield products_service_1.default.producCart({
                    id: Number(id),
                    size: size,
                    color: color,
                    quantity: quantity,
                });
                console.log("list:", producCart);
                if (producCart === null) {
                    res.send((0, response_1.responseBadRequest)("don't value!"));
                }
                return res.send((0, response_1.responseSuccess)("success", Object(producCart)));
            }
            catch (error) {
                return res.send((0, response_1.responseErrorInternal)(error.message));
            }
        });
    }
}
exports.default = new productController();
