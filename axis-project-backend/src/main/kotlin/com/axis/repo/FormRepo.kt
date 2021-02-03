package com.axis.repo

import com.axis.model.DbProperties
import com.mongodb.client.MongoClients
import com.mongodb.client.MongoCollection
import org.bson.Document
import org.json.simple.JSONObject
import org.json.simple.parser.JSONParser
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.env.Environment
import org.springframework.stereotype.Repository

@Repository
class FormRepo {

   /* @Autowired
    private var env: Environment? = null*/

    @Autowired
    private var dbProperties: DbProperties? = null

    fun getFormsForProduct(insuranceProductId: String): ArrayList<*> {
        val formFields = ArrayList<Any>()
        MongoClients.create(dbProperties?.connection!!).use { mongoClient ->
            val database = mongoClient.getDatabase(dbProperties?.database!!)
            val collection: MongoCollection<Document> = database.getCollection(dbProperties?.formFieldsCollection!!)
            collection.find().iterator().use { cur ->
                while (cur.hasNext()) {
                    val doc = cur.next()
                    doc.remove("_id")
                    if (doc.containsValue(insuranceProductId) && formFields != null) {
                        formFields.add(doc)
                    }
                }
            }
        }
        return (formFields!!)
    }

    fun getFormsForAllProducts(): ArrayList<*> {
        val formFields = ArrayList<Any>()
        MongoClients.create(dbProperties?.connection!!).use { mongoClient ->
            val database = mongoClient.getDatabase(dbProperties?.database!!)
            val collection: MongoCollection<Document> = database.getCollection(dbProperties?.formFieldsCollection!!)
            collection.find().iterator().use { cur ->
                while (cur.hasNext()) {
                    val doc = cur.next()
                    doc.remove("_id")
                    formFields.add(doc)
                }
            }
        }
        return (formFields!!)
    }

    fun addFormFields(partner: String): Document {
        val parser = JSONParser()
        val jsonPartner = parser.parse(partner) as JSONObject
        MongoClients.create(dbProperties?.connection!!).use { mongoClient ->
            val database = mongoClient.getDatabase(dbProperties?.database!!)
            val collection: MongoCollection<Document> = database.getCollection(dbProperties?.formFieldsCollection!!)
            var doc: Document = Document.parse(jsonPartner.toString())
            collection.insertOne(doc)
            return doc
        }
    }

    fun updateFormFieldsForAProduct(formFields: String) {
        val parser = JSONParser()
        val formFields = parser.parse(formFields) as JSONObject
        val productID = formFields.get("productID")
        MongoClients.create(dbProperties?.connection!!).use { mongoClient ->
            println(productID)
            val database = mongoClient.getDatabase(dbProperties?.database!!)
            val collection: MongoCollection<Document> = database.getCollection(dbProperties?.formFieldsCollection!!)
            collection.find().iterator().use { cur ->
                while (cur.hasNext()) {
                    val formsDoc = cur.next()
                    val updatedDoc: Document = Document.parse(formFields.toString())
                    if (formsDoc.get("productID").toString()?.equals(productID)) {
                        println(productID)
                        collection.findOneAndReplace(formsDoc, updatedDoc)
                        //collection.updateOne(productDoc, updatedDoc)
                        break
                    }
                    else {
                        println("No form fields found for that product")
                    }
                }
            }
        }
    }

    fun deleteFormForAProduct(productID: String) {
        MongoClients.create(dbProperties?.connection!!).use { mongoClient ->
            println(productID)
            val database = mongoClient.getDatabase(dbProperties?.database!!)
            val collection: MongoCollection<Document> = database.getCollection(dbProperties?.formFieldsCollection!!)
            collection.find().iterator().use { cur ->
                while (cur.hasNext()) {
                    val formFieldsDoc = cur.next()
                    formFieldsDoc.remove("_id")
                    if (formFieldsDoc.get("productID").toString()?.equals(productID)) {
                        collection.deleteOne(formFieldsDoc)
                        break
                    }
                }
            }
        }
    }
}