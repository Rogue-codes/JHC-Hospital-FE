export default function calcAge(dob:Date){
    return new Date().getFullYear() - new Date(dob).getFullYear();
}

export const capitalizeWord = (str: string) => {
  if (!str) return "";
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
};

export const showInitials = (first_name:string, last_name:string) => {
  return `${first_name?.charAt(0).toUpperCase()}${last_name?.charAt(0).toUpperCase()}`;
}