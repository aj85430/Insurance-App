package com.axis.service

import com.axis.model.Partner
import com.axis.repo.PartnerRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.RequestBody

@Service
class PartnerService {

    @Autowired
    private var partnerRepo: PartnerRepo? = null

    fun getPartnerByPartnerID(partnerID: String): Partner {
       return partnerRepo!!.findByPartnerId(partnerID)
    }

    fun getAllPartners(): MutableList<Partner>? {
        return partnerRepo?.findAll()
    }

    fun addPartner(partner: Partner): Partner? {
        return partnerRepo?.save(partner)
    }

    fun updatePartner(@RequestBody partnerDetails: Partner) {
        partnerRepo?.save(partnerDetails)
    }

    fun deletePartnerByPartnerID(partnerID: String) {
        partnerRepo?.deleteById(partnerID)
    }
}