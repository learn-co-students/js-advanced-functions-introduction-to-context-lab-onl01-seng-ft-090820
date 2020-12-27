const createEmployeeRecord = function(data) { 
    return {
    firstName: data[0],
    familyName: data[1],
    title: data[2],
    payPerHour: data[3],
    timeInEvents: [],
    timeOutEvents: []
    }
     

}

const createEmployeeRecords = function(employeeArray) {
    let records = employeeArray.map(createEmployeeRecord)
    return records
}

const createTimeInEvent = function(employee, dateStamp) {
    let timeIn = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    }
    employee.timeInEvents.push(timeIn)
    return employee
}

const createTimeOutEvent = function(employee, dateStamp) {
    let timeOut = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    }
    employee.timeOutEvents.push(timeOut)
    return employee
}

const hoursWorkedOnDate = function(emp, date){
    let timeIn = emp.timeInEvents.find(e => e.date === date).hour
    let timeOut = emp.timeOutEvents.find(e => e.date === date).hour
    let hoursWorked = (timeOut - timeIn)/100
    return hoursWorked
}

const wagesEarnedOnDate = function(emp, date) {
    let wages = hoursWorkedOnDate(emp,date) * emp.payPerHour
    return wages
}

const allWagesFor = function(emp) {
    let datesWorked = emp.timeInEvents.map(e => e.date)
    let pay = 0

    datesWorked.forEach(day => {
        pay += wagesEarnedOnDate(emp, day)
    })
    return pay
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(emp => emp.firstName === firstName)
}

const calculatePayroll = function(array) {
    let payroll = 0
    array.forEach(emp => {
        payroll += allWagesFor(emp)
    })
    return payroll
}