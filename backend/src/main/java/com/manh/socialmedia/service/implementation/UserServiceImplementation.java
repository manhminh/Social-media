package com.manh.socialmedia.service.implementation;

import com.manh.socialmedia.exceptions.UserException;
import com.manh.socialmedia.models.User;
import com.manh.socialmedia.repository.UserRepository;
import com.manh.socialmedia.security.jwt.JwtProvider;
import com.manh.socialmedia.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtProvider jwtProvider;

    public UserServiceImplementation(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public User createUser(User user) throws UserException {
        User isExistedUser = findUserByEmail(user.getEmail());
        if(isExistedUser != null) {
            throw new UserException("This is email is already used with another account");
        }

        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setGender(user.getGender());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(newUser);
        return savedUser;
    }

    @Override
    public User findUserById(Integer id) throws UserException {
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty()) {
            throw new UserException("User not exist with id: " + id);
        }

        return user.get();
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User findUserByUsername(String username) throws UserException {
        return userRepository.findByUsername(username);
    }

    @Override
    public User followUser(Integer reqUserId, Integer userId2) throws UserException {
        User reqUser = findUserById(reqUserId);
        User user2 = findUserById(userId2);

        if(user2.getFollowers().contains(reqUser.getId())
                || reqUser.getFollowings().contains(user2.getId())) {
            System.out.println(reqUser.getId() + " " + user2.getId());
            user2.getFollowers().remove(reqUser.getId());
            reqUser.getFollowings().remove(user2.getId());
        } else {
            user2.getFollowers().add(reqUser.getId());
            reqUser.getFollowings().add(user2.getId());
        }


        userRepository.save(reqUser);
        userRepository.save(user2);

        return reqUser;
    }

    @Override
    public User updateUser(User user, Integer userId) throws UserException {
        User oldUser = findUserById(userId);

        if(user.getFirstName() != null) {
            oldUser.setFirstName(user.getFirstName());
        }

        if(user.getLastName() != null) {
            oldUser.setLastName(user.getLastName());
        }

        if(user.getEmail() != null) {
            oldUser.setEmail(user.getEmail());
        }

        if(user.getUsername() != null) {
            User isExistedUser = findUserByUsername(user.getUsername());

            if(isExistedUser != null) {
                throw new UserException("This is username is already used with another account");
            }

            oldUser.setUsername(user.getUsername());
        }

        if(user.getGender() != null) {
            oldUser.setGender(user.getGender());
        }

        if(user.getAvatar() != null) {
            oldUser.setAvatar(user.getAvatar());
        }


        User updatedUser = userRepository.save(oldUser);
        return updatedUser;
    }

    @Override
    public List<User> searchUser(String query, Integer userId) {

        return userRepository.searchUser(query, userId);
    }

    @Override
    public User findUserByJwt(String jwt) {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = findUserByEmail(email);

        return user;
    }
}
