
(function () {
    let status = true;
    const STRINGMAXLENGTH = 32;
    const STRINGMINLENGTH = 3;
    const errorMassage = ["Please match the requested format", "Incorrect email format"];
    const NAMEERROR = 0;
    const EMAILERROR = 1;


    /** The DOM */
    document.addEventListener("DOMContentLoaded", function () {
        const firstName = document.getElementById("firstName")
        const lastName = document.getElementById("lastName")
        const email = document.getElementById("email")

        firstName.addEventListener("change",function()
        {
            validations.validateStr(firstName.value.trim(),"firstName-error")
        })
        lastName.addEventListener("change",function()
        {
            validations.validateStr(lastName.value.trim(),"lastName-error")
        })
        email.addEventListener("change",function()
        {
            validations.validateEmail(email.value.trim(),"email-error")
        })
        document.forms['register-form'].addEventListener("submit", function (event) {

            validations.validateFormFields(event,firstName.value.trim(),lastName.value.trim(),email.value.trim());

        });
    });

    /**
     * A function that checks the correctness of input entered by the user
     * @type {{validateFormFields: validateFormFields}}
     */
    const validations = function () {
        /** Calling functions that check the correctness of the username and his email
         * @param event
         * @param firstName
         * @param lastName
         * @param email
         */
        function validateFormFields(event,firstName,lastName,email) {
            event.preventDefault();
            status = true;
            validateStr(firstName, "firstName-error");
            validateStr(lastName, "lastName-error");
            validateEmail(email);
            if (status)
                event.target.submit();
        }

        /**
         * Checking that the username contains only letters, without spaces
         * @param str
         * @param error
         */
        function validateStr(str, error) {
            const regex = /^[a-zA-Z]+$/;
            if (regex.test(str) && str.toString().length <= STRINGMAXLENGTH && str.toString().length >= STRINGMINLENGTH)
                document.querySelector(`.${error}`).innerText = "";
            else {
                document.querySelector(`.${error}`).innerText = `${errorMassage[NAMEERROR]}`;
                status = false;
            }
        }

        /**
         * Checking the correctness of the email entered by the user
         * @param str
         */
        function validateEmail(str) {
            const regex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (regex.test(str) && str.toString().length <= STRINGMAXLENGTH && str.toString().length >= STRINGMINLENGTH)
                document.querySelector(".email-error").innerText = "";
            else {
                document.querySelector(".email-error").innerText = `${errorMassage[EMAILERROR]}`;
                status = false;
            }
        }
        return {
            validateFormFields: validateFormFields,
            validateStr:validateStr,
            validateEmail:validateEmail
        }
    }();
})
();