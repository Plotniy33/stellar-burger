import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeedAll,
  getFeedLoading,
  getFeed
} from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getFeed);
  const isLoading = useSelector(getFeedLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedAll());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeedAll())} />
  );
};
