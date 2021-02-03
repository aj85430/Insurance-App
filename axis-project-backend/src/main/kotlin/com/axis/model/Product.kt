package com.axis.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("products")
class Product {
    @Id
    var productID: String = ""
    var id: String = ""
    var title: String = ""
    var imageSrc: String = ""
    var navigationPath: String = ""
    var backgroundImage: String = ""
    var bannerSrc: String = ""

    constructor()

    constructor(
        productID: String,
        id: String,
        title: String,
        imageSrc: String,
        navigationPath: String,
        backgroundImage: String,
        bannerSrc: String
    ) {
        this.productID = productID
        this.id = id
        this.title = title
        this.imageSrc = imageSrc
        this.navigationPath = navigationPath
        this.backgroundImage = backgroundImage
        this.bannerSrc = bannerSrc
    }

    override fun toString(): String {
        return "Product(productID='$productID', id='$id', title='$title', imageSrc='$imageSrc', navigationPath='$navigationPath', backgroundImage='$backgroundImage', bannerSrc='$bannerSrc')"
    }

}