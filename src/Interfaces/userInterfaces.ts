export interface userSignup {
    firstname:string,
    lastname:string,
    email:string,
    mobile:string,
    password:string,
    confirm_password:string,
    image:string
}
export interface userProfile {
    _id?:string | undefined
    firstname:string,
    lastname:string,
    email:string,
    mobile:string,
    password:string,
    image:string,
    isBlock:boolean
}
export interface userProfileUpdate {
    firstname:string,
    lastname:string,
    email:string,
    mobile:string,
    image:string
}