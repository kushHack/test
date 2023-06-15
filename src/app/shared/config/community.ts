import { ICommunityForm } from "../interfaces/community.model";

export const communityForm = [

    {
        control_name: 'communityId',
        label: 'Community ID',
        type: 'text',
        required: true
    },
    {
        control_name: 'communityName',
        label: 'Community Name',
        type: 'text',
        required: true
    },
    {
        control_name: 'units',
        label: 'Units',
        type: 'number',
        pattern: "[0-9]*",
        required: true
    },
    {
        control_name: 'fund',
        label: 'Fund',
        type: 'text',
        required: true
    },
    {
        control_name: 'region',
        label: 'Region',
        type: 'text',
        required: true
    },
    {
        control_name: 'rpmEmail',
        label: 'RPM',
        type: 'change',
        options: [],
        required: true
    },
    {
        control_name: 'rpm',
        label: '',
        type: 'hidden',
    },
    {
        control_name: 'sqft',
        label: 'SQFT',
        type: 'number',
        pattern: "[0-9]*",
        required: true
    },
    {
        control_name: 'texas_community',
        label: 'Texas Community?',
        type: 'select',
        options: [
            { value: true, viewValue: 'Yes' },
            { value: false, viewValue: 'No' }
        ],
        required: true
    },
    {
        control_name: 'isActive',
        label: 'Active Status',
        type: 'select',
        options: [
            { value: true, viewValue: 'Active' },
            { value: false, viewValue: 'inActive' }
        ],
        required: true
    },
    {
        control_name: 'totalRentableStorageUnits',
        label: 'Total Rentable Storage Units',
        type: 'number',
        pattern: "[0-9]*",
        budgeting: true
    },
    {
        control_name: 'totalRentableParkingSpaces',
        label: 'Total Rentable Parking Spaces',
        nested: true,
        budgeting: true,
        subMenu: [
            {
                control_name: 'garages',
                label: 'Garages',
                type: 'number',
                pattern: "[0-9]*",
                budgeting: true,
            },
            {
                control_name: 'carports',
                label: 'Carports',
                type: 'number',
                pattern: "[0-9]*",
                budgeting: true,

            },
            {
                control_name: 'reserved',
                label: 'Reserved / Others',
                type: 'number',
                pattern: "[0-9]*",
                budgeting: true,
            },
        ]


    },

]
