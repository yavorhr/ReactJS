import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import uuid from 'react-uuid';

export const Details = ({
    games,
    addComment,
    deleteHandler
}) => {
    const [comment, setComment] = useState({ username: '', comment: '' });
    const [errors, setErrors] = useState({});

    const { gameId } = useParams();

    const game = games.find(g => g._id == gameId);

    const onchangeHandler = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const result = `${comment.username}: ${comment.comment}`
        addComment(gameId, result);
    }

    const minLengthCheck = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: comment[e.target.name].length < bound
        }))
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">{game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">
                    {game.summary}
                </p>

                <div className="details-comments">
                    <h2>Comments:</h2>

                    <ul>
                        {game.comments?.map(x =>
                            <li key={uuid()} className="comment">
                                <p>{x}</p>
                            </li>
                        )}

                        {!game.comments &&
                            <li className="comment">
                                <p className="no-comment">No comments.</p>
                            </li>}
                    </ul>
                </div>

                <div className="buttons">
                    <Link to={`/edit/${gameId}`} className="button">
                        Edit
                    </Link>
                    <a href="" onClick={(e)=> deleteHandler(e,gameId)} className="button">
                        Delete
                    </a>
                </div>
            </div>

            <article className="create-comment">

                <label>Add new comment:</label>
                <form onSubmit={onSubmitHandler} className="form">

                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="John Doe"
                            onChange={onchangeHandler}
                            value={comment.username}
                            onBlur={(e) => minLengthCheck(e, 4)}
                        />
                        {errors.username && <p className="form-error">Username must be at least 3 characters long!</p>}
                    </div>

                    <div>
                        <textarea
                            name="comment"
                            placeholder="Comment......"
                            onChange={onchangeHandler}
                            value={comment.comment}
                            onBlur={(e) => minLengthCheck(e, 6)}
                        />
                        {errors.comment && <p className="form-error">Comment must be at least 6 characters long!</p>}
                    </div>

                    <input
                        className="btn submit"
                        type="submit"
                        defaultValue="Add Comment"
                    />
                </form>

            </article>
        </section >
    );
}