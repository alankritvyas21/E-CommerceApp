export class playerProfile {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    password: string;

    constructor(firstName: string, lastName: string, email: string, mobile: string, address1: string, address2: string, city: string, state: string, country: string, pincode: string, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobile = mobile;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.country = country;
        this.pincode = pincode;
        this.password = password;
    }

    parse( user: playerProfile): any {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            mobile: this.mobile,
            address1: this.address1,
            address2: this.address2,
            city: this.city,
            state: this.state,
            country: this.country,
            pincode: this.pincode,
            password: this.password
        }
    }

    static fromFirebase(user: any): playerProfile {
        return new playerProfile(
            user.firstName,
            user.lastName,
            user.email,
            user.mobile,
            user.address1,
            user.address2,
            user.city,
            user.state,
            user.country,
            user.pincode,
            user.password
        );
    }
}