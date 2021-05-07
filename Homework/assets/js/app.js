let users = [];
let table = document.getElementById("user-list");

$.ajax({
  url: "assets/data/db.json",
  dataType: "json",
  async: false,
  success: function (response) {
    users = response;
  },
});

console.log(users);

TotalMonthlyPay = (loans) => {
  return loans.reduce((total, loan) => {
    if (!loan.closed) {
      total += loan.perMonth.value;
    }
    return total
  }, 0);
};

IsActiveLoan = (loans) =>{
    let status = false
    loans.forEach(loan => {
        if(!loan.closed){
           status =true
           return
        }
    });
    return status
}


users.forEach((user, index) => {
  table.innerHTML += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td><img src="${user.img}" class="w-50" alt=""></td>
                    <td>${user.name + " " + user.surname}</td>
                    <td>${user.salary.value + " " + user.salary.currency}</td>
                    <td>${TotalMonthlyPay(user.loans)}</td>
                    <td><span class="badge bg-success">Active</span></td>
                    <td>${!IsActiveLoan(user.loans)? '<span class="badge bg-danger">Deactive</span>' : '<span class="badge bg-success">Active</span>' }
                    </td>
                    
                    <td><button class="btn btn-success w-100">More detail</button></td>
                </tr>`;
});
