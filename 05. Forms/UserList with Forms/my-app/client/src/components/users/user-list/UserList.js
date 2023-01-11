import { useState, useEffect } from 'react';
import * as userService from '../../../service/userService.js';

import { UserActions } from './UserListConstants.js';
import { UserDetails } from '../user-details/UserDetails.js';
import { UserCreate } from '../user-create/UserCreate.js';
import { UserItem } from './UserItem.js';
import { UserEdit } from '../user-edit/UserEdit.js';
import { UserDelete } from '../user-delete/UserDelete.js';

export const UserList = () => {
    let [users, setUsers] = useState([]);
    let [userAction, setUserAction] = useState({ user: null, action: null });

    useEffect(() => {
        userService.getAll()
            .then(result => setUsers(result))
    }, [])

    // Show DETAILS, EDIT, DELETE
    const userActionClickHandler = (id, actionType) => {
        userService.getOne(id)
            .then(user =>
                setUserAction({
                    user,
                    action: actionType
                }));
    }

    // Show Create
    const userActionCreateHandler = (actionType) => {
        setUserAction({
            user: null,
            action: actionType
        });
    }

    const onCloseAction = () => {
        setUserAction({ user: null, action: null })
    }

    // CREATE
    const userCreateHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)

        const { country, city, street, streetNumber } = Object.fromEntries(formData);
        const address = { country, city, street, streetNumber };

        const {
            firstName,
            lastName,
            email,
            imageUrl,
            phoneNumber,
        } = Object.fromEntries(formData);

        const userData = {
            firstName,
            lastName,
            email,
            imageUrl,
            phoneNumber,
            address
        }

        console.log(formData);
        
        userService.create(userData)
            .then(user => {
                setUsers(oldUsers => [...oldUsers, user])
                onCloseAction();
            });
    }

    // Delete
    const onUserDeleteHandler = (id) => {

        userService.deleteUser(id).then(userId => {
            userService.getAll().then(result => setUsers(result));
        })
        onCloseAction();
    }

    // EDIT
    const userEditHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)

        const { country, city, street, streetNumber } = Object.fromEntries(formData);
        const address = { country, city, street, streetNumber };

        const {
            firstName,
            lastName,
            email,
            imageUrl,
            phoneNumber,
        } = Object.fromEntries(formData);

        const userData = {
            firstName,
            lastName,
            email,
            imageUrl,
            phoneNumber,
            address
        }

        let userId = userAction.user._id;


        userService.edit(userId, userData)
            .then(user => {
                setUsers(oldUsers => {
                    let newUsers = oldUsers.filter(u => u._id != user._id);
                    return [user, ...newUsers];
                });
                onCloseAction();
            });
    }

    return (
        <>
            <div className="table-wrapper">

                {userAction.action === UserActions.Details &&
                    <UserDetails
                        user={userAction.user}
                        onClose={onCloseAction}>
                    </UserDetails>}

                {userAction.action === UserActions.Add &&
                    <UserCreate
                        onClose={onCloseAction}
                        onUserCreate={userCreateHandler}>
                    </UserCreate>
                }

                {userAction.action === UserActions.Edit &&
                    <UserEdit
                        user={userAction.user}
                        onClose={onCloseAction}
                        userEditHandler={userEditHandler}>
                    </UserEdit>
                }

                {userAction.action === UserActions.Delete &&
                    <UserDelete
                        user={userAction.user}
                        onClose={onCloseAction}
                        onUserDelete={onUserDeleteHandler}>
                    </UserDelete>
                }

                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Image
                            </th>
                            <th>
                                First name<svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Email<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Created
                                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user =>
                            <UserItem key={user._id}
                                user={user}
                                actionClickHandler={userActionClickHandler}>
                            </UserItem>
                        )}
                    </tbody>
                </table>
            </div>

            <button className="btn-add btn" onClick={() => userActionCreateHandler(UserActions.Add)} >Add new user</button>
        </>
    )
}