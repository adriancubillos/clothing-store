import React from 'react';
import { connect } from 'react-redux';
import { addItem, deleteItem, removeItem } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, onDeleteItem, onAddItem, onRemoveItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='item' />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={() => onRemoveItem(cartItem.id)}>
          &#10096;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => onAddItem(cartItem)}>
          &#10097;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={() => onDeleteItem(cartItem.id)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteItem: (itemId) => dispatch(deleteItem(itemId)),
  onAddItem: (item) => dispatch(addItem(item)),
  onRemoveItem: (itemId) => dispatch(removeItem(itemId)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
