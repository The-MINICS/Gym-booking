import { SigninInterface } from "../interfaces/ISignin";
import { UserInterface } from "../interfaces/IUser"

const apiUrl = "http://localhost:9999";

async function LoginUser(data: SigninInterface) {
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
        localStorage.setItem("aid", res.data.id);
        localStorage.setItem("role", res.data.role);
        return res.data;
      } else {
        return false;
      }
    });
  return res;
}

async function GetUserByAID() {
  let aid = localStorage.getItem("aid");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/user/${aid}`,
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
  return res;
}

async function GetUsers() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/users`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function Users(data: UserInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/users`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

const UserDelete = async (ID: number) => {
    // console.log(ID)
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

async function GetEquipments() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/equipments`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

const EquipmentDelete = async (ID: number) => {
  // console.log(ID)
  const requestOptions = {
      method: "DELETE",
      headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json", 
      },
  };
  let res = await fetch(`http://localhost:9999/equipments/`+ID, requestOptions)
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

async function GetReservations() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/reservations`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

const ReservationDelete = async (id: number) => {
  const requestOptions = {
      method: "DELETE",
      headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json", 
      },
  };
  let res = await fetch(`http://localhost:9999/reservations/`+id, requestOptions)
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
  GetUserByAID,
  Users,
  GetUsers,
  UserDelete,
  GetEquipments,
  EquipmentDelete,
  GetReservations,
  ReservationDelete,
};