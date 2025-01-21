let connection = require("../config/dbConnection");
let query = require("../config/query");

const signupUser = (data) => {
    return new Promise((resolve, reject) => {
        let {
            username,
            email,
            password,
            first_name,
            last_name,
            phone_number,
            country,
            place,
            address,
            postal_code,
            date_of_birth,
            profile_picture,
            wallet_balance,
            is_active,
            role,
        } = data;

        connection.query(
            query.REGISTER_QUERY,
            [
                username,
                email,
                password,
                first_name,
                last_name,
                phone_number,
                country,
                place,
                address,
                postal_code,
                date_of_birth,
                profile_picture,
                wallet_balance,
                is_active,
                role,
            ],
            (err, results) => {
                try {
                    const response = {
                        success: true,
                        message: "New user is added successful!",
                        userID: results.insertId,
                    };
                    resolve(response);
                } catch (error) {
                    reject({
                        success: false,
                        message: "User is not added!",
                    });
                }
            }
        );
    });
};

const loginUser = (username, password) => {
    return new Promise((resolve, reject) => {
        connection.query(
            query.LOGIN_QUERY,
            [username, password],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(results);
                    if (results.length > 0) {
                        let passwordresult = results[0].password.toLowerCase();
                        if (passwordresult === password.toLowerCase()) {
                            const response = {
                                success: true,
                                message: "User login successful!",
                                user: results,
                            };
                            resolve(response);
                        } else {
                            reject({
                                success: false,
                                message: "Incorrect password.",
                            });
                        }
                    }
                    resolve(results);
                }
            }
        );
    });
};

const updateUserProfile = (data) => {
    return new Promise((resolve, reject) => {

    })

};

const deleteUserAccount = (data) => {
    return new Promise((resolve, reject) => {
        connection.query(query.deleteUserAccount, [data], (err, result) => {
            if (err) {
                reject(err);
            } else{
                console.log(result)
                if (result.affectedRows === 0) {
                    reject("User id is not exist.");
                } else {
                    resolve(result);
                }
            }
        })
    })
};
module.exports = {
    signupUser,
    loginUser,
    updateUserProfile,
    deleteUserAccount,
};
