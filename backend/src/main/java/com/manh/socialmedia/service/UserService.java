package com.manh.socialmedia.service;

import com.manh.socialmedia.exceptions.UserException;
import com.manh.socialmedia.models.User;

import java.util.List;

public interface UserService {
    public User createUser(User user) throws UserException;

    public User findUserById(Integer id) throws UserException;

    public User findUserByEmail(String email) throws UserException;

    public User findUserByUsername(String username) throws UserException;

    public User followUser(Integer userId1, Integer userId2) throws UserException;

    public User updateUser(User user, Integer userId) throws UserException;

    public List<User> searchUser(String query, Integer userId);

    User findUserByJwt(String jwt);
}
