import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Skeleton, Stack } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import PopOver from "./PopOver";
import CreateSchool from "./CreateSchool";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
const API_LINK = process.env.REACT_APP_API_LINK;
const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editPopup, setEditPopup] = useState(false);

  useEffect(() => {
    getSchools();
  }, []);
  const getSchools = async () => {
    setLoading(true);
    try {
      const schools = await axios.get(`${API_LINK}/admin/school`);
      const data = schools.data.schools;
      const result = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const obj = {
          School_Id: element.school_id,
          School_Name: element.school_name,
          Date: element.establish_date,
          Type: element.type,
          Edit: element.school_id,
          Delete: element.school_id,
        };
        result.push(obj);
      }
      setLoading(false);
      setSchools(result);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const columns = [
    {
      id: "School_Id",
      sortable: true,
      name: "School_Id",
      selector: (row) => (
        <Link to={`/school/${row.School_Id}`}>{row.School_Id}</Link>
      ),
    },
    {
      id: "School_Name",
      sortable: true,
      name: "School_Name",
      selector: (row) => (
        <Link to={`/school/${row.School_Id}`}>{row.School_Name}</Link>
      ),
    },
    {
      id: "Date",
      sortable: true,
      name: "Date",
      selector: (row) => format(row.Date),
    },
    {
      id: "Type",
      name: "Type",
      selector: (row) => row.Type,
    },
    // TODO Button (tree dots) drop down (Auth & Edit & Delete)
    {
      id: "Edit-school",
      name: "Edit",
      button: true,
      selector: (row) => (
        <PopOver text={"Edit"} id={row.Edit} condition={"UPDATE_SCHOOL"} />
      ),
    },
    {
      id: "delete-school",
      name: "Delete",
      button: true,
      selector: (row) => (
        <PopOver text={"Delete"} id={row.Delete} condition={"DELETE_SCHOOL"} />
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
        <>
          {" "}
          <DataTable
            direction="auto"
            pagination
            responsive
            dense={false}
            progressPending={loading}
            columns={columns}
            data={schools}
          />
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={() => setEditPopup(true)}
          >
            Create School
          </Button>
          <CreateSchool
            value={{ setEditPopup, setSchools, schools, editPopup }}
          />
        </>
      )}
    </>
  );
};

export default Schools;
