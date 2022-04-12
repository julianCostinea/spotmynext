import React, { useRef, useState } from "react";

import classes from "./ContactForm.module.css";

const ContactForm = (props) => {
    const titleRef = useRef();
    const [errorHeader, setErrorHeader] = useState(null);
    const mainTagsPlaceholder = "Know of any platform the game is available on? i.e. Playstation 5, Playstation 4";
    const secondaryTagsPlaceholder = "What is the game's genre(s)? i.e. RPG, Action, Shooter"

    const formHandler = (event) => {
        event.preventDefault();
        const title = titleRef.current.value.trim();
        if (!title) {
            setErrorHeader("Title cannot be empty!");
            return;
        }
    }
    return (
        <div className={classes.formContainer}>
            <form
                method="POST"
                onSubmit={formHandler}
                style={{
                    transform: props.showContactForm ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.showContactForm ? '1' : '0',
                    transition: '1s'
                }}>
                <h3 className={classes.errorHeader}>{errorHeader}</h3>
                <div className={classes.Input}>
                    <input
                        name="title"
                        id="title"
                        required
                        placeholder="Title of your recommendation"
                        ref={titleRef}
                        className={classes.InputElement}
                    />
                </div>
                <div className={classes.Input}>
                    <input
                        name="mainTags"
                        id="mainTags"
                        placeholder={mainTagsPlaceholder}
                        className={classes.InputElement}
                    />
                </div>
                <div className={classes.Input}>
                    <input
                        name="secondaryTags"
                        id="secondaryTags"
                        placeholder={secondaryTagsPlaceholder}
                        className={classes.InputElement}
                    />
                </div>
                <button type="submit" className={classes.Button}>
                    SEND
                </button>
            </form>
        </div>

    );
}

export default ContactForm;
