var express = require('express');
var bodyParser = require('body-parser');
var oracledb = require('oracledb');
var PORT = process.env.PORT || 8089;
var app = express();

var connectionProperties = {
  user: process.env.DBAAS_USER_NAME || "oracle",
  password: process.env.DBAAS_USER_PASSWORD || "oracle",
  connectString: process.env.DBAAS_DEFAULT_CONNECT_DESCRIPTOR || "localhost/xe"
};

function doRelease(connection) {
  connection.release(function (err) {
    if (err) {
      console.error(err.message);
    }
  });
};

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

var router = express.Router();

router.use(function (request, response, next) {
  console.log("REQUEST:" + request.method + "   " + request.url);
  console.log("BODY:" + JSON.stringify(request.body));
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  response.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


/**
 * GET / 
 * Returns a list of employees 
 */
router.route('/employees/').get(function (request, response) {
  console.log("GET EMPLOYEES");
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }
    console.log("After connection");
    connection.execute("SELECT * FROM employee",{},
      { outFormat: oracledb.OBJECT },
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error getting data from DB");
          doRelease(connection);
          return;
        }
        console.log("RESULTSET:" + JSON.stringify(result));
        var employees = [];
        result.rows.forEach(function (element) {
          employees.push({ id: element.ID, firstName: element.FIRSTNAME, 
                           lastName: element.LASTNAME, email: element.EMAIL, 
                           phone: element.PHONE, birthDate: element.BIRTHDATE, 
                           title: element.TITLE, dept: element.DEPARTMENT });
        }, this);
        response.json(employees);
        doRelease(connection);
      });
  });
});


/**
 * GET /searchType/searchValue 
 * Returns a list of employees that match the criteria 
 */
router.route('/employees/:searchType/:searchValue').get(function (request, response) {
  console.log("GET EMPLOYEES BY CRITERIA");
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }
	console.log("After connection");
	var searchType = request.params.searchType;
	var searchValue = request.params.searchValue;
	  
    connection.execute("SELECT * FROM employee WHERE "+searchType+" = :searchValue",[searchValue],
      { outFormat: oracledb.OBJECT },
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error getting data from DB");
          doRelease(connection);
          return;
        }
        console.log("RESULTSET:" + JSON.stringify(result));
        var employees = [];
        result.rows.forEach(function (element) {
          employees.push({ id: element.ID, firstName: element.FIRSTNAME, 
		                   lastName: element.LASTNAME, email: element.EMAIL, 
		                   phone: element.PHONE, birthDate: element.BIRTHDATE, 
						   title: element.TITLE, dept: element.DEPARTMENT });
        }, this);
        response.json(employees);
        doRelease(connection);
      });
  });
}); 

/**
 * POST / 
 * Saves a new employee 
 */
router.route('/employees/').post(function (request, response) {
  console.log("POST EMPLOYEE:");
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }

    var body = request.body;

    connection.execute("INSERT INTO EMPLOYEE (ID, FIRSTNAME, LASTNAME, EMAIL, PHONE, BIRTHDATE, TITLE, DEPARTMENT)"+ 
                       "VALUES(EMPLOYEE_SEQ.NEXTVAL, :firstName,:lastName,:email,:phone,:birthdate,:title,:department)",
      [body.firstName, body.lastName, body.email, body.phone, body.birthDate, body.title,  body.dept],
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error saving employee to DB");
          doRelease(connection);
          return;
        }
        response.end();
        doRelease(connection);
      });
  });
});

/**
 * PUT / 
 * Update a employee 
 */
router.route('/employees/:id').put(function (request, response) {
  console.log("PUT EMPLOYEE:");
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }

    var body = request.body;
    var id = request.params.id;

    connection.execute("UPDATE EMPLOYEE SET FIRSTNAME=:firstName, LASTNAME=:lastName, PHONE=:phone, BIRTHDATE=:birthdate,"+
                       " TITLE=:title, DEPARTMENT=:department, EMAIL=:email WHERE ID=:id",
      [body.firstName, body.lastName,body.phone, body.birthDate, body.title, body.dept, body.email,  id],
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error updating employee to DB");
          doRelease(connection);
          return;
        }
        response.end();
        doRelease(connection);
      });
  });
});

/**
 * DELETE / 
 * Delete a employee 
 */
router.route('/employees/:id').delete(function (request, response) {
  console.log("DELETE EMPLOYEE ID:"+request.params.id);
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }

    var body = request.body;
    var id = request.params.id;
    connection.execute("DELETE FROM EMPLOYEE WHERE ID = :id",
      [id],
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error deleting employee to DB");
          doRelease(connection);
          return;
        }
        response.end();
        doRelease(connection);
      });
  });
});

app.use(express.static('static'));
app.use('/', router);
app.listen(PORT);