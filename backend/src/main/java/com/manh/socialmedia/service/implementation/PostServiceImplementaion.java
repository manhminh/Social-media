package com.manh.socialmedia.service.implementation;

import com.manh.socialmedia.exceptions.PostException;
import com.manh.socialmedia.exceptions.UserException;
import com.manh.socialmedia.models.Post;
import com.manh.socialmedia.models.User;
import com.manh.socialmedia.repository.PostRepository;
import com.manh.socialmedia.repository.UserRepository;
import com.manh.socialmedia.service.PostService;
import com.manh.socialmedia.service.UserService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PostServiceImplementaion implements PostService {
    private final PostRepository postRepository;
    private final UserService userService;

    private final UserRepository userRepository;

    public PostServiceImplementaion(PostRepository postRepository, UserService userService, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }


    @Override
    public List<Post> getAllPost() {
        return postRepository.findAll();
    }

    @Override
    public Post createPost(Post post, Integer userId) throws UserException {
        User user = userService.findUserById(userId);

        Post newPost = new Post();
        newPost.setId(post.getId());
        newPost.setCaption(post.getCaption());
        newPost.setImage(post.getImage());
        newPost.setVideo(post.getVideo());
        newPost.setUser(user);
        newPost.setCreateAt(LocalDateTime.now());

        Post savedPost = postRepository.save(newPost);
        return savedPost;
    }

    @Override
    public Post readPost(Post post, Integer userId) throws PostException, UserException {
        User user = userService.findUserById(userId);

        Post newPost = new Post();
        newPost.setId(post.getId());
        newPost.setCaption(post.getCaption());
        newPost.setImage(post.getImage());
        newPost.setVideo(post.getVideo());
        newPost.setUser(user);
        newPost.setCreateAt(LocalDateTime.now());

        return newPost;
    }

    @Override
    public String deletePost(Integer postId, Integer userId) throws PostException, UserException {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        if(!Objects.equals(user.getId(), post.getUser().getId())) {
            throw new PostException("You can't delete another post");
        }

        postRepository.delete(post);
        return "post deleted successfully";
    }

    @Override
    public List<Post> findPostByUserId(Integer userId) {
        return postRepository.findPostByUserId(userId);
    }

    @Override
    public Post findPostById(Integer postId) throws PostException {
        Optional<Post> post = postRepository.findById(postId);
        if(post.isEmpty()) {
            throw new PostException("Post not found with id: " + postId);
        }
        return post.get();
    }

    @Override
    public List<Post> findAllPost() {
        return postRepository.findAll() ;
    }

    @Override
    public Post savedPost(Integer postId, Integer userId) throws PostException, UserException {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

       if(user.getSavedPost().contains(post)) {
           user.getSavedPost().remove(post);
       } else {
           user.getSavedPost().add(post);
       }

       userRepository.save(user);
       return post;
    }

    @Override
    public Post likePost(Integer postId, Integer userId) throws PostException, UserException {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        if(post.getLiked().contains(user)) {
            post.getLiked().remove(user);
        } else {
            post.getLiked().add(user);
        }

        userRepository.save(user);
        return post;
    }
}
