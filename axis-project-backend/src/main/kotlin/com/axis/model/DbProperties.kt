package com.axis.model

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties("mongodb")
class DbProperties {
    var connection: String? = null
    var database: String? = null
    var endpointsCollection: String? = null
    var formFieldsCollection: String? = null
}