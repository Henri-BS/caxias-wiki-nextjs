package com.pasifcode.caxias_destiny;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CaxiasDestinyApplication {

	public static void main(String[] args) {
		SpringApplication.run(CaxiasDestinyApplication.class, args);
	}

}
