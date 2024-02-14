package com.manh.socialmedia.service.implementation;

import com.manh.socialmedia.models.Reels;
import com.manh.socialmedia.models.User;
import com.manh.socialmedia.repository.ReelsRepository;
import com.manh.socialmedia.service.ReelsService;
import com.manh.socialmedia.service.UserService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReelsServiceImplementation implements ReelsService {
    private final ReelsRepository reelsRepository;
    private final UserService userService;

    public ReelsServiceImplementation(ReelsRepository reelsRepository, UserService userService) {
        this.reelsRepository = reelsRepository;
        this.userService = userService;
    }

    @Override
    public Reels createReels(Reels reels, User user) {
        Reels newReels = new Reels();

        newReels.setTitle(reels.getTitle());
        newReels.setVideo(reels.getVideo());
        newReels.setUser(user);
        newReels.setCreateAt(LocalDateTime.now());

        return reelsRepository.save(newReels);
    }

    @Override
    public List<Reels> findAllReels() {
        return reelsRepository.findAll();
    }

    @Override
    public List<Reels> findUsersReels(Integer userId) throws Exception {
        User user = userService.findUserById(userId);

        return reelsRepository.findByUser(user);
    }
}
