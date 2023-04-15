import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Skeleton, Stack } from "@chakra-ui/react";
import PopOver from "./PopOver";
const API_LINK = process.env.REACT_APP_API_LINK;
const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUsers();
  }, []);

  function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
  const getUsers = async () => {
    setLoading(true);
    try {
      const users = await axios.get(`${API_LINK}/admin/users`);
      const data = users.data.data;
      const result = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const obj = {
          UserName: element.first_name + " " + element.last_name,
          Age: calculate_age(new Date(element.dob)),
          Active: element.is_deleted ? "true" : "false",
          Created_at: element.created_at,
          Role: element.role,
          button: element.user_id,
        };
        result.push(obj);
      }
      setLoading(false);
      setUsers(result);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const columns = [
    {
      id: "name",
      sortable: true,
      name: "UserName",
      selector: (row) => row.UserName,
    },
    { id: "Age", sortable: true, name: "Age", selector: (row) => row.Age },
    {
      id: "Active",
      sortable: true,
      name: "Active",
      selector: (row) => row.Active,
    },
    {
      id: "created_at",
      sortable: true,
      name: "Created_at",
      selector: (row) => row.Created_at,
    },
    { id: "role", sortable: true, name: "Role", selector: (row) => row.Role },
    {
      id: "delete",
      name: "Delete",
      button: true,
      selector: (row) => (
        <PopOver text={"Delete"} id={row.button} condition={"DELETE_USER"} />
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Stack>
          <Skeleton height="15px" />
          <Skeleton height="15px" />
          <Skeleton height="15px" />
        </Stack>
      ) : (
        <DataTable
          pagination
          direction="auto"
          responsive
          dense={false}
          columns={columns}
          data={users}
        />
      )}
    </>
  );
};

export default Users;
