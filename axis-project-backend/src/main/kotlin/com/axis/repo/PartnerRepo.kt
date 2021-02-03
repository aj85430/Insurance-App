package com.axis.repo

import com.axis.model.Partner
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface PartnerRepo: MongoRepository<Partner, String> {
    @Query("{'partnerID' : ?0}")
    fun findByPartnerId(partnerID: String): Partner

}