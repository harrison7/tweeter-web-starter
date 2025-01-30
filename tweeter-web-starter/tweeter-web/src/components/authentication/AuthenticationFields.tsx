import { SetStateAction, useState } from "react";

interface Props {
    onEnter: (event: React.KeyboardEvent<HTMLElement>) => void;
    alias: React.Dispatch<React.SetStateAction<string>>;
    password: React.Dispatch<React.SetStateAction<string>>;
}

const AuthenticationFields = (props: Props) => {
    return (
        <>
            <div className="form-floating">
                <input
                type="text"
                className="form-control"
                size={50}
                id="aliasInput"
                placeholder="name@example.com"
                onKeyDown={props.onEnter}
                onChange={(event) => props.alias(event.target.value)}
                />
                <label htmlFor="aliasInput">Alias</label>
            </div>
            <div className="form-floating">
                <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                onKeyDown={props.onEnter}
                onChange={(event) => props.password(event.target.value)}
                />
                <label htmlFor="passwordInput">Password</label>
            </div>
        </>
    )
}

export default AuthenticationFields;