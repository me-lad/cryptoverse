// 📦 Third-Party imports
import { useQuery } from '@tanstack/react-query';
import { use } from 'react';

// 📦 Internal imports
import { CoinsContext } from '../CoinsPage.context';
import { minutesToMillisecond } from '~helpers/time';
import { getCoins } from '~services/integrations/coins';

export const useCoinsQuery = () => {
  const { params } = use(CoinsContext);

  return useQuery({
    queryKey: ['coins', params.page, params.perPage, params.order],
    queryFn: () => getCoins(params.order, params.page, params.perPage),
    staleTime: minutesToMillisecond(1.5),
  });
};
