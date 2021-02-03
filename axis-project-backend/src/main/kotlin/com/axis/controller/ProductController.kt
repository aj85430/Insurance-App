package com.axis.controller

import com.axis.model.Product
import com.axis.service.ProductService
import io.swagger.annotations.ApiOperation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@CrossOrigin("http://localhost:3001", "http://localhost:3000")
//@RequestMapping("/esperanza")
@RestController
class ProductController {

    @Autowired
    private val formController: FormController? = null

    @Autowired
    private val endPointController: EndPointController? = null

    @Autowired
    private val productService: ProductService? = null

    @ApiOperation(value = "Get all the products")
    @GetMapping("/products")
    //getting data from mongo
    fun getProducts(): MutableList<Product>? {
        return productService?.getProducts()
    }

    @ApiOperation(value = "Get a product by Id")
    @GetMapping("/products/{productId}")
    fun getProductById(@PathVariable productId: String): Product? {
        return productService?.getProductById(productId)
    }

    @ApiOperation(value = "Add new products")
    @PostMapping("/products")
    fun addProduct(@RequestBody product: Product): Product? {
        return productService?.addProduct(product)
    }

    @ApiOperation(value = "Update product details")
    @PutMapping("/products")
    fun updateProduct(@RequestBody productDetails: Product) {
        productService?.updateProduct(productDetails)
    }

    @ApiOperation(value = "Delete a product")
    @DeleteMapping("/products/{productID}")
    fun deleteProduct(@PathVariable productID: String) {
        formController?.deleteFormForAProduct(productID)
        endPointController?.deleteEndPointsForAProduct(productID)
        productService?.deleteProduct(productID)
    }
}