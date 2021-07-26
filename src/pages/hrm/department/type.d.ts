
declare namespace DepartmentTypeAPI {

  type Department = {
    id?: number;
    parent_id?:number;
    name?: string;
    code?:string;
    remark?: string;
    type?: boolean;
    create_time?: string;
    [key: string]: any;
  };

  //type ActionHandler = (action: DepartmentTypeAPI.Action,record:any) => void;

}
  