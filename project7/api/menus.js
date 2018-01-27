const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


const menusRouter = require('express').Router();
module.exports = menusRouter;


const menuItemsRouter = require('./menuItems');


menusRouter.param('menuId', (req, res, next, menuId) => {
  const sql = "SELECT * FROM Menu WHERE id = $menuId";
  const values = {$menuId: menuId};

  db.get(sql, values, (err, menu) => {
    if(err) {
      next(err);
    } else if (menu){
      req.menu = menu;
      next();
    } else {
      res.status(404).send();
    }
  });
});


menusRouter.use('/:menuId/menu-items/', menuItemsRouter);


menusRouter.get('/', (req, res, next) => {
  const sql = "SELECT * FROM Menu";

  db.all(sql, (err, menus) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({menus: menus});
    }
  });
});


menusRouter.get('/:menuId', (req, res, next) => {
    res.status(200).json({menu: req.menu});
});


menusRouter.post('/', (req, res, next) => {
  const title = req.body.menu.title;
  const sql = "INSERT INTO Menu (title) VALUES ($title)";
  const values = {$title: title};

    if (!title) {
    return res.status(400).send();
  }
    db.run(sql, values, function(err) {
      if(err) {
        res.status(500).send();
        }
      db.get(`SELECT * FROM Menu WHERE id = ${this.lastID}`,
       (err, menu) => {
        res.status(201).json({menu: menu});
      });
    });
});


menusRouter.put('/:menuId', (req, res, next) => {
  const title = req.body.menu.title;
  const sql = "UPDATE Menu SET title = $title WHERE id = $menuId";
  const values = {$title: title, $menuId: req.params.menuId};

  if (!title) {
        return res.status(400).send();
      }
    db.run(sql, values, (err) => {
       if (err) {
         next (err);
       } else {
     db.get(`SELECT * FROM Menu WHERE id = ${req.params.menuId}`,
      (err, menu) => {
       res.status(200).json({menu: menu});
     });
    }
  });
});


menusRouter.delete('/:menuId', (req, res, next) => {
  const sql = "SELECT * FROM MenuItem WHERE menu_id = $menuId";
  const values = {$menuId: req.params.menuId};

  db.get(sql, values, (err, menuItem) => {
    if (err) {
      next(err);
    } else if (menuItem) {
      res.sendStatus(400);
    } else {
      const deleteSql = "DELETE FROM Menu WHERE id = $menuId";
      const deleteValues = {$menuId: req.params.menuId};
      
      db.run(deleteSql, deleteValues, (err) => {
        if (err) {
          next(err);
        } else {
          res.sendStatus(204);
        }
      });
    }
  });
});
