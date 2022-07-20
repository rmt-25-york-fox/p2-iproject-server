const { Vga, Psu, Ram, Processor, Ssd, MyOrder } = require("../models/index");
const axios = require("axios");

class ContentController {
  static async getProduct(req, res, next) {
    try {
      const VGA = await Vga.findAll({});
      const PSU = await Psu.findAll({});
      const RAM = await Ram.findAll({});
      const Processors = await Processor.findAll({});
      const SSD = await Ssd.findAll({});

      res.status(200).json({
        VGA,
        PSU,
        RAM,
        Processors,
        SSD,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async postMyOrder(req, res, next) {
    try {
      const id = req.findUser.id;
      const { VgaId, ProcessorId, RamId, PsuId, SsdId } = req.body;
      const createOrder = await MyOrder.create({
        UserId: id,
        VgaId: VgaId || 0,
        PsuId: PsuId || 0,
        ProcessorId: ProcessorId || 0,
        SsdId: SsdId || 0,
        RamId: RamId || 0,
      });

      console.log(VgaId);

      res.status(201).json({
        createOrder,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getMyOrder(req, res, next) {
    try {
      const UserId = req.findUser.id;
      const myorder = await MyOrder.findAll({
        where: {
          UserId,
        },
        include: ["User", "Vga", "Processor", "Psu", "Ram", "Ssd"],
        order: [["id", "ASC"]],
      });

      res.status(200).json(myorder);
    } catch (error) {
      console.log(error);
    }
  }

  static async getMyOrderById(req, res, next) {
    try {
      const { id } = req.params;
      const myorder = await MyOrder.findAll({
        where: {
          id,
        },
        include: ["User", "Vga", "Processor", "Psu", "Ram", "Ssd"],
      });

      res.status(200).json(myorder);
    } catch (error) {
      console.log(error);
    }
  }

  static async patchMyOrder(req, res, next) {
    try {
      const id = req.params.id;
      const { VgaId, PsuId, ProcessorId, SsdId, RamId } = req.body;

      const myorder = await MyOrder.findOne({
        where: {
          id: id,
        },
      });

      await MyOrder.update(
        {
          VgaId: VgaId || 0,
          PsuId: PsuId || 0,
          ProcessorId: ProcessorId || 0,
          SsdId: SsdId || 0,
          RamId: RamId || 0,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({
        message: "Terupdate",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getProvince(req, res, next) {
    try {
      const listProvince = await axios.get(
        "https://api.rajaongkir.com/starter/province",
        {
          headers: {
            key: process.env.API_RAJAONGKIR,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        data: listProvince.data.rajaongkir.results,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCity(req, res, next) {
    try {
      const listCity = await axios.get(
        "https://api.rajaongkir.com/starter/city",
        {
          headers: {
            key: process.env.API_RAJAONGKIR,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        data: listCity.data.rajaongkir.results,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCost(req, res, next) {
    try {
      const { origin, destination, weight, courier } = req.body;
      const listCost = await axios.post(
        "https://api.rajaongkir.com/starter/cost",
        {
          origin,
          destination,
          weight,
          courier,
        },
        {
          headers: {
            key: process.env.API_RAJAONGKIR,
          },
        }
      );

      res.status(201).json({
        statusCode: 201,
        data: listCost.data,
        data: {
          origin: listCost.data.rajaongkir.origin_details,
          destination: listCost.data.rajaongkir.destination_details,
          shipping: listCost.data.rajaongkir.results[0].costs,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ContentController;
