export type LoginState = {
  "message": string | null,
  "isSuccess": boolean,
  "errors": {/*
          "Password": string[]|null;
          UserName: string[]|null;
          AccountInformation: string[]|null;
          ConfirmPassword:string[]|null;*/
  } | string[] | null,
  "token": string | undefined,
  "userInformation"?: UserInformationLoginState | null,
  "customerInformation"?: CustomerInformationLoginState | null,
  "role": RoleState | null,
};

export type RoleState = {
  "id": string,
  "normalizedName": string,
  "isManager": boolean,
  "isDeleted"?: boolean
  "roleClaims": [],
};

export type RoleListState = RoleState[];

export type UserInformationLoginState = {
  "id": string,
  "name": string | null,
  "citizenId": string | null,
  "userName": string | null,
  "normalizedUserName": string,
  "email": string | null,
  "normalizedEmail": string | null,
  "emailConfirmed": boolean,
  "phoneNumber": string | null,
  "phoneNumberConfirmed": boolean,
  "twoFactorEnabled": boolean,
  "lockoutEnd": string | null,
  "lockoutEnabled": boolean,
  "isBlocked": boolean,
  "salesManager": {} | null,
  "customers": [],
  "roles": RoleState[],
};
export type CustomerInformationLoginState = {
  "id": string,
  "name": string | null,
  "citizenId": string | null,
  "email": string | null,
  "normalizedEmail": string | null,
  "emailConfirmed": boolean,
  "phoneNumber": string | null,
  "phoneNumberConfirmed": boolean,
  "twoFactorEnabled": boolean,
  "lockoutEnd": string | null,
  "lockoutEnabled": boolean,
  "isBlocked": boolean,
  "bookings": [],
  "vouchers": []
};

export type MenuState = {
  "isOpen": boolean,
  "userRole": RoleState,
};

export type ServicePackageState = {
  "href": string | undefined;
  "image": string;
  "description": string,
  "id": number,
  "servicePackageName": string,
  "services":
  {
    "id": number,
    "serviceName": string,
    "description": string,
    "servicePackages": []
  }[],
  "valuableVoucherTypes": [],
};

export type ServicePackageListState = ServicePackageState[];

export type ServiceState = {
  href?: string | undefined;
  image?: string;

  "id": number,
  "serviceName": string,
  "description": string,
  "servicePackages": [],
};

export type ServiceListState = ServiceState[];

export type VoucherTypeState = {
  "href"?: string | undefined;
  "image"?: string;
  "id": number,
  "typeName": string,
  "isAvailable": boolean,
  "commonPrice": number,
  "valueDiscount":number,
  "availableNumberOfVouchers": number,
  "percentageDiscount": number,
  "maximumValueDiscount": number,
  "conditionsAndPolicies": string,
  "vouchers": [],
  "usableServicePackages": []
};

export type VoucherTypeListState = VoucherTypeState[];

export type BookingState = {
  "id": string,
  "customer": null,
  "salesEmployee": null,
  "vouchers": [],
  "servicePackage": null,
  "bookingTitle": string,
  "bookingDate": string,
  "bookingStatus": string,
  "totalPrice": 100,
  "priceDetails":string,
  "note": string,
  "descriptions": string,
  "startDateTime": string,
  "endDateTime": string
};

export type BookingListState = BookingState[];

export type CustomerState = {
  "id": number,
  "name": string,
  "email": string | null,
  "normalizedEmail": string | null,
  "emailConfirmed": boolean,
  "phoneNumber": string | null,
  "phoneNumberConfirmed": boolean,
  "twoFactorEnabled": boolean,
  "lockoutEnd": Date | null,
  "lockoutEnabled": boolean,
  "citizenId": string | null,
  "isBlocked": boolean,
  "bookings"?: [],
  "vouchers"?: []
};

export type CustomerListState = CustomerState[];

export type UserState = {
  "id": string,
  "name": string,
  "email": string | null,
  "normalizedEmail": string | null,
  "emailConfirmed": boolean,
  "phoneNumber": string | null,
  "phoneNumberConfirmed": boolean,
  "twoFactorEnabled": boolean,
  "lockoutEnd": Date | null,
  "lockoutEnabled": boolean,
  "citizenId": string | null,
  "bookings"?: [],
  "vouchers"?: [],
  "userName": string,
  "normalizedUserName": string,
  "isBlocked": boolean,
  "salesManager": {
    /* "id": string,
     "name": string,*/
  },
  "customers": [
    /*{
      "id": string,
      "name": string
    }*/
  ],
  "roles": RoleState[],
};

export type UserListState = UserState[];