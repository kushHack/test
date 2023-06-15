/*
    Roles Abbrevation
    RA: Revenue Analyst
    RPM: RPM
    DA: Data Analyst
*/

export const navbarData = [
    {
        routeLink: '/dashboard/projection-dashboard',
        icon: 'fa fa-home',
        label: 'Projection Dashboard',
        roles: ['RA', 'RPM']
    },
    {
        icon: 'fa fa-database',
        class: 'height-0',
        collapsed: true,
        label: 'Master Data Setup',
        roles: ['DA'],
        submenu: [
            {
                routeLink: '/dashboard/master-data-setup/static-file-upload',
                icon: 'fa fa-upload',
                label: 'Static File Upload',
                roles: ['DA'],
            },
            {
                routeLink: '/dashboard/master-data-setup/communities',
                icon: 'fa fa-building',
                label: 'Communities',
                roles: ['DA'],
            },
            {
                routeLink: '/dashboard/master-data-setup/actual-budget',
                icon: 'bi bi-file-earmark-arrow-up-fill',
                label: 'Actual Budget',
                roles: ['DA'],
            },
            {
                routeLink: '/dashboard/master-data-setup/configuration',
                icon: 'fa fa-gear',
                label: 'Configuration',
                roles: ['DA'],
            },
        ]
    },
    {
        icon: 'bi bi-graph-up-arrow',
        label: 'Forecast Parameters',
        class: 'height-0',
        collapsed: true,
        roles: ['RA', 'RPM'],
        submenu: [
            {
                routeLink: '/dashboard/forecast/revenue-input',
                icon: 'bi bi-bar-chart',
                label: 'Revenue Input',
                roles: ['RA', 'RPM']
            },
            {
                routeLink: '/dashboard/forecast/income',
                icon: 'fa fa-dollar',
                label: 'Income',
                roles: ['RA', 'RPM']
            },
            {
                routeLink: '/dashboard/forecast/expense',
                icon: 'bi bi-receipt',
                label: 'Expense',
                roles: ['RA', 'RPM']
            },
        ]
    },
    {
        icon: 'bi bi-diagram-3',
        label: 'Workflow',
        collapsed: true,
        class: 'height-0',
        roles: ['RA', 'RPM'],
        submenu: [
            {
                routeLink: '/dashboard/workflow/initiate-workflow',
                icon: 'fa fa-list-ul',
                label: 'Initiate Workflow',
                roles: ['RA']
            },
            {
                routeLink: '/dashboard/workflow/task-queue',
                icon: 'bi bi-clipboard2-check',
                label: 'Task Queue',
                roles: ['RA', 'RPM']
            }
        ]
    },
    {
        routeLink: '/dashboard/export-reports',
        icon: 'fa fa-download',
        label: 'Reports',
        roles: ['RA']
    }
];