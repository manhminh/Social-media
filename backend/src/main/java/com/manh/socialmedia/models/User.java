package com.manh.socialmedia.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private String gender;
    private String avatar;

    @Column(name = "follower_id")
    private List<Integer> followers = new ArrayList<>();

    @Column(name = "following_id")
    private List<Integer> followings = new ArrayList<>();

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "user_saved_posts",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "post_id")
    )
    private List<Post> savedPost = new ArrayList<>();
}
