export type BaseModel = {
  uid: string;
  name: string;
};

export type BaseDetailedModel = {
  uid: string;
  name: string;
  created_by: string;
  editors?: string[];
};
