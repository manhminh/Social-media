package com.manh.socialmedia.controller;

import com.manh.socialmedia.models.Post;
import com.manh.socialmedia.models.User;
import com.manh.socialmedia.response.ApiResponse;
import com.manh.socialmedia.service.PostService;
import com.manh.socialmedia.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {
    private final PostService postService;

    private final UserService userService;

    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @GetMapping("/api/posts")
    public ResponseEntity<List<Post>> getAllPost() {
        return new ResponseEntity<>(postService.findAllPost(), HttpStatus.ACCEPTED);
    }

    @PostMapping("/api/posts")
    public ResponseEntity<Post> createPost(@RequestHeader("Authorization") String jwt, @RequestBody Post post) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        Post newPost = postService.createPost(post, reqUser.getId());
        return new ResponseEntity<>(newPost, HttpStatus.ACCEPTED);
    }

    @PostMapping("/api/posts/read")
    public ResponseEntity<Post> readPost(@RequestHeader("Authorization") String jwt, @RequestBody Post post) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        Post newPost = postService.readPost(post, reqUser.getId());
        return new ResponseEntity<>(newPost, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/api/posts/{postId}")
    public ResponseEntity<ApiResponse> deletePost(@RequestHeader("Authorization") String jwt, @PathVariable Integer postId) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);

        String message = postService.deletePost(postId, reqUser.getId());

        ApiResponse response = new ApiResponse(message, true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/api/posts/{postId}")
    public ResponseEntity<Post> findPostById(@PathVariable Integer postId) throws Exception {
        Post post = postService.findPostById(postId);
        return new ResponseEntity<>(post, HttpStatus.ACCEPTED);
    }

    @GetMapping("/api/posts/user/{userId}")
    public ResponseEntity<List<Post>> findUserPost(@PathVariable Integer userId) {
        List<Post> posts = postService.findPostByUserId(userId);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @PutMapping("/api/posts/save/{postId}")
    public ResponseEntity<Post> savedPost(@RequestHeader("Authorization") String jwt, @PathVariable Integer postId) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);

        Post post = postService.savedPost(postId, reqUser.getId());
        return new ResponseEntity<>(post, HttpStatus.ACCEPTED);
    }

    @PutMapping("/api/posts/like/{postId}")
    public ResponseEntity<Post> likePost(@RequestHeader("Authorization") String jwt, @PathVariable Integer postId) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);

        Post post = postService.likePost(postId, reqUser.getId());
        return new ResponseEntity<>(post, HttpStatus.ACCEPTED);
    }
}
