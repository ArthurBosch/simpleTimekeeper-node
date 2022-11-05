import db from "../db/db.js";

class workplaceController {
  async createWorkplace(req, res) {
    try {
      const { userId, name, wage, wageType, currency } = req.body;

      const workplace = await db.query(
        `INSERT INTO workplace (userId, name, basewage, wageType, currency) values ($1, $2, $3, $4, $5) RETURNING *`,
        [userId, name, wage, wageType, currency]
      );

      res.json(workplace.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "error while trying to create workplace",
      });
    }
  }

  async deleteWorkplace(req, res) {
    try {
      const workplaceId = req.params.id;
      await db.query(`DELETE FROM shift WHERE workplaceid = ${workplaceId}`);
      await db.query(`DELETE FROM workplace WHERE id = ${workplaceId}`);
      res.json({
        success: true,
        message: "workplace has been deleted!",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "error while trying to delete workplace",
      });
    }
  }

  async getWorkplaces(req, res) {
    try {
      const userId = req.body.userId;
      const query = await db.query(
        `SELECT * FROM workplace WHERE userid = '${userId}'`
      );
      res.json(query.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "error while trying to get workplaces",
      });
    }
  }
}

export default new workplaceController();
