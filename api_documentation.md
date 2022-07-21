npx nodemon index (untuk menjalankan server)
mpn run dev (untuk menjalankan sisi client)
--
app.post("/register", Controller.Register);

```
{
- username : "your username"
- email: "your email"
- password: "your password"
- phoneNumber: "yout phone number"
- address: "your address"

}
--- success ---
response(201).json({message: `User dengan id ${newUser.id} successfully created`});
example: message: `User dengan id 1 successfully created


--- fail ---
response(409).json({message: "Fail to reigister"})
```

---

app.post("/login", Controller.Login);

```
{
- email: "your email"
- password: "your password"
}

--- success ---
response(200).json({
    access_token: "asdjsabdjsars.sdkjhsusbdsd.dsdsk",
    username: "Your username"
})


--- fail ---
response(404).json({message: "error invalid username or password"})


--- fail2 ---
response(500).json({message: "ISE"})
```

---

---

app.get("/listProducts", Controller.getAll);

```
response(200).json(listproduct)
example: [
    {
        "id": 1,
        "name": "Nike Air Zoom Pegasus 39 By You",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio.",
        "price": "US$ 143,63",
        "imgUrl": "https://i.imgur.com/FY2NKNE.jpg",
        "CategoryId": 1,
        "createdAt": "2022-07-20T23:09:07.613Z",
        "updatedAt": "2022-07-20T23:09:07.613Z"
    },
    {
        "id": 2,
        "name": "ADIDAS ADIZERO BOSTON 10 Men's Running Shoes - Indigo",
        "description": "For race day and every day. These adidas running shoes are built to withstand a full training cycle, from the first warm-up to the last kick across the finish.",
        "price": "US$ 153,55",
        "imgUrl": "https://i.imgur.com/ioL0h1s.jpg",
        "CategoryId": 1,
        "createdAt": "2022-07-20T23:09:07.613Z",
        "updatedAt": "2022-07-20T23:09:07.613Z"
    },
    {
        "id": 3,
        "name": "Nike Mercurial Vapor 14 Academy IC Indoor/Court Unisex Soccer Shoe - Blue",
        "description": "The Nike Mercurial Vapor 14 Academy IC is a grippy design with multi-directional traction that helps prepare you for supercharged speeds.",
        "price": "US $80,05",
        "imgUrl": "The Nike Mercurial Vapor 14 Academy IC is a grippy design with multi-directional traction that helps prepare you for supercharged speeds.",
        "CategoryId": 2,
        "createdAt": "2022-07-20T23:09:07.613Z",
        "updatedAt": "2022-07-20T23:09:07.613Z"
    }
]

--- fail ---
response(500).json({message: "ISE"})
```

[
app.get("/listProducts/:id", Controller.selectDetailProduct);

```
{
- id: "dari req.params.id"
}
--- success ---
response(200).json(datadetail)
example:
    {
        "id": 1,
        "name": "Nike Air Zoom Pegasus 39 By You",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio.",
        "price": "US$ 143,63",
        "imgUrl": "https://i.imgur.com/FY2NKNE.jpg",
        "CategoryId": 1,
        "createdAt": "2022-07-20T23:09:07.613Z",
        "updatedAt": "2022-07-20T23:09:07.613Z"
    }


--- fail ---
response(404).json({message: "Not found product"})


--- fail2 ---
response(500).json({message: "ISE"})
```

app.post("/getOtp", Controller.getOtp);

```
{
    email: "your email"
}
```

```
--- success ---
response(201).json({Email send successfully})


--- fail ---
response(404).json({message error})

```
