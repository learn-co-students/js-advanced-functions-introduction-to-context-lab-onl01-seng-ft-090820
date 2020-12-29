// Your code here

function createEmployeeRecord(array) {
    let newEmployee = { }
    newEmployee.firstName = array[0] 
    newEmployee.familyName = array[1]
    newEmployee.title = array[2]
    newEmployee.payPerHour = array[3]
    newEmployee.timeInEvents = []
    newEmployee.timeOutEvents = []
    return newEmployee
}

function createEmployeeRecords(arrayOfArrays) {
    let records = arrayOfArrays.map(createEmployeeRecord)
    return records
}

function createTimeInEvent(empRecord, datestamp) {
    let timeInEvent = {}
    timeInEvent.type = "TimeIn"
    timeInEvent.hour = parseInt(datestamp.split(" ")[1])
    timeInEvent.date = datestamp.split(" ")[0]
    empRecord.timeInEvents.push(timeInEvent)
    return empRecord
}

function createTimeOutEvent(empRecord, datestamp) {
    let timeOutEvent = {}
    timeOutEvent.type = "TimeOut"
    timeOutEvent.hour = parseInt(datestamp.split(" ")[1])
    timeOutEvent.date = datestamp.split(" ")[0]
    empRecord.timeOutEvents.push(timeOutEvent)
    return empRecord
}

function hoursWorkedOnDate(empRecord, datestamp) {
    let start = empRecord.timeInEvents.find(event => event.date === datestamp)
    let end = empRecord.timeOutEvents.find(event => event.date === datestamp)
    let hoursWorked = (end.hour - start.hour) / 100
    return hoursWorked
}

function wagesEarnedOnDate(empRecord, datestamp) {
    let hours = hoursWorkedOnDate(empRecord, datestamp)
    let earnings = hours * empRecord.payPerHour
    return earnings
}

function allWagesFor(empRecord) {
    let dates = empRecord.timeInEvents.map(event => event.date)
    let dailyPays = dates.map(date => wagesEarnedOnDate(empRecord, date))
    let allWages = dailyPays.reduce(function(total, wages){
        return wages + total
    })
    return allWages
}

function calculatePayroll(records) {
    let pays = records.map(emp => allWagesFor(emp))
    let allPay = pays.reduce(function(total, pays){
        return pays + total
    })
    return allPay
}

function findEmployeeByFirstName(srcArray, firstName) {
    let employee = srcArray.find(emp => emp.firstName === firstName)
    return employee
}

