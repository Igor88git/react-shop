function Cart(props) {
    const {kolichestvo = 0, handleBasketShow = Function.prototype} = props;
    return <div className='cart blue darken-4 white-text' 
                        onClick={handleBasketShow}>

        <i class="material-icons">add_shopping_cart</i>
        
        {kolichestvo ? <span className='cart-kolichestvo'>{kolichestvo}</span> : null}
    </div>
}

export {Cart}