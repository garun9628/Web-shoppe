export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    // TODO: on server it will only return some info of user (not password)
    const data = await response.json();
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch("http://localhost:8080/users?email=" + email);
    // TODO: on server it will only return some info of user (not password)
    const data = await response.json();
    if (data.length && password === data[0].password) {
      resolve({ data: data[0] });
    } else {
      reject({ message: "Wrong Credentials" });
    }
  });
}

export function signOut() {
  return new Promise(async (resolve) => {
    resolve({ data: "Successfully Signed out" });
  });
}
