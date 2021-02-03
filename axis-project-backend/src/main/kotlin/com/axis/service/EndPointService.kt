package com.axis.service

import com.axis.repo.EndPointRepo
import org.bson.Document
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class EndPointService {
    @Autowired
    private var endpointRepo: EndPointRepo? = null

    fun getAllEndPoints(): ArrayList<*>? {
        return endpointRepo?.getAllEndPoints()
    }

    fun getEndpointForProductOfPartner(insuranceProductId: String, partnerID: String): Document? {
        return endpointRepo?.getEndpointForProductOfPartner(insuranceProductId, partnerID)
    }

    fun addEndPoints(partner: String): Document? {
        return endpointRepo?.addEndPoints(partner)
    }

    fun getAllEndpointsForProduct(insuranceProductId: String): List<Document>? {
        return endpointRepo?.getAllEndpointsForProduct(insuranceProductId)
    }

    fun updateFormFieldsForAProduct(endpointDetails: String) {
        endpointRepo?.updateFormFieldsForAProduct(endpointDetails)
    }

    fun deleteEndPointsOfAProductForAPartner(productID: String, partnerID: String) {
        endpointRepo?.deleteEndPointsOfAProductForAPartner(productID, partnerID)
    }

    fun deleteEndPointsForAProduct(productID: String) {
        endpointRepo?.deleteEndPointsForAProduct(productID)
    }
}