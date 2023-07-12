export type LoginState = {
  "message": string | null,
  "isSuccess": boolean,
  "errors": {/*
          "Password": string[]|null;
          UserName: string[]|null;
          AccountInformation: string[]|null;
          ConfirmPassword:string[]|null;*/
  } | string[] | null,
  "token": string | null,
  "userInformation"?: UserInformationLoginState | null,
  "customerInformation"?: CustomerInformationLoginState | null,
  "role": RoleState,
};

export type RoleState = {
  "id": string,
  "normalizedName": string,
  "isManager": boolean,
  "users": [],
};

export type UserInformationLoginState = {
  "id": string,
  "name": string,
  "citizenId": string | null,
  "userName": string,
  "normalizedUserName": string,
  "email": string | null,
  "normalizedEmail": string | null,
  "emailConfirmed": boolean,
  "phoneNumber": string | null,
  "phoneNumberConfirmed": boolean,
  "twoFactorEnabled": boolean,
  "lockoutEnd": string | null,
  "lockoutEnabled": boolean,
  "salesManager": {} | null,
  "customers": [],
  "roles": RoleState[],
};
export type CustomerInformationLoginState = {
  "id": string,
  "name": string,
  "citizenId": string | null,
  "email": string | null,
  "normalizedEmail": string | null,
  "emailConfirmed": boolean,
  "phoneNumber": string | null,
  "phoneNumberConfirmed": boolean,
  "twoFactorEnabled": boolean,
  "lockoutEnd": Date,
  "lockoutEnabled": boolean,
  "bookings": [],
  "vouchers": []
};

export type MenuState = {
  isOpen: boolean,
  userRole: RoleState,
};

export type ServicePackageState = {
  href: string | undefined;
  image: string;

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

export type CustomerState = {
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