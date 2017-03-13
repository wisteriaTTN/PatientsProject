package com.csc.team2.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.csc.team2.model.TypeMedicine;
import com.csc.team2.service.TypeMedicineServiceImpl;

@Controller
public class TypeMedicineController {
	
	@Autowired
	TypeMedicineServiceImpl typeMedicineService;
	
	public static final Logger logger = LoggerFactory.getLogger(TypeMedicineController.class);
	
	//--------------------Select All TypeMedicine-----------------------------------------
	
	@RequestMapping(value="/typemedicine", method = RequestMethod.GET)
	public ResponseEntity<List<TypeMedicine>> listMedicine(){
		List<TypeMedicine> typeMedicines = typeMedicineService.findAllTypeMedicines();
		if(typeMedicines.isEmpty()){
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<TypeMedicine>>(typeMedicines, HttpStatus.OK);
	}
	
	//--------------------Select One TypeMedicine-----------------------------------------
	@RequestMapping(value="/typemedicine/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getMedicine(@PathVariable("id") int id){
		logger.info("Fetching Medicine with id {}", id);
		TypeMedicine typeMedicine = typeMedicineService.findById(id);
		if(typeMedicine==null){
			 logger.error("typeMedicine with id {} not found.", id);
			 return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<TypeMedicine>(typeMedicine, HttpStatus.OK);
	}

}
