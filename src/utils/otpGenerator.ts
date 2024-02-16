const generateOtp = (): string => {
    const otp = String(Math.floor(1000 + Math.random() * 9000));
    return otp;
};

export default generateOtp
