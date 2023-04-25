import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  ModalCloseButton,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import axios from "axios";
const API_LINK = process.env.REACT_APP_API_LINK;

const CreateSchool = ({ value }) => {
  const { setEditPopup, setSchools, schools, editPopup,school,setSchool } = value;
 

  const { school_name, establish_date, longitude, latitude } = school;
  const processFile = async (e) => {
    const CLOUD_NAME = "dvgnuchjw";
    const UNSIGNED_UPLOAD_PRESET = "ym3yv62c";
    const FETCH_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

    const files = document.querySelector("[type=file]").files;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      const DATA = new FormData();

      DATA.append("file", file);
      DATA.append("cloud_name", CLOUD_NAME);
      DATA.append("upload_preset", UNSIGNED_UPLOAD_PRESET);

      let res = await fetch(FETCH_URL, {
        method: "post",
        mode: "cors",
        body: DATA,
      });

      let json = await res.json();
      setSchool({ ...school, school_image: json.url });
    }
  };

  const saveSchool = async () => {
    try {
      const request = await axios.post(`${API_LINK}/admin/school`, school);
      const element = request.data.school[0];
      const obj = {
        School_Id: element.school_id,
        School_Name: element.school_name,
        Date: element.establish_date,
        Type: element.type,
        Edit: element.school_id,
        Delete: element.school_id,
      };
      setSchools([...schools, obj]);
      setSchool({
        school_name: "",
        school_image: "",
        establish_date: "",
        longitude: "",
        latitude: "",
        type: "",
      });
      setEditPopup(false);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <Modal isOpen={editPopup} onClose={() => setEditPopup(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New School</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <label htmlFor="school-name">School Name</label>
          <Input
            name="school-name"
            type="text"
            value={school_name}
            onChange={(e) =>
              setSchool({ ...school, school_name: e.target.value })
            }
          />
          <label htmlFor="school_image">School Image</label>

          <Input name="school_image" type="file" onChange={processFile} />
          <label htmlFor="establish_date">Establish Date</label>

          <Input
            name="establish_date"
            type="date"
            value={establish_date}
            onChange={(e) =>
              setSchool({ ...school, establish_date: e.target.value })
            }
          />
          <label htmlFor="longitude">Longitude</label>

          <Input
            name="longitude"
            value={longitude}
            onChange={(e) =>
              setSchool({ ...school, longitude: e.target.value })
            }
          />
          <label htmlFor="latitude">Latitude</label>

          <Input
            name="latitude"
            value={latitude}
            onChange={(e) => setSchool({ ...school, latitude: e.target.value })}
          />
          <label htmlFor="type">Type</label>
          <RadioGroup
            onChange={(value) => setSchool({ ...school, type: value })}
          >
            <HStack spacing={6}>
              <Radio value="SCHOOL">School</Radio>
              <Radio value="UNIVERSITY">University</Radio>
            </HStack>
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={saveSchool}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateSchool;
