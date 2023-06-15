export const navTabs = [
    {
        title: "Make Ready",
        class: "active"
    },
    {
        title: "Repairs & Maintenance",
        class: ""
    },
]

export const makeReady = 
    {
        controls: [
            { 
                name:'studio',
                label:'Studio',
                placeholder:'$'
            },
            { 
                name:'oneBedroom',
                label:'One Bedroom',
                placeholder:'$'
            },
            { 
                name:'twoBedroom',
                label:'Two Bedroom',
                placeholder:'$'
            },
            { 
                name:'threeBedroom',
                label:'Three Bedroom',
                placeholder:'$'
            },
            { 
                name:'fourBedroom',
                label:'Four Bedroom/Penthouse',
                placeholder:'$'
            },
            { 
                name:'inHouseTurns',
                label:'% In-House Turns',
                placeholder:'%'
            }
        ],
        rows: [
            {
                row_name: 'Carpet/Floors',
                group_name: 'carpet',
                control_name:'carpetFloors',
                validation: {
                    pattern: '[0-9]*'
                },
                
            },
            {
                row_name: 'Cleaning-General',
                group_name: 'cleaning',
                control_name:'cleaningGeneral',
                validation: {
                    pattern: '[0-9]*'
                }
            },
            {
                row_name: 'Contract Painting',
                group_name: 'painting',
                control_name:'contractPainting',
                validation: {
                    pattern: '[0-9]*'
                }
            },
        ]
    }

export const expenseRMConfig1 = [
    {
        control_name: 'rmAppliances',
        label: 'R/M Appliances',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmGarageCarport',
        label: 'R/M Garage/Carport',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmCleaningSupplies',
        label: 'R/M Cleaning Supplies',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmCommonArea',
        label: 'R/M Common Area',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmElectrical',
        label: 'R/M Electrical',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmElevatorRepair',
        label: 'R/M Elevator Repair',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmEquipmentMaintenance',
        label: 'R/M Equipment Maint',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmExterminating',
        label: 'R/M Exterminating',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmFireEquipmentGenerator',
        label: 'R/M FireEquip/Generator',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmFitnessCenter',
        label: 'R/M FitnessCenter',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmHVACRepair',
        label: 'R/M HVAC Repair',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmLightsLampsBallas',
        label: 'R/M Lights/Lamps/Ballas',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmPaintingInterior',
        label: 'R/M PaintingInterior',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmParkingLot',
        label: 'R/M ParkingLot',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmPlumbing',
        label: 'R/M Plumbing',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmPoolSpaJacuzzi',
        label: 'R/M Pool/Spa/Jacuzzi',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmFireSprinkler',
        label: 'R/M Fire Sprinkler',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmToolsEquipment',
        label: 'R/M Tools/Equipment',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmUniformOther',
        label: 'R/M Uniforms&Other',
        pattern: '[0-9]*'
    },
    {
        control_name: 'rmWindowScreen',
        label: 'R/M Window/Screen',
        pattern: '[0-9]*'
    },
]