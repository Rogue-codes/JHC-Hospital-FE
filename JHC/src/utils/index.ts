export default function calcAge(dob:Date){
    return new Date().getFullYear() - new Date(dob).getFullYear();
}