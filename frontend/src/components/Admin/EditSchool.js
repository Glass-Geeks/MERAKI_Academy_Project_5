import React, { useEffect, useState } from "react";
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
import { editSchool } from "../store/schools";
import { useDispatch } from 'react-redux';
const API_LINK = process.env.REACT_APP_API_LINK;
const EditSchool = ({ schoolId, value }) => {
    const dispatch = useDispatch()
    const [school, setSchool] = useState({})
    const {
        school_name,
        school_image,
        establish_date,
        longitude,
        latitude,
        type,
    } = school
    const { editSchoolPopup, setEditSchoolPopup } = value


    useEffect(() => {
        if (editSchoolPopup) {

            callSchool()
        }

    }, [editSchoolPopup])
    const callSchool = async () => {
        try {
            const response = await axios.get(`${API_LINK}/admin/school/${schoolId}`)
            setSchool(response.data.school[0])

        }
        catch (err) {
            console.log(err)
        }
    }
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
            setSchool((school => { return { ...school, school_image: json.url } }));
        }
    };
    const updateSchool = async () => {

        try {
            const result = await axios.put(`${API_LINK}/admin/school/${schoolId}`, school);
            const element = result.data.updatedSchool[0]
            const updatedSchool = {
                School_Id: element.school_id,
                School_Name: element.school_name,
                Date: element.establish_date,
                Type: type,
                Edit: element.school_id,
                Delete: element.school_id,
            }
            setSchool({
                school_name: "",
                school_image: "",
                establish_date: "",
                longitude: "",
                latitude: "",
                type: "",
            });

            dispatch(editSchool(updatedSchool))
            setEditSchoolPopup(false);

        } catch (error) {
            console.log("error :>> ", error);
        }
    };


    return (
        <Modal isOpen={editSchoolPopup} onClose={() => setEditSchoolPopup(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>edit School</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <label htmlFor="school-name">School Name</label>
                    <Input
                        name="school-name"
                        type="text"
                        value={school_name?school_name:''}
                        onChange={(e) =>
                            setSchool(school => { return { ...school, school_name: e.target.value } })
                        }
                    />
                    <label htmlFor="school_image">School Image</label>

                    <Input name="school_image" type="file" onChange={processFile} />
                    <label htmlFor="establish_date">Establish Date</label>

                    <Input
                        name="establish_date"
                        type="date"
                        onChange={(e) =>
                            setSchool((school) => { return { ...school, establish_date: e.target.value } })
                        }
                    />
                    <label htmlFor="longitude">Longitude</label>

                    <Input
                        name="longitude"
                        value={longitude ? longitude : ''}
                        onChange={(e) =>
                            setSchool(school => { return { ...school, longitude: e.target.value } })
                        }
                    />
                    <label htmlFor="latitude">Latitude</label>

                    <Input
                        name="latitude"
                        value={latitude?latitude:''}
                        onChange={(e) => setSchool((school => { return { ...school, latitude: e.target.value } }))}
                    />
                    <label htmlFor="type">Type</label>
                    <RadioGroup
                        value={type}
                        onChange={(value) => setSchool(school => { return { ...school, type: value } })}
                    >
                        <HStack spacing={6}>
                            <Radio value="SCHOOL">School</Radio>
                            <Radio value="UNIVERSITY">University</Radio>
                        </HStack>
                    </RadioGroup>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={updateSchool}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );

}

export default EditSchool