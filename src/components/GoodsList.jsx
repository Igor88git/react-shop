import {GoodsItem} from './GoodsItem'

// компонент функция через пропсы будет получать массив всх товаров
function GoodsList(props) {
    const { goods = [], addToBasket = Function.prototype } = props; //по умолчанию пустой массив

    // если goods.length пустой (равен 0)
    if (!goods.length) {
        return <h3>Нет товаров</h3>
    }

    // если есть товары, обходим через мап список товаров
    return <div className="goods">
        {goods.map((item) => ( // для каждого элемента товара мы возвращаем разметку GoodsItem
            <GoodsItem key={item.id} {...item} addToBasket={addToBasket} />
        ))}
    </div>
}

export {GoodsList};
// он нам должен возвращать разметку, поэтому нужна одна карточка товара