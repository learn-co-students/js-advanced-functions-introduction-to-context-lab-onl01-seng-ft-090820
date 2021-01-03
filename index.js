// Your code here

function createEmployeeRecord(employeeInfo) {
    let employeeRecord = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord;
}

const createEmployeeRecords = function(array) {
    let employees = array.map(createEmployeeRecord)
    return employees
}

function createTimeInEvent(obj, timeStamp) {
    let timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(timeStamp.split(' ')[1]),
        date: timeStamp.split(' ')[0]
        }
    obj.timeInEvents.push(timeInEvent)
    return obj
}

const createTimeOutEvent = function(obj, string) {
    let newObj = {
        type: 'TimeOut',
        hour: parseInt(string.split(' ')[1]),
        date: string.split(' ')[0],
    }
    obj.timeOutEvents.push(newObj)
    return obj
}

const hoursWorkedOnDate = function(obj, string) {
    let timeIn = obj.timeInEvents.find(element => element.date === string).hour
    let timeOut = obj.timeOutEvents.find(element => element.date === string).hour
    return (timeOut - timeIn)/100
}

const wagesEarnedOnDate = function(obj, string) {
    return obj.payPerHour * hoursWorkedOnDate(obj, string)
}

const allWagesFor = function(obj){
    const dates = obj.timeInEvents.map(element => element.date)
    let payment = 0
    dates.forEach(element =>{
        payment += wagesEarnedOnDate(obj, element)
    });
    return payment
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