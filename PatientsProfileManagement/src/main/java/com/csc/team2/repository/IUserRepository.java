package com.csc.team2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csc.team2.model.Treatment;
import com.csc.team2.model.User;

@Repository("userRepository")
public interface IUserRepository extends JpaRepository<User, Integer> {
	 //User findByEmail(String email);
	User findByusername(String username);
	User findById(int id);
}
