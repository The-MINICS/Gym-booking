import { SigninInterface } from "../interfaces/ISignin";

const apiUrl = "http://localhost:9999";

async function LoginUser(data: SigninInterface) {
  console.log(data)
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/login/user`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uid", res.data.id);
        return res.data;
      } else {
        return false;
      }
      console.log(res)
    });
  return res;
}

async function GetUserByUID() {
  let uid = localStorage.getItem("uid");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/user/${uid}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
    console.log(res)
  return res;
}

const UserDelete = async (ID: number) => {
  console.log(ID)
  const requestOptions = {
      method: "DELETE",
      headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json", 
      },
  };
  let res = await fetch(`http://localhost:9999/users/`+ID, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if(res.data){
              return res.data
          } else{
              return false
          }
  })
  return res
};

export {
  LoginUser, 
  GetUserByUID, 
  UserDelete
};