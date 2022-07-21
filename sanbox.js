const data = [
  {
    UserId: 1,
    PetrolId: 2,
    TotalHarga: 15000,
    createdAt: "2022-07-19T06:44:34.564Z",
    updatedAt: "2022-07-19T06:44:34.564Z",
  },
  {
    UserId: 1,
    PetrolId: 3,
    TotalHarga: 128000,
    createdAt: "2022-07-19T13:16:20.840Z",
    updatedAt: "2022-07-19T13:16:20.840Z",
  },
  {
    UserId: 1,
    PetrolId: 3,
    TotalHarga: 112000,
    createdAt: "2022-07-19T14:52:29.739Z",
    updatedAt: "2022-07-19T14:52:29.739Z",
  },
  {
    UserId: 1,
    PetrolId: 3,
    TotalHarga: 100000,
    createdAt: "2022-09-19T14:52:29.739Z",
    updatedAt: "2022-09-19T14:52:29.739Z",
  },
  {
    UserId: 1,
    PetrolId: 3,
    TotalHarga: 120000,
    createdAt: "2022-06-19T14:52:29.739Z",
    updatedAt: "2022-06-19T14:52:29.739Z",
  },
];

function calculator(data) {
  let tambah = 0;
  let totalTambah = [];
  let temp = [];
  let month = [];
  let price = [];

  for (let i = 0; i < data.length; i++) {
    const el = data[i];

    let arr = el.createdAt.split("T");
    let date = arr[0];
    let arrayed = date.split("-");

    let monthNum = +arrayed[1];

    if (monthNum === 6) {
      month.push("Jun");
      tambah += el.TotalHarga;
      totalTambah.push(tambah);
      tambah = 0;
    } else if (monthNum === 7) {
      month.push("Jul");
      tambah += el.TotalHarga;
      totalTambah.push(tambah);
      tambah = 0;
    } else if (monthNum === 9) {
      month.push("Sep");
      tambah += el.TotalHarga;
      totalTambah.push(tambah);
      tambah = 0;
    }

    price.push(el.TotalHarga);
  }

  const sumWithInitial = totalTambah.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  temp.push(month);
  temp.push(price);

  let arrObj = [];

  for (let j = 0; j < temp[0].length; j++) {
    let obj = {
      month: "",
      totalSales: 0,
    };
    let month = temp[0][j];
    let sale = temp[1][j];

    if (month === "Jul") {
      obj.month = "Jul";
      obj.totalSales = sale;
      arrObj.push(obj);
    } else if (month === "Sep") {
      obj.month = "Sep";
      obj.totalSales = sale;
      arrObj.push(obj);
    } else if (month === "Jun") {
      obj.month = "Jun";
      obj.totalSales = sale;
      arrObj.push(obj);
    }
  }

  const groupByCategory = arrObj.reduce((group, x) => {
    const { month } = x;
    group[month] = group[month] ?? [];
    group[month].push(x.totalSales);
    return group;
  }, {});

  return groupByCategory;
}

console.log(calculator(data));

// {
//   "Jul": [
//     15000,
//     128000,
//     112000,
//     100000,
//     120000,
//     1560000
//   ],
//   "Jun": [
//     90000
//   ]
// }
