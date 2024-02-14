package com.manh.socialmedia.service;

import com.manh.socialmedia.models.Reels;
import com.manh.socialmedia.models.User;

import java.util.List;

public interface ReelsService {
    public Reels createReels(Reels reels, User user);

    public List<Reels> findAllReels();

    public List<Reels> findUsersReels(Integer userId) throws Exception;
}
