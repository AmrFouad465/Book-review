class User {
  #id;
  #firstName;
  #lastName;
  #email;
  #password;
  #deleted;
  constructor(id, firstName, lastName, email, password) {
    this.#id = id;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#email = email;
    this.#password = password;
    this.#deleted = false;
  }

  getId() {
    return this.#id;
  }

  getFirstName() {
    return this.#firstName;
  }

  getLastName() {
    return this.#lastName;
  }

  getEmail() {
    return this.#email;
  }

  getPassword() {
    return this.#password;
  }
  isDeleted() {
    return this.#deleted;
  }

  setId(newId) {
    this.#id = newId;
  }

  setFirstName(newFirstName) {
    this.#firstName = newFirstName;
  }

  setLastName(newLastName) {
    this.#lastName = newLastName;
  }

  setEmail(newEmail) {
    this.#email = newEmail;
  }

  setPassword(newPassword) {
    this.#password = newPassword;
  }
  delete() {
    this.#deleted = true;
  }
  parseJson() {
    return {
      id: this.#id,
      firstName: this.#firstName,
      lastName: this.#lastName,
      email: this.#email
    };
}
}
let DB = [
  new User(1, "Alice", "Smith", "alice.smith@example.com", "Password123!"),
  new User(2, "Bob", "Johnson", "bob.j@example.com", "SecurePass456"),
  new User(3, "Charlie", "Brown", "charlie.b@example.com", "MySecret789"),
  new User(4, "Diana", "Prince", "diana.prince@example.com", "WonderWoman1"),
  new User(5, "Ethan", "Hunt", "ethan.h@example.com", "MissionImp2026"),
  new User(6, "Fiona", "Gallagher", "fiona.g@example.com", "SouthSide99"),
  new User(7, "George", "Miller", "gmiller@example.com", "MadMaxRoad!"),
  new User(8, "Hannah", "Abbott", "hannah.a@example.com", "Hufflepuff00"),
  new User(9, "Ian", "Wright", "iwright@example.com", "Arsenal#8"),
  new User(10, "Julia", "Roberts", "julia.r@example.com", "PrettyWoman90"),
  new User(11, "Kevin", "Hart", "khart@example.com", "LaughOutLoud2"),
  new User(12, "Laura", "Palmer", "lpalmer@example.com", "TwinPeaks90"),
  new User(13, "Michael", "Scott", "mscott@example.com", "WorldBestBoss"),
  new User(14, "Nina", "Simone", "nsimone@example.com", "FeelingGood65"),
  new User(15, "Oscar", "Isaac", "oisaac@example.com", "PoeDameron!"),
  new User(16, "Paula", "Abdul", "pabdul@example.com", "StraightUp88"),
  new User(17, "Quincy", "Jones", "qjones@example.com", "Thriller1982"),
  new User(18, "Rachel", "Green", "rgreen@example.com", "CentralPerk94"),
  new User(19,"Steve","Harrington","sharrington@example.com","ScoopsAhoy11"),
  new User(20, "Tina", "Fey", "tfey@example.com", "MeanGirls04"),
];
let id = 20;
const saveUser = function (firstName, lastName, email, password) {
  let user = new User(++id, firstName, lastName, email, password);
  DB.push(user);
  return user;
};
const modifyUser = function (id, firstName, lastName, email, password) {
  let l = 0;
  let h = DB.length - 1;
  let modified = false;
  while (l <= h) {
    let m = Math.floor((l + h) / 2);
    let user = DB[m];
    if (user.getId() === id) {
      if(user.isDeleted()){
        return false;
      }
      if (firstName) {
        user.setFirstName(firstName);
      }
      if (lastName) {
        user.setLastName(lastName);
      }
      if (email) {
        user.setEmail(email);
      }
      if (password) {
        user.setPassword(password);
      }
      modified = true;
      break;
    } else if (id > user.getId()) {
      l = m + 1;
    } else {
      h = m - 1;
    }
  }
  return modified;
};
const deleteUser = function (id) {
  let l = 0;
  let h = DB.length - 1;
  let deleted = false;
  while (l <= h) {
    let m = Math.floor((l + h) / 2);
    let user = DB[m];
    if (user.getId() === id) {
      if(user.isDeleted()){
        return false;
      }
      user.delete();
      deleted = true;
      break;
    } else if (id > user.getId()) {
      l = m + 1;
    } else {
      h = m - 1;
    }
  }
  return deleted;
};
const authUser=function(email,password){
    let user=DB.filter((e)=>e.getEmail()===email && e.getPassword()===password && !e.isDeleted());
    if(user.length===0){
        return [null,false];
    }
    return [user[0].parseJson(),true];

}
const doesExist=function(email){
   let user=DB.filter((e)=>e.getEmail()===email && !e.isDeleted());
    if(user.length===0){
        return false;
    }
    return true;
}
module.exports = { saveUser, modifyUser, deleteUser , authUser , doesExist};
