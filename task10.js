/*
10. Sort by criteria
Given:

const employees = [
  { name: "Jonas", department: "IT", salary: 2000 },
  { name: "Ona", department: "HR", salary: 1800 },
  { name: "Petras", department: "IT", salary: 2200 },
  { name: "Greta", department: "HR", salary: 2100 }
];

Write functions to Sort:

Employees by department alphabetically.
Employees by salary descending.
Return the sorted arrays.
*/

const employees = [
  { name: "Jonas", department: "IT", salary: 2000 },
  { name: "Ona", department: "HR", salary: 1800 },
  { name: "Petras", department: "IT", salary: 2200 },
  { name: "Greta", department: "HR", salary: 2100 },
];

const sortByDepartmentAsc = (arrData) => {
  return arrData.sort((a, b) => {
    bDepartment = b.department.toLowerCase();
    aDepartment = a.department.toLowerCase();
    if (bDepartment > aDepartment) return -1;
    if (bDepartment < aDepartment) return 1;
    return 0;
  });
};

const sortBySalaryDesc = (arrData) => {
  return arrData.sort((a, b) => b.salary - a.salary);
};
console.table(sortByDepartmentAsc(employees));
console.table(sortBySalaryDesc(employees));
