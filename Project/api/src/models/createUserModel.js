class CreateUserModel {
    constructor(firstName, lastName, email, password, role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

module.exports = CreateUserModel;