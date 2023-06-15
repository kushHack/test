export const redirectRoutes = [
    {
        role: 'RA',
        redirect_to: '/dashboard/workflow/task-queue'
    },
    {
        role: 'RPM',
        redirect_to: '/dashboard/workflow/task-queue',
    },
    {
        role: 'DA',
        redirect_to: '/dashboard/master-data-setup/static-file-upload',
    }
]

export const roleAbbrevations = [
    {
        role: 'Revenue Analyst',
        abbrevated: 'RA'
    },
    {
        role: 'Data Analyst',
        abbrevated: 'DA'
    },
    {
        role: 'RPM',
        abbrevated: 'RPM'
    },
    {
        role: 'revenue analyst',
        abbrevated: 'RA'
    },
    {
        role: 'data analyst',
        abbrevated: 'DA'
    },
    {
        role: 'rpm',
        abbrevated: 'RPM'
    }
]

export const toggleRoutes = {
    forecast_parameters: [
        '/dashboard/forecast/expense',
        '/dashboard/forecast/income',
        '/dashboard/forecast/revenue-input',
        '/dashboard/forecast/expense/preview-data',
        '/dashboard/forecast/income/preview-data',
        '/dashboard/forecast/revenue-input/preview-data',
    ],
    workflow: ['/dashboard/workflow/task-queue', '/dashboard/workflow/initiate-workflow']
}