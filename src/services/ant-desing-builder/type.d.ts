
declare namespace AntDesingBuilderTypeAPI {


  type ActionHandler = (action: Action,record:any) => void;

  type Page = {
    title: string;
    type: string;
    searchBar?: boolean;
    trash?: boolean;
  };

  type Action = {
    component: string;
    icon: string;
    text: string;
    type: string;
    action: string;
    uri?: string;
    method?: string;
  };

  type Field = {
    title: string;
    dataIndex: string;
    key: string;
    [key:string]:any;
    [key: number]: any;
  };

  type DataSource = {
    [key:string]:any;
  };

  type Tabs = {
    title: string;
    name: string;
    data: Field[];
  };

  type Actions = {
    title: string;
    name: string;
    data: Action[];
  };

  type tableColumn = Field[];
  type tableToolBar = Action[];
  type batchToolBar = Action[];

  type ListLayout = {
    tableColumn: Field[];
    tableToolBar: Action[];
    batchToolBar: Action[];
  };

  type PageLayout = {
    tabs: Tabs[];
    actions: Actions[];
  };

  type ListData = {
    page:Page;
    layout:LIstLayout;
    dataSource:dataSource[];
    meta:Meta;
  }
}
  