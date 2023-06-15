export const revenueInput = {
    headers: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    control_names: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    rows: [
        {
            row_name: 'Retention',
            group_name: 'retention',
            type: 'percent',
            validation: {
                pattern: '[0-9]*',
                min: 51,
                max: 100
            },
            tip: `value should be in between 51 - 100%`
        },
        {
            row_name: 'Occupancy',
            group_name: 'occupancy',
            type: 'percent',
            validation: {
                pattern: '[0-9]*',
                min: 1,
                max: 100
            },
            tip: 'value should be in between 51 - 100%'
        },
        {
            row_name: 'Market Rent Growth',
            group_name: 'rentGrowth',
            type: 'percent',
            validation: {
                pattern: '^[0-9]+(.[0-9]{0,4})?$',
                min: 0.01,
                max: 0.50
            },
            tip: 'value should be in between 0.01 - 0.5%'
        },
        {
            row_name: 'Renewal Increase',
            group_name: 'renewalIncrease',
            type: 'percent',
            validation: {
                pattern: '[0-9]*',
                min: 1,
                max: 25
            },
            tip: 'value should be in between 1 - 25%'
        },
        {
            row_name: 'Expirations',
            group_name: 'expirations',
            type: 'number',
            validation: {
                pattern: '[0-9]*'
            },
            tip: 'Number of Expirations'
        },
    ]
}

export const revenueInputOther = {
    headers: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    control_names: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    rows: [
        {
            row_name: 'Renewals',
            group_name: 'renewals',
            type: 'number',
            validation: {
                pattern: '[0-9]*'
            },
            tip: `Derived numbers from Retention and Expiration`
        },
        {
            row_name: 'Occupied Units',
            group_name: 'occupiedUnits',
            type: 'number',
            validation: {
                pattern: '[0-9]*'
            },
            tip: 'Derived numbers from Occupancy and Community Units'
        },
        {
            row_name: "Move In's Required",
            group_name: 'moveins',
            type: 'number',
            validation: {
                pattern: '^[0-9]+(.[0-9]{0,4})?$'
            },
            tip: 'Derived number from Occupied Units, Renewals, Expiration, Units'
        },
        {
            row_name: 'Move Outs',
            group_name: 'moveouts',
            type: 'number',
            validation: {
                pattern: '[0-9]*'
            },
            tip: 'Derived numbers from Expiration and Renewals'
        }
    ]
}

export const sampledata = {
    retention: {
        jan: '',
        feb: '',
        mar: '',
        apr: '',
        may: '',
        jun: 55,
        jul: 55,
        aug: 55,
        sep: 55,
        oct: 55,
        nov: 55,
        dec: 55
    },
    occupancy: {
        jan: '',
        feb: '',
        mar: '',
        apr: '',
        may: '',
        jun: 95,
        jul: 97,
        aug: 97,
        sep: 95,
        oct: 95,
        nov: 95,
        dec: 95
    },
    rentGrowth: {
        jan: '',
        feb: '',
        mar: '',
        apr: '',
        may: '',
        jun: 0.10,
        jul: 0.01,
        aug: 0.01,
        sep: 0.01,
        oct: 0.01,
        nov: 0.01,
        dec: 0.01
    },
    renewalIncrease: {
        jan: '',
        feb: '',
        mar: '',
        apr: '',
        may: '',
        jun: 7,
        jul: 8,
        aug: 10,
        sep: 10,
        oct: 10,
        nov: 10,
        dec: 10
    },
    expirations: {
        jan: '',
        feb: '',
        mar: '',
        apr: '',
        may: '',
        jun: 43,
        jul: 50,
        aug: 27,
        sep: 20,
        oct: 15,
        nov: 15,
        dec: 16
    },
}
