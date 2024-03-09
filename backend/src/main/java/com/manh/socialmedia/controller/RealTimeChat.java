package com.manh.socialmedia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class RealTimeChat {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat/{groupId}")
    public Message sendToUser(@Payload Message message, @DestinationVariable String groupId) {
        simpMessagingTemplate.convertAndSendToUser(groupId, "/private", message);
        System.out.println(message);
        return message;
    }

    @MessageMapping("/post/{userId}")
    public Message sendPost(@Payload Message message, @DestinationVariable String userId) {
        System.out.println(userId);
        simpMessagingTemplate.convertAndSendToUser(userId,"/topic", message);
        System.out.println(message);
        return message;
    }
}
