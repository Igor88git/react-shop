function BasketItem(props) { // корзина
    const {
        id, 
        name, 
        price, 
        kolichestvo, 
        removeFromBasket = Function.prototype, 
        addKolichestvo = Function.prototype, 
        removeKolichestvo = Function.prototype, 
    } = props;

    return (
        <li className="collection-item">
            {name}   <i className='material-icons plusMinusKolichestvo' onClick={() => removeKolichestvo(id)}>remove</i>  x{kolichestvo}  <i className='material-icons plusMinusKolichestvo' onClick={() => addKolichestvo(id)}>add</i>  = {price*kolichestvo}руб    
            <span href="#!" class="secondary-content" onClick={() => removeFromBasket(id)}>
                <i class="material-icons basket-delete">close</i>
            </span>
        </li>
    );
}

export {BasketItem};