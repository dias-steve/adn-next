import {getItemsStockState} from './checkout.utils'
import {setListNotValidItem} from "../redux/Order/order.actions";

export const MESSAGERUPTUREDESTOCK = "Produit en rupture de stock"
export const MESSAGEQUATITELIMITE = "Quantité limitée à "

export const getMessageErrorCartItem = (itemError) => {
    if(itemError.code_error === 10){
        return  MESSAGERUPTUREDESTOCK;
    }

    if(itemError.code_error === 20) {
        const limitquantity = itemError.stock_quantity
        return MESSAGEQUATITELIMITE+''+limitquantity+' produit'+ (limitquantity > 1 && 's');
    }

    return ''
}

export const getItemError = (itemID, listItems) => {
    let itemResult = null
    listItems.forEach(item => {
        if(item.id === itemID) {
            itemResult= {...item}

        }
    });
    return itemResult
}

export const checksItemsStockInCart = async (items, dispatch) => {
    const stockState = await getItemsStockState(items);

        dispatch(
            setListNotValidItem(stockState.items_no_stock)
        )

       
}

export const resolveQuatinityCartError = (listItemsError, updateItemQuantity, inCart) => {
    listItemsError.forEach(
        item => {
            if(item.code_error=== 20){
     
                if(inCart(item.id)){
                    //updateItemQuantity(item.id,10)
                }
            }
        }
    )
}