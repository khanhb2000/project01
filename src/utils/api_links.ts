const authUrl = "http://bevm.e-biz.com.vn/";

const api_links = {
    user: {
        superAdmin: {
            //GET
            getAllBooking: `${authUrl}api/Bookings/all`,
            getAllCustomer: `${authUrl}api/Customers/all-customers`,
            getAllRole: `${authUrl}api/Roles/all`,
            getAllServicePackage: `${authUrl}api/ServicePackages/all`,
            getAllService: `${authUrl}api/Services/all`,
            getAllUser: `${authUrl}api/Users/all-users`,
            getAllVoucher: `${authUrl}api/Vouchers/all`,
            getAllVoucherType: `${authUrl}api/VoucherTypes/all`,
            //POST
            createNewBooking: `${authUrl}api/Bookings`,
            createNewCustomer: `${authUrl}api/Register/Customer`,
            createNewRole: `${authUrl}api/Roles`,
            createNewServicePackage: `${authUrl}api/ServicePackages`,
            createNewService: `${authUrl}api/Services`,
            createNewUser: `${authUrl}api/Register/User`,
            createNewVoucher: `${authUrl}api/Voucher`,
            createNewVoucherType: `${authUrl}api/VoucherTypes`,
            
            /*createNewRole: `${authUrl}api/Roles`,
            createNewBooking: `${authUrl}api/Bookings`,
            registerNewUser: `${authUrl}api/Register/User`,
            registerNewCustomer: `${authUrl}api/Register/Customer`,*/
            blockUser: `${authUrl}api/Users`,
            blockCustomer: `${authUrl}api/Customers`,
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
            login: `${authUrl}api/Auth/Login/User`
        },
        saleAdmin: {
            //GET
            getUserBooking: `${authUrl}api/Bookings/User`,
            getUserCustomer: `${authUrl}api/Customers/All-Supported-Customers`,
            //getUserRole: `${authUrl}api/Roles/all`,
            //getUserServicePackage: `${authUrl}api/ServicePackages/all`,
            //getUserService: `${authUrl}api/Services/all`,
            getUserUser: `${authUrl}api/Users/All-Managed-Users`,
            getUserVoucher: `${authUrl}api/Voucher/User`,
            //getUserVoucherType: `${authUrl}api/VoucherTypes/all`,

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
            //GET
            getCustomerBooking: `${authUrl}api/Bookings/Customer`,
            getCustomerSupport: `${authUrl}api/Users/All-Supporting-Users`,
            getCustomerVoucher: `${authUrl}api/Voucher/Customer`,

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
            login: `${authUrl}api/Auth/Login/Customer`
        }
    }
}

export default api_links