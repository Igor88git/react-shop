import {BasketItem} from './BasketItem'

function BasketList(props) {
    const { order = [], 
        handleBasketShow = Function.prototype, 
        removeFromBasket = Function.prototype, 
        addKolichestvo, 
        removeKolichestvo, 
        } = props; // будет приходить список заказов 

//каждый раз когда мы будем получать список заказов, мы будем его обходить методом reduce
//reduce принимает функцию и значение по умолчанию 0
//sum изначально 0б а потом наращиваем предыдущая сумма плюс перемножаю стоимость на количество
    const totalPrise = order.reduce((sum, elem) => {
        return sum + elem.price * elem.kolichestvo
    }, 0);

    return <ul className="collection backet-list">
        <li className="collection-item active">Корзина</li>  {/* ключ active отвечает за то что она будет зеленой */}
        
        { // если есть длина у массива order то обходим каждый элемент и на каждый элемент возвращаем BasketItem который будет получать весь набор ключей
            order.length ? order.map(item => (
                <BasketItem 
                key={item.id} 
                removeFromBasket={removeFromBasket} 
                addKolichestvo={addKolichestvo} // добавляем запись в нашу корзину
                removeKolichestvo={removeKolichestvo} // добавляем запись в нашу корзину
                {...item} />// а если массив пустой то выводим надпись Корзина пуста
            )) : <li className="collection-item">Корзина пуста</li>
        }

        {/* все остальное это элементы корзины которые мы будем в зависимости от ордера динамичесски отрисовывать */}
        
        <li className="collection-item active">Общая стоимость: {totalPrise} руб.
        </li>

        <li className="collection-item">
        <button className="btn btn-small">Оформить Заказ</button>
        </li>

        <i className='material-icons basket-close' onClick={handleBasketShow}>close</i>
    </ul>
}

export {BasketList}