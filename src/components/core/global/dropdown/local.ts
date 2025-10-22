export interface TriggerPropsT {
  children: React.ReactNode;
  activeClassName?: string;
}

export interface MenuPropsT extends React.ComponentProps<'div'> {
  children: React.ReactNode;
}

export interface AggregatorPropsT extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  overlay?: 'dark' | 'blur';
}

export interface DropDownContextT {
  menuStatus: 'open' | 'closed';
  menuStatusChanger: () => void;
}
