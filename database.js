var url = "mongodb://<database-user>:<database-password>@<server-name>.mongohq.com:<port>/<database-name>"
var mongodb = require('mongodb'), MongoClient = mongodb.MongoClient

exports.write = function (callback) {
    MongoClient.connect(url, function(err, db) {
      // operate on the collection named "test"
      var collection = db.collection('test')

      // remove all records in collection (if any)
      callback(null, 'removing documents...')
      collection.remove(function(err, result) {
        if (err) {
          return console.error(err)
        }
        callback(null, 'collection cleared!')
        // insert two documents
        callback(null, 'inserting new documents...')
        collection.insert([{name: 'tester'}, {name: 'coder'}], function(err, docs) {
          if (err) {
            return console.error(err)
          }
          callback(null, 'just inserted ' + docs.length + ' new documents!')
          collection.find({}).toArray(function(err, docs) {
            if (err) {
              return console.error(err)
            }
            docs.forEach(function(doc) {
              callback(null, 'found document: ' + doc, true)
            })
          })
        })
      })
    })
}
