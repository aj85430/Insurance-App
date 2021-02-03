package com.axis.service

import com.axis.repo.FormRepo
import com.mongodb.client.MongoClients
import com.mongodb.client.MongoCollection
import org.bson.Document
import org.json.simple.JSONObject
import org.json.simple.parser.JSONParser
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody

@Service
class FormService {

    @Autowired
    private var formRepo: FormRepo? = null

    fun getFormsForProduct(insuranceProductId: String): ArrayList<*>? {
        return formRepo?.getFormsForProduct(insuranceProductId)
    }

    fun getFormsForAllProducts(): ArrayList<*>? {
        return formRepo?.getFormsForAllProducts()
    }

    fun addFormFields(partner: String): Document? {
        return formRepo?.addFormFields(partner)
    }

    fun updateFormFieldsForAProduct(formFields: String) {
        formRepo?.updateFormFieldsForAProduct(formFields)
    }

    fun deleteFormForAProduct(productID: String) {
        formRepo?.deleteFormForAProduct(productID)
    }
}