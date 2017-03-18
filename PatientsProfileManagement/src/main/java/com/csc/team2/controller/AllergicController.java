package com.csc.team2.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.util.UriComponentsBuilder;

import com.csc.team2.model.Allergic;
import com.csc.team2.model.Medicine;
import com.csc.team2.service.AllergicServiceImpl;

@Controller
public class AllergicController {
	
	@Autowired
	AllergicServiceImpl allergicService;
	
	public static final Logger logger = LoggerFactory.getLogger(AllergicController.class);
	
	//========= Get All Allergic========================================
	
	@RequestMapping(value="/allergic", method = RequestMethod.GET)
	public ResponseEntity<List<Allergic>> listAllergic(){
		List<Allergic> allergis = allergicService.findAllAllergics();
//		if(allergis.isEmpty()){
//			return new ResponseEntity(HttpStatus.NO_CONTENT);
//		}
		return new ResponseEntity<List<Allergic>>(allergis, HttpStatus.OK);
	}
	
	//========= Create List Allergic====================================
	@RequestMapping(value="/addAllergicList", method= RequestMethod.POST)
	public ResponseEntity<?> createAllergics(@RequestBody List<Allergic> allergicList,UriComponentsBuilder ucBuilder){
		logger.info("create New Medicine : {}", allergicList);
//		if(allergicService.isMedicineExist(medicine)){
//			logger.error("Unable to create. A Medicine with name {} already exist", medicine.getName());
//			return new ResponseEntity(HttpStatus.CONFLICT);
//		}
		allergicService.saveAllergic(allergicList);;
		
		HttpHeaders headers = new HttpHeaders();
//        headers.setLocation(ucBuilder.path("/Medicine/{id}").buildAndExpand(medicine.getId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
	}

}
