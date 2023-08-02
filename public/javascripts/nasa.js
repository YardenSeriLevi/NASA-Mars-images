(function () {

    let sPicDate = new Date; //Start date of displaying the images
    let ePicDate; //End date of displaying the images
    let numOfPicturs = 0;
    const NUMOFDAYS = 2; //A minimum of 3 images are shown in page
    const errorMassage = ["Please match the requested format", "Invalid date format",
        "It seems that something went wrong please try again later",
        "It seems that something went wrong in communication with NASA or that NASA still does not have a photo from this date"];
    const NAMEERROR = 0;
    const DATEERROR = 1;
    const SERVERERROR = 2;
    const NASAERROR = 3;
    const APIKEY = "NASA API KEY should be added here";
    const MINCOMMENTLEN = 0;
    const MAXCOMMENTLEN = 128;

    /** A function that receives the elements and activates a toggle on them.
     * from d-nones, the elements become nones
     * @param elm: element
     */
    function toggleElement(elm) {
        document.getElementById(`${elm}`).classList.toggle("d-none");
    }

    /**
     * A function that checks the correctness of input entered by the user
     * @type {{displayDate: (function(*, *): string), validateDate: validateDate}}
     */
    const validations = function () {
        /** A function that checks the correctness of the date that entered by the user
         */
        function validateDate() {
            let dateError = document.querySelector(".date-error");
            dateError.innerText = "";
            let curr_date = document.getElementById('currDate');
            if (!curr_date.value)
                getCurrentDate();
            else if (!curr_date.checkValidity()) {
                dateError.innerText = `${errorMassage[DATEERROR]}`;
                ePicDate = "";
            } else
                sPicDate = displayDate(ePicDate, NUMOFDAYS);
        }

        /**
         * A function that displays the date on the screen
         * @param end
         * @param num
         * @returns {string}: the date
         */
        function displayDate(end, num) {
            let temp = new Date(end);
            temp.setDate(temp.getDate() - num);
            let dd = String(temp.getDate()).padStart(2, '0');
            let mm = String(temp.getMonth() + 1).padStart(2, '0'); //January is 0
            let yyyy = String(temp.getFullYear());
            return yyyy + "-" + mm + "-" + dd;
        }

        /** If the user does not enter a date, the default will be to display
         * the three images of the last three days
         */
        function getCurrentDate() {
            let today = new Date();
            sPicDate = displayDate(today, NUMOFDAYS)
            ePicDate = displayDate(today, 0)
        }

        return {
            validateDate: validateDate,
            displayDate: displayDate
        }
    }();

    const display = function () {
        /** A function that receives the image or video from the NASA API
         */
        function getPicFromNasa() {
            toggleElement("loadingGif");
            fetch(`https://api.nasa.gov/planetary/apod?api_key=${APIKEY}&start_date=${sPicDate}&end_date=${ePicDate}`)
                .then(function (res) {
                    if (!res.ok)
                        throw(res.status)
                    return res.json()
                })
                .then(display.displayWeb)
                .catch(error => toHandleError(error))
                .finally(() => {
                    toggleElement("loadingGif");
                    if (numOfPicturs === 3 && document.getElementById("more").getAttribute("class") === "d-none")
                        toggleElement("more");
                });
        }

        /**
         * A function that displays an appropriate error message on the screen
         * @param error
         */
        function toHandleError(error) {
            if (document.getElementById("more").getAttribute("class") !== "d-none") {
                toggleElement("more");
            }
            document.querySelector(".date-error").innerText = `status:${error}, ${errorMassage[NASAERROR]},`;
        }

        /**
         * After selecting the date, the following will be printed on the screen: the date,
         * the image, the title of the image, explanations of the image and the copyright
         * of the image
         * @param obj
         * @returns {Promise<void>}
         */
        function displayWeb(obj) {
            for (let i = obj.length - 1; i >= 0; i--) {
                let date = obj[i]["date"];
                let explanation = obj[i]["explanation"]
                let title = obj[i]["title"];
                let type = obj[i]["media_type"];
                let picUrl = obj[i]["url"];
                let picCopyright = obj[i]["copyright"];
                createElements.createPicElements(date, explanation, title, picCopyright, type, picUrl);
                numOfPicturs++;
            }
        }

        function setDates() {
            //the last image
            ePicDate = validations.displayDate(sPicDate, 1);
            //the first image
            sPicDate = validations.displayDate(ePicDate, 2);
        }

        return {
            getPicFromNasa: getPicFromNasa,
            displayWeb: displayWeb,
            setDates: setDates

        }
    }();

    const createElements = function () {
        let currComment;
        /**
         * Creating the HTML elements
         * @param date: the date of the picture
         * @param explanation: the explanation of the picture
         * @param title: the title of the picture
         * @param copyright the copyright of the picture
         * @param type: the type of the picture, image or video
         * @param picUrl: the URL of the picture
         */
        function createPicElements(date, explanation, title, copyright, type, picUrl) {
            let newRow = document.createElement("div");
            newRow.classList.add("row", "justify-content-center");
            let firstCol = document.createElement("div");
            firstCol.classList.add('col-3', "justify-content-center");

            let secondCol = document.createElement("div");
            secondCol.classList.add('col-9', "justify-content-center");

            newRow.appendChild(firstCol)
            newRow.appendChild(secondCol)

            let col1FirstRow = document.createElement("div");
            col1FirstRow.classList.add("row", "justify-content-center");
            let col1secondRow = document.createElement("div");
            col1secondRow.classList.add("row", "justify-content-center");

            let col2SecondRow = document.createElement("div");
            col2SecondRow.classList.add("row", "justify-content-center");
            let col2ThirdRow = document.createElement("div");
            col2ThirdRow.classList.add("row", "justify-content-center");
            let col2FourthRow = document.createElement("div");
            col2FourthRow.classList.add("row", "justify-content-center");
            let col2FifthRow = document.createElement("div");
            col2FifthRow.classList.add("row-3", "justify-content-center");
            let col2SixthRow = document.createElement("div");
            col2SixthRow.classList.add("row", "justify-content-center");

            firstCol.appendChild(col1secondRow);
            secondCol.appendChild(col1FirstRow);
            secondCol.appendChild(col2SecondRow);
            secondCol.appendChild(col2ThirdRow);
            secondCol.appendChild(col2FourthRow);
            secondCol.appendChild(col2FifthRow);
            secondCol.appendChild(col2SixthRow);

            col1FirstRow.appendChild(pictureDate(date))
            col1secondRow.appendChild(createPicOrVideo(type, picUrl))
            col2SecondRow.appendChild(pictureTitle(title))
            col2ThirdRow.appendChild(createExplanation(explanation, date))
            col2FourthRow.appendChild(pictureCopyright(copyright));
            col2FifthRow.appendChild(createButton(date, "Show comments", `com${date}`));

            let enter = document.createElement("br");
            const element = document.getElementById("elements");
            element.appendChild(newRow);
            element.appendChild(enter);

            document.getElementById(`${date}`).addEventListener("click", (event) => {
                toggleElement(`ex${date}`);
            });

            col2SixthRow.appendChild(createAllCommentsLabel(date));
            col2SixthRow.appendChild(commentLabel(date));
            toGetComment(date);
            toAddComment(date);
        }

        /**
         * A function that receives the image from the appropriate date
         * @param date
         * @returns {HTMLDivElement}
         */
        function pictureDate(date) {
            let pictureDate = document.createElement("div");
            pictureDate.innerHTML = `Date: ${date}`;
            return pictureDate;
        }

        /**
         * A function that receives the title of the image from the appropriate date
         * @param title
         * @returns {HTMLHeadingElement}
         */
        function pictureTitle(title) {
            let pictureTitle = document.createElement("h6");
            pictureTitle.innerHTML = `Title: ${title}`;
            return pictureTitle;
        }

        /**
         * A function that checks if there is a photo or video on the given date
         * @param type :image or video
         * @param picUrl
         * @returns {HTMLIFrameElement | HTMLImageElement}
         */
        function createPicOrVideo(type, picUrl) {
            let newImg;
            if (type === "image")
                newImg = document.createElement('img')
            else
                newImg = document.createElement('iframe')
            newImg.height = "160";
            newImg.weight = "320";
            newImg.setAttribute('src', `${picUrl}`);
            return newImg;
        }

        /**
         * A function that receives the explanation of the image from the appropriate date
         * @param explanation
         * @param date
         * @returns {HTMLDivElement}
         */
        function createExplanation(explanation, date) {
            const sExp = `${explanation}`.split(' ').slice(0, 15).join(' ');
            const eExp = `${explanation}`.split(' ').slice(15, explanation.length).join(' ');
            let sExplanation = document.createElement("div");
            let eExplanation = document.createElement("div");
            sExplanation.innerHTML = `Explanation: ${sExp} `;
            eExplanation.innerHTML = `${eExp}`;
            eExplanation.setAttribute("class", "d-none")
            eExplanation.setAttribute("id", `ex${date}`)

            let more = document.createElement("button");
            more.innerText = "Read more";
            more.setAttribute("id", `${date}`);
            more.setAttribute("class", "btn btn-link");

            sExplanation.appendChild(more);
            sExplanation.appendChild(eExplanation);
            return sExplanation;
        }

        /**
         * A function that receives the copy right of the image from the appropriate date
         * @param copyright
         * @returns {HTMLHeadingElement}
         */
        function pictureCopyright(copyright) {
            let pictureCopyright = document.createElement("h6");
            pictureCopyright.innerHTML = `Copyright: ${copyright}`;
            return pictureCopyright;
        }

        /**
         * To create buttons
         * @param date
         * @param name
         * @param id
         * @returns {HTMLButtonElement}
         */
        function createButton(date, name, id) {
            let comment = document.createElement("button");
            comment.innerText = `${name}`;
            comment.setAttribute("id", `${id}`);
            comment.setAttribute("type", "button");
            comment.setAttribute("class", "btn btn-outline-primary");
            return comment;
        }

        /**
         * To create label for the comments
         * @param date
         * @returns {HTMLLabelElement}
         */
        function createAllCommentsLabel(date) {
            const allComments = document.createElement("label");
            allComments.setAttribute("id", `allComments${date}`);
            allComments.setAttribute("class", `d-none`);
            return allComments;
        }

        /**
         * A function that receives a comment from the user on an image and add a new comment
         * @param date
         */
        function toAddComment(date) {
            document.getElementById(`button${date}`).addEventListener("click", (event) => {
                    currComment = document.getElementById(`c${date}`).value;
                    document.querySelector(`#c${date}`).value = "";

                    const comment = {
                        "date": date,
                        "txt": currComment
                    }

                    const options = {
                        method: 'POST',
                        body: JSON.stringify(comment),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    };

                    if (`${currComment}`.length > MINCOMMENTLEN && `${currComment}`.length <= MAXCOMMENTLEN) {
                        connectingToOurServer.postComment(options);
                        showComments(date);
                    }

                }
            )
        }

        /**
         * Create HTML for the comments
         * @param date
         * @returns {HTMLDivElement}
         */
        function commentLabel(date) {
            let commentLabel = document.createElement("div");
            commentLabel.setAttribute("className", "input-group")
            commentLabel.setAttribute("class", "d-none");
            commentLabel.setAttribute("id", `cLabel${date}`);
            let input = document.createElement("input");
            commentLabel.appendChild(input);
            commentLabel.appendChild(createButton(date, "Send", `button${date}`));
            input.setAttribute("type", "text");
            input.setAttribute("className", "form-control");
            input.setAttribute("placeholder", "Enter a comment");
            input.setAttribute("id", `c${date}`);

            let errorWithServer = document.createElement("p");
            errorWithServer.setAttribute("id", `error${date}`);
            return commentLabel;
        }

        /**
         * Function that get all the comments
         * @param date
         */
        function toGetComment(date) {
            document.getElementById(`com${date}`).addEventListener("click", (event) => {
                toggleElement(`cLabel${date}`);
                toggleElement(`allComments${date}`);

                if (document.getElementById(`cLabel${date}`).getAttribute("class") !== "d-none") {
                    showComments(date);
                }
            });
        }

        /**
         * A function that receives the responses with GET
         * @param date
         */
        function showComments(date) {
            const params = {
                "date": date
            };
            document.querySelector(`#allComments${date}`).innerText = "";
            connectingToOurServer.getComment(params);
        }

        /**
         * A function that displays the responses on the screen on the appropriate date
         * @param comments
         */
        function presentComments(comments) {
            comments.forEach((comment) => {
                let name = comment.Contact.firstName + " " + comment.Contact.lastName;
                const commentDiv = document.createElement('div');
                commentDiv.setAttribute("class", 'bg-light')

                const userSpan = document.createElement('b');
                userSpan.textContent = name + ":";
                commentDiv.appendChild(userSpan);

                const textP = document.createElement('p');
                textP.textContent = comment.comment + " ";
                commentDiv.appendChild(textP);

                let userId = document.getElementById("userId").value;
                if (comment.user_id == userId) {
                    const deleteButton = createButton(comment.date, "Delete", `button${comment.identity}`)
                    deleteButton.addEventListener('click', () => {
                        const params = {
                            "date": comment.date,
                            "id": comment.id,
                        }
                        const options = {
                            method: 'DELETE',
                            body: JSON.stringify(params),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        };
                        connectingToOurServer.deleteComment(options);
                        showComments(comment.date);
                    });
                    textP.appendChild(deleteButton);
                }
                document.getElementById(`allComments${comment.date}`).appendChild(commentDiv);
            })
        }

        /** The DOM */
        document.addEventListener("DOMContentLoaded", function () {
            document.forms['date-form'].addEventListener("submit", function (event) {
                event.preventDefault();
                document.getElementById("more").classList.add("d-none");
                document.querySelector("#elements").innerText = "";
                ePicDate = document.getElementById("currDate").value;
                validations.validateDate();

                if (document.querySelector(".date-error").innerText === "") {
                    if (document.getElementById("more").getAttribute("class") !== "d-none")
                        toggleElement("more");
                    document.querySelector("#elements").innerText = "";
                    numOfPicturs = 0;
                    display.getPicFromNasa();
                }
            });

            document.getElementById("more").addEventListener("click", (event) => {
                display.setDates();
                display.getPicFromNasa();
            });

        });

        return {
            createPicElements: createPicElements,
            presentComments: presentComments
        }
    }();

    /**
     * Communication with the server for functions:
     * POST, DELETE and GET
     * @type {{postComment: postComment, getComment: getComment, deleteComment: deleteComment}}
     */
    const connectingToOurServer = function () {
        let serverError = document.querySelector(".serverError");
        /**
         * GET function
         * @param params
         */
        function getComment(params) {
            toggleElement("loadingGif");
            const queryString = new URLSearchParams(params).toString();
            fetch(`/api/comment/?${queryString}`)
                .then(function (res) {
                    if (!res.ok)
                        throw(res.status)
                    redirect(res);
                    return res.json()
                })
                .then((createElements.presentComments))
                .catch(function () {
                    serverError.innerText = errorMassage[SERVERERROR];
                })
                .finally(() => {
                    toggleElement("loadingGif")
                })
        }

        /**
         * POST function
         * @param options
         */
        function postComment(options) {
            connectWithServer(options);
        }
        /**
         * DELETE function
         * @param options
         */
        function deleteComment(options) {
            connectWithServer(options);

        }
        function  connectWithServer(options)
        {
            toggleElement("loadingGif");
            fetch('/api/comment', options)
                .then((response) =>
                {
                    if (!response.ok)
                        throw(response.status)

                    redirect(response);
                    response.json()
                })
                .then()
                .catch(function () {
                    serverError.innerText = errorMassage[SERVERERROR];
                })
                .finally(() => toggleElement("loadingGif"));
        }

        /**
         * redirect function
         * @param res
         */
        function redirect(res)
        {
            if (res.redirected)
                window.location.href = res.url
        }

        return {
            getComment: getComment,
            postComment: postComment,
            deleteComment: deleteComment
        }
    }();
})
();