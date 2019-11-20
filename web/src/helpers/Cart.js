import Auth from './Authentication'
import { ToastSuccess, ToastError, ToastWarning } from '../Utils/Toastify';

export default class ShoppingCart {

    static initCart() {
        if (Auth.check()) {
            let cart = {
                userId: Auth.user().UserId,
                products: [],
                deliveryAddress: Auth.user().Address,
                note: ""
            }
            localStorage.setItem(`_cart_${Auth.user().UserId}`, JSON.stringify(cart))
            return cart;
        } else {
            ToastWarning("Vui lòng đăng nhập để tiếp tục!")
        }
    }

    static count() {
        if (Auth.check()) {
            let products = this.getProductsInCart()
            return products.length
        }
        return 0
    }

    static getTotalPrice(shipFee) {
        let totalPrice = shipFee
        let products = this.getProductsInCart()
        products.forEach(item => {
            totalPrice += (item.quantity * item.price)
        })
        return totalPrice
    }

    static findItem(productSizeId) {
        let products = this.getProductsInCart()
        let result = {
            index: -1,
            value: {}
        }
        products.forEach((item, index) => {
            if (item.selectedSizeId === productSizeId) {
                result = {
                    index,
                    value: item
                }
            }
        });
        return result
    }

    static addItem(item) {
        if (Auth.check()) {
            let cart = this.getCart()
            let existedItem = this.findItem(item.selectedSizeId)
            if (existedItem.index !== -1) {
                existedItem.value.quantity += item.quantity
                cart.products.splice(existedItem.index, 1, existedItem.value)
            } else {
                cart.products.push(item)
            }
            localStorage.setItem(`_cart_${Auth.user().UserId}`, JSON.stringify(cart))
            ToastSuccess("Thêm thành công!")
        } else {
            if (window.confirm("Opps, bạn chưa đăng nhập!")) {
                window.location.replace("/login")
            }
        }
    }

    static removeItem(productSizeId) {
        if (Auth.check()) {
            let cart = this.getCart()
            let item = this.findItem(productSizeId)
            if (item.index !== -1) {
                cart.products.splice(item.index, 1)
                localStorage.setItem(`_cart_${Auth.user().UserId}`, JSON.stringify(cart))
                ToastSuccess("Xóa thành công")
            } else {
                ToastError("Mặt hàng này đã ngừng bán hoặc không còn bán trong cửa hàng!")
            }
        } else {
            ToastWarning("Vui lòng đăng nhập để tiếp tục!")
        }
    }

    static getCart() {
        let cart = JSON.parse(localStorage.getItem(`_cart_${Auth.user().UserId}`))
        if (cart) {
            return cart
        }
        return this.initCart()
    }

    static getProductsInCart() {
        if (Auth.check()) {
            return this.getCart().products
        }
        return []
    }

    static remove() {
        if (Auth.check()) {
            localStorage.removeItem(`_cart_${Auth.user().UserId}`)
            return true
        }
        return false
    }
}