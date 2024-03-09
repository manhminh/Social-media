package com.manh.socialmedia.service;

import com.manh.socialmedia.exceptions.PostException;
import com.manh.socialmedia.exceptions.UserException;
import com.manh.socialmedia.models.Post;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface PostService {
    public List<Post> getAllPost();
    public Post createPost(Post post, Integer userId) throws PostException, UserException;

    public Post readPost(Post post, Integer userId) throws PostException, UserException;


    public String deletePost(Integer postId, Integer userId) throws PostException, UserException;

    public List<Post> findPostByUserId(Integer userId);

    public Post findPostById(Integer postId) throws PostException;

    public List<Post> findAllPost();

    public Post savedPost(Integer postId, Integer userId) throws PostException, UserException;

    public Post likePost(Integer postId, Integer userId) throws PostException, UserException;
}
