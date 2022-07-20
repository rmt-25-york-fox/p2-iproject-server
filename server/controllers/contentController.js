const {
  Vga,
  Psu,
  Ram,
  Processor,
  Ssd,
  MyOrder,
  Showcase,
} = require("../models/index");
const midtransClient = require("midtrans-client");
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

  static async getShowcase(req, res, next) {
    try {
      const showcase = await Showcase.findAll({});

      res.status(200).json({
        showcase,
      });
    } catch (error) {
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

  static async postPayment(req, res, next) {
    try {
      const { price } = req.body;

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: Math.floor(Math.random() * 10000000000000),
          gross_amount: price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.findUser.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;

      res.status(201).json({
        statusCode: 201,
        token: transactionToken,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ContentController;
