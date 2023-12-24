export interface RootState {
  UserLogin: UserLogin;
  MentorSignup: MentorSign;
  MentorLogin: MentorLogin;
  UserSignup: UserSignup;
  UserUpdate: UserUpdate;
  MentorUpdate: MentorUpdate;
  APIURL: {
    url: string;
  };
}

interface UserSignup {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
  confirm_password: string;
  image: string;
}
interface UserUpdate {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  image: string;
}
interface MentorLogin {
  email: string;
  password: string;
}
interface MentorSign {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
  confirm_password: string;
  image: string;
}
interface MentorUpdate {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  image: string;
  experience_image: string;
  aadhar_image: string;
}

interface UserLogin {
  email: string;
  password: string;
}
// Exporting the Status type
export type Status = "Pending" | "Verified" | "Rejected";
