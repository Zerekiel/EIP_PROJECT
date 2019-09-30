var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.put('/test/:id/', async function(req, res) {

	o_dbCRUD = new dbCRUD();
	var id = req.params.id;
	var myQuery = { _id: new mongo.ObjectId(id) };
	var dataToChange = {$set:req.body};
	o_dbCRUD.updateOneInfo("HealthSafe", "userconnections", myQuery, dataToChange, function(err, obj) {
		if (err)
			throw (err);
		console.log("END TEST UPDATE");

		console.log("OBJ" + obj);
		return obj;
	})

	res.status(200).send(id).end();
});

updateOneInfo(dbName, collectionName, myQuery, dataToChange, callback)
{
        this.m_resultParseUrl.pathname = dbName;
        this.m_resultParseUrl.set('pathname', dbName);
        this.m_urlDB = this.m_resultParseUrl.href;
        MongoClient.connect(this.m_urlDB, { useNewUrlParser: true }, function(err, db) {
                if (err)
                        throw err;

                var dbo = db.db(dbName);
                console.log("TTTT");
                dbo.collection(collectionName).findOneAndUpdate(myQuery, dataToChange, function(err, result) {
                        if (err)
                                throw err;
                        console.log("TTTT");
                        //console.log(obj);
                        db.close();
                        return callback(result);
                        //res.status(200).send("TEST");
                });
                // dbo.collection(collectionName).deleteOne(myQuery, function(err, obj) {
                // 	if (err) throw err;
                // //console.log(obj);
                // console.log("1 document deleted");
                // db.close();
                // });
        });
}
module.exports = router;
