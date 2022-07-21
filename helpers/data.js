function calculator(data) {
  let temp = [];
  let month = [];
  let price = [];

  for (let i = 0; i < data.length; i++) {
    const el = data[i];
    console.log(typeof el.createdAt, "<<<<<<<<<<el");
    const stringify = JSON.stringify(el.createdAt);
    console.log(typeof stringify, "<<<<<<<<<<el sudah di typeoF");
    let arr = stringify.split("T");
    let date = arr[0];
    let arrayed = date.split("-");

    let monthNum = +arrayed[1];

    if (monthNum === 6) {
      month.push("Jun");
    } else if (monthNum === 7) {
      month.push("Jul");
    } else if (monthNum === 9) {
      month.push("Sep");
    }

    price.push(el.TotalHarga);
  }

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

module.exports = { calculator };
