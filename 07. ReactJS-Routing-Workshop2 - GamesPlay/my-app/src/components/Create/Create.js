import { useState } from 'react';
import styles from './Create.module.css';

export const Create = ({
    createGame
}) => {

    const [values, setValues] = useState({
        title: '',
        category: '',
        imageUrl: '',
        summary: '',
        maxLevel: '',
    });
    const [errors, setErrors] = useState({});

    const onChangeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    let check = false;
    if (errors) {
        check = Object.values(errors).some(error => error);
    }

    const minLengthCheck = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name].length < bound
        }))
    }

    const isPositive = (e) => {
        const number = Number(e.target.value);

        setErrors(state => ({
            ...state,
            [e.target.name]: !number || number < 0
        }))
    }

    const validUrl = (e) => {
        const regex = new RegExp(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i);
        const urlInput = e.target.value;

        setErrors(state => ({
            ...state,
            [e.target.name]: !regex.test(urlInput)
        }))
    }

    const onSubmitCreateHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newGame = Object.fromEntries(formData);

        return createGame(newGame);
    }

    return (
        <section id="create-page" className="auth">
            <form onSubmit={onSubmitCreateHandler} id="create">
                <div className="container">
                    <h1>Create Game</h1>

                    <label htmlFor="title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={onChangeHandler}
                        onBlur={(e) => minLengthCheck(e, 4)} />
                    {errors.title && <p className={styles.error}>Title must be at least 4 characters long!</p>}

                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        onChange={onChangeHandler}
                        onBlur={(e) => minLengthCheck(e, 3)} />
                    {errors.category && <p className={styles.error}>Category must be at least 3 characters long!</p>}

                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1}
                        onChange={onChangeHandler}
                        onBlur={isPositive}
                    />
                    {errors.maxLevel && <p className={styles.error}>Max Level must be greater than 1!</p>}

                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        onChange={onChangeHandler}
                        onBlur={validUrl} />
                    {errors.imageUrl && <p className={styles.error}>Please insert valid url !</p>}

                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        name="summary"
                        id="summary"
                        onChange={onChangeHandler}
                        onBlur={(e) => minLengthCheck(e, 10)} />
                    {errors.summary &&
                        <p className={styles.error}>Summary must be at least 10 characters long!</p>}


                    <input
                        className="btn submit"
                        type="submit"
                        defaultValue="Create Game"
                        disabled={check
                            ? 'disabled'
                            : ''}
                    />
                </div>
            </form>
        </section>)
}