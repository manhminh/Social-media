package com.manh.socialmedia.controller;

import com.manh.socialmedia.models.User;
import com.manh.socialmedia.repository.UserRepository;
import com.manh.socialmedia.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/api/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/api/users/{userId}")
    public User getUsers(@PathVariable("userId") int id) throws Exception {
        return userService.findUserById(id);
    }

    @PostMapping("/api/users")
    public User createUser(@RequestBody User user) throws Exception {
       return userService.createUser(user);
    }

    @PutMapping("/api/users")
    public User updateUser(@RequestHeader("Authorization") String jwt, @RequestBody User user) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);

        return userService.updateUser(user, reqUser.getId());
    }

    @PutMapping("/api/users/follow/{userId2}")
    public User followUser(@RequestHeader("Authorization") String jwt,  @PathVariable Integer userId2) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);

        if(Objects.equals(reqUser.getId(), userId2)) {
            throw new Exception("Invalid following object");
        }

        return userService.followUser(reqUser.getId(), userId2);
    }

    @GetMapping("/api/users/search")
    public List<User> searchUser(@RequestHeader("Authorization") String jwt, @RequestParam String query) {
        User user = userService.findUserByJwt(jwt);
        return userService.searchUser(query, user.getId());
    }

    @GetMapping("/api/users/profile")
    public User getUserFromToken(@RequestHeader("Authorization") String jwt)  {
        User user = userService.findUserByJwt(jwt);
        user.setPassword(null);

        return user;
    }
}
