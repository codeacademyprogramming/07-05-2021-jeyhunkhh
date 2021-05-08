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

TotalMonthlyPay = (loans) => {
  return loans.reduce((total, loan) => {
    if (!loan.closed) {
      total += loan.perMonth.value;
    }
    return total;
  }, 0);
};

IsActiveLoan = (loans) => {
  let status = false;
  loans.forEach((loan) => {
    if (!loan.closed) {
      status = true;
      return;
    }
  });
  return status;
};

CreditPermit = (loans, salary) => {
  let total = TotalMonthlyPay(loans);
  salary = salary * 0.45;
  if (total == 0) {
    return true;
  } else if (total > salary) {
    return false;
  } else {
    return true;
  }
};

userList = (data) => {
  data.forEach((user, index) => {
    let tr = document.createElement("tr");
    tr.className = "user";
    tr.innerHTML = `<th scope="row">${index + 1}</th>
                      <td><img src="${user.img}" class="w-50" alt=""></td>
                      <td class = "fullname">${
                        user.name + " " + user.surname
                      }</td>
                      <td>${user.salary.value + " " + user.salary.currency}</td>
                      <td>${TotalMonthlyPay(user.loans)}</td>
                      <td>${
                        CreditPermit(user.loans, user.salary.value)
                          ? '<span class="badge bg-success">Active</span></td>'
                          : '<span class="badge bg-danger">Deactive</span></td>'
                      }
                      
                      <td>${
                        !IsActiveLoan(user.loans)
                          ? '<span class="badge bg-danger">Deactive</span>'
                          : '<span class="badge bg-success">Active</span>'
                      }
                      </td>`;

    let moreBtn = document.createElement("button");
    moreBtn.className = "btn btn-primary w-100";
    moreBtn.innerHTML = "More detail";
    moreBtn.setAttribute("data-id", index);
    moreBtn.setAttribute("data-bs-toggle", "modal");
    moreBtn.setAttribute("data-bs-target", "#userModal");

    moreBtn.addEventListener("click", () => {
      userLoanList(index);
    });

    let td = document.createElement("td");
    td.append(moreBtn);
    tr.append(td);
    table.append(tr);
  });
};

userList(users);

function userLoanList(userIndex) {
  let loansTable = document.getElementById("loan-list");
  loansTable.innerHTML = " ";
  users[userIndex].loans.forEach((loan, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<tr>
                            <th scope="row">${index + 1}</th>
                            <td>${loan.loaner}</td>
                            <td>${
                              loan.amount.value + " " + loan.amount.currency
                            }</td>
                            <td>${
                              loan.closed
                                ? '<span class="badge bg-danger">Deactive</span>'
                                : '<span class="badge bg-success">Active</span>'
                            }</td>
                            <td>${
                              loan.closed
                                ? "0"
                                : loan.perMonth.value +
                                  " " +
                                  loan.perMonth.currency
                            } </td>
                            <td>${
                              loan.dueAmount.value +
                              " " +
                              loan.dueAmount.currency
                            }</td>
                            <td>${loan.loanPeriod.start}</td>
                            <td>${loan.loanPeriod.end}</td>
                        </tr>`;
    loansTable.append(tr);
  });
}

let searchInput = document.querySelector(".search-input");
let userRow = document.querySelectorAll(".user");

searchInput.addEventListener("keyup", ()=>{
  let value = searchInput.value.toLowerCase()
  for (i = 0; i < userRow.length; i++) {
   let td = userRow[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.innerText;
      if (txtValue.toLowerCase().indexOf(value) > -1) {
        userRow[i].style.display = "";
      } else {
        userRow[i].style.display = "none";
      }
    }
  }
})
