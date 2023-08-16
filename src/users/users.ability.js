"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ability_1 = require("@casl/ability");
function defineAbilityFor(customers) {
    return (0, ability_1.defineAbility)((can, cannot) => {
        can('read', 'Comment');
        if (customers.id) {
            console.log("haha:", customers.id);
            can('update', 'Comment', { customers_id: customers.customers_id });
            can('addProduct', 'cart', { customers_id: customers.customers_id });
        }
    });
}
exports.default = defineAbilityFor;
