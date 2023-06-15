import { IMasterConfigForm } from "../interfaces/master-data.model";

export const navTabs = [
    {
        title: "STATIC FILE UPLOAD",
        class: "active"
    },
    {
        title: "ACTUAL-BUDGET",
        class: ""
    },
    {
        title: "CONFIGURATION",
        class: ""
    },
    {
        title: "COMMUNITY",
        class: ""
    }
]

export const masterConfigFor = {
  mainMenu: [
    {
      control_name: "precentage_threshold",
      label: "Percentage Threshold",
      placeholder: "Percent",
      pattern: "[0-9]*",
      min: 1,
      max: 9,
    },
    {
      control_name: "workflow_life_cycle",
      label: "Workflow Life Cycle",
      placeholder: "Days",
      pattern: "[0-9]*",
      min: 1,
      max: 1000,
    },
  ],

  subMenu: [
    {
      label: "Retention",
      control: "retention",
      data: {
        min: {
          control_name: "retention_min",
          label: "from",
          placeholder: "from",
          pattern: "[0-9]*",
          min: 1,
          max: 1000,
        },
        max: {
          control_name: "retention_max",
          label: "to",
          placeholder: "to",
          pattern: "[0-9]*",
          min: 1,
          max: 1000,
        },
      },
    },
    {
      label: "Occupancy",
      control: "occupancy",
      data: {
        min: {
          control_name: "occupancy_min",
          label: "from",
          placeholder: "from",
          pattern: "[0-9]*",
          min: 1,
          max: 1000,
        },
        max: {
          control_name: "occupancy_max",
          label: "to",
          placeholder: "to",
          pattern: "[0-9]*",
          min: 1,
          max: 1000,
        },
      },
    },
    {
      label: "Market Rent Growth",
      control: "rentGrowth",
      data: {
        min: {
          control_name: "market_rent_growth_min",
          label: "from",
          placeholder: "from",
          pattern: "^[0-9]+(.[0-9]{0,4})?$",
          min: 0,
          max: 50,
        },
        max: {
          control_name: "market_rent_growth_max",
          label: "to",
          placeholder: "to",
          pattern: "^[0-9]+(.[0-9]{0,4})?$",
          min: 0,
          max: 50,
        },
      },
    },
    {
      label: "Renewal Increase",
      control: "renewalIncrease",
      data: {
        min: {
          control_name: "renewal_increase_min",
          label: "from",
          placeholder: "from",
          pattern: "[0-9]*",
          min: 1,
          max: 1000,
        },
        max: {
          control_name: "renewal_increase_max",
          label: "to",
          placeholder: "to",
          pattern: "[0-9]*",
          min: 1,
          max: 1000,
        },
      },
    },
  ],
};
export const masterConfigForm: IMasterConfigForm[] = [
  {
    control_name: "precentage_threshold",
    label: "Percentage Threshold",
    placeholder: "Percent",
    pattern: "[0-9]*",
    required: true,
    min: 1,
    max: 9,
  },
  {
    control_name: "workflow_life_cycle",
    label: "Workflow Life Cycle",
    placeholder: "Days",
    pattern: "[0-9]*",
    required: true,
    min: 1,
    max: 1000,
  },
  {
    control_name: 'revenue_config',
    label: 'Revenue',
    nested: true,
    subMenu: [
      {
        label: "Retention",
        control_name: "retention",
        nested: true,
        subMenu: [
          {
            control_name: "retention_min",
            label: "from",
            placeholder: "from",
            pattern: "[0-9]*",
            min: 1,
            max: 1000,
            required: true,
          },
          {
            control_name: "retention_max",
            label: "to",
            placeholder: "to",
            pattern: "[0-9]*",
            min: 1,
            max: 1000,
            required: true,
          },
        ],
      },
      {
        label: "Occupancy",
        control_name: "occupancy",
        nested: true,
        subMenu: [
          {
            control_name: "occupancy_min",
            label: "from",
            placeholder: "from",
            pattern: "[0-9]*",
            min: 1,
            max: 1000,
            required: true,
          },
          {
            control_name: "occupancy_max",
            label: "to",
            placeholder: "to",
            pattern: "[0-9]*",
            min: 1,
            max: 1000,
            required: true,
          },
        ],
      },
      {
        label: "Market Rent Growth",
        control_name: "rentGrowth",
        nested: true,
        subMenu: [
          {
            control_name: "market_rent_growth_min",
            label: "from",
            placeholder: "from",
            pattern: "^[0-9]+(.[0-9]{0,4})?$",
            min: 0,
            max: 50,
            required: true,
          },
          {
            control_name: "market_rent_growth_max",
            label: "to",
            placeholder: "to",
            pattern: "^[0-9]+(.[0-9]{0,4})?$",
            min: 0,
            max: 50,
            required: true,
          },
        ],
      },
      {
        label: "Renewal Increase",
        control_name: "renewalIncrease",
        nested: true,
        subMenu: [
          {
            control_name: "renewal_increase_min",
            label: "from",
            placeholder: "from",
            pattern: "[0-9]*",
            min: 1,
            max: 1000,
            required: true,
          },
          {
            control_name: "renewal_increase_max",
            label: "to",
            placeholder: "to",
            pattern: "[0-9]*",
            min: 1,
            max: 1000,
            required: true,
          },
        ],
      },
    ],

  }
];

export const masterUploadForm = [
    {
        control_name: 'department',
        label: 'Select Department'
    },
    {
        control_name: 'file_type',
        label: 'Select File Type'
    },
    {
        control_name: 'file',
        label: 'Upload File'
    },
]

export const masterTable = {
    headers: ['checkbox', 'Department', 'File Name', 'Uploaded Date', 'Uploaded By'],
    dataRows: [
        {
            class: '',
            disabled: false,
            department: 'Accounting',
            file_name: 'demo.xlsx',
            uploaded_date: '06/28/2022',
            uploaded_by: 'Diana Collabero'
        },
        {
            class: '',
            disabled: false,
            department: 'IT',
            file_name: 'demo.xlsx',
            uploaded_date: '06/28/2022',
            uploaded_by: 'Diana Collabero'
        },
        {
            class: '',
            disabled: false,
            department: 'Human Resources',
            file_name: '',
            uploaded_date: '',
            uploaded_by: ''
        },
        {
            class: '',
            disabled: false,
            department: 'Revenue',
            file_name: '',
            uploaded_date: '',
            uploaded_by: ''
        }
    ]
}

export const departmentOptions = [
    {
        value: 'accounting',
        viewValue: 'Accounting',
        options: [
            {
                value: 'insurance_expenses',
                viewValue: 'Insurance Expenses'
            },
            {
                value: 'worker_comp',
                viewValue: 'Workers Comp.'
            },
            {
                value: 'management_fee',
                viewValue: 'Management Fee'
            },
            {
                value: 'speciality  Fee',
                viewValue: 'Specialty fee'
            },
        ]
    },
    {
        value: 'it',
        viewValue: 'IT'
    },
    {
        value: 'human_resources',
        viewValue: 'Human Resources',
        options: [
            {
                value: 'payroll',
                viewValue: 'Payroll'
            },
        ]
    },
    {
        value: 'revenue',
        viewValue: 'Revenue'
    },
]