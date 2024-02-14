package com.manh.socialmedia.controller;

import com.manh.socialmedia.models.Reels;
import com.manh.socialmedia.models.User;
import com.manh.socialmedia.service.ReelsService;
import com.manh.socialmedia.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReelsController {
    private final ReelsService reelsService;
    private final UserService userService;

    public ReelsController(ReelsService reelsService, UserService userService) {
        this.reelsService = reelsService;
        this.userService = userService;
    }

    @PostMapping("/api/reels")
    public Reels createReels(@RequestBody Reels reels, @RequestHeader("Authorization") String jwt) {
        User reqUser = userService.findUserByJwt(jwt);

        return reelsService.createReels(reels, reqUser);
    }

    @GetMapping("/api/reels")
    public List<Reels> findAllReels() {
        return reelsService.findAllReels();
    }

    @GetMapping("/api/reels/user/{userId}")
    public List<Reels> findUsersReels(@PathVariable Integer userId) throws Exception {
        return reelsService.findUsersReels(userId);
    }
}
