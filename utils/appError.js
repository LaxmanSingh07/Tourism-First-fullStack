/* eslint-disable prettier/prettier */
class AppError extends Error // ERROR IS THE PARENT CLASS OF THE ALL THE
{
    constructor(message,statusCode)
    {
        super(message); //
        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith('4')?'fail':'error';
        this.isOperational=true; // this is used to check if the error is operational or not
        Error.captureStackTrace(this,this.constructor);
        //stackTrace is the place where the error occured
    }
}

module.exports=AppError;