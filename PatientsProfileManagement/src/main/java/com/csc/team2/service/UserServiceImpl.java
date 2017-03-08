package com.csc.team2.service;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.csc.team2.model.Role;
import com.csc.team2.model.User;
import com.csc.team2.repository.RoleRepository;
import com.csc.team2.repository.UserRepository;

@Service("userService")
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	@Autowired
    private RoleRepository roleRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
	
    @Override
	/*public User findUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}*/
    
	public User findUserByUsername(String username){
		return userRepository.findByUsername(username);
	}
	
	@Override
	/*public void saveUser(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setActive(1);
        Role userRole = roleRepository.findByRole("ADMIN");
        user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
		userRepository.save(user);
	}*/
	public void saveUser(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
	    Role userRole = roleRepository.findByRoles("admin");
	    user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
	    userRepository.save(user);
	}

}
