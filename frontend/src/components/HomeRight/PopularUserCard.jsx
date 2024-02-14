import React from "react";
import { Avatar, Button, CardHeader } from "@mui/material";
import { red } from "@mui/material/colors";

const PopularUserCard = () => {
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={<Button>Follow</Button>}
        title="Mew Nax"
        subheader="@mewmew"
      />
    </div>
  );
};

export default PopularUserCard;
