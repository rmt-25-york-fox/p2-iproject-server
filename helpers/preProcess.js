const convertPhoneNumberID = (phoneNumber) => {
    phoneNumber.split('');
    if(phoneNumber[0] === '0'){
        return '62' + phoneNumber.slice(1, phoneNumber.length);
    } else if(phoneNumber[0] === '6' && phoneNumber[1] === '2'){
      return '62' + phoneNumber.slice(2, phoneNumber.length);
    } else {
      return '62' + phoneNumber;
    }
}

module.exports = { convertPhoneNumberID };