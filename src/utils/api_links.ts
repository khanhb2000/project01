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

            ///////////// SERVICE PACKAGES ////////////////////
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
            getAllDeleteServicePackages: {
                url: `${authUrl}api/ServicePackages/all-delete`,
                method: "GET",
                token: "",
            },

            deleteServicePackage: {
                url: `${authUrl}api/ServicePackages/`,
                method: "DELETE",
                token: "",
            },
            deleteServicePackages: {
                url: `${authUrl}api/ServicePackages/batch`,
                method: "DELETE",
                token: "",
                data: [1, 2, 3]
            },
            recoverServicePackage: {
                url: `${authUrl}api/ServicePackages/restore-servicepackage/`,
                method: "PATCH",
                token: "",
            },
            updateServicePackage: {
                url: `${authUrl}api/ServicePackages/`,
                method: "PUT",
                token: "",
                data: {}
            },
            updateServicePackage_VoucherType: {
                url: `${authUrl}api/ServicePackages/VoucherTypes/`,
                method: "PATCH",
                token: "",
                data: [1, 2, 3]
            },
            updateServicePackage_Services: {
                url: `${authUrl}api/ServicePackages/Services/`,
                method: "PATCH",
                token: "",
                data: [1, 2, 3]
            },

            //////////////////// VOUCHER TYPE ///////////////////////
            getAllVoucherType: {
                url: `${authUrl}api/VoucherTypes/all`,
                method: "GET",
                token: ""
            },
            getAllDeleteVoucherType: {
                url: `${authUrl}api/VoucherTypes/all-delete`,
                method: "GET",
                token: ""
            },
            updateVoucherType: {
                url: `${authUrl}api/VoucherTypes/`,
                method: "PUT",
                token: "",
                data: {}
            },
            isAvailableVoucherType: {
                url: `${authUrl}api/VoucherTypes/`,
                method: "PATCH",
                token: "",
                data: {}
            },
            createVoucherType: {
                url: `${authUrl}api/VoucherTypes/`,
                method: "POST",
                token: "",
                data: {}
            },
            deleteVoucherType: {
                url: `${authUrl}api/VoucherTypes/`,
                method: "DELETE",
                token: "",
                data: {}
            },
            deleteVoucherTypes: {
                url: `${authUrl}api/VoucherTypes/batch`,
                method: "DELETE",
                token: "",
                data: [1, 2, 3]
            },
            recoverVoucherType: {
                url: `${authUrl}api/VoucherTypes/restore-vouchertype/`,
                method: "PATCH",
                token: "",
                data: {}
            },



            //////////////// USER ////////////////
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
            },

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