const pool = require('../../config/db');
const validateForm = require('../../validations/validator')
// const { callRateValidations, callQueueResultValidations } = require('./ratesValidations');
const { checkConfConnection, callConfApi } = require('../../helpers/serverTools');

const successCode = "2501";
const errorCode = "2504";

const serverError = {
  code: errorCode,
  msg: {
    error: "serverError",
  }
};

// Handle code
exports.handleCode = async (apiCode, req, res) => {

  try {
    switch (apiCode) {

      // Show callRate
      case "2500":
        return await showCallRate(req, res);

      // Create create Rate
      case "2510":
        return await createCallRate(req, res);

      // Call Rate list
      case "2511":
        return await callRateList(req, res);

      // Update callRate
      case "2512":
        return await updateCallRate(req, res);

      // Delete callQueue
      case "2513":
        return await deleteCallRate(req, res);

      // Change status callRate to ACTIVE
      case "2514":
        return await changeStatusActive(req, res);

      // Change status callRate to INACTIVE
      case "2515":
        return await changeStatusInactive(req, res);
      
      // Currency basic list 
      case "2518":
        return await basicListCurrencies(req, res);  

      // Rates basic list
      case "2519":
        return await basicListRates(req, res); 
      
      // Default 
      default:
        return res.status(500).json(serverError);
    }
  } catch (error) {
    return res.status(500).json(serverError);
  }
}

// -- API METHODS -- //

// Show callRate (2500)
const showCallRate = async (req, res) => {
  try {
    const rateId = parseInt(req.query.id) || '';

    if (rateId === '') {
      return res.status(200).json({
        code: errorCode,
        msg: {
          error: "id is empty",
        }
      });
    }

    const sqlQuery = `SELECT * FROM rates WHERE id=${rateId}`;
    const result = await pool.query(sqlQuery);
    
    if (!result) {
      return res.status(200).json({
        code: errorCode,
        msg: {
          error: "notFoundError",
        }
      });
    }
      
    return res.status(200).json({
      code: successCode,
      msg: {
        data: result,
      }
    });    
  } 
  catch (error) {
    return res.status(500).json(serverError);
  }  
}

// Create callRate (2510)
const createCallRate = async (req, res) => {
  try {
    const {name, prefix, numberDigits, minRate, secRate, currencyId} = req.body;

    const validConfConnection = await checkConfConnection();

    if (!validConfConnection) {
      return res.status(200).json({
        code: errorCode,
        msg: {
          error: ".conf connection error",
        }
      });
    }
    
    const sqlQuery = 'INSERT INTO rates (name, prefix, number_of_digits, min_rate, sec_rate, currency_id) VALUES (?,?,?,?,?,?)';
    const result = await pool.query(sqlQuery,[name, prefix, numberDigits, minRate, secRate, currencyId]);

    const recordCountResult = await pool.query(
      `SELECT 
      COUNT(id) as count
      FROM rates`
    );
    delete recordCountResult["meta"];
    
    if (recordCountResult[0].count > 999) {
      return res.status(200).json({
        code: errorCode,
        msg: {
          error: "recordLimit",
        }
      });
    }
    return res.status(200).json({
      code: successCode,
      msg: {
        data: result,
      }
    });
  }
  catch (error) {
    return res.status(500).json(serverError);
  }
}

// Get callRates list (2511)
const callRateList = async (req, res) => {
  try {
    const filters = req.body.filters || {};

    const perpage = Number(req.body.perpage || 10);
    const page = Number(req.body.page || 1);

    const orderField = String(req.body.orderField || "name");
    const order = String(req.body.order || "asc");

    const name = String(filters.name || '');

    if (!(["asc", "desc"].includes(order.toLowerCase()))) {
      return res.status(200).json({
        code: errorCode,
        msg: {
          error: "order must be asc or desc",
        }
      });
    }

    const orderFields = ["name", "status"];

    if (!(orderFields.includes(orderField.toLowerCase()))) {
      return res.status(200).json({
        code: errorCode,
        msg: {
          error: "Invalid orderField",
        }
      });
    }

    const whereQuery = name.length > 0 ? `WHERE r.name LIKE CONCAT(?, '%')` : '';

    const whereParam = [
      ...(name.length > 0 ? [name] : [])
    ]

    const resultData = await pool.query(
      `SELECT 
      r.id,
      r.name as name,
      r.prefix as prefix,
      (select CONCAT(CONCAT(c.symbol," "),c.currency) from currencies c WHERE c.id = r.currency_id ) as currency,
      r.min_rate as rateMin,
      r.sec_rate as rateSec,
      r.status
      FROM rates r      
      ${whereQuery}
      GROUP BY r.id
      ORDER BY ${orderField} ${order} 
      LIMIT ? 
      OFFSET ?`,
      
      [
        ... whereParam,
        perpage,
        ((page - 1) * perpage),
      ]
    );
    delete resultData["meta"];
    
    const resultTotals = await pool.query(
      `SELECT 
        COUNT(DISTINCT id) AS records 
      FROM rates r
      ${whereQuery}`,

      [
        ... whereParam
      ]
    );

    delete resultTotals["meta"];

    if (!resultTotals) {
      throw "resultTotals error";
    }

    if (resultData.length < 1) {
      return res.status(200).json({
        code: successCode,
        msg: {
          data: resultData,
        }
      });
    }

    const listData = [];
    for (let i = 0; i < resultData.length; i++) {                
      const item = resultData[i];
      listData.push({
        id: item.id,
        tr: [
          {
            td: 'name',
            value: item.name,
          },
          {
            td: "prefix",
            value: item.prefix
          },
          {
            td: "currency",
            value: item.currency
          },
          {
            td: "rate_min",
            value: item.rateMin
          },
          {
            td: "rate_sec",
            value: item.rateSec
          },
          {
            td: "status",
            value: item.status
          }
        ]
      })
    }
    
    const totalhits = resultTotals.reduce((accumulator, currentValue) => accumulator += currentValue.records, 0);
    return res.status(200).json({
      code: successCode,
      msg: {
        data: listData,
        from: ((page - 1) * perpage) + 1,
        to: Math.min(((page - 1) * perpage) + perpage, totalhits),
        per_page: Number(perpage),
        totalhits: totalhits,
        current_page: Number(page)
      }
    });
  } 
  catch (error) {
    return res.status(500).json(serverError);
  }
}

// Update callRate (2512)
const updateCallRate = async (req, res) => {
  try {
    const rateId = parseInt(req.query.id) || '';
    const {name, prefix, numberDigits, minRate, secRate, currencyId} = req.body;

    if (rateId === '') {
      return res.status(200).json({
        code: errorCode,
        msg: {
          error: "id is empty",
        }
      });
    }

    const sqlQuery = `UPDATE rates SET`;

    if (name){
      sqlQuery += `name=${name}`;
    }

    if (prefix){
      sqlQuery += `prefix=${prefix}`;
    }

    if (numberDigits){
      sqlQuery += `number_of_digits=${numberDigits}`;
    }

    if (minRate){
      sqlQuery += `min_rate=${minRate}`;
    }

    if (secRate){
      sqlQuery += `sec_rate=${secRate}`;
    }

    if (currencyId){
      sqlQuery += `currency_id=${currencyId}`;
    }

    sqlQuery += `WHERE id = ${rateId}`;

    const result = await pool.query(sqlQuery);

    return res.status(200).json({
      code: successCode,
      msg: {
        data: result,
      }
    });
  } catch (error) {
    return res.status(500).json(serverError);
  }
}


// Delete callRate (2513)
const deleteCallRate = async (req, res) => {
  try {
    const rateId = parseInt(req.query.id) || '';

    // If id is empty
    if (rateId === ''){
      return res.status(200).json({
        code: errorCode,
        msg: {
          error: "id is empty",
        }
      });
    }

    const sqlQuery = `DELETE FROM rates WHERE id=${rateId}`;
    await pool.query(sqlQuery);
    
    // If everything is OK, return success response
    return res.status(200).json({
      code: successCode,
      msg: {
        data: {
          delete: true
        }
      }
    });
  } 
  catch (error) {
    return res.status(500).json(serverError);
  }
}

// Change status callRate to ACTIVE (2514)
const changeStatusActive = async (req, res) => {
  try {
    const rateId = parseInt(req.query.id) || '';

    if (rateId === ''){
      return res.status(200).json({
        code: errorCode,
        msg: {
          error: "id is empty",
        }
      });
    }

    const sqlQuery = `UPDATE rates SET status='ACTIVE' WHERE id=${rateId}`;
    await pool.query(sqlQuery);
  
    return res.status(200).json({
      code: successCode,
      msg: {
        data: {
          active: true,
        }
      }
    });
  } 
  catch (error) {
    return res.status(500).json(serverError);
  }
}

// Change status callRate to INACTIVE (2515)
const changeStatusInactive = async (req, res) => {
  try {
    const rateId = parseInt(req.query.id) || '';

    

    if (rateId === ''){
      return res.status(200).json({
        code: errorCode,
        msg: {
          error: "id is empty",
        }
      });
    }

    const sqlQuery = `UPDATE rates SET status='INACTIVE' WHERE id=${rateId}`;
    await pool.query(sqlQuery);
  
    return res.status(200).json({
      code: successCode,
      msg: {
        data: {
          "inactive": true,
        }
      }
    });
  } 
  catch (error) {
    return res.status(500).json(serverError);
  }
}

//  basic list currencies (2518)
const basicListCurrencies = async (req, res) => {
  try{
    const resultData = await pool.query(
      `SELECT 
      c.id,
      (CONCAT(CONCAT(c.symbol," "),c.currency)) as value,
      c.name
      FROM currencies c      
      ORDER BY c.id`
    );
    delete resultData["meta"];

    return res.status(200).json({
      code: successCode,
      msg: {
        data: {
          resultData
        }
      }
    });
  } 
    catch (error) {
    return res.status(500).json(serverError);
  }
}

//  basic list Rates (2519)
const basicListRates = async (req, res) => {
  try{
    const resultData = await pool.query(
      `SELECT 
      r.id,
      r.name
      FROM rates r      
      ORDER BY r.id`
    );
    delete resultData["meta"];

    return res.status(200).json({
      code: successCode,
      msg: {
        data: {
          resultData
        }
      }
    });
  } 
    catch (error) {
    return res.status(500).json(serverError);
  }
}




