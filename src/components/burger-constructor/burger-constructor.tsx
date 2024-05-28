import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearIngredients,
  getConstructor
} from '../../services/slices/constructorSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  closeOrder,
  getLoading,
  getOrderBurger,
  getOrder
} from '../../services/slices/orderSlice';
import { isAuthCheck } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  const constructorItems = useSelector(getConstructor);
  const orderRequest = useSelector(getLoading);
  const orderModalData = useSelector(getOrder);
  const isAuth = useSelector(isAuthCheck);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const order: string[] = [
    ...constructorItems.ingredients.map((item) => item._id),
    constructorItems.bun?._id
  ].filter((id): id is string => !undefined);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuth) {
      navigate('/login');
    }
    dispatch(getOrderBurger(order));
  };

  const closeOrderModal = () => {
    dispatch(clearIngredients());
    dispatch(closeOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
