import React, { useEffect } from "react";
import Nav from "../Navbar/Nav";
import axios from "axios";
import {
  Box,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormLabel,
  IconButton,
  Image,
  Input,
  useEditableControls,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
const API_LINK = process.env.REACT_APP_API_LINK;

const Profile = () => {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }
  useEffect(() => {
    getMyInfo();
  }, []);
  const getMyInfo = async () => {};
  const submitChanges = async () => {};
  return (
    <>
      <Nav />
      <br />
      <br />
      <br />
      <br />
      <Flex gap="150">
        <Image
          src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"
          boxSize="300px"
          objectFit="cover"
          borderRadius="full"
        />
        <Box>
          <Flex alignItems="center">
            <FormLabel>first name</FormLabel>
            <Editable
              textAlign="center"
              defaultValue="mousa"
              fontSize="2xl"
              isPreviewFocusable={false}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Input as={EditableInput} />
              <EditableControls />
            </Editable>
          </Flex>
          <Flex>
            <FormLabel>last name</FormLabel>
            <Editable
              textAlign="center"
              defaultValue="ibrahim"
              fontSize="2xl"
              isPreviewFocusable={false}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Input as={EditableInput} />
              <EditableControls />
            </Editable>
          </Flex>
          <Flex>
            <FormLabel>Email</FormLabel>
            <Editable
              textAlign="center"
              defaultValue="mousaKibrahim@gmail.com"
              fontSize="2xl"
              isPreviewFocusable={false}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Input as={EditableInput} />
              <EditableControls />
            </Editable>
          </Flex>
          <Flex>
            <FormLabel>Date Of Bitrth</FormLabel>
            <Editable
              textAlign="center"
              defaultValue="5/11/1999"
              fontSize="2xl"
              isPreviewFocusable={false}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Input as={EditableInput} />
              <EditableControls />
            </Editable>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Profile;
