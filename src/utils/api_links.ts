const authUrl = "http://bevm.e-biz.com.vn/";

const api_links = {
    user: {
        superAdmin: {
            createNewRole: `${authUrl}api/Roles`,
            getAllBooking: `${authUrl} api/Bookings`,
            createNewBooking: `${authUrl}api/Bookings`,
            registerNewUser: `${authUrl}api/Register/User`,
            registerNewCustomer: `${authUrl}api/Register/Customer`,
            blockUser: `${authUrl}api/Users`,
            blockCustomer: `${authUrl}api/Customers`,
            updateInformationForUser: `${authUrl}api/Users`,
            resetPasswordForUser: `${authUrl}api/Users/Reset-Password`,
            updateInformationForCus: `${authUrl}api/Customers`,
            resetPasswordForCus: `${authUrl}api/Customers/Reset-Password`,
            login: `${authUrl}api/Login/User`
        },
        saleAdmin: {
            updateInformation: `${authUrl}api/Users`,
            resetPassword: `${authUrl}api/Users/Reset-Password`,
            login: `${authUrl}api/Login/User`
        },
        sales: {
            updateInformation: `${authUrl}api/Users`,
            resetPassword: `${authUrl}api/Users/Reset-Password`,
            login: `${authUrl}api/Login/User`

        },
        customer: {
            updateInformation: `${authUrl}api/Customers`,
            resetPassword: `${authUrl}api/Customers/Reset-Password`,
            login: `${authUrl}api/Login/Customer`
        }
    }
}

export default api_links