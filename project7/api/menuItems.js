const menuItemsRouter = require('express').Router({mergeParams: true});
module.exports = menuItemsRouter;

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

menuItemsRouter.param('menuItemId', (req, res, next, menuItemId) => {
  const sql = "SELECT * FROM MenuItem WHERE id=$menuItemId";
  const values = {$menuItemId: menuItemId};

  db.get(sql, values, (err, menuItem) => {
    if(err) {
      next(err);
    } else if (menuItem){
      req.menuItem = menuItem;
      next();
    } else {
      res.status(404).send();
    }
  });
});


menuItemsRouter.get('/', (req, res, next) => {
  const sql = "SELECT * FROM MenuItem WHERE menu_id = $menuId";
  const values = {$menuId: req.params.menuId};

  db.all(sql, values, (err, menuItems) => {
    if(err) {
    next(err);
  } else {
    res.status(200).json({menuItems: menuItems});
   }
 });
});


menuItemsRouter.post('/', (req, res, next) => {
  const name = req.body.menuItem.name;
  const description = req.body.menuItem.description;
  const inventory = req.body.menuItem.inventory;
  const price = req.body.menuItem.price;
  const menuId = req.params.menuId;
  const sql = "SELECT * FROM Menu WHERE id = $menuId";
  const values = {$menuId: menuId};

  db.get(sql, values, (err, menu) => {
    if (err) {
      next(err);
    } else {
      if (!name || !description || !inventory || !price) {
        return res.sendStatus(400);
      }
      const insertSql = "INSERT INTO MenuItem (name, description, inventory, price, menu_id) VALUES ($name, $description, $inventory, $price, $menuId)";
      const insertValues = {
        $name: name,
        $description: description,
        $inventory: inventory,
        $price: price,
        $menuId: req.params.menuId
      };

      db.run(insertSql, insertValues, function(err) {
        if (err) {
          next(err);
        } else {
          db.get(`SELECT * FROM MenuItem WHERE id = ${this.lastID}`,
            (err, menuItem) => {
              res.status(201).json({menuItem: menuItem});
          });
        }
      });
    }
  });
});


menuItemsRouter.put('/:menuItemId', (req, res, next) => {
  const name = req.body.menuItem.name;
  const description = req.body.menuItem.description;
  const inventory = req.body.menuItem.inventory;
  const price = req.body.menuItem.price;
  const menuId = req.params.menuId;
  const menuItemId = req.params.menuItemId;

      if (!name || !description || !inventory || !price || !menuId) {
        return res.sendStatus(400);
      }
      const updateSql = "UPDATE MenuItem SET name = $name, description = $description, inventory = $inventory, price = $price, menu_id = $menuId WHERE id = $menuItemId";
      const updateValues = {
        $name: name,
        $description: description,
        $inventory: inventory,
        $price: price,
        $menuId: menuId,
        $menuItemId: req.params.menuItemId
      };
      db.run(updateSql, updateValues, function(err) {
        if (err) {
          next(err);
        } else {
          db.get(`SELECT * FROM MenuItem WHERE id = ${req.params.menuItemId}`,
            (err, menuItem) => {
              res.status(200).json({menuItem: menuItem});
      });
    }
  });
});


menuItemsRouter.delete('/:menuItemId', (req, res, next) => {
  const sql = "DELETE FROM MenuItem WHERE id = $menuItemId";
  const values = {$menuItemId: req.params.menuItemId};

  db.run(sql, values, (err) => {
    if (err) {
      next(err);
    } else {
    res.sendStatus(204);
    }
  });
});
