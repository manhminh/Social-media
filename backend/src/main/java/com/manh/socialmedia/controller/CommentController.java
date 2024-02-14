package com.manh.socialmedia.controller;

import com.manh.socialmedia.models.Comment;
import com.manh.socialmedia.models.User;
import com.manh.socialmedia.service.CommentService;
import com.manh.socialmedia.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentController {
    private final CommentService commentService;

    private final UserService userService;

    public CommentController(CommentService commentService, UserService userService) {
        this.commentService = commentService;
        this.userService = userService;
    }

    @PostMapping("/api/comments/post/{postId}")
    public Comment createComment(@RequestBody Comment comment,
                                 @RequestHeader("Authorization") String jwt,
                                 @PathVariable Integer postId) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        return commentService.createComment(comment, postId, reqUser.getId());
    }

    @PutMapping("/api/comments/like/{commentId}")
    public Comment likeComment(@RequestHeader("Authorization") String jwt,
                                 @PathVariable Integer commentId) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);

        return commentService.likeComment(commentId, reqUser.getId());
    }
}
