import React, { useEffect, useState } from "react";
import axios from "axios"


function AdminLoginComponent() {


  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  /*useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user")).userId;
    if (_user) {
      setUser(_user);

      dispatch({
        type: "SET_USER",
        user: _user,
      });
    }
  }, []);*/

  const loginAdmin = (e) => {
    e.preventDefault();

    console.log(adminId)
    console.log(adminPassword)
    var admin = {adminId: adminId, adminPassword: adminPassword}
    var request = require('sync-request');
    var request = require('sync-request');
    var res = request('POST', 'http://localhost:9000/products');
    axios.post("http://localhost:9000/admins", admin).then((msg) => {
        console.log(msg)
        /*if(msg.data=="Authentication Succeeded") {
            console.log("success")
        }
        else {
            console.log("failed")
        }*/
    })
    
  };

  const changeAdminIdHandler = (event) => {
    setAdminId(event.target.value);
  };

  const changeAdminPasswordHandler = (event) => {
    setAdminPassword(event.target.value);
  };

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <h3 className="text-center">Admin Login</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label> Admin Id: </label>
                  <input
                    placeholder="Enter Admin Id"
                    name="adminId"
                    className="form-control"
                    value={adminId}
                    onChange={changeAdminIdHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Admin Password: </label>
                  <input
                    type="password"
                    placeholder="Enter Admin Password"
                    name="adminPassword"
                    className="form-control"
                    value={adminPassword}
                    onChange={changeAdminPasswordHandler}
                  />
                </div>

                <button className="btn btn-success" onClick={loginAdmin}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginComponent;
