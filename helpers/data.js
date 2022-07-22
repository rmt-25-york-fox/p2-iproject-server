function calculator(data) {
  let temp = [];
  let month = [];
  let price = [];

  for (let i = 0; i < data.length; i++) {
    const el = data[i];
    // console.log(typeof el.createdAt, "<<<<<<<<<<el");
    const stringify = JSON.stringify(el.createdAt);
    // console.log(typeof stringify, "<<<<<<<<<<el sudah di typeoF");
    let arr = stringify.split("T");
    let date = arr[0];
    let arrayed = date.split("-");

    let monthNum = +arrayed[1];
    if (monthNum === 0) {
      month.push("Jan");
    } else if (monthNum === 1) {
      month.push("Feb");
    } else if (monthNum === 2) {
      month.push("Mar");
    } else if (monthNum === 3) {
      month.push("Apr");
    } else if (monthNum === 4) {
      month.push("May");
    } else if (monthNum === 5) {
      month.push("Jun");
    } else if (monthNum === 6) {
      month.push("Jul");
    } else if (monthNum === 7) {
      month.push("Aug");
    } else if (monthNum === 8) {
      month.push("Sep");
    } else if (monthNum === 9) {
      month.push("Oct");
    } else if (monthNum === 10) {
      month.push("Nov");
    } else if (monthNum === 11) {
      month.push("Des");
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

    if (month === "Jan") {
      obj.month = "Jan";
      obj.totalSales = sale;
      arrObj.push(obj);
    } else if (month === "Feb") {
      obj.month = "Feb";
      obj.totalSales = sale;
      arrObj.push(obj);
    } else if (month === "Mar") {
      obj.month = "Mar";
      obj.totalSales = sale;
      arrObj.push(obj);
    } else if (month === "Apr") {
      obj.month = "Apr";
      obj.totalSales = sale;
      arrObj.push(obj);
    } else if (month === "May") {
      obj.month = "May";
      obj.totalSales = sale;
      arrObj.push(obj);
    } else if (month === "Jun") {
      obj.month = "Jun";
      obj.totalSales = sale;
      arrObj.push(obj);
    } else if (month === "Jul") {
      obj.month = "Jul";
      obj.totalSales = sale;
      arrObj.push(obj);
    } else if (month === "Aug") {
      obj.month = "Aug";
      obj.totalSales = sale;
      arrObj.push(obj);
    } else if (month === "Sep") {
      obj.month = "Sep";
      obj.totalSales = sale;
      arrObj.push(obj);
    } else if (month === "Oct") {
      obj.month = "Oct";
      obj.totalSales = sale;
      arrObj.push(obj);
    } else if (month === "Nov") {
      obj.month = "Nov";
      obj.totalSales = sale;
      arrObj.push(obj);
    } else if (month === "Dec") {
      obj.month = "Dec";
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
