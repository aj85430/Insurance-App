package com.axis.controller

import com.axis.service.FormService
import io.swagger.annotations.ApiOperation
import org.bson.Document
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@CrossOrigin("http://localhost:3000", "http://localhost:3001")
//@RequestMapping("/esperanza")
@RestController
class FormController {

    @Autowired
    private var formService: FormService? = null

    @ApiOperation(value = "Get form details for a particular product")
    @GetMapping("/forms/{insuranceProductId}")
    fun getFormsForProduct(@PathVariable insuranceProductId: String): ArrayList<*>? {
        return formService?.getFormsForProduct(insuranceProductId)
    }

    @ApiOperation(value = "Get form fields for all products")
    @GetMapping("/forms")
    fun getFormsForAllProducts(): ArrayList<*>? {
        return formService?.getFormsForAllProducts()
    }

    @ApiOperation(value = "Add form fields for a product")
    @PostMapping("/forms")
    fun addFormFields(@RequestBody partner: String): Document? {
        return formService?.addFormFields(partner)
    }

    @ApiOperation(value = "Update form details for a product")
    @PutMapping("/forms")
    fun updateFormFieldsForAProduct(@RequestBody formFields: String) {
        formService?.updateFormFieldsForAProduct(formFields)
    }

    @ApiOperation(value = "Delete a form for a product")
    @DeleteMapping("/forms")
    fun deleteFormForAProduct(productID: String) {
        formService?.deleteFormForAProduct(productID)
    }
}