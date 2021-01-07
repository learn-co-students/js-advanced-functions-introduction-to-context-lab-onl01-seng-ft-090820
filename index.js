// Your code here
const createEmployeeRecord = function(array) {
    let obj = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    }
    return obj
}

const createEmployeeRecords = function(array) {
    let employees = array.map(createEmployeeRecord)
    return employees
}

const createTimeInEvent = function(obj, string) {
    let newObj = {
        type: "TimeIn",
        hour: parseInt(string.split(" ")[1]),
        date: string.split(" ")[0],
    }
    obj.timeInEvents.push(newObj)
    return obj
}

const createTimeOutEvent = function(obj, string) {
    let newObj = {
        type: "TimeOut",
        hour: parseInt(string.split(" ")[1]),
        date: string.split(" ")[0],
    }
    obj.timeOutEvents.push(newObj)
    return obj
}

const hoursWorkedOnDate = function(obj, string) {
    const timeIn = obj.timeInEvents.find(element => element.date === string).hour
    const timeOut = obj.timeOutEvents.find(element => element.date === string).hour
    return (timeOut - timeIn)/100
}

const wagesEarnedOnDate = function(obj, string) {
    return obj.payPerHour * hoursWorkedOnDate(obj, string)
}

const allWagesFor = function(obj) {
    const dates = obj.timeInEvents.map(element => element.date)
    let pay = 0
    dates.forEach(date => {
        pay += wagesEarnedOnDate(obj, date)
    });
    return pay
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
}

const calculatePayroll = function(array) {
    let payroll = 0
    array.forEach(employee => {
        payroll += allWagesFor(employee)
    })
    return payroll
}