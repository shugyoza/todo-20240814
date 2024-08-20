export interface Icon {
  start?: string;
  end?: string;
}

export interface IosList {
  name: string;
  expandable?: boolean;
  expanded?: boolean;
  count?: number;
  icon?: Icon;
  children?: IosList[];
}
