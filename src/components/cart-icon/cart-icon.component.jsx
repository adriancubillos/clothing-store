import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import './cart-icon.styles.scss';

const CartIcon = ({ onToggleCartHidden, itemCount }) => (
  <div className='cart-icon' onClick={onToggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);

const mapStateToProps = ({ cart: { cartItems } }) => {
  const initialValue = 0;
  return {
    itemCount: cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      initialValue
    ),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onToggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
