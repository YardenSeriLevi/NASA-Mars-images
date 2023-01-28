
(function () {
    let password,confirmPassword;
    let status = true;
    const errorMassage = ["The passwords must be the same", "The password must have: min 1 special character, " +
    "min 1 number and min 8 characters "]
    const NOTEQUALPASSWORDS = 0;
    const NOTSTRONGPASSWORD = 1;
    const STRINGMAXLENGTH = 32;
    const STRINGMINLENGTH = 3;


    /** The DOM */
    document.addEventListener("DOMContentLoaded", function () {
        document.forms['password-form'].addEventListener("submit", function (event) {
            validations.validateFormFields(event);

        });
    });

    /**
     * A function that checks the correctness of input entered by the user
     * @type {{validateFormFields: validateFormFields}}
     */
    const validations = function () {
        /**
         * Checking the validity of the password entered by the user
         * @param event
         */
        function validateFormFields(event)
        {
            event.preventDefault();
            status = true;
            password = document.getElementById("password").value;
            confirmPassword = document.getElementById("confirmPassword").value;

            validatePassword(password,confirmPassword);
            if(status)
                event.target.submit();
        }

        /**
         * Checking the validity of the password entered by the user
         * @param password
         * @param confirmPassword
         */
        function validatePassword(password,confirmPassword) {
            let passwordError = document.querySelector(".password-error")
            let confirmPasswordError = document.querySelector(".confirm-password-error")

            if (password === confirmPassword && password.length >= STRINGMINLENGTH &&  password.length <= STRINGMAXLENGTH)
            {
                passwordError.innerText = "";
                confirmPasswordError.innerText = "";
            }

            else if(password !== confirmPassword  )
            {
                passwordError.innerText = "";
                confirmPasswordError.innerText = errorMassage[NOTEQUALPASSWORDS];
                status = false;
            }
            else
            {
                confirmPasswordError.innerText = "";
                passwordError.innerText = errorMassage[NOTSTRONGPASSWORD];
                status = false;
            }
        }
        return {
            validateFormFields: validateFormFields,

        }
    }();


})
();