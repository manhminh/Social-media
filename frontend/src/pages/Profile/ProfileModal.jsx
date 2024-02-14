import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Avatar, Button, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateProfileAction } from "../../redux/auth/auth.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 3,
};
const ProfileModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },

    onSubmit: (values) => {
      console.log(values);
      dispatch(updateProfileAction(values));
      handleClose();
    },
  });

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton>
                  <CloseIcon onClick={handleClose} />
                </IconButton>

                <p>Edit Profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>

            <div>
              <div className="h-[15rem]">
                <img
                  className="w-full h-full rounded-t-lg"
                  src="https://images.pexels.com/photos/7649118/pexels-photo-7649118.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
              </div>

              <div className="px-5">
                <Avatar
                  src="https://marmelab.com/images/blog/ascii-art-converter/homer.png"
                  sx={{ width: "10rem", height: "10rem" }}
                  className="border border-gray-500 transform -translate-y-24"
                />
              </div>

              <div className="space-y-3">
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />

                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
