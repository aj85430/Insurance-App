package com.axis.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("partners")
class Partner {
    @Id
    var partnerID: String = ""
    var partnerName: String = ""
    var logoSrc: String = ""

    constructor()

    constructor(partnerID: String, partnerName: String, logoSrc: String) {
        this.partnerID = partnerID
        this.partnerName = partnerName
        this.logoSrc = logoSrc
    }

    override fun toString(): String {
        return "Partner(partnerID='$partnerID', partnerName='$partnerName', logoSrc='$logoSrc')"
    }
}