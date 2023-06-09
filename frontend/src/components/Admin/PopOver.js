import React, { useRef } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Portal,
} from "@chakra-ui/react";
import axios from "axios";
import EditSchool from "./EditSchool";
const API_LINK = process.env.REACT_APP_API_LINK;
const PopOver = ({ text, id, condition, value }) => {




  const initRef = useRef();
  const deleteSchool = async (id) => {
    try {
      await axios.delete(`${API_LINK}/admin/school/${id}`);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const deleteUser = (id) => {
 
  };
  return (
    <Popover closeOnBlur={false} placement="left" initialFocusRef={initRef}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button>{text}</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverHeader>Are You Sure</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button colorScheme="blue" onClick={onClose} ref={initRef}>
                  Cancel
                </Button>
                <Button
                  colorScheme={text === "Delete" ? "red" : "blue"}
                  onClick={() => {
                    if (condition === "DELETE_SCHOOL") {
                      deleteSchool(id);
                    }
                    if (condition === "UPDATE_SCHOOL") {
                      value?.setEditPopup(true)


                      
                    }
                    if (condition === "DELETE_USER") {
                      deleteUser(id);
                    }
                    onClose();
                  }}
                  ref={initRef}
                >
                  {text}
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
};

export default PopOver;
