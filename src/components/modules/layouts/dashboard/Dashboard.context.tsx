// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { createContext, useReducer, useMemo } from 'react';

// 📦 Internal imports
import type { DashboardSidebarContextFlagsT } from '~types/dashboard';
import type { ContextGeneralT } from '~contexts/local';
import { sharedReducer } from '~contexts/index.reducer';
import { createActions } from '~contexts/index.actions';

// 🧾 Local types and context declare
interface PropsT {
  children: React.ReactNode;
}

type DashboardSidebarContextT = ContextGeneralT<
  {},
  {},
  DashboardSidebarContextFlagsT
> & {
  getters?: {
    getOpenState: () => boolean;
  };
};

const initialState: DashboardSidebarContextT = {
  data: {},
  params: {},
  flags: {
    isOpen: false,
    isHovered: false,
    isDisabled: false,
    isHoverable: false,
  },
};

export const DashboardSidebarContext =
  createContext<DashboardSidebarContextT>(initialState);

// ⚙️ Functional component
const DashboardContext: React.FC<PropsT> = ({ children }) => {
  const [state, dispatch] = useReducer(
    sharedReducer<{}, {}, DashboardSidebarContextFlagsT>,
    initialState,
  );

  const getOpenState = () => {
    if (state.flags.isDisabled) return false;

    if (state.flags.isHoverable) {
      return state.flags.isHovered;
    } else {
      return state.flags.isOpen;
    }
  };

  const actions = useMemo(() => createActions(dispatch), [dispatch]);

  return (
    <DashboardSidebarContext
      value={{ ...state, actions, getters: { getOpenState } }}
    >
      {children}
    </DashboardSidebarContext>
  );
};
export default DashboardContext;
