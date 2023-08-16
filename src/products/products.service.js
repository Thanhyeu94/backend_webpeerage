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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("../config/pg");
class productService {
    listAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listAllProduct = yield pg_1.pool.query(`SELECT*FROM products`);
                if (listAllProduct.rows.length === 0) {
                    return null;
                }
                return listAllProduct.rows;
            }
            catch (error) {
                console.log("err", error);
                throw error;
            }
        });
    }
    listFindProduct(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listFindProduct = yield pg_1.pool.query(`select products.name as product_Name, 
              sizes.name as product_Size, products.unit_price, 
              colors.name as product_Color,categories.name as categories_Product
              from products
              join products_sizes on products.id = products_sizes.products_id
              join sizes on products_sizes.sizes_id = sizes.id
              join products_colors on products.id = products_colors.products_id
              join colors on products_colors.colors_id = colors.id
              join categories on products.categories_id = categories.id
              where products.name like $1
              and colors.name like $2
              and sizes.name like $3
              and categories.name like $5
              and products.unit_price::TEXT LIKE $4`, [`%${payload.productName}%`, `%${payload.colorName}%`,
                    `%${payload.sizeName}%`, `%${payload.product_price}%`,
                    `%${payload.product_categories}%`]);
                console.log("list:", listFindProduct);
                if (listFindProduct.rows.length === 0) {
                    console.log("jijjj");
                    return null;
                }
                return listFindProduct.rows;
            }
            catch (error) {
                console.log("err", error);
                throw error;
            }
        });
    }
    detailProduct(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detailProduct = yield pg_1.pool.query(`
          select products.id, products.name as  product_Name, products.quantity,
              sizes.name as product_Size, products.unit_price, 
              colors.name as product_Color,categories.name as categories_Product
              from products
              join products_sizes on products.id = products_sizes.products_id
              join sizes on products_sizes.sizes_id = sizes.id
              join products_colors on products.id = products_colors.products_id
              join colors on products_colors.colors_id = colors.id
              join categories on products.categories_id = categories.id
          where products.id =$1
          `, [payload.id]);
                if (detailProduct.rows.length === 0) {
                    return null;
                }
                return detailProduct.rows;
            }
            catch (error) {
                console.log("err", error);
                throw error;
            }
        });
    }
    producCart(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detailProduct = yield pg_1.pool.query(`
          select products.id, products.name as  product_Name, products.quantity,
              sizes.name as product_Size, products.unit_price, 
              colors.name as product_Color,categories.name as categories_Product
              from products
              join products_sizes on products.id = products_sizes.products_id
              join sizes on products_sizes.sizes_id = sizes.id
              join products_colors on products.id = products_colors.products_id
              join colors on products_colors.colors_id = colors.id
              join categories on products.categories_id = categories.id
          where products.id =$1
          and sizes.name = $2
          and colors.name =$3
          and products.quantity >= $4
          `, [payload.id, payload.size, payload.color, payload.quantity]);
                if (detailProduct.rows.length === 0) {
                    return null;
                }
                return detailProduct.rows;
            }
            catch (error) {
                console.log("err", error);
                throw error;
            }
        });
    }
}
exports.default = new productService();
