// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

// 📦 Internal imports
import type { CurrencyContextDataT, CurrencyT } from '~types/coins';
import type { ContextGeneralT } from '~contexts/local';
import { useLocalStorage } from '~hooks/useLocalStorage';
import { getConversionFactors } from '~services/integrations/coins';
import { sharedReducer } from '~contexts/index.reducer';
import { createActions } from '~contexts/index.actions';

// 🧾 Local types and context declare
interface PropsType {
  children: React.ReactNode;
}

type CurrencyContextT = ContextGeneralT<CurrencyContextDataT, {}, {}>;

const initialState: CurrencyContextT = {
  data: { currency: 'USD' },
  params: {},
  flags: {},
};

export const CurrencyContext = createContext<CurrencyContextT>(initialState);

// ⚙️ Functional component
const CurrencyContextProvider: React.FC<PropsType> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useLocalStorage<CurrencyT>(
    'currency',
    'USD',
  );

  const [state, dispatch] = useReducer(
    sharedReducer<CurrencyContextDataT, {}, {}>,
    initialState,
  );

  const actions = useMemo(() => createActions(dispatch), [dispatch]);

  const hasMounted = useRef(false);
  const hasHydrated = useRef(false);

  useEffect(() => {
    if (hasHydrated.current || !selectedCurrency) return;
    actions.setData('currency', selectedCurrency);
  }, [selectedCurrency]);

  useEffect(() => {
    if (!hasHydrated.current) return;
    setSelectedCurrency(state.data.currency);
  }, [state]);

  useEffect(() => {
    const getFactors = async () => {
      if (hasMounted.current) {
        const resp = await getConversionFactors(state.data.currency);
        if (!resp) return;
        actions.setData('conversionFactors', resp);
      } else {
        hasMounted.current = true;
      }
    };

    getFactors();
  }, [state.data.currency]);

  return (
    <CurrencyContext value={{ ...state, actions }}>{children}</CurrencyContext>
  );
};
export default CurrencyContextProvider;
