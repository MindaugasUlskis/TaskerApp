export {};

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  LogInOrRegister: undefined;
  LogScreen: undefined;
  TaskHistory: undefined;
  CurrentTask: undefined;
  Main: undefined;
  MarketPlace: undefined;
  MarketPlaceTask: { Task: { jobCategory: string, dateCreated: string, status: string, address: string, city: string, cost: number, notes: string } } ;
  CurrentTaskInfo: { Task: { jobCategory: string, dateCreated: string, status: string, address: string, city: string, cost: number, notes: string, tel: string } } ;
  UserSettings: {User:{name: string, secondName: string, rating: number, address: string, city: string[],skills: string[], photo: any, phone: string, bank: string, email: string }}
  HistoryTaskInfo: { Task: { jobCategory: string, dateCreated: string, status: string, address: string, city: string, cost: number, notes: string, tel: string } } ;
};

//RootStackParamList types are used for navigation between screens. with data or without it