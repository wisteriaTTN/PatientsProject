package com.csc.team2.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="patient")
public class Patient implements Serializable {
	
	private static final long serialVersionUD =1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Integer patienId;
	
	@Column(name="name")
	private String name;
	
	@Column(name="address")
	private String address;
	
	@Column(name="male")
	private String male;
	
	@Column(name="dob")
	private Date dob;
	
	public Integer getPatienId() {
		return patienId;
	}

	public void setPatienId(Integer patienId) {
		this.patienId = patienId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMale() {
		return male;
	}

	public void setMale(String male) {
		this.male = male;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public Patient(Integer patienId, String name, String address, String male, Date dob) {
		this.patienId = patienId;
		this.name = name;
		this.address = address;
		this.male = male;
		this.dob = dob;
	}
	
	public Patient(Patient patient){
		this.patienId = patient.patienId;
		this.name = patient.name;
		this.address = patient.address;
		this.male = patient.male;
		this.dob = patient.dob;
	}
	public Patient()
	{
		this.patienId = 0;
		this.name = "";
		this.address = "";
		this.male = "";
		this.dob = null;
	}
}
