import fsPromises from "fs/promises"
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const currentDate = new Date()
const getDate = `${currentDate.getDate()}-${currentDate.getMonth()+1}-${currentDate.getFullYear()}`

const fileOps = async(formData)=>{
    try {
        const {Doorstep, pickupLocation, emergencyContactPhone, emergencyContactAddress,packageId,userName,userId,packageName} = formData
        const log = `${userName} with userId ${userId} booked ${packageName} package on ${getDate} with following details : \n Doorstep: ${Doorstep}\n Pickup Location: ${pickupLocation.length ? pickupLocation : "NA"}\n Emergency Contact Phone: ${emergencyContactPhone}\n Emergency Contact Address: ${emergencyContactAddress}\n Package Id: ${packageId}\n\n`
        await fsPromises.appendFile((path.join(__dirname,"bookingLogs.txt")),log)
    } catch (error) {
        console.error(error.message)
    }
}

export default fileOps