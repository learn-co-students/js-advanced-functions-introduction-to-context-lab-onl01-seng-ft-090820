const { template } = require("babel-core")

function createEmployeeRecord(array) {
    let employeeRecord = {}  
    employeeRecord.firstName = array[0]
    employeeRecord.familyName = array[1] 
    employeeRecord.title = array[2] 
    employeeRecord.payPerHour = array[3] 
    employeeRecord.timeInEvents = []
    employeeRecord.timeOutEvents = []
    return employeeRecord 
}

function createEmployeeRecords(workerArray) {
    return workerArray.map(record => createEmployeeRecord(record))

}

function createTimeInEvent(recordObject, timeStamp) {
    let timeIn = {}
    timeIn.type = "TimeIn"
    timeIn.hour = parseInt(timeStamp.substring(11, 13) * 100)
    timeIn.date = timeStamp.substring(0, 10)
    recordObject.timeInEvents.push(timeIn)
    return recordObject
}

function createTimeOutEvent(record, timeStamp) {
    let timeOut = {}
    timeOut.type = "TimeOut"
    timeOut.hour = parseInt(timeStamp.substring(11, 13) * 100)
    timeOut.date = timeStamp.substring(0, 10)
    record.timeOutEvents.push(timeOut)
    return record
}

function hoursWorkedOnDate(record, date) {
    let timeInMatch = record.timeInEvents.find(r =>  r.date === date)
    let timeOutMatch = record.timeOutEvents.find(r => r.date === date)
  let hoursWorked = ((timeOutMatch.hour) - (timeInMatch.hour)) / 100
  return hoursWorked
}

function wagesEarnedOnDate(record, date) { 
    return (hoursWorkedOnDate(record, date) * record.payPerHour)
}

function allWagesFor(record) {
    let dates = record.timeInEvents.map(timeInEvent => timeInEvent.date)
    let wagesArray = dates.map(date => wagesEarnedOnDate(record, date))
    return wagesArray.reduce( (total, wage) => total + wage)
}


function findEmployeeByFirstName(srcArray, firstName) { 
    return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(employeeArray) {
    let wageArray = employeeArray.map(record => allWagesFor(record))
    return wageArray.reduce( (total, wage) => total + wage )
}