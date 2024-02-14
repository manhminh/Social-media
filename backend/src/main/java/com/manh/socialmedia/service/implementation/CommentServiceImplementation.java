package com.manh.socialmedia.service.implementation;

import com.manh.socialmedia.models.Comment;
import com.manh.socialmedia.models.Post;
import com.manh.socialmedia.models.User;
import com.manh.socialmedia.repository.CommentRepository;
import com.manh.socialmedia.repository.PostRepository;
import com.manh.socialmedia.service.CommentService;
import com.manh.socialmedia.service.PostService;
import com.manh.socialmedia.service.UserService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CommentServiceImplementation implements CommentService {
    private final UserService userService;
    private final PostService postService;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    public CommentServiceImplementation(UserService userService, PostService postService, PostRepository postRepository, CommentRepository commentRepository) {
        this.userService = userService;
        this.postService = postService;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public Comment createComment(Comment comment, Integer postId, Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        Post post = postService.findPostById(postId);

        Comment newComment = new Comment();
        newComment.setContent(comment.getContent());
        newComment.setUser(user);
        newComment.setPost(post);
        newComment.setCreateAt(LocalDateTime.now());

        Comment savedComment = commentRepository.save(newComment);

        post.getComments().add(savedComment);
        postRepository.save(post);

        return savedComment;
    }

    @Override
    public Comment findCommentById(Integer commentId) throws Exception {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if(comment.isEmpty()) {
            throw new Exception("The comment not exist");
        }
        return comment.get();
    }

    @Override
    public Comment likeComment(Integer commentId, Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        Comment comment = findCommentById(commentId);

        if(comment.getLiked().contains(user)) {
            comment.getLiked().remove(user);
        } else {
            comment.getLiked().add(user);
        }

        return commentRepository.save(comment);
    }
}
