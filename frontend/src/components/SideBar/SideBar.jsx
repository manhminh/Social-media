import React from "react";
import { navigationMenu } from "./SideBarNavigation";
import {
  Avatar,
  Card,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const { auth } = useSelector((store) => store);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (item) => {
    if (item.title === "Profile") {
      navigate(`/profile/${auth.user.id}`);
      window.location.reload();
    } else {
      navigate(item.path);
    }
  };

  return (
    <Card className="h-screen flex flex-col justify-between py-5">
      <div className="space-y-10 pl-5">
        <div>
          <span className="logo font-bold text-xl">Hola Media</span>
        </div>

        <div className="space-y-8">
          {navigationMenu.map((item, index) => (
            <div
              key={index + 1}
              className="cursor-pointer flex items-center space-x-3"
              onClick={() => handleNavigate(item)}
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Divider />

        <div className="pl-5 flex items-center justify-between pt-5">
          <div className="flex items-center space-x-3">
            <Avatar
              className="border border-gray-500"
              src="https://marmelab.com/images/blog/ascii-art-converter/homer.png"
            />
            <div>
              <p className="font-bold">{`${auth.user?.firstName} ${auth.user?.lastName}`}</p>
              <p className="opacity-70">{`@${auth.user?.firstName?.toLowerCase()}_${auth.user?.lastName?.toLowerCase()}`}</p>
            </div>
          </div>

          <div>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              sx={{ color: grey[600] }}
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SideBar;
