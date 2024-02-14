import { Avatar } from "@mui/material";
import React from "react";

const StoryCircle = () => {
  return (
    <div>
      <div className="flex flex-col items-center mr-4 cursor-pointer">
        <Avatar
          sx={{ height: "4rem", width: "4rem" }}
          src="https://marmelab.com/images/blog/ascii-art-converter/homer.png"
          className="border border-gray-500 "
        ></Avatar>
        <p>Meww</p>
      </div>
    </div>
  );
};

export default StoryCircle;
