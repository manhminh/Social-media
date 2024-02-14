package com.manh.socialmedia.service;

import com.manh.socialmedia.models.Chat;
import com.manh.socialmedia.models.User;

import java.util.List;

public interface ChatService {
    public Chat createChat(User reqUser, User user);

    public Chat findChatById(Integer chatId) throws Exception;

    public List<Chat> findUserChat(Integer  userId);
}
