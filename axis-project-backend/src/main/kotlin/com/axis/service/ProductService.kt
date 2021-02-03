package com.axis.service

import com.axis.model.Product
import com.axis.repo.ProductRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ProductService {

    @Autowired
    private var productRepo: ProductRepo? = null

    fun getProducts(): MutableList<Product>? {
        return productRepo?.findAll()
    }

    fun getProductById(productId: String): Product? {
        return productRepo?.findByProductId(productId)
    }

    fun addProduct(product: Product): Product? {
        return productRepo?.save(product)
    }

    fun updateProduct(productDetails: Product) {
        productRepo?.save(productDetails)
    }

    fun deleteProduct(productID: String) {
        productRepo?.deleteById(productID)
    }
}