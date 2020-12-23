// Your code here
let createEmployeeRecord = (data) => data = {
    firstName: data[0],
    familyName: data[1],
    title: data[2],
    payPerHour: data[3],
    timeInEvents: [],
    timeOutEvents: []
}




let createEmployeeRecords = (arr) => arr = arr.map(createEmployeeRecord)

const createTimeInEvent = function(obj, stamp){
    const timeIn = {type: "TimeIn", 
    hour: parseInt(stamp.split(" ")[1]),
    date: stamp.split(" ")[0]}
    obj.timeInEvents.push(timeIn)
    return obj
}

const createTimeOutEvent = function(obj, stamp){
    const timeOut = {type: "TimeOut", 
    hour: parseInt(stamp.split(" ")[1]),
    date: stamp.split(" ")[0]}
    obj.timeOutEvents.push(timeOut)
    return obj
}

let hoursWorkedOnDate = (obj,stamp) => {
    const timeIn = obj.timeInEvents.find(element => element.date === stamp).hour
    const timeOut = obj.timeOutEvents.find(element => element.date === stamp).hour
  return (timeOut -timeIn )/100
}
const wagesEarnedOnDate = function(obj, stamp){
    return hoursWorkedOnDate(obj, stamp) * obj.payPerHour
}

const allWagesFor = function(obj){
    const dates = obj.timeInEvents.map(element => element.date)
    let payment = 0

    dates.forEach(element => {
        payment += wagesEarnedOnDate(obj, element)
    });
    return payment
}

const findEmployeeByFirstName = function(srcArray, firstName){
    const found = srcArray.find(employee => {employee.firstName === firstName})
    return srcArray.find(employee => employee.firstName === firstName)
}

const calculatePayroll = function(arr){
    let payroll = 0
    arr.forEach(employee => {
        payroll += allWagesFor(employee)
    })
    return payroll
}