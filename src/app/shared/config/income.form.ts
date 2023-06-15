export const IncomeMonthlyFormConfig = {
    headers: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    control_names: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    rows: [
        {
            row_name: '# of Occupants Paying Fee',
            group_name: 'rentersOccupantPayingFee',
            type: 'number',
            validation: {
                pattern: '[0-9]*',
                min: 1,
                max: 200
            },
            tip: `value should be in between 51 - 100%`
        },
        {
            row_name: '% of Occupants Paying Fee',
            group_name: 'pestControlOccupantPayingFee',
            type: 'percent',
            validation: {
                pattern: '^[0-9]+(.[0-9]{0,4})?$',
                min: 1,
                max: 100
            },
            tip: `value should be in between 51 - 100%`
        },
        {
            row_name: '# of Occupants Paying Fee',
            group_name: 'lateChargesOccupantPayingFee',
            type: 'number',
            validation: {
                pattern: '[0-9]*',
                min: 1,
                max: 200
            },
            tip: 'value should be in between 51 - 100%'
        },
        {
            row_name: 'Monthly NSF Charges',
            group_name: 'monthlyNsfCharges',
            type: 'number',
            validation: {
                pattern: '^[0-9]+(.[0-9]{0,4})?$',
                min: 1,
                max: 200
            },
            tip: 'value should be in between 0.01 - 0.5%'
        },
        {
            row_name: '# of Terminations',
            group_name: 'numberOfTerminations',
            type: 'number',
            validation: {
                pattern: '[0-9]*',
                min: 1,
                max: 200
            },
            tip: 'value should be in between 1 - 25%'
        },
        {
            row_name: '# of Occupied Units',
            group_name: 'numberOfOccupiedUnits',
            type: 'number',
            validation: {
                pattern: '[0-9]*',
                min: 1,
                max: 200
            },
            tip: 'Number of Expirations'
        },
        {
            row_name: 'Estimated # of Transfers',
            group_name: 'estimatedNumberOfTransfers',
            type: 'number',
            validation: {
                pattern: '[0-9]*',
                min: 1,
                max: 200
            },
            tip: 'Number of Expirations'
        },
    ]
}

export const incomeFormConfig = [
    {
        control_name: 'adminFee',
        label: 'Admin Fee',
        category: 'adminFee',
        pattern: '^[0-9]+(.[0-9]{0,4})?$',
        placeholder: '$',
        min: 0,
        max: 200
    },
    {
        control_name: 'appFee',
        label: 'App Fee',
        category: 'appFee',
        pattern: '^[0-9]+(.[0-9]{0,4})?$',
        placeholder: '$',
        min: 0,
        max: 120
    },
    {
        control_name: 'appPerMI',
        label: '# of Apps per MI',
        category: 'appFee',
        pattern: '^[0-9]+(.[0-9]{0,4})?$',
        placeholder: '',
        min: 0,
        max: 10
    },
    {
        control_name: 'edgeFee',
        label: 'Edge Fee',
        category: 'edgeFee',
        pattern: '^[0-9]+(.[0-9]{0,4})?$',
        placeholder: '$',
        min: 0,
        max: 400,
    },
    {
        control_name: 'edgePercent',
        label: '% of Move In Using Edge',
        category: 'edgeFee',
        placeholder: '%',
        pattern: '[0-9]*',
        min: 0,
        max: 100
    },
    {
        control_name: 'electricityIncome',
        label: 'Average Fee per Unit',
        category: 'electricityIncome',
        pattern: '^[0-9]+(.[0-9]{0,4})?$',
        placeholder: '$',
        min: 0,
        max: 10
    },
    {
        control_name: 'rentersInsurance',
        label: 'Final Fee Amount',
        category: 'rentersInsurance',
        pattern: '^[0-9]+(.[0-9]{0,4})?$',
        placeholder: '$',
        min: 0,
        max: 20
    },
    {
        control_name: 'complianceTrackingFee',
        label: 'Fee per Unit ',
        category: 'complianceTrackingFee',
        pattern: '^[0-9]+(.[0-9]{0,4})?$',
        placeholder: '$',
        min: 0,
        max: 20
    },
    {
        control_name: 'pestControlIncome',
        label: 'Income per Unit',
        category: 'pestControlIncome',
        pattern: '^[0-9]+(.[0-9]{0,4})?$',
        placeholder: '$',
        min: 0,
        max: 10,
    },
    {
        control_name: 'lateCharges',
        label: 'Late Fees',
        category: 'lateCharges',
        placeholder: '$',
        pattern: '[0-9]*',
        min: 0,
        max: 500
    },
    {
        control_name: 'nsfCharges',
        label: 'NSF Fee',
        category: 'nsfCharges',
        placeholder: '$',
        pattern: '[0-9]*',
        min: 0,
        max: 500
    },
    {
        control_name: 'leaseTermination',
        label: 'Termination Fee',
        category: 'leaseTermination',
        placeholder: '$',
        pattern: '[0-9]*',
        min: 0,
        max: 500
    },
    {
        control_name: 'smartRent',
        label: 'Smart Rent Fee',
        category: 'smartRent',
        pattern: '^[0-9]+(.[0-9]{0,4})?$',
        placeholder: '$',
        min: 0,
        max: 150
    },
    {
        control_name: 'securityDepositForfeit',
        label: 'Average Fee per MO',
        category: 'securityDepositForfeit',
        placeholder: '$',
        pattern: '[0-9]*',
        min: 0,
        max: 120
    },
    {
        control_name: 'storageUnits',
        label: 'No of Units',
        category: 'storageIncome',
        placeholder: '$',
        pattern: '[0-9]*',
        min: 0,
        max: 120
    },
    {
        control_name: 'pricePerUnits',
        label: 'Price Per Unit',
        category: 'storageIncome',
        placeholder: '$',
        pattern: '[0-9]*',
        min: 0,
        max: 120
    },
    {
        control_name: 'residentTransferFee',
        label: 'Cost per Transfer',
        category: 'residentTransferFee',
        placeholder: '$',
        pattern: '[0-9]*',
        min: 0,
        max: 120
    },
]

export const incomeFormSections = [
    {
        control: 'adminFee',
        view: 'Admin Fee',
        class: 'toggle-active',
    },
    {
        control: 'appFee',
        view: 'App Fee',
        class: 'height-0',
    },
    {
        control: 'edgeFee',
        view: 'Edge Fee',
        class: 'height-0',
    },
    {
        control: 'electricityIncome',
        view: 'Electricity Income',
        class: 'height-0',
    },
    {
        control: 'rentersInsurance',
        view: 'Renters Insurance',
        class: 'height-0',
        manual: true,
        manual_title: '# of Occupants Paying Fee',
        value_type: 'number',
        monthly_control: 'rentersOccupantPayingFee'
    },
    {
        control: 'complianceTrackingFee',
        view: 'Compilance Tracking Fee',
        class: 'height-0',
    },
    {
        control: 'pestControlIncome',
        view: 'Pest Control Income',
        class: 'height-0',
        manual: true,
        manual_title: '% of Occupants Paying Fee',
        input_type: 'percent',
        monthly_control: 'pestControlOccupantPayingFee'
    },
    {
        control: 'lateCharges',
        view: 'Late Charges',
        class: 'height-0',
        manual: true,
        manual_title: '# of Occupants Paying Fee',
        value_type: 'number',
        monthly_control: 'lateChargesOccupantPayingFee'
    },
    {
        control: 'nsfCharges',
        view: 'NSF Fee',
        class: 'height-0',
        manual: true,
        manual_title: 'Monthly NSF Charges',
        value_type: 'number',
        monthly_control: 'monthlyNsfCharges'
    },
    {
        control: 'leaseTermination',
        view: 'Lease Termination',
        class: 'height-0',
        manual: true,
        manual_title: '# of Terminations',
        value_type: 'number',
        monthly_control: 'numberOfTerminations'
    },
    {
        control: 'smartRent',
        view: 'Smart Rent',
        class: 'height-0',
    },
    {
        control: 'securityDepositForfeit',
        view: 'Security Deposit Forfeit',
        class: 'height-0',
    },
    {
        control: 'storageIncome',
        view: 'Storage Income',
        class: 'height-0',
        manual: true,
        manual_title: '# of Occupied Units',
        value_type: 'number',
        monthly_control: 'numberOfOccupiedUnits'
    },
    {
        control: 'residentTransferFee',
        view: 'Resident Transfer Fee',
        class: 'height-0',
        manual: true,
        manual_title: 'Estimated # of Transfers',
        value_type: 'number',
        monthly_control: 'estimatedNumberOfTransfers'
    }
]

export const incomeFormValidation = [
    {
        category:'appFee',
        controls:['appFee', 'appPerMI']
    },
    {
        category:'edgeFee',
        controls:['edgeFee', 'edgePercent']
    },
    {
        category:'storageIncome',
        controls:['storageUnits', 'pricePerUnits']
    }
]
