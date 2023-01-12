//ולידציה
(function () {
    let password,confirmPassword;
    let status = true;
    const STRINGMAXLENGTH = 32;
    const STRINGMINLENGTH = 3;
    const errorMassage = ["The passwords must be the same", "Invalid date format"]
    const NAMEERROR = 0;



    /** A function that receives the elements and activates a toggle on them.
     * from d-nones, the elements become nones
     * @param elm: element
     */
    function toggleElement(elm) {
        document.getElementById(`${elm}`).classList.toggle("d-none");
    }

    /** The DOM */
    document.addEventListener("DOMContentLoaded", function () {

        document.forms['password-form'].addEventListener("submit", function (event) {

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
        function validateFormFields(event)
        {
            event.preventDefault();
            status = true;
            password = document.getElementById("password").value;
            confirmPassword = document.getElementById("confirm-password").value;
            console.log("in validatePassword")

            validatePassword(password,confirmPassword);
            if(status)
                event.target.submit();

        }

        /**
         *
         * @param password
         * @param confirmPassword
         */
        function validatePassword(password,confirmPassword) {
            const regex = /^[a-zA-Z]+$/;
            let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
            let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')


            if(strongPassword.test(password) && password === confirmPassword)
            {
                document.querySelector(".password-error").innerText = "";
                document.querySelector(".confirm-password-error").innerText = "";
            }

            else if(password !== confirmPassword)
            {
                document.querySelector(".confirm-password-error").innerText = "password must be the same";
                status = false;
            }
        }


        return {
            validateFormFields: validateFormFields,

        }
    }();


})
();