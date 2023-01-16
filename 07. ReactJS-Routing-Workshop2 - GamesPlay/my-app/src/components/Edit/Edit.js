import { useParams } from 'react-router-dom'
import { useState } from 'react'
import styles from './Edit.module.css';

export const Edit = ({
    games,
    onEditGame
}) => {
    const { gameId } = useParams();
    const gameToEdit = games.find(game => game._id === gameId);
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

    let check = false;
    if (errors) {
        check = Object.values(errors).some(error => error);
    }

    const validUrl = (e) => {
        const regex = new RegExp(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i);
        const urlInput = e.target.value;

        setErrors(state => ({
            ...state,
            [e.target.name]: !regex.test(urlInput)
        }))
    }

    const onSubmitEditHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        gameToEdit.title = formData.get('title');
        gameToEdit.maxLevel = formData.get('maxLevel');
        gameToEdit.category = formData.get('category');
        gameToEdit.imageUrl = formData.get('imageUrl');
        gameToEdit.summary = formData.get('summary');

        onEditGame(gameId, gameToEdit);
    }

    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onSubmitEditHandler}>
                <div className="container">
                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={gameToEdit.title}
                        onChange={onChangeHandler}
                        onBlur={(e) => minLengthCheck(e, 4)} />
                    {errors.title && <p className={styles.error}>Title must be at least 4 characters long!</p>}

                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        defaultValue={gameToEdit.category}
                        onChange={onChangeHandler}
                        onBlur={(e) => minLengthCheck(e, 3)} />
                    {errors.category && <p className={styles.error}>Category must be at least 3 characters long!</p>}

                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1}
                        defaultValue={gameToEdit.maxLevel}
                        onChange={onChangeHandler}
                        onBlur={isPositive}
                    />
                    {errors.maxLevel && <p className={styles.error}>Max Level must be greater than 1!</p>}

                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        defaultValue={gameToEdit.imageUrl}
                        onChange={onChangeHandler}
                        onBlur={validUrl} />
                    {errors.imageUrl && <p className={styles.error}>Please insert valid url !</p>}

                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        name="summary"
                        id="summary"
                        defaultValue={gameToEdit.summary}
                        onChange={onChangeHandler}
                        onBlur={(e) => minLengthCheck(e, 10)} />
                    {errors.summary &&
                        <p className={styles.error}>Summary must be at least 10 characters long!</p>}

                    <input 
                    className="btn submit" 
                    type="submit" 
                    defaultValue="Edit Game" 
                    disabled={check
                        ? 'disabled'
                        : ''}/>
                </div>
            </form>
        </section>
    )
}

