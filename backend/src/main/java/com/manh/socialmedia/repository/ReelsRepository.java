package com.manh.socialmedia.repository;

import com.manh.socialmedia.models.Reels;
import com.manh.socialmedia.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReelsRepository extends JpaRepository<Reels, Integer> {
    public List<Reels> findByUser(User user);
}
