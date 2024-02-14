package com.manh.socialmedia.repository;

import com.manh.socialmedia.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);

    @Query("SELECT DISTINCT u FROM User u WHERE " +
            "(u.firstName LIKE %:query% OR " +
            "u.lastName LIKE %:query% OR " +
            "u.email LIKE %:query%) AND " +
            "u.id != :userId")
    List<User> searchUser(@Param("query") String query, @Param("userId") Integer userId);

    User findByUsername(String username);
}
