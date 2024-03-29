
export interface SignupInterface {
    firstname:string,
    lastname:string,
    email:string,
    mobile:string,
    password:string,
    confirm_password:string,
    image:string
}
export interface ProfileInterface {
    _id?:string | undefined,
    firstname:string,
    lastname:string,
    email:string,
    mobile:string,
    password:string,
    image:string,
    aadhar_image:string,
    experience_image:string,
    date:string,
    isBlock:boolean,
    verification?:string
}