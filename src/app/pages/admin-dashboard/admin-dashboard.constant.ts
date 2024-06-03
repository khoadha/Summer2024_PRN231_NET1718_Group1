export const sideNavItems: Section[] = [
    {
        name: 'Dashboard',
        icon: 'dashboard',
        url: '/adashboard/home'
    },
    {
        name: 'Manage Room Category',
        icon: 'store',
        url: '/adashboard/manage-store',
    },
    {
        name: 'Manage Furniture',
        icon: 'man',
        url: '/adashboard/manage-customer',
    },
    {
        name: 'Manage Service',
        icon: 'confirmation_number',
        url: '/adashboard/manage-voucher',
    },
    {
        name: 'Manage Room',
        icon: 'photo',
        url: '/adashboard/manage-banner',
    },
    {
        name: 'Manage Order',
        icon: 'currency_exchange',
        url: '/adashboard/manage-transaction',
    },
    {
        name: 'Manage Transaction',
        icon: 'mail',
        url: '/adashboard/manage-letter',
    },
    {
        name: 'Manage Report',
        icon: 'category',
        url: '/adashboard/manage-category',
    },
];

export interface Section {
    name?: string;
    icon?: string;
    url?: string;
}