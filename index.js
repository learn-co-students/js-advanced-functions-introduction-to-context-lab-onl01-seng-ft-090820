// Your code here

function createEmployeeRecord (employeeArray) {
    const employee = {
        firstName: employeeArray[0],
        familyName: employeeArray[1], 
        title: employeeArray[2], 
        payPerHour: employeeArray[3], 
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map( array => {
        return createEmployeeRecord(array)
    })

}

function createTimeInEvent(employeeRecord, dateStamp) {
    let date = dateStamp.split(' ')[0]
    let hour = parseInt(dateStamp.split(' ')[1])
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: hour,
        date: date
    })
    return employeeRecord

}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let date = dateStamp.split(' ')[0]
    let hour = parseInt(dateStamp.split(' ')[1])
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: hour,
        date: date
    })
    return employeeRecord

}

function hoursWorkedOnDate(employeeRecord, dateWorked) {
    let dateIn = employeeRecord.timeInEvents.filter(obj => {
        return obj.date === dateWorked
    })
    let dateOut = employeeRecord.timeOutEvents.filter(obj => {
        return obj.date === dateWorked
    })
    let timeIn = dateIn[0].hour
    let timeOut = dateOut[0].hour
    let hoursWorked = Math.floor((timeOut - timeIn)/100)
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, dateWorked) {
    return hoursWorkedOnDate(employeeRecord, dateWorked) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
    const allWages = employeeRecord.timeInEvents.map( date => {
        return wagesEarnedOnDate(employeeRecord, date.date)
    })

    return allWages.reduce( (total, wage) => {
        return total = wage + total
    }, 0)
}

function findEmployeeByFirstName(employeesArray, firstName){
    return employeesArray.find( employee => {
        return employee.firstName.toLowerCase() === firstName.toLowerCase()
    })
}

function calculatePayroll(employeesArray){
    let allWages = employeesArray.map( employee => {
        return allWagesFor(employee)
    })

    let payroll = allWages.reduce( (total, wage) => {
        return total = wage + total
    })

    return payroll
}