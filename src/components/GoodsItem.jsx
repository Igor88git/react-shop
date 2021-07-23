function GoodsItem(props) {
     // деструктурируем пропсы и раскидываю эти данные в карточку ниже
    const { 
        id, 
        name, 
        description, 
        price, 
        full_background, 
        addToBasket = Function.prototype 
        } = props;

    return <div className="card">
    <div className="card-image">
      <img src={full_background} alt={name} />
    </div>
    <div className="card-content">
    <span className="card-title">{name}</span>
      <p> {description} </p>
    </div>
    <div className="card-action">
        <button className='btn' onClick={() => addToBasket({
              id, 
              name, 
              price, 
          })}>Купить</button>
        <span className='right' style={{FontSize: '1.8rem'}}>{price} руб.</span>
    </div>
  </div>
}

export {GoodsItem};