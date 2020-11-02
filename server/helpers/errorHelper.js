// const { AccessDeniedError, BaseError, EmptyResultError, ExclusionConstraintError, ConnectionError, ConnectionRefusedError, ConnectionTimedOutError, DatabaseError, ForeignKeyConstraintError, HostNotFoundError, HostNotReachableError, InvalidConnectionError, OptimisticLockError, SequelizeScopeError, TimeoutError, UniqueConstraintErrorm, UniqueConstraintError, ValidationError, ValidationErrorItem } = require('sequelize');

// const sequelizeErrors = [ AccessDeniedError, BaseError, EmptyResultError, ExclusionConstraintError, ConnectionError, ConnectionRefusedError, ConnectionTimedOutError, DatabaseError, ForeignKeyConstraintError, HostNotFoundError, HostNotReachableError, InvalidConnectionError, OptimisticLockError, SequelizeScopeError, TimeoutError, UniqueConstraintErrorm, UniqueConstraintError, ValidationError, ValidationErrorItem ];

// function sequelizeErrorsCheck(err) {
//   for (let i = 0; i < sequelizeErrors.length; i++) {
//     const instance = sequelizeErrors[i];
//     if (err instanceof instance) {
//       return true;
//     }
//   }
//   return false;
// }

const { ValidationError } = require('sequelize');

module.exports = function (err) {
  if (!err.status) {
    if (err instanceof ValidationError) {
      return 400;
    }
    else {
      return 500;
    }
  }
  else {
    return err.status;
  }
}