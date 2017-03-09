package com.csc.team2.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csc.team2.model.Treatment;
import com.csc.team2.model.TreatmentDt;
import com.csc.team2.repository.TreatmentDtRepository;
import com.csc.team2.repository.TreatmentRepository;;

@Service("treatmentDtService")
@Transactional

public class TreatmentDtServiceIplm implements TreatmentDtService {
	
	@Autowired
    private TreatmentDtRepository treatmentdtRepository;

	@Override
	public TreatmentDt findById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TreatmentDt findByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void saveTreatmentDt(TreatmentDt treatmentdt) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateTreatmentDt(TreatmentDt treatmentdt) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteTreatmentDtById(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllTreatmentDt() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<TreatmentDt> findAllTreatmentDt() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isTreatmentDtExist(TreatmentDt treatmentdt) {
		// TODO Auto-generated method stub
		return false;
	}
	
	
	

}
