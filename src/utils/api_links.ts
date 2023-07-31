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
            getAllServicePackages: {
                url: `${authUrl}api/ServicePackages/all`,
                method: "GET",
                token: ""
            },
            createServicePackage: {
                url: `${authUrl}api/ServicePackages`,
                method: "POST",
                token: "",
                data: {}
            },
            deleteServicePackage: {
                url: `${authUrl}api/ServicePackages/`,
                method: "DELETE",
                token: "",
            },
            updateServicePackage: {
                url: `${authUrl}api/ServicePackages/`,
                method: "PUT",
                token: "",
                data: {}
            },
            updateInformationForUser:
            {
                url: `${authUrl}api/Users`,
                method: "PUT",
                data: {},
                token: ""
            },
            resetPasswordForUser: {
                url: `${authUrl}api/Users/Reset-Password`,
                method: "POST",
                data: {},
                token: ""
            },
            updateInformationForCus: {
                url: `${authUrl}api/Customers`,
                method: "PUT",
                data: {},
                token: ""
            },
            resetPasswordForCus: {
                url: `${authUrl}api/Customers/Reset-Password`,
                method: "POST",
                data: {},
                token: ""
            },
            login: `${authUrl}api/auth/Login/User`,
            getAllServices: {
                url: `${authUrl}api/Services/all`,
                method: "GET",
                token: ""
            }
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
            updateInformation: {
                url: `${authUrl}api/Customers`,
                method: "PUT",
                data: {},
                token: ""
            },
            resetPassword: {
                url: `${authUrl}api/Customers/Reset-Password`,
                method: "POST",
                data: {},
                token: ""
            },
            login: `${authUrl}api/auth/Login/Customer`
        }
    }
}

export default api_links