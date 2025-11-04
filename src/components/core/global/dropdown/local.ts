export interface TriggerPropsT {
  children: React.ReactNode;
  activeClassName?: string;
}

export interface MenuPropsT extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  side?: 'bottom' | 'top' | 'right';
}

export interface AggregatorPropsT extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  overlay?: 'dark' | 'blur';
  hideScroll?: boolean;
}

export interface DropDownContextT {
  menuStatus: 'open' | 'closed';
  menuStatusChanger: () => void;
}
