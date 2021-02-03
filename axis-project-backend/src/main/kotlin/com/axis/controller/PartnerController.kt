package com.axis.controller

import com.axis.model.Partner
import com.axis.service.PartnerService
import io.swagger.annotations.ApiOperation
import org.bson.Document
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@CrossOrigin("http://localhost:3000", "http://localhost:3001")
//@RequestMapping("/esperanza")
@RestController
class PartnerController {

    @Autowired
    private var partnerService: PartnerService? = null

    @Autowired
    private var endpointController: EndPointController? = null

    @ApiOperation(value = "Get partners details for a particular product")
    @GetMapping("/partners/{insuranceProductId}")
    fun getPartnersForProduct(@PathVariable insuranceProductId: String): ArrayList<Partner> {
        val endpoints = endpointController?.getAllEndpointsForProduct(insuranceProductId)
        var partners = ArrayList<Partner>()
        if (endpoints != null) {
            for(endpoint: Document in endpoints) {
                var partnerID: String = endpoint.get("partnerID") as String
                var partner = partnerService?.getPartnerByPartnerID(partnerID)
                if (partner != null) {
                    partners.add(partner)
                }
            }
        }
        return partners
    }

    @ApiOperation(value = "Get all partners details")
    @GetMapping("/partners")
    fun getAllPartners(): MutableList<Partner>? {
        return partnerService?.getAllPartners()
    }

    @ApiOperation(value = "Get partner by partner ID")
    @GetMapping("/partner/{partnerID}")
    fun getPartnerByPartnerID(@PathVariable partnerID: String): Partner {
        return partnerService!!.getPartnerByPartnerID(partnerID)
    }

    @ApiOperation(value = "Add new partner")
    @PostMapping("/partners")
    fun addPartner(@RequestBody partner: Partner): Partner? {
        return partnerService?.addPartner(partner)
    }

    @ApiOperation(value = "Update partner details")
    @PutMapping("/partners")
    fun updatePartner(@RequestBody partnerDetails: Partner) {
        partnerService?.updatePartner(partnerDetails)
    }

    @ApiOperation(value = "Delete a partner by partnerID")
    @DeleteMapping("/partners/{partnerID}")
    fun deletePartnerByPartnerID(@PathVariable partnerID: String) {
        partnerService?.deletePartnerByPartnerID(partnerID)
    }
}