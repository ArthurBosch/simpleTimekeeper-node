import db from "../db/db.js";

class shiftController {
  async getAllShiftsForUser(req, res) {
    const limit = req.query?.limit;
    const offset = req.query?.offset;
    try {
      const { userId } = req.body;
      console.log(limit);
      let query = "";

      if (limit && offset) {
        query = await db.query(
          `SELECT * FROM shift WHERE userId = ${userId} ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`
        );
      } else {
        query = await db.query(`SELECT * FROM shift WHERE userId = ${userId}`);
      }

      res.json(query.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async getShiftsForWorkplace(req, res) {
    const workplaceId = req.params.id;
    try {
      const query = await db.query(
        `SELECT * FROM shift WHERE workplaceid = ${workplaceId}`
      );
      res.json(query.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async addShift(req, res) {
    try {
      let { userId, workplaceId, wage, timeStart, timeEnd } = req.body;
      if (!wage) {
        const workplaceIdQuery = await db.query(
          `SELECT basewage FROM workplace WHERE id = $1`,
          [workplaceId]
        );

        wage = workplaceIdQuery.rows[0].basewage;
      }
      const query = await db.query(
        `INSERT INTO shift (userId, workplaceId, wage, timeStart, timeEnd) values ($1, $2, $3, $4, $5) RETURNING *`,
        [userId, workplaceId, wage, timeStart, timeEnd]
      );

      res.json(query.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Error while trying to add shift",
      });
    }
  }

  async updateShift(req, res) {
    try {
      const shiftId = req.params.id;
      let { timeStart, timeEnd, wage, workplaceId } = req.body;

      if (!wage) {
        const workplaceIdQuery = await db.query(
          `SELECT basewage FROM workplace WHERE id = $1`,
          [workplaceId]
        );

        wage = workplaceIdQuery.rows[0].basewage;
      }

      const query = await db.query(
        `UPDATE 
        shift 
      SET 
        timeStart = '${timeStart}',
        timeEnd = '${timeEnd}', 
        wage = '${wage}', 
        workplaceId = '${workplaceId}'
      WHERE 
        id = ${shiftId} 
      RETURNING *`
      );

      res.json(query.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async deleteShift(req, res) {
    try {
      const shiftId = req.params.id;
      await db.query(`DELETE FROM shift where id = ${shiftId}`);
      res.json({
        message: "shift has been deleted!",
      });
    } catch (err) {
      console.log(err);
      json.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

export default new shiftController();
