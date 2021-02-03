package com.axis.repo

import com.axis.model.DbProperties
import com.mongodb.client.MongoClients
import com.mongodb.client.MongoCollection
import org.bson.Document
import org.json.simple.JSONObject
import org.json.simple.parser.JSONParser
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

@Repository
class EndPointRepo {

    @Autowired
    private var dbProperties: DbProperties? = null

    fun getAllEndPoints(): ArrayList<*> {
        val endPoints = ArrayList<Any>()
        MongoClients.create(dbProperties?.connection!!).use { mongoClient ->
            val database = mongoClient.getDatabase(dbProperties?.database!!)
            val collection: MongoCollection<Document> = database.getCollection(dbProperties?.endpointsCollection!!)
            collection.find().iterator().use { cur ->
                while (cur.hasNext()) {
                    val doc = cur.next()
                    doc.remove("_id")
                    endPoints.add(doc)
                }
            }
        }
        return (endPoints!!)
    }

    fun getEndpointForProductOfPartner(insuranceProductId: String, partnerID: String): Document? {
        var endPointDoc: Document? = null
        MongoClients.create(dbProperties?.connection!!).use { mongoClient ->
            val database = mongoClient.getDatabase(dbProperties?.database!!)
            val collection: MongoCollection<org.bson.Document> = database.getCollection(dbProperties?.endpointsCollection!!)
            collection.find().iterator().use { cur ->
                while (cur.hasNext()) {
                    val doc = cur.next()
                    doc.remove("_id")
                    if (doc.get("productID").toString().equals(insuranceProductId) && doc.get("partnerID").toString().equals(partnerID)) {
                        endPointDoc = doc
                        break
                    }
                }
            }
        }
        if(endPointDoc===null) {
            return null
        }
        return (endPointDoc as Document)
    }

    fun addEndPoints(partner: String): Document {
        val parser = JSONParser()
        val jsonPartner = parser.parse(partner) as JSONObject
        MongoClients.create(dbProperties?.connection!!).use { mongoClient ->
            val database = mongoClient.getDatabase(dbProperties?.database!!)
            val collection: MongoCollection<org.bson.Document> = database.getCollection(dbProperties?.endpointsCollection!!)
            var doc: Document = Document.parse(jsonPartner.toString())
            collection.insertOne(doc)
            return doc
        }
    }

    fun getAllEndpointsForProduct(insuranceProductId: String): List<Document> {
        var endPointDocs = arrayListOf<Document>()
        MongoClients.create(dbProperties?.connection!!).use { mongoClient ->
            val database = mongoClient.getDatabase(dbProperties?.database!!)
            val collection: MongoCollection<org.bson.Document> = database.getCollection(dbProperties?.endpointsCollection!!)
            collection.find().iterator().use { cur ->
                while (cur.hasNext()) {
                    val doc = cur.next()
                    doc.remove("_id")
                    if (doc.get("productID").toString().equals(insuranceProductId)) {
                        endPointDocs.add(doc)
                    }
                }
            }
        }
        return (endPointDocs!!)
    }

    fun updateFormFieldsForAProduct(endpointDetails: String) {
        val parser = JSONParser()
        val endpointDetails = parser.parse(endpointDetails) as JSONObject
        val productID = endpointDetails.get("productID")
        val partnerID = endpointDetails.get("partnerID")
        MongoClients.create(dbProperties?.connection!!).use { mongoClient ->
            println(productID)
            val database = mongoClient.getDatabase(dbProperties?.database!!)
            val collection: MongoCollection<Document> = database.getCollection(dbProperties?.endpointsCollection!!)
            collection.find().iterator().use { cur ->
                while (cur.hasNext()) {
                    val formsDoc = cur.next()
                    val updatedDoc: Document = Document.parse(endpointDetails.toString())
                    if (formsDoc.get("productID").toString()?.equals(productID) && formsDoc.get("partnerID").toString()?.equals(partnerID)) {
                        println(productID)
                        collection.findOneAndReplace(formsDoc, updatedDoc)
                        //collection.updateOne(productDoc, updatedDoc)
                        break
                    }
                    else {
                        println("No endpoint details found for that product and partner")
                    }
                }
            }
        }
    }

    fun deleteEndPointsOfAProductForAPartner(productID: String, partnerID: String) {
        MongoClients.create(dbProperties?.connection!!).use { mongoClient ->
            println(productID)
            val database = mongoClient.getDatabase(dbProperties?.database!!)
            val collection: MongoCollection<Document> = database.getCollection(dbProperties?.endpointsCollection!!)
            collection.find().iterator().use { cur ->
                while (cur.hasNext()) {
                    val endPointDoc = cur.next()
                    endPointDoc.remove("_id")
                    if (endPointDoc.get("productID").toString()?.equals(productID) && endPointDoc.get("partnerID").toString()?.equals(partnerID)) {
                        collection.deleteOne(endPointDoc)
                    }
                }
            }
        }
    }

    fun deleteEndPointsForAProduct(productID: String) {
        MongoClients.create(dbProperties?.connection!!).use { mongoClient ->
            println(productID)
            val database = mongoClient.getDatabase(dbProperties?.database!!)
            val collection: MongoCollection<Document> = database.getCollection(dbProperties?.endpointsCollection!!)
            collection.find().iterator().use { cur ->
                while (cur.hasNext()) {
                    val endPointDoc = cur.next()
                    endPointDoc.remove("_id")
                    if (endPointDoc.get("productID").toString()?.equals(productID)) {
                        collection.deleteOne(endPointDoc)
                    }
                }
            }
        }
    }
}