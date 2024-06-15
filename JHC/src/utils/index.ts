export default function calcAge(dob:Date){
    console.log(dob)
    return new Date().getFullYear() - new Date(dob).getFullYear();
}