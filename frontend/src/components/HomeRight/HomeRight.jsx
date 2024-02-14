import React from "react";
import SearchUser from "../SearchUser/SearchUser";
import PopularUserCard from "./PopularUserCard";
import { Card } from "@mui/material";

const HomeRight = () => {
  const popularUsers = [1, 1, 1, 1, 1];
  return (
    <div className="pr-5">
      <SearchUser />

      <Card className="p-5">
        <div className="flex justify-between py-5 items-center">
          <p className="font-semibold opacity-70">Suggestions for you</p>
          <p className="font-semibold opacity-95 text-xs">View All</p>
        </div>

        <div>
          {popularUsers.map((item, index) => (
            <PopularUserCard key={index + 1} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HomeRight;
