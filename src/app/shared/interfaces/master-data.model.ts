
export interface IMasterConfigForm {
  control_name: string;
  label: string;
  placeholder?: string;
  pattern?: string;
  min?: number;
  max?: number;
  required?: boolean,
  nested?: true,
  subMenu?: IMasterConfigForm[]

}

// export interface rangeConfig {
//   label: string;
//   control: string;
//   data: rangeConfigData;
// }
// export interface rangeConfigData {
//   min: masterConfigForm;
//   max: masterConfigForm;
// }
// export interface revenueConfigForm {
//   mainMenu: masterConfigForm[];
//   subMenu: rangeConfig[];
// }
