import { defineAbility } from '@casl/ability';
export default function defineAbilityFor(customers:any){
    return defineAbility((can:any,cannot:any)=>{
        can('read', 'Comment');
        if (customers.id) {
            console.log("haha:",customers.id);
            can('update', 'Comment', { customers_id: customers.customers_id })
            can('addProduct', 'cart', { customers_id: customers.customers_id })
          }
    })
}