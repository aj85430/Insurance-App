package com.axis

import com.axis.model.Partner
import com.axis.repo.PartnerRepo
import com.axis.service.PartnerService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.Mockito.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import java.util.*


@SpringBootTest
class PartnerServiceTest{

    @Autowired
    var partnerService: PartnerService? = null

    @MockBean
    var partnerRepo: PartnerRepo? = null

    @Test
    fun getAllPartnersTest()
    {
        val partnerMockList: MutableList<Partner> = ArrayList()
        partnerMockList.add(Partner("P_001", "Bharati Axa", "https://odishatv.in/wp-content/uploads/2018/11/Bharti-Axa.jpg"))
        partnerMockList.add(Partner("P_002", "Tata Aig", "https://odishatv.in/wp-content/uploads/2018/11/Bharti-Axa.jpg"))
        partnerMockList.add(Partner("P_003", "Axis Max Life", "https://odishatv.in/wp-content/uploads/2018/11/Bharti-Axa.jpg"))
        `when`(partnerRepo!!.findAll()).thenReturn(partnerMockList)
        assertEquals(3, partnerService!!.getAllPartners()?.size)

    }

    @Test
    fun getPartnerByPartnerIdTest()
    {
        val partner = Partner("P_001", "Bharati Axa", "https://odishatv.in/wp-content/uploads/2018/11/Bharti-Axa.jpg")
        val id = "P_001"
        `when`(partnerRepo!!.findByPartnerId(id)).thenReturn(partner)
        assertEquals(partner, partnerService!!.getPartnerByPartnerID(id))

    }

    @Test
    fun addPartnerTest()
    {
        val partner = Partner("P_001", "Bharati Axa", "https://odishatv.in/wp-content/uploads/2018/11/Bharti-Axa.jpg")
        `when`<Any>(partnerRepo!!.save(partner)).thenReturn(partner)
        assertEquals(partner, partnerService!!.addPartner(partner))

    }

    @Test
    fun deletePartnerTest() {
        val partner = Partner("P_001", "Bharati Axa", "https://odishatv.in/wp-content/uploads/2018/11/Bharti-Axa.jpg")
        partnerService!!.deletePartnerByPartnerID(partner.partnerID)
        verify(partnerRepo, times(1))!!.deleteById(partner.partnerID)
    }

    @Test
    fun updatePartnerTest()
    {
        val partner = Partner("P_001", "Bharati Axa", "https://odishatv.in/wp-content/uploads/2018/11/Bharti-Axa.jpg")
        partnerService?.updatePartner(partner)
        verify(partnerRepo, times(1))?.save(partner)
    }


}