package com.manh.socialmedia.service;

import com.manh.socialmedia.models.Message;
import com.manh.socialmedia.models.User;

import java.util.List;

public interface MessageService {
    public Message createMessage(User user, Integer chatId, Message message) throws Exception;

    public List<Message> findChatsMessages(Integer chatId) throws Exception;
}
