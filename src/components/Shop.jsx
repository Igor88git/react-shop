import {useState, useEffect} from 'react'; //хуки
import {API_KEY, API_URL} from '../config';
import {GoodsList} from './GoodsList';
import {Cart} from './Cart';
import {BasketList} from './BasketList';
import {Alert} from './Alert';

import {Preloader} from './Preloader';

function Shop() {
    const [goods, setGoods] = useState([]); // берем из useState список товаров и функция обновления этого списка из хука, изначально пустой массив []

    const [loading, setLoading] = useState(true); // состояние загрузки - уже загружен

    const [order, setOrder] = useState([]); //еще одно состояние - список заказов и функция

    const [isBasketShow, setBasketShow] = useState(false); // изначально корзину не показывать
    
    const [alertName, setAlertName] = useState('');

    const closeAlert = () => {
        setAlertName('');
    };

    // будем вызывать setBasketShow и будем инвертировать текущее состояние показа корзины isBasketShow
    const handleBasketShow = () => { // просто управляет состояние показа
        setBasketShow(!isBasketShow)
    };

// отфильтровуем что удалить, el.id не должен быть равен идентификатору события itemId
// у того el у которого он есть вернется значение false и мы его просто не добавим в новый заказ
    const removeFromBasket = (itemId) => { // принимает id и фильтрует по ниму список заказов который был, удаляя ненужный товар и обновляет список заказов
        const newOrder = order.filter(el => el.id !== itemId);
        setOrder(newOrder); 
    };



// нов ордер обходит текущий ордер мапом
    const addKolichestvo = (itemId) => { // принимает id и фильтрует по ниму список заказов который был, удаляя ненужный товар и обновляет список заказов
        const newOrder = order.map(el => {
// и если находит элемент у которого такой же id 
            if (el.id === itemId) {
// то делает новое количество, которое равно эл количество + 1
                const newKolichestvo = el.kolichestvo + 1;
// тогда возвращаем все ключи эл и обновляем его количество на новое значение
                return {
                    ...el, 
                    kolichestvo: newKolichestvo
                }
            } else { // если это не тот эл кот нужен то просто возвращаем эл
                return el;
            }
        }); // таким образом мы формируем новый заказ в котором пересчитался один элемент
        setOrder(newOrder); 
    };



    const removeKolichestvo = (itemId) => {
        const newOrder = order.map(el => {
// и если находит элемент у которого такой же id 
            if (el.id === itemId) {
// то делает новое количество, которое равно эл количество - 1
                const newKolichestvo = el.kolichestvo - 1;
// тогда возвращаем все ключи эл и обновляем его количество на новое значение
                return {
                    ...el, // если больш 0 то возвращаем newKolichestvo, если меньше то просто ноль 
                    kolichestvo: newKolichestvo >= 0 ? newKolichestvo : 0,
                };
            } else { // если это не тот эл кот нужен то просто возвращаем эл
                return el;
            }
        }); // таким образом мы формируем новый заказ в котором пересчитался один элемент
        setOrder(newOrder);  
    };



    // сценарий когда товар добавляется первый раз
    const addToBasket = (item) => {
        // проверяем - есть ли уже этот товар в корзине
        // сравниваем id элемента в корзине с id элемента который мы добавляем, если id найдется то мы получим просто индекс этого элемента массива 
        const itemIndex = order.findIndex(
            orderItem => orderItem.id === item.id
            );

        if (itemIndex < 0) { //если мы в первый раз добавляем товар
            const newItem = { //создаем newItem, добавляем в него все ключи и количество
                ...item, //унаследует все ключи которые у нас есть 
                kolichestvo: 1, //и добавим одно поле kolichestvo со значением 1 
            };
            setOrder([...order, newItem]) //функция кот возвращает список товаров который уже есть и добавляет туда новый обьект
        } else {//перебипаем массив, находим id и добавляем в него kolichestvo
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {  //массив orderItem и его orderItem.kolichestvo + 1 
                        ...orderItem, // orderItem со всеми ключами остается неизменным, меняем количество
                        kolichestvo: orderItem.kolichestvo + 1 
                    };
                } else { //если это не первый раз добавляем, а товар уже есть в корзине - возвращаем его как он есть 
                    return orderItem;
                }
            })
            // в результате у нас формируется новый массив newOrder и с помощью setOrder 
            setOrder(newOrder);
        }
        setAlertName(item.name);
    };

// всегда принимает функцию и массив зависимостей
// useEffect(() => {}, [])
    useEffect(function getGoods() { // ЗАПРОС после монтирования будем вызывать fetch()
        fetch(API_URL, { // ЗАПРОС делаем по ссылке API_UR. У фетч два параметра - первый просто гет запрос получение данных по ссылке, а второй массив опций
            headers: {
                'Authorization': 'fa826add-e0035e90-79d0d8d2-137d5825',
            }, // полученный ответ преобразую в джейсон (response => response.json())
        }).then(response => response.json()).then(data => {
            data.featured && setGoods(data.featured); //проверяем что он пришел, иначе товары станут undefined
            setLoading(false); // загрузка закончилась, отключаем лоадинг
        }) 
        //data.featured => ключ featured взял в postman

        // полученные данные передаем в наши товары then(data => { setGoods({data.featured}) }); ключ featured взял в программе Postman - по этому ключу придут данные товара

    }, [])

    return (
        <main className='container content'>
            <Cart kolichestvo={order.length} handleBasketShow={handleBasketShow} />
         {/* В зависимости от того идет ли процедура загрузки показываем или прилоадер или список товаров */}
        {loading ? <Preloader /> : <GoodsList goods={goods} addToBasket={addToBasket} />}
        { 
            isBasketShow && <BasketList 
                                order={order} 
                                handleBasketShow={handleBasketShow} 
    // передаю функцию с удалением заказов в корзину removeFromBasket, 
    // и уже после этого ловлю ее в корзине BasketList деструктуризация
                                removeFromBasket={removeFromBasket} 

                                addKolichestvo={addKolichestvo}
                                removeKolichestvo={removeKolichestvo}
                            />
        }
        {// если alertName есть то выдай нам aler и передай в этот alert alertName и closeAlert
            alertName && <Alert name={alertName} closeAlert={closeAlert} />
        }
        </main>
        );
}

export {Shop};
