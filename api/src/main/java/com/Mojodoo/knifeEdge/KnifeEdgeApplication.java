package com.Mojodoo.knifeEdge;

import com.Mojodoo.knifeEdge.configs.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class KnifeEdgeApplication {

	public static void main(String[] args) {
		SpringApplication.run(KnifeEdgeApplication.class, args);
	}

}
