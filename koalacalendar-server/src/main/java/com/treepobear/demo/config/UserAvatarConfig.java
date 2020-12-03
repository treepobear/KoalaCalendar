package com.treepobear.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 定位头像地址
 */
@Configuration
public class UserAvatarConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/img/avatar/**")
                .addResourceLocations("file:"+System.getProperty("user.dir")
                        +System.getProperty("file.separator")+"img"+
                        System.getProperty("file.separator")+"avatar"+
                        System.getProperty("file.separator"));
    }


}
