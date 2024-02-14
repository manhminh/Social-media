import React from "react";
import video from "../../assests/videos/pexels-otavio-henrique-18749461 (2160p).mp4";

const UserReelsCard = () => {
  return (
    <div className="w-[15rem] px-2">
      <video className="w-full h-full" src={video} controls />
    </div>
  );
};

export default UserReelsCard;
