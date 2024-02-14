import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import PostCard from "../../components/Post/PostCard";
import UserReelsCard from "../../components/Reels/UserReelsCard";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";

const Profile = () => {
  const { auth } = useSelector((store) => store);

  const tabs = [
    { value: "post", name: "Post" },
    { value: "reels", name: "Reels" },
    { value: "saved", name: "Saved" },
    { value: "report", name: "Report" },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const posts = [1, 1, 1, 1];
  const reels = [1, 1, 1, 1];
  const savedPost = [1, 1, 1, 1];

  const [value, setValue] = useState("one");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className="my-10 w-[70%]">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-lg"
            src="https://images.pexels.com/photos/7649118/pexels-photo-7649118.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>

        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            src="https://marmelab.com/images/blog/ascii-art-converter/homer.png"
            sx={{ width: "10rem", height: "10rem" }}
            className="border border-gray-500 transform -translate-y-24"
          />

          {true ? (
            <Button
              sx={{ borderRadius: "20px" }}
              variant="outlined"
              onClick={handleOpen}
            >
              Edit Profile
            </Button>
          ) : (
            <Button sx={{ borderRadius: "20px" }} variant="outlined">
              Follow
            </Button>
          )}
        </div>

        <div className="p-5">
          <div>
            <h1 className="py-1 font-bold text-xl">{`${auth.user?.firstName} ${auth.user?.lastName}`}</h1>
            <p>{`@${auth.user?.firstName?.toLowerCase()}_${auth.user?.lastName?.toLowerCase()}`}</p>
          </div>

          <div className="flex gap-5 items-center py-3">
            <span>41 post</span>
            <span>35 followers</span>
            <span>6 followings</span>
          </div>

          <div>
            <p>Boy Hai Phong, khong long vong, lao nhao cho an giao.</p>
          </div>
        </div>

        <section>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {tabs.map((tab) => (
                <Tab label={tab.name} value={tab.value} />
              ))}
            </Tabs>
          </Box>

          <div className="flex justify-center">
            {value === "post" ? (
              <div className="space-y-5 w-[70%] my-10">
                {posts.map((item) => (
                  <div className="border border-slate-100 rounded-md">
                    <PostCard />
                  </div>
                ))}
              </div>
            ) : value === "reels" ? (
              <div className="flex justify-center flex-wrap gap-2 my-10">
                {reels.map((item) => (
                  <UserReelsCard />
                ))}
              </div>
            ) : value === "saved" ? (
              <div className="space-y-5 w-[70%] my-10">
                {savedPost.map((item) => (
                  <div className="border border-slate-100 rounded-md">
                    <PostCard />
                  </div>
                ))}
              </div>
            ) : (
              <div>Report</div>
            )}
          </div>
        </section>
      </div>

      <section>
        <ProfileModal open={open} handleClose={handleClose} />
      </section>
    </Card>
  );
};

export default Profile;
