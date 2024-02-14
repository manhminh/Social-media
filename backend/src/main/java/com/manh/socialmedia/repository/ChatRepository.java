package com.manh.socialmedia.repository;

import com.manh.socialmedia.models.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
    public List<Chat> findByUsersId(Integer userId);

    @Query("SELECT c FROM Chat c " +
            "JOIN c.users cu_user " +
            "JOIN c.users cu_reqUser " +
            "WHERE cu_user.id = :userId " +
            "AND cu_reqUser.id = :reqUserId")
    public Chat findChatByUsersId(@Param("userId") Integer userId, @Param("reqUserId") Integer reqUserId);
}
