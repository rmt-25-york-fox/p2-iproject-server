const router = require("express").Router();
const UserController = require("../controllers/userController");
const { User, Post, Transaction } = require("../models");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage, ref, getDownloadURL } = require("firebase-admin/storage");
const { Storage: firebaseStorage } = require("@google-cloud/storage");
const authentication = require("../middlewares/authentication");
const midtransClient = require("midtrans-client");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, address, phoneNumber } = req.body;
    if (!name | !email | !password | !address | !phoneNumber) {
      throw { name: "invalidInput" };
    }

    await User.create({
      name,
      email,
      password: bcrypt.hashSync(password),
      address,
      phoneNumber,
    });
    res.status(201).json({
      message: `Your account has been created`,
    });
  } catch (err) {
    console.log(err);
    if (err.name === "invalidInput") {
      res.status(400).json({
        message: `Please check your input`,
      });
    } else if (err.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        message: `Email already taken`,
      });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password) {
      throw { name: "invalidPass" };
    }
    const foundUser = await User.findOne({
      where: {
        email,
      },
    });
    if (!foundUser) {
      throw { name: "invalidPass" };
    }
    const passwordValidation = bcrypt.compareSync(password, foundUser.password);
    if (!passwordValidation) {
      throw { name: "invalidPass" };
    }
    const token = jwt.sign(foundUser.id, "SECRET");
    res.status(200).json({
      access_token: token,
      email: foundUser.email,
    });
  } catch (err) {
    if (err.name === "invalidPass") {
      res.status(401).json({
        message: "Invalid email / password",
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
});

router.get("/post", async (req, res) => {
  try {
    const result = await Post.findAll();

    // console.log(result);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    console.log("masuk");
    console.log(req.params.id);

    const id = req.params.id;

    const result = await Post.findByPk(id, {
      include: {
        model: User,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
});

router.use(authentication);

const serviceAccount = require("../sewa-parkir-firebase-adminsdk-xbir2-ebfdcfc6e1.json");
const Midtrans = require("midtrans-client");
const { app } = require("firebase-admin");

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "sewa-parkir.appspot.com",
});

const bucket = getStorage().bucket();

const cloudStorage = new firebaseStorage({
  keyFilename: "./sewa-parkir-firebase-adminsdk-xbir2-ebfdcfc6e1.json",
});

let bucketName = "sewa-parkir.appspot.com";

let filename;

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    filename = file.originalname + "." + file.mimetype.split("/").pop();
    cb(null, file.originalname + "." + file.mimetype.split("/").pop());
  },
});

const upload = multer({ storage: multerStorage });

router.post("/post", upload.single("image"), async (req, res) => {
  try {
    console.log(filename);
    console.log(req.user);
    const imgUpload = await CloudUpload();
    const publications = await makePublic();
    const idUrl = `https://firebasestorage.googleapis.com/v0/b/sewa-parkir.appspot.com/o/${filename}?alt=media`;

    const UserId = req.user.id;
    const address = req.body.address;
    const latitude = req.body.lat;
    const longitude = req.body.lng;
    const price = req.body.price;
    console.log(address, "address nih");

    // if (!UserId || !address || !latitude || !longitude || !price) {
    //   throw { name: "invalidInput" };
    // }

    // if (!UserId) {
    //   throw { name: "invalid User ID" };
    // }
    if (!address) {
      throw { name: "invalid address" };
    }
    if (!latitude) {
      throw { name: "invalid lat" };
    }
    if (!longitude) {
      throw { name: "invalid long" };
    }
    if (!price) {
      throw { name: "invalid price" };
    }
    console.log(address);
    console.log(latitude);
    console.log(longitude);
    console.log(price);
    const created = await Post.create({
      name: `Post ${address}`,
      address,
      UserId,
      latitude,
      longitude,
      status: "active",
      price,
      idUrl,
    });

    res.status(201).json({
      message: `post with id ${created.id} added`,
    });
  } catch (err) {
    console.log(err.name);
    console.log(err);

    // if (err.name === "invalidInput") {
    //   res.status(400).json({
    //     message: "Invalid Input",
    //   });
    // } else {
    //   res.status(500).json({
    //     message: "ISE",
    //   });
    // }
  }
});

async function CloudUpload() {
  try {
    const result = await bucket.upload(`./uploads/${filename}`);
    // console.log(result);
  } catch (err) {
    // console.log(err, "dari cloud");
    console.log(err);
  }
}

async function makePublic() {
  try {
    const result = await bucket.upload(`./uploads/${filename}`);
    // console.log(result);
  } catch (err) {
    console.log(err, "dari cloud");
  }
}

router.post("/payment/:id", async (req, res) => {
  try {
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-OxX91G0j3MWRl1Is0pwnndQ7",
      clientKey: "SB-Mid-client-dT-kffbYSy-Ev43x",
    });

    const duration = +req.body.duration;
    const UserId = req.user.id;
    const email = req.user.email;
    const id = req.params.id;
    const post = await Post.findByPk(id);

    console.log(post);
    console.log(email);

    console.log(post.price);
    console.log(duration);

    const totalPrice = post.price * duration;

    console.log(totalPrice);

    let obj = {
      transaction_details: {
        order_id: `${email}.${post.id}.${totalPrice.toString()}`,
        gross_amount: 200000,
      },
      credit_card: {
        secure: true,
      },
    };

    // const res = snap.createTransaction()

    const result = await snap.createTransaction(obj);

    const token = result.token;
    const url = result.redirect_url;

    await Transaction.create({
      description: `${email}.${post.id}.${totalPrice.toString()}`,
      PostId: id,
      UserId,
      status: "pending",
    });

    res.status(201).json({
      message: "Success create payment bill",
      token,
      url,
    });
  } catch (err) {
    console.log(err.message);
  }
});



router.get('/transactions', async (req,res) => {
  try {
    const UserId = req.user.id
    const result = await Transaction.findAll({
      where: {
        UserId
      },
      include: [
        {
          model:Post
        }
      ]
    })

    res.status(200).json(result)
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;
