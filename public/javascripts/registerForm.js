//ולידציה
(function () {
    let firstName, lastName, email;
    let status = true;
    const STRINGMAXLENGTH = 32;
    const STRINGMINLENGTH = 3;
    const errorMassage = ["Please match the requested format", "Invalid date format",
        "incorrect email"];
    const NAMEERROR = 0;
    const EMAILERROR = 1;


    /** A function that receives the elements and activates a toggle on them.
     * from d-nones, the elements become nones
     * @param elm: element
     */
    function toggleElement(elm) {
        document.getElementById(`${elm}`).classList.toggle("d-none");
    }

    /** The DOM */
    document.addEventListener("DOMContentLoaded", function () {

        document.forms['register-form'].addEventListener("submit", function (event) {

            validations.validateFormFields(event);

        });
    });

    /**
     *
     * @type {{validateFormFields: validateFormFields}}
     */
    const validations = function () {
        /**
         *
         * @param event
         */
        function validateFormFields(event) {
            event.preventDefault();
            status = true;
            firstName = document.getElementById("firstName").value;
            lastName = document.getElementById("lastName").value;
            email = document.getElementById("email").value;

            validateStr(firstName, "firstName-error");
            validateStr(lastName, "lastName-error");
            validateEmail(email);
            if (status)
                event.target.submit();

        }

        /**
         *
         * @param str
         * @param error
         */
        function validateStr(str, error) {
            const regex = /^[a-zA-Z]+$/;
            if (regex.test(str) && str.toString().length < STRINGMAXLENGTH && str.toString().length > STRINGMINLENGTH)
                document.querySelector(`.${error}`).innerText = "";
            else {
                document.querySelector(`.${error}`).innerText = `${errorMassage[NAMEERROR]}`;
                status = false;
            }

        }
        /**
         *
         * @param str
         */
        function validateEmail(str) {
            const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (regex.test(str) && str.toString().length < 32 && str.toString().length > 3)
                document.querySelector(".email-error").innerText = "";
            else {
                document.querySelector(".email-error").innerText = `${errorMassage[EMAILERROR]}`;
                status = false;
            }
        }
        return {
            validateFormFields: validateFormFields,
        }
    }();
})
();