class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  get username() {
    return this._username;
  }

  get password() {
    return this._password;
  }

  set username(newUser) {
    this._username = newUser;

  }

  set password(newPassword){
    this._password = newPassword;
  }
  
}
