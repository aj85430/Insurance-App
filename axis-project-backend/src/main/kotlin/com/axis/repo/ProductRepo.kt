package com.axis.repo

import com.axis.model.Product
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ProductRepo: MongoRepository<Product, String> {
    @Query("{'productID' : ?0}")
    fun findByProductId(productID: String): Product
}