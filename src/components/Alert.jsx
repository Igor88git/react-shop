import {useEffect} from 'react'

function Alert(props) {
    const {name = '', closeAlert = Function.prototype} = props;

    useEffect(() => {
        const timerId = setTimeout(closeAlert, 3000);

        return () => { // очищаем всплывашку если новы товар кликнули
            clearTimeout(timerId)
        };
        //что бы не выдавал ошибку
        //eslint-disable-next-line
    }, [name]);

    return <div id='toast-container'>
        <div className='toast'>{name} добавлен в корзину</div>
    </div>
}

export {Alert}